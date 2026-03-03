import { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { typewriterStrings } from "@/data/portfolio";
import * as THREE from "three";

function GlassSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={2.2}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial color="#00ff41" transparent opacity={0.2} distort={0.35} speed={2} roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh scale={2.6}>
        <sphereGeometry args={[1, 20, 20]} />
        <meshBasicMaterial color="#00ff41" transparent opacity={0.04} wireframe />
      </mesh>
    </Float>
  );
}

function Particles() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => { const arr = new Float32Array(300 * 3); for (let i = 0; i < 300 * 3; i++) arr[i] = (Math.random() - 0.5) * 15; return arr; }, []);
  useFrame((state) => { if (points.current) points.current.rotation.y = state.clock.elapsedTime * 0.03; });

  return (
    <points ref={points}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={300} array={positions} itemSize={3} /></bufferGeometry>
      <pointsMaterial size={0.02} color="#00ff41" transparent opacity={0.5} sizeAttenuation />
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
        if (text.length === full.length) setTimeout(() => setDeleting(true), 1500);
      } else {
        setText(full.slice(0, text.length - 1));
        if (text.length === 0) { setDeleting(false); setCurrentIndex((p) => (p + 1) % typewriterStrings.length); }
      }
    }, deleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [text, deleting, currentIndex]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00ff41" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00aa2a" />
          <Suspense fallback={null}>
            <GlassSphere />
            <Particles />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-4">
          <span className="text-xs uppercase tracking-[0.3em] text-primary/60 font-mono">[ SYSTEM ONLINE ]</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight">
          Backend Engineer
          <br />
          <span className="text-primary">Crafting Scalable Systems</span>
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="h-8 mb-8">
          <span className="font-mono text-xl text-muted-foreground">
            {"$ "}
            <span className="text-primary">{text}</span>
            <span className="animate-pulse text-primary">_</span>
          </span>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto font-body">
          Sandeep Chaudhary — Building robust backend systems with Java, Spring Boot & modern cloud infrastructure
        </motion.p>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <ChevronDown className="h-6 w-6 text-primary" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
