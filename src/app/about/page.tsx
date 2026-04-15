'use client';

import { Layout } from '@/components/layout/Layout';
import { Badge } from '@/components/common/Badge';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <Layout>
      <section className="container-custom section-spacing">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-xl mb-12 dark:text-white">About</h1>

            <div className="space-y-8 body-lg text-gray-800 dark:text-gray-300">
              <p>
              I&apos;m Rahardi Salim, a Data Science & AI Engineer currently pursuing Computer Science 
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

            {/* Technical Skills */}
            <div className="mt-16">
              <h2 className="text-2xl font-light mb-8 border-b border-black pb-4">
                Technical Skills
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm uppercase tracking-widest font-mono mb-4">Core</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Data Engineering'].map(skill => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-widest font-mono mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'PyTorch', 'TensorFlow', 'React', 'PostgreSQL', 'AWS'].map(skill => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-widest font-mono mb-4">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {['RAG Systems', 'Geospatial ML', 'Time Series', 'MLOps'].map(skill => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-widest font-mono mb-4">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Indonesian (Native)</Badge>
                    <Badge variant="outline">English (Proficient)</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mt-16">
              <h2 className="text-2xl font-light mb-8 border-b border-black pb-4">
                Education
              </h2>
              
              <div className="border border-black p-8">
                <h3 className="text-xl font-light mb-2">University of Indonesia</h3>
                <p className="text-sm font-mono text-gray-600 mb-4">
                  Bachelor of Computer Science • Expected August 2027
                </p>
                <p className="text-sm mb-2">
                  <strong>GPA:</strong> 3.63/4.0
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Relevant Coursework:</strong> Artificial Intelligence & Data Science, 
                  Advanced Programming, Database Systems, Platform-Based Programming
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-16">
              <h2 className="text-2xl font-light mb-8 border-b border-black pb-4">
                Get in Touch
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="font-mono uppercase tracking-widest mb-2 text-xs text-gray-600">Email</p>
                  <p>
                    <a href="mailto:rahardisalim23@gmail.com" className="link-underline">
                      rahardisalim23@gmail.com
                    </a>
                  </p>
                </div>

                <div>
                  <p className="font-mono uppercase tracking-widest mb-2 text-xs text-gray-600">Phone</p>
                  <p>
                    <a href="tel:+6281364134638" className="link-underline">
                      +62 813-6413-4638
                    </a>
                  </p>
                </div>

                <div>
                  <p className="font-mono uppercase tracking-widest mb-2 text-xs text-gray-600">GitHub</p>
                  <p>
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="link-underline">
                      github.com/yourusername
                    </a>
                  </p>
                </div>

                <div>
                  <p className="font-mono uppercase tracking-widest mb-2 text-xs text-gray-600">LinkedIn</p>
                  <p>
                    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="link-underline">
                      linkedin.com/in/yourusername
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
