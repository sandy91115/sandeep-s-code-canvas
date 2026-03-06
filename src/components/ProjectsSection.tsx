import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import ScrollReveal from "@/components/animations/ScrollReveal";

type Project = (typeof projects)[0];

const ProjectCard = ({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) => (
  <motion.div
    onClick={onClick}
    data-hoverable
    className="cursor-pointer rounded-2xl border border-border bg-card/30 p-8 hover:border-primary/20 transition-all duration-300 relative overflow-hidden group"
    whileHover={{ y: -4 }}
    transition={{ duration: 0.3 }}
  >
    <span className="absolute top-6 right-6 text-5xl font-display font-bold text-foreground/[0.03] select-none italic">
      {String(index + 1).padStart(2, '0')}
    </span>

    <div className="relative">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors italic">{project.title}</h3>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors mt-1 flex-shrink-0" />
      </div>
      <p className="text-muted-foreground text-sm mb-6 font-body leading-relaxed">{project.tagline}</p>
      <div className="flex flex-wrap gap-2">
        {project.techStack.map((t) => (
          <Badge key={t} variant="outline" className="border-border text-muted-foreground text-xs font-body font-normal rounded-full">
            {t}
          </Badge>
        ))}
      </div>
    </div>
  </motion.div>
);

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
  <motion.div
    className="fixed inset-0 z-[80] flex items-center justify-center bg-background/85 backdrop-blur-md p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className="max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-card p-8 md:p-10"
      initial={{ scale: 0.95, opacity: 0, y: 15 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 15 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2 font-body font-medium">Case Study</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold italic">{project.title}</h2>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted transition-colors" data-hoverable>
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.techStack.map((t) => (
          <Badge key={t} className="bg-primary/10 text-primary border-0 rounded-full font-body text-xs font-normal">
            {t}
          </Badge>
        ))}
      </div>

      {[
        { title: "Problem", content: project.problem },
        { title: "Solution", content: project.solution },
        { title: "Architecture", content: project.architecture },
        { title: "Technical Decisions", content: project.techDecisions },
        { title: "Challenges", content: project.challenges },
        { title: "Impact", content: project.impact },
      ].map((s) => (
        <div key={s.title} className="mb-7">
          <h3 className="text-sm font-body font-semibold text-primary mb-2 uppercase tracking-wider">{s.title}</h3>
          <p className="text-muted-foreground leading-relaxed text-sm font-body">{s.content}</p>
        </div>
      ))}

      <div className="mt-8 pt-6 border-t border-border">
        <h3 className="text-sm font-body font-semibold text-primary mb-4 uppercase tracking-wider">Resume Points</h3>
        <ul className="space-y-2.5">
          {project.resumeBullets.map((b, i) => (
            <li key={i} className="text-muted-foreground text-sm flex items-start gap-2.5 font-body">
              <span className="text-primary text-xs mt-1">●</span> {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  </motion.div>
);

const ProjectsSection = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-28 px-6 relative">
      <div className="mx-auto max-w-5xl relative">
        <ScrollReveal>
          <p className="text-sm tracking-[0.25em] uppercase text-primary font-body font-medium mb-4 text-center">
            Work
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center italic">
            Featured Projects
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-md mx-auto font-body text-sm">
            Click a project to view the engineering case study with architecture decisions and impact.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.1}>
              <ProjectCard project={p} onClick={() => setSelected(p)} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
