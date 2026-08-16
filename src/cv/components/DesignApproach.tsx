export function DesignApproach() {
  return (
    <section id="design-approach" className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-black/40 via-white/[0.02] to-black/40 p-8 sm:p-12 backdrop-blur">
        <div className="mb-6 text-center">
          <p className="mb-3 text-xs font-medium text-[var(--muted)]">Design philosophy</p>
          <h2 className="text-3xl font-bold sm:text-4xl">Design is about clarity</h2>
        </div>
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="text-lg leading-relaxed text-[var(--muted)]">
            Over <span className="font-semibold text-[var(--foreground)]">17+ years</span>, I&apos;ve learned that great design is less about decoration and more about <span className="font-semibold text-accent">clarity</span> — making the complex feel simple, and the unfamiliar feel welcoming.
          </p>
          <p className="text-lg leading-relaxed text-[var(--muted)]">
            I approach every project — whether a <span className="font-semibold text-[var(--foreground)]">brand identity</span>, a <span className="font-semibold text-[var(--foreground)]">product interface</span>, or a <span className="font-semibold text-[var(--foreground)]">Web3 experience</span> — with the same question: what does this need to communicate, and how does it need to feel?
          </p>
          <p className="text-lg leading-relaxed text-[var(--muted)]">
            I work in close collaboration with product, marketing, and development teams, believing that design is most powerful when it&apos;s woven into the process from the beginning. <span className="font-semibold text-accent">Front-end capable</span> — I prototype and build in <span className="font-semibold text-accent">React</span>, <span className="font-semibold text-accent">Next.js</span>, and <span className="font-semibold text-accent">Tailwind</span> when needed, bridging the gap between design and implementation.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#experience"
              className="rounded-full border border-white/30 px-8 py-3 font-semibold transition hover:border-[var(--accent)] hover:text-accent"
            >
              See my experience
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
