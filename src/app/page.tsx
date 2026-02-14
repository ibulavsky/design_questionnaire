import Quiz from "@/components/Quiz";
import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl min-h-screen flex flex-col">
        <MainHeader />
        <section className="animate-fade-in fill-mode-forwards flex-1">
          <Quiz />
        </section>

        <MainFooter />
      </div>
    </main>
  );
}
