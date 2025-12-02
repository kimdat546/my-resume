import { useState, useRef, useEffect } from "react";
import { EXPERIENCES, FREELANCE_PROJECTS, SKILL_CATEGORIES } from "./constants";
import { SkillBadge } from "./components/SkillBadge";
import {
  ChatInterface,
  type ChatInterfaceRef,
} from "./components/ChatInterface";
import { TerminalTyping } from "./components/TerminalTyping";
import { BackToTop } from "./components/BackToTop";

type TabType = "about" | "projects" | "chat";
const TAB_STORAGE_KEY = "active_tab";
const VALID_TABS: TabType[] = ["about", "projects", "chat"];

// Get initial tab from URL query string or localStorage
const getInitialTab = (): TabType => {
  // First check URL query string
  const params = new URLSearchParams(window.location.search);
  const tabParam = params.get("tab") as TabType | null;
  if (tabParam && VALID_TABS.includes(tabParam)) {
    return tabParam;
  }

  // Then check localStorage
  const savedTab = localStorage.getItem(TAB_STORAGE_KEY) as TabType | null;
  if (savedTab && VALID_TABS.includes(savedTab)) {
    return savedTab;
  }

  return "about";
};

function App() {
  const [activeTab, setActiveTab] = useState<TabType>(getInitialTab);
  const chatRef = useRef<ChatInterfaceRef>(null);

  // Update URL and localStorage when tab changes
  useEffect(() => {
    // Update localStorage
    localStorage.setItem(TAB_STORAGE_KEY, activeTab);

    // Update URL query string without reload
    const url = new URL(window.location.href);
    url.searchParams.set("tab", activeTab);
    window.history.replaceState({}, "", url.toString());
  }, [activeTab]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dark text-slate-300 font-sans selection:bg-blue-500/30 scroll-smooth">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-dark/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div
              className="shrink-0 cursor-pointer"
              onClick={() => handleTabChange("about")}
            >
              <span className="font-mono text-xl font-bold text-white">
                <span className="text-blue-500">&lt;</span>Dat
                <span className="text-blue-500">/&gt;</span>
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {(["about", "projects", "chat"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      activeTab === tab
                        ? "text-blue-400 bg-slate-800 border-b-2 border-blue-400"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            {/* Mobile menu button placeholder - simplified for this snippet */}
            <div className="md:hidden flex">
              <button
                onClick={() => handleTabChange("chat")}
                className="p-2 text-blue-400"
              >
                <span className="sr-only">Chat</span>
                💬
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "about" && (
          <div className="space-y-12 animate-fade-in">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-6">
                <div className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20">
                  Fullstack Engineer
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                  Nguyen Kim Dat
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                  Passionate developer with 3+ years specializing in{" "}
                  <span className="text-blue-400">React.js</span>,{" "}
                  <span className="text-green-400">Node.js</span>, and AWS.
                  Building scalable solutions from Australia to Korea.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => handleTabChange("chat")}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-900/20 flex items-center gap-2 hover:scale-105"
                  >
                    <span>Ask AI about me</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </button>
                  <a
                    href="https://linkedin.com/in/kimdat546"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-all duration-300 border border-slate-700 flex items-center gap-2 hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Contact Me
                  </a>
                  <a
                    href="/resume.pdf"
                    download="Nguyen_Kim_Dat_Resume.pdf"
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 border border-green-500 flex items-center gap-2 hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Resume
                  </a>
                </div>
              </div>

              {/* Stats / Terminal Visual */}
              <div className="w-full md:w-1/3 relative group">
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-glow"></div>

                <div className="relative bg-slate-900 rounded-xl border border-slate-700/50 p-6 font-mono text-sm shadow-2xl backdrop-blur-sm">
                  {/* Window controls */}
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                  </div>

                  {/* Code content with typing animation */}
                  <TerminalTyping />
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-1 bg-blue-500 rounded-full mr-3"></span>
                Technical Arsenal
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SKILL_CATEGORIES.map((category) => (
                  <div
                    key={category.name}
                    className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-[1.02]"
                  >
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      {category.icon === "monitor" && (
                        <svg
                          className="w-5 h-5 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                      {category.icon === "server" && (
                        <svg
                          className="w-5 h-5 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                          />
                        </svg>
                      )}
                      {category.icon === "cloud" && (
                        <svg
                          className="w-5 h-5 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                          />
                        </svg>
                      )}
                      {category.icon === "database" && (
                        <svg
                          className="w-5 h-5 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                          />
                        </svg>
                      )}
                      {category.name}
                    </h3>
                    <div className="flex flex-wrap">
                      {category.skills.map((skill) => (
                        <SkillBadge key={skill} skill={skill} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-1 bg-green-500 rounded-full mr-3"></span>
                Work Experience
              </h2>
              <div className="relative border-l-2 border-slate-800 ml-3 space-y-12">
                {EXPERIENCES.map((exp, idx) => (
                  <div key={idx} className="relative pl-8 group">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-800 border-2 border-blue-500 group-hover:bg-blue-500 transition-colors"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {exp.title}
                      </h3>
                      <span className="text-sm text-slate-400 font-mono bg-slate-800 px-2 py-1 rounded">
                        {exp.period}
                      </span>
                    </div>
                    <div className="text-blue-400 font-medium mb-2">
                      {exp.company}{" "}
                      <span className="text-slate-500">• {exp.location}</span>
                    </div>
                    <p className="text-slate-300 mb-4">{exp.description}</p>
                    <div className="mb-3">
                      {exp.responsibilities.slice(0, 3).map((resp, i) => (
                        <div
                          key={i}
                          className="flex items-start mb-1 text-sm text-slate-400"
                        >
                          <span className="mr-2 mt-1.5 w-1 h-1 bg-slate-500 rounded-full shrink-0"></span>
                          {resp}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs text-slate-500 border border-slate-800 px-2 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Featured Projects
              </h2>
              <p className="text-slate-400">
                A selection of commercial and freelance projects delivering real
                value to businesses in Korea, Australia, and Singapore.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                ...EXPERIENCES.filter((e) => e.type !== "Internal tool"),
                ...FREELANCE_PROJECTS,
              ].map((project, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/30 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
                >
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {"name" in project ? project.name : project.title}
                      </h3>
                      <span className="text-xs font-mono text-green-400 bg-green-400/10 px-2 py-1 rounded border border-green-400/20">
                        {project.type}
                      </span>
                    </div>
                    <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-medium text-blue-300 bg-blue-900/20 px-2.5 py-1 rounded border border-blue-500/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-800/80 px-6 py-3 border-t border-slate-700 flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-mono">
                      {"role" in project ? project.role : project.title}
                    </span>
                    <span className="text-xs text-slate-500">
                      {"period" in project ? project.period : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "chat" && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Chat with My AI Agent
              </h2>
              <p className="text-slate-400">
                Powered by{" "}
                <span className="text-purple-400 font-semibold">
                  Gemini 2.5 Pro
                </span>
                . Ask about my coding style, architectural decisions, or complex
                problem-solving.
              </p>
            </div>
            <ChatInterface ref={chatRef} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                "What is your experience with AWS Lambda?",
                "How did you handle 1000 concurrent users?",
                "Explain your background with React and Next.js",
              ].map((question, i) => (
                <button
                  key={i}
                  className="text-sm text-slate-400 bg-slate-800 p-3 rounded border border-slate-700 hover:bg-slate-700 hover:text-white transition-colors text-left group"
                  onClick={() => {
                    chatRef.current?.sendMessage(question);
                  }}
                >
                  <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity mr-1">
                    →
                  </span>
                  "{question}"
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Nguyen Kim Dat. Built with React,
            Tailwind & Gemini API.
          </p>
        </div>
      </footer>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}

export default App;
