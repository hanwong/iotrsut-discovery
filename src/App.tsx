import { CarouselContent, CarouselItem } from "./components/ui/carousel";
import { Carousel } from "./components/ui/carousel";
import { Input } from "./components/ui/input";

function App() {
  return (
    <div className="flex min-h-screen items-start justify-center max-w-xl min-w-md mx-auto">
      <main className="flex flex-col items-start w-full">
        <section className="w-full p-2">
          <Input placeholder="Search" />
        </section>
        <section className="w-full">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <div>Item 1</div>
              </CarouselItem>
              <CarouselItem>
                <div>Item 2</div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </section>
        <section className="w-full flex flex-col gap-4 p-4">
          <article>
            <h2>즐겨찾기</h2>
            <div className="flex flex-col gap-4">
              <div>즐겨찾기 1</div>
              <div>즐겨찾기 2</div>
            </div>
          </article>
          <article>
            <h2>목록</h2>
            <div className="flex flex-col gap-4">
              <div>목록 1</div>
              <div>목록 2</div>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;
