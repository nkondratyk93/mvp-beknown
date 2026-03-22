'use client';

import { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  level: string;
  evidence: string;
}

export default function ProfileSkills({
  skills,
  levelColors,
  levelWidths,
}: {
  skills: Skill[];
  levelColors: Record<string, string>;
  levelWidths: Record<string, number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-4">
      {skills.map((skill, i) => (
        <div key={i}>
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium">{skill.name}</span>
            <span
              className="text-xs px-2 py-0.5 rounded font-medium"
              style={{ backgroundColor: levelColors[skill.level] || '#71717A', color: '#0A0A0B' }}
            >
              {skill.level}
            </span>
          </div>
          <div className="w-full h-2 bg-[#27272A] rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full skill-bar"
              style={{
                width: visible ? `${levelWidths[skill.level] || 25}%` : '0%',
                backgroundColor: levelColors[skill.level] || '#71717A',
                transitionDelay: `${i * 100}ms`,
              }}
            />
          </div>
          <p className="font-mono text-xs text-[#71717A]">{skill.evidence}</p>
        </div>
      ))}
    </div>
  );
}
