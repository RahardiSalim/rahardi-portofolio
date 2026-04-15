export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-black dark:border-gray-700 mt-auto">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Contact */}
          <div>
            <h3 className="text-sm uppercase tracking-widest font-mono mb-4 dark:text-white">Contact</h3>
            <div className="space-y-2 text-sm">
              <p>
                <a href="mailto:rahardisalim23@gmail.com" className="link-underline dark:text-gray-300">
                  rahardisalim23@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:+6281364134638" className="link-underline dark:text-gray-300">
                  +62 813 6413 4638
                </a>
              </p>
              <p className="text-gray-600 dark:text-gray-400">Jakarta, Indonesia</p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm uppercase tracking-widest font-mono mb-4 dark:text-white">Links</h3>
            <div className="space-y-2 text-sm">
              <p>
                <a
                  href="https://github.com/RahardiSalim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline dark:text-gray-300"
                >
                  GitHub
                </a>
              </p>
              <p>
                <a
                  href="https://www.linkedin.com/in/rahardi-salim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline dark:text-gray-300"
                >
                  LinkedIn
                </a>
              </p>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm uppercase tracking-widest font-mono mb-4 dark:text-white">Info</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Data Science & AI Engineer specializing in machine learning, NLP, and computer vision.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
            © {currentYear} Rahardi Salim. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
