import { loadPortfolioData } from '@/lib/data';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';

export default async function CertificationsPage() {
  const { certifications } = await loadPortfolioData();

  return (
    <section className="container-custom section-spacing">
      <div className="mb-16">
        <h1 className="heading-xl mb-6 dark:text-white">Certifications</h1>
        <p className="body-lg text-gray-800 dark:text-gray-300 max-w-2xl">
          Professional certifications and specializations from industry-leading institutions.
        </p>
      </div>

      {certifications.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No certifications found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert) => (
            <Link
              key={cert.id}
              href={`/certifications/${cert.id}`}
              className="block group card-minimal p-8 hover:border-black dark:hover:border-white transition-all"
            >
              <p className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                {cert.issuer}
              </p>
              <h2 className="text-xl font-bold dark:text-white group-hover:underline mb-3">
                {cert.title}
              </h2>
              {cert.credentialId && (
                <Badge variant="outline">ID: {cert.credentialId}</Badge>
              )}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
