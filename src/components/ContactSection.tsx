import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, MapPin, Terminal } from "lucide-react";
import { socialLinks, personalInfo } from "@/data/portfolio";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { useToast } from "@/hooks/use-toast";

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
  about: {
    description: "Show info about me",
    action: () => `Name: ${personalInfo.name}\nRole: ${personalInfo.role}\nLocation: ${personalInfo.location}\nEmail: ${personalInfo.email}`,
  },
  skills: {
    description: "Navigate to skills section",
    action: () => {
      setTimeout(() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }), 300);
      return "Navigating to Skills section...";
    },
  },
  projects: {
    description: "Navigate to projects section",
    action: () => {
      setTimeout(() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }), 300);
      return "Navigating to Projects section...";
    },
  },
  experience: {
    description: "Navigate to experience section",
    action: () => {
      setTimeout(() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }), 300);
      return "Navigating to Experience section...";
    },
  },
  home: {
    description: "Go back to top",
    action: () => {
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 300);
      return "Navigating to top...";
    },
  },
  github: {
    description: "Open GitHub profile",
    action: () => {
      setTimeout(() => window.open(socialLinks.find(l => l.name === "GitHub")?.url, "_blank"), 300);
      return "Opening GitHub...";
    },
  },
  linkedin: {
    description: "Open LinkedIn profile",
    action: () => {
      setTimeout(() => window.open(socialLinks.find(l => l.name === "LinkedIn")?.url, "_blank"), 300);
      return "Opening LinkedIn...";
    },
  },
  email: {
    description: "Send me an email",
    action: () => {
      setTimeout(() => window.open(`mailto:${personalInfo.email}`, "_blank"), 300);
      return `Opening mail client for ${personalInfo.email}...`;
    },
  },
  clear: {
    description: "Clear terminal",
    action: () => "__CLEAR__",
  },
  whoami: {
    description: "Who are you?",
    action: () => "visitor@sandeep-portfolio ~ You're a curious explorer! 🚀",
  },
  date: {
    description: "Show current date",
    action: () => new Date().toLocaleString(),
  },
};

interface TerminalLine {
  type: "input" | "output" | "system";
  content: string;
}

const ContactTerminal = () => {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "system", content: "Welcome to Sandeep's Terminal v2.0" },
    { type: "system", content: 'Type "help" for available commands.' },
    { type: "system", content: "" },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const [command, ...args] = trimmed.split(" ");

    setLines((prev) => [...prev, { type: "input", content: cmd }]);
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    if (!command) return;

    if (command.startsWith("send ")) {
      const message = cmd.slice(5).trim();
      if (message) {
        setLines((prev) => [...prev, { type: "output", content: `Message received: "${message}"\nThanks! I'll get back to you soon. 📨` }]);
        return;
      }
    }

    if (COMMANDS[command]) {
      const result = COMMANDS[command].action(args);
      if (result === "__CLEAR__") {
        setLines([{ type: "system", content: "Terminal cleared." }]);
      } else {
        setLines((prev) => [...prev, { type: "output", content: result }]);
      }
    } else {
      setLines((prev) => [
        ...prev,
        { type: "output", content: `Command not found: ${command}\nType "help" for available commands.` },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  return (
    <div
      className="rounded-xl border border-border bg-background/90 backdrop-blur-xl overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal header bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-card/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-primary/40" />
          <div className="w-3 h-3 rounded-full bg-primary/60" />
        </div>
        <div className="flex items-center gap-2 ml-3">
          <Terminal className="h-3.5 w-3.5 text-primary/60" />
          <span className="text-xs text-muted-foreground font-mono">sandeep@portfolio:~</span>
        </div>
      </div>

      {/* Terminal body */}
      <div
        ref={terminalRef}
        className="h-72 overflow-y-auto p-4 font-mono text-sm space-y-1"
      >
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line.type === "input" && (
              <span>
                <span className="text-primary">visitor</span>
                <span className="text-muted-foreground">@</span>
                <span className="text-primary/70">portfolio</span>
                <span className="text-muted-foreground"> ~ $ </span>
                <span className="text-foreground">{line.content}</span>
              </span>
            )}
            {line.type === "output" && (
              <span className="text-muted-foreground">{line.content}</span>
            )}
            {line.type === "system" && (
              <span className="text-primary/50">{line.content}</span>
            )}
          </div>
        ))}

        {/* Active input line */}
        <div className="flex items-center">
          <span className="text-primary">visitor</span>
          <span className="text-muted-foreground">@</span>
          <span className="text-primary/70">portfolio</span>
          <span className="text-muted-foreground"> ~ $ </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-foreground caret-primary font-mono text-sm"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
          <span className="animate-pulse text-primary">█</span>
        </div>
      </div>
    </div>
  );
};

const ContactSection = () => {
  const { toast } = useToast();

  return (
    <section id="contact" className="py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="text-center mb-4">
            <span className="text-xs uppercase tracking-[0.3em] text-primary/60 font-mono">[ COMMS.CHANNEL ]</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-center">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-xl mx-auto">
            Use the terminal below to navigate, explore, or send me a message. Type <span className="text-primary font-mono">help</span> to start.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid md:grid-cols-5 gap-8">
            {/* Terminal - takes 3 cols */}
            <div className="md:col-span-3">
              <ContactTerminal />
            </div>

            {/* Info panel - takes 2 cols */}
            <div className="md:col-span-2 space-y-6">
              <div className="rounded-xl border border-border bg-card/30 backdrop-blur-xl p-6">
                <h3 className="font-display text-xl font-bold mb-4">Quick Links</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-sm">{personalInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">{personalInfo.location}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  {socialLinks.map((link) => {
                    const Icon = iconMap[link.icon] || Mail;
                    return (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-hoverable
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:border-primary/50 hover:text-primary text-muted-foreground transition-all"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Icon className="h-4 w-4" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Terminal commands cheat sheet */}
              <div className="rounded-xl border border-border bg-card/30 backdrop-blur-xl p-6">
                <h3 className="font-display text-sm font-bold text-primary mb-3">Quick Commands</h3>
                <div className="space-y-2 font-mono text-xs">
                  {["help", "about", "skills", "projects", "github", "email"].map((cmd) => (
                    <div key={cmd} className="flex items-center gap-2">
                      <span className="text-primary/60">$</span>
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
};

export default ContactSection;
