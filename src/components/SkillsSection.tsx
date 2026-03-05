import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { skills } from "@/data/portfolio";
import ScrollReveal from "@/components/animations/ScrollReveal";
import * as THREE from "three";

function ConnectionLines({ positions }: { positions: [number, number, number][] }) {
  const linesRef = useRef<THREE.Group>(null);
  const lineGeometries = useMemo(() => {
    const lines: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dist = new THREE.Vector3(...positions[i]).distanceTo(new THREE.Vector3(...positions[j]));
        if (dist < 3.5) {
          lines.push({ start: new THREE.Vector3(...positions[i]), end: new THREE.Vector3(...positions[j]) });
        }
      }
    }
    return lines;
  }, [positions]);

  return (
    <group ref={linesRef}>
      {lineGeometries.map((line, i) => {
        const points = [line.start, line.end];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <primitive key={i} object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: "#00a0cc", transparent: true, opacity: 0.1 }))} />
        );
      })}
    </group>
  );
}

function SkillNode({ name, position, isBackend, proficiency }: { name: string; position: [number, number, number]; isBackend: boolean; proficiency: number }) {
  const glowRef = useRef<THREE.Mesh>(null);
  const scale = isBackend ? 0.12 + (proficiency / 100) * 0.08 : 0.06 + (proficiency / 100) * 0.04;

  useFrame((state) => {
    if (glowRef.current) glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + proficiency) * 0.15);
  });

  return (
    <group position={position}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[scale * 2.5, 8, 8]} />
        <meshBasicMaterial color={isBackend ? "#00d4ff" : "#0088aa"} transparent opacity={isBackend ? 0.06 : 0.02} />
      </mesh>
      <mesh>
        <sphereGeometry args={[scale, 16, 16]} />
        <meshStandardMaterial color={isBackend ? "#00d4ff" : "#0088aa"} emissive={isBackend ? "#00d4ff" : "#004466"} emissiveIntensity={isBackend ? 1.5 : 0.4} metalness={0.9} roughness={0.1} />
      </mesh>
      {isBackend && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[scale * 1.8, scale * 2.0, 32]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      )}
      <Text position={[0, isBackend ? 0.35 : 0.22, 0]} fontSize={isBackend ? 0.22 : 0.14} color={isBackend ? "#00d4ff" : "#0088aa"} anchorX="center" anchorY="middle" font={undefined}>
        {name}
      </Text>
      {isBackend && (
        <Text position={[0, -0.28, 0]} fontSize={0.1} color="#00d4ff88" anchorX="center" anchorY="middle">
          {proficiency}%
        </Text>
      )}
    </group>
  );
}

function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.0002) * 0.08;
    }
  });

  const nodePositions = useMemo(() => skills.map((_, i) => {
    const phi = Math.acos(-1 + (2 * i + 1) / skills.length);
    const theta = Math.sqrt(skills.length * Math.PI) * phi;
    const r = 3.5;
    return [Math.cos(theta) * Math.sin(phi) * r, Math.cos(phi) * r, Math.sin(theta) * Math.sin(phi) * r] as [number, number, number];
  }), []);

  return (
    <group ref={groupRef}>
      <mesh><sphereGeometry args={[2.8, 20, 20]} /><meshBasicMaterial color="#00d4ff" transparent opacity={0.03} wireframe /></mesh>
      <mesh><sphereGeometry args={[4.0, 12, 12]} /><meshBasicMaterial color="#00d4ff" transparent opacity={0.015} wireframe /></mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.48, 3.52, 64]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
      <ConnectionLines positions={nodePositions} />
      {skills.map((skill, i) => (
        <SkillNode key={skill.name} name={skill.name} position={nodePositions[i]} isBackend={skill.category === "backend"} proficiency={skill.proficiency} />
      ))}
    </group>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => { const arr = new Float32Array(200 * 3); for (let i = 0; i < 200 * 3; i++) arr[i] = (Math.random() - 0.5) * 20; return arr; }, []);
  useFrame((state) => { if (pointsRef.current) pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02; });

  return (
    <points ref={pointsRef}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={200} array={positions} itemSize={3} /></bufferGeometry>
      <pointsMaterial size={0.015} color="#00d4ff" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

const SkillsSection = () => (
  <section id="skills" className="py-32 px-6 relative">
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
    <div className="mx-auto max-w-7xl relative">
      <ScrollReveal>
        <div className="text-center mb-4">
          <span className="text-xs uppercase tracking-[0.3em] text-primary/60 font-mono">[ SYSTEM.SKILLS ]</span>
        </div>
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-center">
          Skills & <span className="text-primary">Expertise</span>
        </h2>
        <p className="text-center text-muted-foreground mb-6 max-w-2xl mx-auto text-lg font-body">
          An interactive 3D constellation of my technical skills. Backend nodes highlighted in cyan.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="flex justify-center gap-8 mb-8">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]" /><span className="text-sm text-muted-foreground font-mono">Backend / Core</span></div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-muted-foreground/50" /><span className="text-sm text-muted-foreground font-mono">Frontend / Tools</span></div>
        </div>
      </ScrollReveal>

      <div className="h-[600px] md:h-[750px] lg:h-[800px] rounded-lg border border-primary/20 bg-background/80 backdrop-blur-sm overflow-hidden relative">
        <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-primary/30 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-primary/30 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-primary/30 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-primary/30 rounded-br-lg" />
        <div className="absolute top-0 left-0 right-0 h-8 border-b border-primary/10 flex items-center px-4 gap-2 z-10">
          <div className="w-2 h-2 rounded-full bg-primary/40" />
          <div className="w-2 h-2 rounded-full bg-primary/20" />
          <div className="w-2 h-2 rounded-full bg-primary/10" />
          <span className="text-[10px] text-primary/40 font-mono ml-2">skill_globe.exe — running</span>
        </div>

        <Canvas camera={{ position: [0, 0, 9], fov: 55 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d4ff" />
          <pointLight position={[-10, -5, -10]} intensity={0.5} color="#0088aa" />
          <Suspense fallback={null}><Globe /><FloatingParticles /></Suspense>
        </Canvas>
      </div>

      <ScrollReveal delay={0.3}>
        <div className="flex justify-center gap-6 mt-8 flex-wrap">
          {[
            { label: "Backend", count: skills.filter(s => s.category === "backend").length },
            { label: "Frontend", count: skills.filter(s => s.category === "frontend").length },
            { label: "DevOps", count: skills.filter(s => s.category === "devops").length },
            { label: "Tools", count: skills.filter(s => s.category === "tools").length },
          ].map((cat) => (
            <div key={cat.label} className="px-4 py-2 rounded border border-primary/20 bg-card/50 text-sm font-mono">
              <span className="text-primary font-bold">{cat.count}</span>{" "}
              <span className="text-muted-foreground">{cat.label}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default SkillsSection;
