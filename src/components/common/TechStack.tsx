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
          className="inline-block px-3 py-1.5 text-[10px] font-mono border border-black dark:border-white uppercase tracking-widest dark:text-white"
        >
          {tech}
        </span>
      ))}
      {limit && technologies.length > limit && (
        <span className="inline-block px-3 py-1.5 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
          +{technologies.length - limit}
        </span>
      )}
    </div>
  );
}
