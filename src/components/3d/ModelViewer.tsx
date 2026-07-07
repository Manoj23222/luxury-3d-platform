"use client";

import { Canvas } from "@react-three/fiber";
import {
  Bounds,
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";

function Loader() {
  return (
    <Html center>
      <div className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black shadow">
        Loading...
      </div>
    </Html>
  );
}

function getExt(fileName?: string) {
  return fileName?.split("?")[0].split(".").pop()?.toLowerCase() || "";
}

function Model({ url }: { url: string }) {
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene} />;
}

export default function ModelViewer({
  url,
  fileName,
}: {
  url?: string;
  fileName?: string;
}) {
  const ext = getExt(fileName);
  console.log("MODEL VIEWER DEBUG:", {
  url,
  fileName,
  ext,
});

  if (!url || (ext !== "glb" && ext !== "gltf")) {
    return (
      <div className="flex h-[420px] w-full items-center justify-center rounded-3xl border border-neutral-200 bg-neutral-100">
        <p className="text-sm font-semibold text-neutral-500">
          Only GLB / GLTF preview supported
        </p>
      </div>
    );
  }

  return (
    <div className="h-[420px] w-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100">
      <Canvas
        shadows
        camera={{ position: [3, 2, 6], fov: 38 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#f4f4f2"]} />

        <ambientLight intensity={0.8} />

        
          <Environment preset="studio" />

         <Bounds fit clip observe margin={1.4}>
  <Model url={url} />
</Bounds>

          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.25}
            scale={8}
            blur={2.5}
            far={4}
          />
        

        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom
          enableRotate
          minDistance={2.5}
          maxDistance={12}
        />
      </Canvas>
    </div>
  );
}