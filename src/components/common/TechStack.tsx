interface TechStackProps {
  technologies: string[];
  limit?: number;
}

export function TechStack({ technologies, limit }: TechStackProps) {
  const displayTech = limit ? technologies.slice(0, limit) : technologies;
  
  return (
    <div className="flex flex-wrap gap-2">
      {displayTech.map((tech, index) => (
        <span
          key={index}
          className="inline-block px-2 py-1 text-xs font-mono border border-gray-300"
        >
          {tech}
        </span>
      ))}
      {limit && technologies.length > limit && (
        <span className="inline-block px-2 py-1 text-xs font-mono text-gray-500">
          +{technologies.length - limit}
        </span>
      )}
    </div>
  );
}
