import { Badge } from '@/components/ui/Badge';

export default function AboutPage() {
  const skills = {
    Core: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Data Engineering'],
    Technologies: ['Python', 'PyTorch', 'TensorFlow', 'React', 'PostgreSQL', 'AWS'],
    Specializations: ['RAG Systems', 'Geospatial ML', 'Time Series', 'MLOps'],
    Languages: ['Indonesian (Native)', 'English (Proficient)'],
  };

  return (
    <section className="container-custom section-spacing">
      <div className="max-w-4xl mx-auto">
        <h1 className="heading-xl mb-12 dark:text-white">About</h1>

        <div className="space-y-8 body-lg text-gray-800 dark:text-gray-300">
          <p>
            I&apos;m Rahardi Salim, a Data Science &amp; AI Engineer currently pursuing Computer Science
            at the University of Indonesia with a focus on artificial intelligence and data science.
          </p>
          <p>
            My work centers on building intelligent systems that solve real-world problems — from
            RAG-powered financial tools to geospatial poverty prediction models. I specialize in
            machine learning, natural language processing, and computer vision, with production
            experience across the full ML lifecycle.
          </p>
          <p>
            I&apos;ve had the privilege of working with amazing teams at Simian Group, ETH Zürich, and
            RISTEK UI, while earning recognition at national competitions including GEMASTIK,
            GammaFest, and GDG Jakarta Hackathon.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-light mb-8 border-b border-black dark:border-gray-700 pb-4 dark:text-white">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-sm uppercase tracking-widest font-mono mb-4 dark:text-white">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
