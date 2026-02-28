import { stats } from "@/data/portfolio";
import ScrollReveal from "@/components/animations/ScrollReveal";

const AboutSection = () => (
  <section id="about" className="py-32 px-6">
    <div className="mx-auto max-w-6xl">
      <ScrollReveal>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-16 text-center">
          About <span className="text-primary">Me</span>
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-16 items-center">
        <ScrollReveal direction="left">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a Backend Software Engineer passionate about building scalable, efficient systems. With a B.Tech in
              Computer Science (2024), I specialize in the Java and Spring Boot ecosystem.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I focus on designing clean APIs, optimizing database performance, and implementing robust architectural
              patterns that stand the test of production traffic.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 text-center hover:border-primary/50 transition-all hover:shadow-[0_0_20px_hsl(30_100%_60%/0.1)]">
                <div className="font-display text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
