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
          lines.push({
            start: new THREE.Vector3(...positions[i]),
            end: new THREE.Vector3(...positions[j]),
          });
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
          <primitive key={i} object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: "#FF9933", transparent: true, opacity: 0.08 }))} />
        );
      })}
    </group>
  );
}

function SkillNode({
  name,
  position,
  isBackend,
  proficiency,
}: {
  name: string;
  position: [number, number, number];
  isBackend: boolean;
  proficiency: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const scale = isBackend ? 0.12 + (proficiency / 100) * 0.08 : 0.06 + (proficiency / 100) * 0.04;

  useFrame((state) => {
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + proficiency) * 0.15);
    }
  });

  return (
    <group position={position}>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[scale * 2.5, 8, 8]} />
        <meshBasicMaterial
          color={isBackend ? "#FF9933" : "#555555"}
          transparent
          opacity={isBackend ? 0.08 : 0.03}
        />
      </mesh>
      {/* Core sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[scale, 16, 16]} />
        <meshStandardMaterial
          color={isBackend ? "#FF9933" : "#777777"}
          emissive={isBackend ? "#FF9933" : "#444444"}
          emissiveIntensity={isBackend ? 1.2 : 0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Ring around backend skills */}
      {isBackend && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[scale * 1.8, scale * 2.0, 32]} />
          <meshBasicMaterial color="#FF9933" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      )}
      <Text
        position={[0, isBackend ? 0.35 : 0.22, 0]}
        fontSize={isBackend ? 0.22 : 0.14}
        color={isBackend ? "#FF9933" : "#999999"}
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        {name}
      </Text>
      {isBackend && (
        <Text
          position={[0, isBackend ? -0.28 : -0.18, 0]}
          fontSize={0.1}
          color="#FF993388"
          anchorX="center"
          anchorY="middle"
        >
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

  const nodePositions = useMemo(() => {
    return skills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      const r = 3.5;
      const x = Math.cos(theta) * Math.sin(phi) * r;
      const y = Math.cos(phi) * r;
      const z = Math.sin(theta) * Math.sin(phi) * r;
      return [x, y, z] as [number, number, number];
    });
  }, []);

  return (
    <group ref={groupRef}>
      {/* Inner wireframe sphere */}
      <mesh>
        <sphereGeometry args={[2.8, 20, 20]} />
        <meshBasicMaterial color="#FF9933" transparent opacity={0.03} wireframe />
      </mesh>
      {/* Outer wireframe sphere */}
      <mesh>
        <sphereGeometry args={[4.0, 12, 12]} />
        <meshBasicMaterial color="#FF9933" transparent opacity={0.015} wireframe />
      </mesh>
      {/* Equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.48, 3.52, 64]} />
        <meshBasicMaterial color="#FF9933" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>

      <ConnectionLines positions={nodePositions} />

      {skills.map((skill, i) => {
        const isBackend = skill.category === "backend";
        return (
          <SkillNode
            key={skill.name}
            name={skill.name}
            position={nodePositions[i]}
            isBackend={isBackend}
            proficiency={skill.proficiency}
          />
        );
      })}
    </group>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(200 * 3);
    for (let i = 0; i < 200 * 3; i++) arr[i] = (Math.random() - 0.5) * 20;
    return arr;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={200} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#FF9933" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

const SkillsSection = () => (
  <section id="skills" className="py-32 px-6 relative">
    {/* Background grid pattern */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
      backgroundSize: '40px 40px',
    }} />

    <div className="mx-auto max-w-7xl relative">
      <ScrollReveal>
        <div className="text-center mb-4">
          <span className="text-xs uppercase tracking-[0.3em] text-primary/60 font-body">What I Work With</span>
        </div>
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-center">
          Skills & <span className="text-primary">Expertise</span>
        </h2>
        <p className="text-center text-muted-foreground mb-6 max-w-2xl mx-auto text-lg">
          An interactive 3D constellation of my technical skills. Backend technologies are highlighted in saffron — hover and explore.
        </p>
      </ScrollReveal>

      {/* Legend */}
      <ScrollReveal delay={0.2}>
        <div className="flex justify-center gap-8 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
            <span className="text-sm text-muted-foreground">Backend / Core</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/50" />
            <span className="text-sm text-muted-foreground">Frontend / Tools</span>
          </div>
        </div>
      </ScrollReveal>

      <div className="h-[600px] md:h-[750px] lg:h-[800px] rounded-2xl border border-border/50 bg-card/20 backdrop-blur-sm overflow-hidden relative">
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-primary/20 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-primary/20 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-primary/20 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-primary/20 rounded-br-2xl" />

        <Canvas camera={{ position: [0, 0, 9], fov: 55 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#FF9933" />
          <pointLight position={[-10, -5, -10]} intensity={0.5} color="#FF6600" />
          <pointLight position={[0, -10, 5]} intensity={0.3} color="#ffffff" />
          <Suspense fallback={null}>
            <Globe />
            <FloatingParticles />
          </Suspense>
        </Canvas>
      </div>

      {/* Skill count badges */}
      <ScrollReveal delay={0.3}>
        <div className="flex justify-center gap-6 mt-8 flex-wrap">
          {[
            { label: "Backend", count: skills.filter(s => s.category === "backend").length },
            { label: "Frontend", count: skills.filter(s => s.category === "frontend").length },
            { label: "DevOps", count: skills.filter(s => s.category === "devops").length },
            { label: "Tools", count: skills.filter(s => s.category === "tools").length },
          ].map((cat) => (
            <div key={cat.label} className="px-4 py-2 rounded-lg border border-border bg-card/50 text-sm">
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
