import { RosaChat } from '@/components/rosa-chat';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function RosaAIPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Card className="w-full max-w-3xl h-[calc(100vh-10rem)] flex flex-col shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Meet Rosa, Your AI Companion</CardTitle>
          <CardDescription>Ask me anything about Santa Rosa!</CardDescription>
        </CardHeader>
        <RosaChat />
      </Card>
    </div>
  );
}
