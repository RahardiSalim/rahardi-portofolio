'use client';

import { Layout } from '@/components/layout/Layout';
import { Badge } from '@/components/common/Badge';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Activity, Certification } from '@/types/portfolio.types';

export default function AboutPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/portfolio');
        const data = await response.json();
        setActivities(data.activities || []);
        setCertifications(data.certifications || []);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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
              <h2 className="text-2xl font-light mb-8 border-b border-black dark:border-gray-700 pb-4 dark:text-white">
                Technical Skills
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm uppercase tracking-widest font-mono mb-4 dark:text-white">Core</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Data Engineering'].map(skill => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-widest font-mono mb-4 dark:text-white">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'PyTorch', 'TensorFlow', 'React', 'PostgreSQL', 'AWS'].map(skill => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-widest font-mono mb-4 dark:text-white">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {['RAG Systems', 'Geospatial ML', 'Time Series', 'MLOps'].map(skill => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-widest font-mono mb-4 dark:text-white">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Indonesian (Native)</Badge>
                    <Badge variant="outline">English (Proficient)</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mt-16">
              <h2 className="text-2xl font-light mb-8 border-b border-black dark:border-gray-700 pb-4 dark:text-white">
                Education
              </h2>
              
              <div className="border border-black dark:border-gray-700 p-8 dark:bg-gray-800">
                <h3 className="text-xl font-light mb-2 dark:text-white">University of Indonesia</h3>
                <p className="text-sm font-mono text-gray-600 dark:text-gray-400 mb-4">
                  Bachelor of Computer Science • Expected August 2027
                </p>
                <p className="text-sm mb-2 dark:text-gray-300">
                  <strong>GPA:</strong> 3.63/4.0
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Relevant Coursework:</strong> Artificial Intelligence & Data Science, 
                  Advanced Programming, Database Systems, Platform-Based Programming
                </p>
              </div>
            </div>

            {/* Activities Section */}
            {!loading && activities.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-light mb-8 border-b border-black dark:border-gray-700 pb-4 dark:text-white">
                  Activities & Leadership
                </h2>
                <div className="space-y-6">
                  {activities.map((activity) => (
                    <div key={activity.id} className="border border-black dark:border-gray-700 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-light dark:text-white">{activity.role}</h3>
                        <span className="text-xs font-mono text-gray-500">{activity.date}</span>
                      </div>
                      <p className="text-sm font-mono text-gray-600 dark:text-gray-400 mb-4">{activity.organization}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{activity.shortDescription}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications Section */}
            {!loading && certifications.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-light mb-8 border-b border-black dark:border-gray-700 pb-4 dark:text-white">
                  Certifications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="border border-black dark:border-gray-700 p-6 flex items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-light dark:text-white leading-tight mb-1">{cert.title}</h3>
                        <p className="text-xs font-mono text-gray-500 mb-2">{cert.issuer} • {cert.date}</p>
                        {cert.credentialId && (
                          <p className="text-[10px] font-mono text-gray-400">ID: {cert.credentialId}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact */}
            <div className="mt-16">
              <h2 className="text-2xl font-light mb-8 border-b border-black dark:border-gray-700 pb-4 dark:text-white">
                Get in Touch
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="font-mono uppercase tracking-widest mb-2 text-xs text-gray-600 dark:text-gray-400">Email</p>
                  <p>
                    <a href="mailto:rahardisalim23@gmail.com" className="link-underline">
                      rahardisalim23@gmail.com
                    </a>
                  </p>
                </div>

                <div>
                  <p className="font-mono uppercase tracking-widest mb-2 text-xs text-gray-600 dark:text-gray-400">Phone</p>
                  <p>
                    <a href="tel:+6281364134638" className="link-underline">
                      +62 813-6413-4638
                    </a>
                  </p>
                </div>

                <div>
                  <p className="font-mono uppercase tracking-widest mb-2 text-xs text-gray-600 dark:text-gray-400">GitHub</p>
                  <p>
                    <a href="https://github.com/RahardiSalim" target="_blank" rel="noopener noreferrer" className="link-underline">
                      github.com/RahardiSalim
                    </a>
                  </p>
                </div>

                <div>
                  <p className="font-mono uppercase tracking-widest mb-2 text-xs text-gray-600 dark:text-gray-400">LinkedIn</p>
                  <p>
                    <a href="https://www.linkedin.com/in/rahardi-salim" target="_blank" rel="noopener noreferrer" className="link-underline">
                      linkedin.com/in/rahardi-salim
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
