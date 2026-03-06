import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { skills } from "@/data/portfolio";
import ScrollReveal from "@/components/animations/ScrollReveal";
import * as THREE from "three";

function ConnectionLines({ positions }: { positions: [number, number, number][] }) {
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
    <group>
      {lineGeometries.map((line, i) => {
        const points = [line.start, line.end];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <primitive key={i} object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: "#C9982E", transparent: true, opacity: 0.06 }))} />
        );
      })}
    </group>
  );
}

function SkillNode({ name, position, isBackend, proficiency }: { name: string; position: [number, number, number]; isBackend: boolean; proficiency: number }) {
  const glowRef = useRef<THREE.Mesh>(null);
  const scale = isBackend ? 0.1 + (proficiency / 100) * 0.07 : 0.05 + (proficiency / 100) * 0.03;

  useFrame((state) => {
    if (glowRef.current) glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.5 + proficiency) * 0.1);
  });

  return (
    <group position={position}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[scale * 2, 8, 8]} />
        <meshBasicMaterial color={isBackend ? "#C9982E" : "#666"} transparent opacity={isBackend ? 0.04 : 0.02} />
      </mesh>
      <mesh>
        <sphereGeometry args={[scale, 16, 16]} />
        <meshStandardMaterial
          color={isBackend ? "#C9982E" : "#888"}
          emissive={isBackend ? "#C9982E" : "#444"}
          emissiveIntensity={isBackend ? 1 : 0.3}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      <Text
        position={[0, isBackend ? 0.32 : 0.2, 0]}
        fontSize={isBackend ? 0.18 : 0.12}
        color={isBackend ? "#C9982E" : "#888"}
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        {name}
      </Text>
    </group>
  );
}

function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.00015) * 0.05;
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
      <mesh><sphereGeometry args={[2.8, 20, 20]} /><meshBasicMaterial color="#C9982E" transparent opacity={0.015} wireframe /></mesh>
      <mesh><sphereGeometry args={[4.0, 12, 12]} /><meshBasicMaterial color="#C9982E" transparent opacity={0.008} wireframe /></mesh>
      <ConnectionLines positions={nodePositions} />
      {skills.map((skill, i) => (
        <SkillNode key={skill.name} name={skill.name} position={nodePositions[i]} isBackend={skill.category === "backend"} proficiency={skill.proficiency} />
      ))}
    </group>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => { const arr = new Float32Array(100 * 3); for (let i = 0; i < 100 * 3; i++) arr[i] = (Math.random() - 0.5) * 20; return arr; }, []);
  useFrame((state) => { if (pointsRef.current) pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01; });

  return (
    <points ref={pointsRef}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={100} array={positions} itemSize={3} /></bufferGeometry>
      <pointsMaterial size={0.012} color="#C9982E" transparent opacity={0.25} sizeAttenuation />
    </points>
  );
}

const SkillsSection = () => (
  <section id="skills" className="py-28 px-6 relative">
    <div className="mx-auto max-w-6xl relative">
      <ScrollReveal>
        <p className="text-sm tracking-[0.25em] uppercase text-primary font-body font-medium mb-4 text-center">
          Expertise
        </p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center italic">
          Skills & Tools
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-lg mx-auto text-base font-body">
          Interactive constellation of my technical skills. Backend nodes are highlighted.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <div className="flex justify-center gap-8 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground font-body">Backend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
            <span className="text-xs text-muted-foreground font-body">Frontend / Tools</span>
          </div>
        </div>
      </ScrollReveal>

      <div className="h-[550px] md:h-[700px] rounded-2xl border border-border bg-card/30 overflow-hidden">
        <Canvas camera={{ position: [0, 0, 9], fov: 55 }}>
          <ambientLight intensity={0.25} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#C9982E" />
          <pointLight position={[-10, -5, -10]} intensity={0.3} color="#8B6914" />
          <Suspense fallback={null}><Globe /><FloatingParticles /></Suspense>
        </Canvas>
      </div>

      <ScrollReveal delay={0.2}>
        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          {[
            { label: "Backend", count: skills.filter(s => s.category === "backend").length },
            { label: "Frontend", count: skills.filter(s => s.category === "frontend").length },
            { label: "DevOps", count: skills.filter(s => s.category === "devops").length },
            { label: "Tools", count: skills.filter(s => s.category === "tools").length },
          ].map((cat) => (
            <div key={cat.label} className="px-4 py-2 rounded-full border border-border bg-card/40 text-xs font-body">
              <span className="text-primary font-semibold">{cat.count}</span>{" "}
              <span className="text-muted-foreground">{cat.label}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default SkillsSection;
