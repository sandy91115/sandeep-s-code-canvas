import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { skills } from "@/data/portfolio";
import ScrollReveal from "@/components/animations/ScrollReveal";
import * as THREE from "three";

function SkillNode({
  name,
  position,
  isBackend,
}: {
  name: string;
  position: [number, number, number];
  isBackend: boolean;
}) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[isBackend ? 0.08 : 0.05, 16, 16]} />
        <meshStandardMaterial
          color={isBackend ? "#FF9933" : "#666666"}
          emissive={isBackend ? "#FF9933" : "#333333"}
          emissiveIntensity={isBackend ? 0.8 : 0.3}
        />
      </mesh>
      <Text
        position={[0, isBackend ? 0.22 : 0.16, 0]}
        fontSize={isBackend ? 0.18 : 0.13}
        color={isBackend ? "#FF9933" : "#888888"}
        anchorX="center"
        anchorY="middle"
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
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshBasicMaterial color="#FF9933" transparent opacity={0.04} wireframe />
      </mesh>

      {skills.map((skill, i) => {
        const phi = Math.acos(-1 + (2 * i + 1) / skills.length);
        const theta = Math.sqrt(skills.length * Math.PI) * phi;
        const r = 2.8;
        const x = Math.cos(theta) * Math.sin(phi) * r;
        const y = Math.cos(phi) * r;
        const z = Math.sin(theta) * Math.sin(phi) * r;
        const isBackend = skill.category === "backend";

        return <SkillNode key={skill.name} name={skill.name} position={[x, y, z]} isBackend={isBackend} />;
      })}
    </group>
  );
}

const SkillsSection = () => (
  <section id="skills" className="py-32 px-6">
    <div className="mx-auto max-w-6xl">
      <ScrollReveal>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-center">
          Skills & <span className="text-primary">Expertise</span>
        </h2>
        <p className="text-center text-muted-foreground mb-16">Backend skills highlighted in saffron</p>
      </ScrollReveal>

      <div className="h-[500px] md:h-[600px]">
        <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <Globe />
          </Suspense>
        </Canvas>
      </div>
    </div>
  </section>
);

export default SkillsSection;
