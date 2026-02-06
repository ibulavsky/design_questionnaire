import Quiz from "@/components/Quiz";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="container mx-auto px-4 py-12 md:py-24 max-w-3xl">
        <header className="text-center mb-16 animate-fade-in">
          <div className="mb-4">
            <span className="inline-block text-gray-900 font-bold tracking-[0.3em] leading-[1] uppercase text-sm">Добро пожаловать <br className="hidden md:block" /> в space</span>
          </div>
          <h1 className="text-4xl uppercase md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-[1.1]">
            Давайте вместе поможем <br className="hidden md:block" />
            вашему бренду сиять сильнее
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Пожалуйста, ответьте на эти вопросы. Это поможет мне лучше понять, как помочь вашей компании стать ярче конкурентов ✨
          </p>
        </header>

        <section className="animate-fade-in [animation-delay:200ms] opacity-0 fill-mode-forwards">
          <Quiz />
        </section>

        <footer className="mt-20 text-center text-gray-400 text-sm animate-fade-in [animation-delay:400ms] opacity-0 fill-mode-forwards">
          &copy; {new Date().getFullYear()}. Все права защищены.
        </footer>
      </div>
    </main>
  );
}
