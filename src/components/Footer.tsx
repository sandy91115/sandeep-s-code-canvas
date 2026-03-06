import { Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";
import { socialLinks } from "@/data/portfolio";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ElementType> = { Github, Linkedin, Twitter, Mail };

const Footer = () => (
  <footer className="border-t border-border py-10 px-6">
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <span className="font-display text-xl font-bold text-foreground italic">S<span className="text-primary">.</span></span>
          <div className="h-4 w-px bg-border" />
          <p className="text-xs text-muted-foreground font-body">Backend Engineer</p>
        </div>

        <div className="flex items-center gap-3">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon] || Mail;
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                data-hoverable
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:border-primary/30 hover:text-primary text-muted-foreground transition-all duration-300"
                whileHover={{ y: -2 }}
              >
                <Icon className="h-3.5 w-3.5" />
              </motion.a>
            );
          })}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground/60 font-body">
          © {new Date().getFullYear()} Sandeep Chaudhary
        </p>
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-hoverable
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-body"
          whileHover={{ y: -2 }}
        >
          Back to top <ArrowUp className="h-3 w-3" />
        </motion.button>
      </div>
    </div>
  </footer>
);

export default Footer;
