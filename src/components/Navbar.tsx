import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = ["About", "Skills", "Experience", "Projects", "Contact"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border/50" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-2xl font-bold text-foreground italic"
          data-hoverable
        >
          S<span className="text-primary">.</span>
        </button>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase().replace(/\s+/g, "-"))}
              data-hoverable
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 font-body font-medium"
            >
              {item}
            </button>
          ))}
          <a
            href="/resume.pdf"
            download="Sandeep_Chaudhary_Resume.pdf"
            data-hoverable
            className="text-sm font-medium text-primary-foreground bg-primary px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Resume
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)} data-hoverable>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/98 backdrop-blur-xl border-b border-border/50"
          >
            <div className="px-6 py-6 space-y-5">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase().replace(/\s+/g, "-"))}
                  className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors font-body"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
