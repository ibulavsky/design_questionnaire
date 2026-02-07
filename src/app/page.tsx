import Quiz from "@/components/Quiz";
import MainFooter from "@/components/MainFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
        <section className="animate-fade-in fill-mode-forwards">
          <Quiz />
        </section>

        <MainFooter />
      </div>
    </main>
  );
}
