import React from 'react';

interface SkillBadgeProps {
  skill: string;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ skill }) => {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded font-medium bg-slate-800 text-cyan-400 border border-slate-700 text-xs mr-2 mb-2 font-mono shadow-sm hover:bg-slate-700 transition-colors">
      {skill}
    </span>
  );
};