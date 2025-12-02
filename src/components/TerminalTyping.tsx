import { useState, useEffect } from 'react';

interface TerminalLine {
  content: React.ReactNode;
  delay: number;
}

export const TerminalTyping = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  const lines: TerminalLine[] = [
    { content: <span className="text-slate-500"># Initializing profile...</span>, delay: 0 },
    {
      content: (
        <>
          <span className="text-purple-400">const</span>{" "}
          <span className="text-blue-400">developer</span>{" "}
          <span className="text-slate-400">=</span>{" "}
          <span className="text-yellow-300">{"{"}</span>
        </>
      ),
      delay: 400
    },
    {
      content: (
        <span className="pl-4">
          <span className="text-slate-300">name:</span>{" "}
          <span className="text-green-400">"Nguyen Kim Dat"</span>
          <span className="text-slate-400">,</span>
        </span>
      ),
      delay: 600
    },
    {
      content: (
        <span className="pl-4">
          <span className="text-slate-300">location:</span>{" "}
          <span className="text-green-400">"Vietnam"</span>
          <span className="text-slate-400">,</span>
        </span>
      ),
      delay: 800
    },
    {
      content: (
        <span className="pl-4">
          <span className="text-slate-300">stack:</span>{" "}
          <span className="text-slate-400">[</span>
          <span className="text-green-400">"React"</span>
          <span className="text-slate-400">,</span>{" "}
          <span className="text-green-400">"Node"</span>
          <span className="text-slate-400">,</span>{" "}
          <span className="text-green-400">"AWS"</span>
          <span className="text-slate-400">],</span>
        </span>
      ),
      delay: 1000
    },
    {
      content: (
        <span className="pl-4">
          <span className="text-slate-300">experience:</span>{" "}
          <span className="text-orange-400">3</span>{" "}
          <span className="text-slate-500">// years</span>
        </span>
      ),
      delay: 1200
    },
    {
      content: (
        <>
          <span className="text-yellow-300">{"}"}</span>
          <span className="text-slate-400">;</span>
        </>
      ),
      delay: 1400
    },
    {
      content: <span className="text-slate-500 typing-cursor">_</span>,
      delay: 1600
    },
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    lines.forEach((line, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay);
      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-1.5">
      {lines.slice(0, visibleLines).map((line, index) => (
        <div
          key={index}
          className="animate-fade-in-line"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {line.content}
        </div>
      ))}
    </div>
  );
};
