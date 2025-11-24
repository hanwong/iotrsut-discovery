import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex flex-col items-center gap-8 p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            shadcn/ui 프로젝트
          </h1>
          <p className="text-muted-foreground max-w-md">
            Vite와 React, shadcn/ui로 구성된 빈 프로젝트입니다.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button>기본 버튼</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </main>
    </div>
  );
}

export default App;
