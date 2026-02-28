import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { projects } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import ScrollReveal from "@/components/animations/ScrollReveal";

type Project = (typeof projects)[0];

const TiltCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setRotate({
      x: -((e.clientY - r.top) / r.height - 0.5) * 15,
      y: ((e.clientX - r.left) / r.width - 0.5) * 15,
    });
  };

  return (
    <div style={{ perspective: 1000 }} onClick={onClick} data-hoverable className="cursor-pointer">
      <motion.div
        className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-8 hover:border-primary/30 transition-colors"
        style={{ rotateX: rotate.x, rotateY: rotate.y, transformStyle: "preserve-3d" }}
        onMouseMove={onMove}
        onMouseLeave={() => setRotate({ x: 0, y: 0 })}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <h3 className="font-display text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.tagline}</p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((t) => (
            <Badge key={t} variant="outline" className="border-primary/30 text-primary text-xs">
              {t}
            </Badge>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
  <motion.div
    className="fixed inset-0 z-[80] flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className="max-w-3xl w-full max-h-[80vh] overflow-y-auto rounded-2xl border border-border bg-card p-8"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-start mb-6">
        <h2 className="font-display text-3xl font-bold">{project.title}</h2>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground" data-hoverable>
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.techStack.map((t) => (
          <Badge key={t} className="bg-primary/10 text-primary border-primary/20">
            {t}
          </Badge>
        ))}
      </div>

      {[
        { title: "Problem", content: project.problem },
        { title: "Solution", content: project.solution },
        { title: "Architecture", content: project.architecture },
        { title: "Tech Decisions", content: project.techDecisions },
        { title: "Challenges", content: project.challenges },
        { title: "Impact", content: project.impact },
      ].map((s) => (
        <div key={s.title} className="mb-6">
          <h3 className="font-display text-lg font-bold text-primary mb-2">{s.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{s.content}</p>
        </div>
      ))}

      <div className="mt-8 pt-6 border-t border-border">
        <h3 className="font-display text-lg font-bold text-primary mb-3">Resume Bullet Points</h3>
        <ul className="space-y-2">
          {project.resumeBullets.map((b, i) => (
            <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span> {b}
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
    <section id="projects" className="py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-center">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-center text-muted-foreground mb-16">Click a project to view the full case study</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.15}>
              <TiltCard project={p} onClick={() => setSelected(p)} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
