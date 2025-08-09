"use client";
import { useCallback, useEffect, useRef, useState } from "react";

// Lightweight Web Speech API hook with graceful fallback.
// In unsupported browsers it will simulate recognition if simulateFallback is true.

export interface UseSpeechRecognitionOptions {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  simulateFallback?: boolean; // if true, simulate transcript when API missing
  simulationPhrases?: string[]; // phrases used for simulation
  simulationDelayMs?: number;
  onFinalResult?: (text: string) => void;
  onInterimResult?: (text: string) => void;
  disableNative?: boolean; // if true, never attempt native API (always simulate)
}

export interface UseSpeechRecognitionResult {
  start: () => void;
  stop: () => void;
  reset: () => void;
  listening: boolean;
  supported: boolean;
  transcript: string; // accumulated final
  interim: string; // current interim
  error: string | null;
}

// Loose SpeechRecognition type to avoid depending on lib.dom conditional constructs
// We intentionally keep it 'any' shaped to sidestep cross-browser differences.
type SpeechRecognitionType = any;

export function useSpeechRecognition(
  options: UseSpeechRecognitionOptions = {}
): UseSpeechRecognitionResult {
  const {
    lang = "en-US",
    continuous = true,
    interimResults = true,
    simulateFallback = true,
    disableNative = false,
    simulationPhrases = [
      "locating nearest hospital",
      "checking queue times",
      "verifying emergency departments",
      "finding open facilities",
    ],
    simulationDelayMs = 600,
    onFinalResult,
    onInterimResult,
  } = options;

  const [supported, setSupported] = useState<boolean>(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any | null>(null);
  const simulationTimer = useRef<any | null>(null);
  const simIndexRef = useRef(0);

  useEffect(() => {
    if (disableNative) {
      setSupported(false);
      return;
    }
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }
    setSupported(true);
    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;

    recognition.onresult = (event: any) => {
      let interimText = "";
      let finalTextSegments: string[] = [];
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        const text = res[0].transcript.trim();
        if (res.isFinal) {
          finalTextSegments.push(text);
        } else {
          interimText += (interimText ? " " : "") + text;
        }
      }
      if (interimText) {
        setInterim(interimText);
        onInterimResult?.(interimText);
      } else {
        setInterim("");
      }
      if (finalTextSegments.length) {
        const finalJoined = finalTextSegments.join(" ");
        setTranscript((prev) => (prev ? prev + " " : "") + finalJoined);
        onFinalResult?.(finalJoined);
      }
    };

    recognition.onerror = (e: any) => {
      setError(e.error || "speech_error");
      setListening(false);
    };
    recognition.onend = () => {
      setListening(false);
    };
    recognitionRef.current = recognition;
  }, [
    disableNative,
    lang,
    continuous,
    interimResults,
    onFinalResult,
    onInterimResult,
  ]);

  const startSimulation = useCallback(() => {
    if (!simulateFallback) return;
    stopSimulation();
    setListening(true);
    simIndexRef.current = 0;
    simulationTimer.current = setInterval(() => {
      const i = simIndexRef.current;
      const word = simulationPhrases[i % simulationPhrases.length];
      setInterim((prev) => (prev ? prev + " " : "") + word);
      onInterimResult?.(word);
      simIndexRef.current++;
      if (simIndexRef.current > simulationPhrases.length + 2) {
        // finalize
        const finalJoined = "Find the nearest hospital with emergency services";
        setTranscript(finalJoined);
        setInterim("");
        onFinalResult?.(finalJoined);
        stopSimulation();
      }
    }, simulationDelayMs);
  }, [
    simulateFallback,
    simulationPhrases,
    simulationDelayMs,
    onFinalResult,
    onInterimResult,
  ]);

  const stopSimulation = useCallback(() => {
    if (simulationTimer.current) {
      clearInterval(simulationTimer.current);
      simulationTimer.current = null;
    }
    setListening(false);
  }, []);

  const start = useCallback(() => {
    if (!disableNative && supported && recognitionRef.current) {
      setError(null);
      setTranscript("");
      setInterim("");
      setListening(true);
      try {
        recognitionRef.current.start();
      } catch (e) {
        // calling start twice throws. ignore.
      }
    } else {
      startSimulation();
    }
  }, [supported, startSimulation, disableNative]);

  const stop = useCallback(() => {
    if (!disableNative && supported && recognitionRef.current) {
      recognitionRef.current.stop();
    } else {
      stopSimulation();
    }
  }, [supported, stopSimulation, disableNative]);

  const reset = useCallback(() => {
    setTranscript("");
    setInterim("");
    setError(null);
  }, []);

  useEffect(() => {
    return () => {
      stopSimulation();
      if (recognitionRef.current && listening) {
        recognitionRef.current.stop();
      }
    };
  }, [listening, stopSimulation]);

  return {
    start,
    stop,
    reset,
    listening,
    supported,
    transcript,
    interim,
    error,
  };
}
