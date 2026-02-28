import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, MapPin } from "lucide-react";
import { socialLinks, personalInfo } from "@/data/portfolio";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const iconMap: Record<string, React.ElementType> = { Github, Linkedin, Twitter, Mail };

const ContactSection = () => {
  const { toast } = useToast();
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
  };

  const focusClass = (field: string) =>
    focused === field ? "border-primary shadow-[0_0_15px_hsl(30_100%_60%/0.2)]" : "";

  return (
    <section id="contact" className="py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-16 text-center">
            Get In <span className="text-primary">Touch</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-2xl border border-border bg-card/30 backdrop-blur-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-display text-2xl font-bold mb-4">Let's Connect</h3>
                <p className="text-muted-foreground mb-8">
                  Have a project in mind or want to collaborate? I'd love to hear from you.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>{personalInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>{personalInfo.location}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  {socialLinks.map((link) => {
                    const Icon = iconMap[link.icon] || Mail;
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-hoverable
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:border-primary/50 hover:text-primary transition-all"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Your Name"
                  className={`bg-background/50 border-border transition-all ${focusClass("name")}`}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  className={`bg-background/50 border-border transition-all ${focusClass("email")}`}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                />
                <Textarea
                  placeholder="Your Message"
                  rows={4}
                  className={`bg-background/50 border-border transition-all ${focusClass("message")}`}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                />
                <motion.button
                  type="submit"
                  data-hoverable
                  className="w-full rounded-lg bg-primary px-6 py-3 font-display font-bold text-primary-foreground hover:shadow-[0_0_30px_hsl(30_100%_60%/0.4)] transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
