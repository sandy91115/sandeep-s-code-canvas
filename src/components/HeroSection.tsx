import { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { typewriterStrings } from "@/data/portfolio";
import * as THREE from "three";

function GlassSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={2.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial color="#C9982E" transparent opacity={0.08} distort={0.25} speed={1.5} roughness={0.2} metalness={0.95} />
      </mesh>
      <mesh scale={3}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color="#C9982E" transparent opacity={0.02} wireframe />
      </mesh>
    </Float>
  );
}

function Particles() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(150 * 3);
    for (let i = 0; i < 150 * 3; i++) arr[i] = (Math.random() - 0.5) * 18;
    return arr;
  }, []);
  useFrame((state) => {
    if (points.current) points.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={150} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#C9982E" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = typewriterStrings[currentIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(full.slice(0, text.length + 1));
        if (text.length === full.length) setTimeout(() => setDeleting(true), 2000);
      } else {
        setText(full.slice(0, text.length - 1));
        if (text.length === 0) { setDeleting(false); setCurrentIndex((p) => (p + 1) % typewriterStrings.length); }
      }
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [text, deleting, currentIndex]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.15} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#C9982E" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8B6914" />
          <Suspense fallback={null}>
            <GlassSphere />
            <Particles />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background z-[2]" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-body font-medium mb-6"
        >
          Backend Software Engineer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 leading-[1.05] italic"
        >
          Crafting Scalable
          <br />
          <span className="text-primary">Systems</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="h-7 mb-10"
        >
          <span className="font-mono text-base text-muted-foreground">
            {text}
            <span className="text-primary animate-pulse">|</span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-muted-foreground text-lg mb-14 max-w-lg mx-auto font-body leading-relaxed"
        >
          Building robust backend systems with Java, Spring Boot & modern cloud infrastructure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="flex items-center justify-center gap-5"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            data-hoverable
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-body font-medium text-sm text-primary-foreground bg-primary hover:opacity-90 transition-opacity"
          >
            Get In Touch
          </a>
          <a
            href="/resume.pdf"
            download="Sandeep_Chaudhary_Resume.pdf"
            data-hoverable
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-body font-medium text-sm text-foreground border border-border hover:border-primary/40 transition-colors"
          >
            Download CV
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-5 w-5 text-muted-foreground" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
