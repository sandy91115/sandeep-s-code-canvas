import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from "lucide-react";
import { socialLinks } from "@/data/portfolio";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ElementType> = { Github, Linkedin, Twitter, Mail };

const Footer = () => (
  <footer className="border-t border-border py-12 px-6 relative">
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <span className="font-display text-2xl font-bold text-primary">SC</span>
          <div className="h-6 w-px bg-border" />
          <p className="text-sm text-muted-foreground">Backend Engineer • Building Scalable Systems</p>
        </div>

        <div className="flex items-center gap-4">
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
                whileHover={{ y: -2, scale: 1.05 }}
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            );
          })}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          © {new Date().getFullYear()} Sandeep Chaudhary. Built with <Heart className="h-3 w-3 text-primary" /> and clean code.
        </p>
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-hoverable
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
          whileHover={{ y: -2 }}
        >
          Back to top <ArrowUp className="h-3 w-3" />
        </motion.button>
      </div>
    </div>
  </footer>
);

export default Footer;
