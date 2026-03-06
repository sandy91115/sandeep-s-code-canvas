import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, MapPin, Terminal } from "lucide-react";
import { socialLinks, personalInfo } from "@/data/portfolio";
import ScrollReveal from "@/components/animations/ScrollReveal";

const iconMap: Record<string, React.ElementType> = { Github, Linkedin, Twitter, Mail };

const COMMANDS: Record<string, { description: string; action: (args: string[]) => string }> = {
  help: {
    description: "Show available commands",
    action: () => {
      const cmds = Object.entries(COMMANDS)
        .map(([name, { description }]) => `  ${name.padEnd(14)} — ${description}`)
        .join("\n");
      return `Available commands:\n${cmds}`;
    },
  },
  about: { description: "About me", action: () => `${personalInfo.name}\n${personalInfo.role} · ${personalInfo.location}\n${personalInfo.email}` },
  skills: { description: "Go to skills", action: () => { setTimeout(() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }), 300); return "→ Skills"; } },
  projects: { description: "Go to projects", action: () => { setTimeout(() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }), 300); return "→ Projects"; } },
  experience: { description: "Go to experience", action: () => { setTimeout(() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }), 300); return "→ Experience"; } },
  github: { description: "Open GitHub", action: () => { setTimeout(() => window.open(socialLinks.find(l => l.name === "GitHub")?.url, "_blank"), 300); return "Opening GitHub..."; } },
  linkedin: { description: "Open LinkedIn", action: () => { setTimeout(() => window.open(socialLinks.find(l => l.name === "LinkedIn")?.url, "_blank"), 300); return "Opening LinkedIn..."; } },
  email: { description: "Send email", action: () => { setTimeout(() => window.open(`mailto:${personalInfo.email}`, "_blank"), 300); return `Opening mail client...`; } },
  clear: { description: "Clear terminal", action: () => "__CLEAR__" },
};

interface TerminalLine { type: "input" | "output" | "system"; content: string; }

const ContactTerminal = () => {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "system", content: 'Type "help" for commands.' },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const [command] = trimmed.split(" ");
    setLines((prev) => [...prev, { type: "input", content: cmd }]);
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    if (!command) return;
    if (COMMANDS[command]) {
      const result = COMMANDS[command].action([]);
      if (result === "__CLEAR__") setLines([]);
      else setLines((prev) => [...prev, { type: "output", content: result }]);
    } else {
      setLines((prev) => [...prev, { type: "output", content: `Unknown: ${command}. Try "help".` }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { handleCommand(input); setInput(""); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const idx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(idx); setInput(history[idx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const idx = historyIndex + 1;
        if (idx >= history.length) { setHistoryIndex(-1); setInput(""); }
        else { setHistoryIndex(idx); setInput(history[idx]); }
      }
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card/30 overflow-hidden" onClick={() => inputRef.current?.focus()}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
        </div>
        <span className="text-xs text-muted-foreground font-mono ml-2">terminal</span>
      </div>

      <div ref={terminalRef} className="h-64 overflow-y-auto p-4 font-mono text-xs space-y-1">
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line.type === "input" && (
              <span>
                <span className="text-primary">~</span>
                <span className="text-muted-foreground"> $ </span>
                <span className="text-foreground">{line.content}</span>
              </span>
            )}
            {line.type === "output" && <span className="text-muted-foreground">{line.content}</span>}
            {line.type === "system" && <span className="text-muted-foreground/60">{line.content}</span>}
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-primary">~</span>
          <span className="text-muted-foreground"> $ </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-foreground caret-primary font-mono text-xs"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

const ContactSection = () => (
  <section id="contact" className="py-28 px-6">
    <div className="mx-auto max-w-4xl">
      <ScrollReveal>
        <p className="text-sm tracking-[0.25em] uppercase text-primary font-body font-medium mb-4 text-center">
          Connect
        </p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center italic">
          Get In Touch
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-md mx-auto font-body text-sm">
          Interested in working together? Use the terminal or reach out directly.
        </p>
      </ScrollReveal>

      <ScrollReveal>
        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-3">
            <ContactTerminal />
          </div>

          <div className="md:col-span-2 space-y-5">
            <div className="rounded-2xl border border-border bg-card/20 p-6">
              <h3 className="font-body font-semibold text-sm mb-5">Direct Contact</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm font-body">{personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-body">{personalInfo.location}</span>
                </div>
              </div>
              <div className="flex gap-2.5">
                {socialLinks.map((link) => {
                  const Icon = iconMap[link.icon] || Mail;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-hoverable
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:border-primary/30 hover:text-primary text-muted-foreground transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card/20 p-6">
              <h3 className="font-body font-semibold text-sm text-primary mb-3">Quick Commands</h3>
              <div className="space-y-2 font-mono text-xs">
                {["help", "about", "skills", "projects", "github"].map((cmd) => (
                  <div key={cmd} className="flex items-center gap-2">
                    <span className="text-muted-foreground/40">$</span>
                    <span className="text-muted-foreground">{cmd}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default ContactSection;
