export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white mt-auto">
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-6">
            <h2 className="text-4xl font-black mb-8 tracking-tighter">RS<span className="text-blue-500">.</span></h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md">
               Data Science & AI Engineer specializing in building intelligent systems that solve real-world problems.
            </p>
          </div>
          <div className="md:col-span-3">
            <h3 className="text-xs uppercase tracking-widest font-mono mb-8 text-gray-500">Contact</h3>
            <div className="space-y-4 text-sm font-mono">
              <p>
                <a href="mailto:rahardisalim23@gmail.com" className="hover:text-blue-500 transition-colors">
                  rahardisalim23@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:+6281364134638" className="hover:text-blue-500 transition-colors">
                  +62 813 6413 4638
                </a>
              </p>
              <p className="text-gray-500">Jakarta, Indonesia</p>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs uppercase tracking-widest font-mono mb-8 text-gray-500">Socials</h3>
            <div className="space-y-4 text-sm font-mono">
              <p>
                <a
                  href="https://github.com/RahardiSalim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors"
                >
                  GitHub ↗
                </a>
              </p>
              <p>
                <a
                  href="https://www.linkedin.com/in/rahardi-salim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors"
                >
                  LinkedIn ↗
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-gray-900 flex flex-col md:flex-row justify-between gap-8">
          <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
            © {currentYear} Rahardi Salim. Built with Clean Architecture.
          </p>
          <div className="flex gap-8 text-[10px] text-gray-600 font-mono uppercase tracking-widest">
             <span>V2.0.0</span>
             <span>Refactored by Manus</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
