import Quiz from "@/components/Quiz";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-grid">
      <div className="bg-glow" />

      <div className="container mx-auto px-4 py-12 md:py-24 max-w-4xl relative z-10">
        <header className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-4">
            Design Brief
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Расскажите о вашем <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">проекте</span>
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Заполните небольшую анкету, чтобы мы могли лучше понять ваши задачи и подготовить идеальное предложение.
          </p>
        </header>

        <section className="animate-fade-in [animation-delay:200ms] opacity-0 fill-mode-forwards">
          <Quiz />
        </section>

        <footer className="mt-20 text-center text-white/20 text-sm animate-fade-in [animation-delay:400ms] opacity-0 fill-mode-forwards">
          &copy; {new Date().getFullYear()} Design Studio. Все права защищены.
        </footer>
      </div>
    </main>
  );
}
