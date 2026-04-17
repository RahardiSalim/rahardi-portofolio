export function HomeCTA() {
  return (
    <section className="container-custom section-spacing text-center">
      <h2 className="text-4xl md:text-6xl font-black mb-8 dark:text-white tracking-tighter uppercase">
        Let&apos;s Work Together
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
        Interested in collaborating on AI/ML projects or discussing data science? Let&apos;s connect.
      </p>
      <a
        href="mailto:rahardisalim23@gmail.com"
        className="inline-block bg-black dark:bg-white text-white dark:text-black px-12 py-6 text-sm font-mono uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
      >
        Send me an Email
      </a>
    </section>
  );
}
