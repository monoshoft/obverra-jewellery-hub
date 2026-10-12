import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCw, Sparkles, Eye, ShieldCheck } from 'lucide-react';

interface Jewellery3DViewerProps {
  modelType?: 'solitaire-ring' | 'emerald-pendant' | 'orbital-ring' | 'gemstone';
  initialMetal?: 'yellow-gold' | 'rose-gold' | 'white-gold' | 'platinum';
  height?: string | number;
  autoRotate?: boolean;
  accentColor?: string;
  className?: string;
  interactive?: boolean;
}

export const Jewellery3DViewer: React.FC<Jewellery3DViewerProps> = ({
  modelType = 'solitaire-ring',
  initialMetal = 'yellow-gold',
  height = '420px',
  autoRotate = true,
  accentColor = '#D4AF37',
  className = '',
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMetal, setSelectedMetal] = useState(initialMetal);
  const [isRotating, setIsRotating] = useState(autoRotate);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // References for three scene
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const jewelryGroupRef = useRef<THREE.Group | null>(null);
  const metalMeshesRef = useRef<THREE.Mesh[]>([]);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Colors for metals
  const metalColors: Record<string, { color: number; roughness: number; metalness: number }> = {
    'yellow-gold': { color: 0xF2C94C, roughness: 0.18, metalness: 0.95 },
    'rose-gold': { color: 0xE8A598, roughness: 0.22, metalness: 0.92 },
    'white-gold': { color: 0xE8ECEF, roughness: 0.16, metalness: 0.96 },
    'platinum': { color: 0xDCE1E8, roughness: 0.12, metalness: 0.98 },
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        setIsLoading(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      setIsLoading(false);
      return;
    }

    // Initialize Three.js scene
    const width = container.clientWidth || 400;
    const heightPx = typeof height === 'number' ? height : parseInt(height as string) || 420;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 100);
    camera.position.set(0, 1.2, 3.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;

    // Clear previous children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Controls
    let controls: OrbitControls | null = null;
    if (interactive) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enablePan = false;
      controls.minDistance = 2.0;
      controls.maxDistance = 6.0;
      controls.maxPolarAngle = Math.PI / 1.5;
      controls.minPolarAngle = Math.PI / 6;
      controlsRef.current = controls;
    }

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Warm key light
    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Cool fill light
    const fillLight = new THREE.DirectionalLight(0xdbeafe, 1.8);
    fillLight.position.set(-4, 2, -3);
    scene.add(fillLight);

    // Intense diamond sparkle rim light
    const rimLight = new THREE.PointLight(0xffffff, 3.5, 12);
    rimLight.position.set(0, 4, -2);
    scene.add(rimLight);

    // Bottom soft reflection light
    const bottomLight = new THREE.PointLight(0xfef08a, 1.2, 10);
    bottomLight.position.set(0, -3, 2);
    scene.add(bottomLight);

    // Group for the 3D Jewelry item
    const jewelryGroup = new THREE.Group();
    scene.add(jewelryGroup);
    jewelryGroupRef.current = jewelryGroup;
    metalMeshesRef.current = [];

    const activeMetalProp = metalColors[selectedMetal] || metalColors['yellow-gold'];

    // Band/Metal Material
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: activeMetalProp.color,
      roughness: activeMetalProp.roughness,
      metalness: activeMetalProp.metalness,
      envMapIntensity: 1.5,
    });

    // Diamond Physical Material (High dispersion, refraction look)
    const diamondMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0.03,
      ior: 2.417, // True diamond IOR
      metalness: 0.05,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    // Emerald Material
    const emeraldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x059669,
      transmission: 0.75,
      transparent: true,
      roughness: 0.08,
      ior: 1.58,
      metalness: 0.1,
      clearcoat: 0.8,
    });

    if (modelType === 'solitaire-ring') {
      // 1. Ring Shank (torus-like band)
      const bandCurve = new THREE.TorusGeometry(0.85, 0.08, 32, 100);
      const bandMesh = new THREE.Mesh(bandCurve, metalMaterial);
      bandMesh.rotation.x = Math.PI / 2;
      jewelryGroup.add(bandMesh);
      metalMeshesRef.current.push(bandMesh);

      // Crown / Prongs
      const prongCount = 6;
      for (let i = 0; i < prongCount; i++) {
        const angle = (i / prongCount) * Math.PI * 2;
        const prongGeo = new THREE.CylinderGeometry(0.025, 0.03, 0.35, 16);
        const prong = new THREE.Mesh(prongGeo, metalMaterial);
        prong.position.set(Math.cos(angle) * 0.28, 0.88, Math.sin(angle) * 0.28);
        prong.rotation.z = Math.cos(angle) * 0.15;
        prong.rotation.x = Math.sin(angle) * 0.15;
        jewelryGroup.add(prong);
        metalMeshesRef.current.push(prong);
      }

      // Crown base seat
      const seatGeo = new THREE.TorusGeometry(0.24, 0.03, 16, 32);
      const seat = new THREE.Mesh(seatGeo, metalMaterial);
      seat.position.set(0, 0.84, 0);
      seat.rotation.x = Math.PI / 2;
      jewelryGroup.add(seat);
      metalMeshesRef.current.push(seat);

      // Brilliant Diamond (Faceted 3D Solitaire)
      const diamondCrownGeo = new THREE.ConeGeometry(0.42, 0.3, 16);
      const diamondCrown = new THREE.Mesh(diamondCrownGeo, diamondMaterial);
      diamondCrown.position.set(0, 1.05, 0);
      diamondCrown.rotation.x = Math.PI;
      jewelryGroup.add(diamondCrown);

      const diamondPavilionGeo = new THREE.ConeGeometry(0.42, 0.38, 16);
      const diamondPavilion = new THREE.Mesh(diamondPavilionGeo, diamondMaterial);
      diamondPavilion.position.set(0, 0.76, 0);
      jewelryGroup.add(diamondPavilion);

      // Micro Pavé Diamonds on Shank Shoulders
      for (let side = -1; side <= 1; side += 2) {
        for (let j = 1; j <= 5; j++) {
          const smallDiamondGeo = new THREE.SphereGeometry(0.035, 12, 12);
          const smallDiamond = new THREE.Mesh(smallDiamondGeo, diamondMaterial);
          const ang = (side * j * 0.12) + (Math.PI / 2);
          smallDiamond.position.set(Math.cos(ang) * 0.86, Math.sin(ang) * 0.86, 0);
          jewelryGroup.add(smallDiamond);
        }
      }

      jewelryGroup.rotation.x = 0.3;
      jewelryGroup.rotation.y = 0.4;
    } else if (modelType === 'emerald-pendant') {
      // Royal Indian Emerald & Polki Pendant
      const outerRingGeo = new THREE.TorusGeometry(0.7, 0.07, 24, 64);
      const outerRing = new THREE.Mesh(outerRingGeo, metalMaterial);
      jewelryGroup.add(outerRing);
      metalMeshesRef.current.push(outerRing);

      // Central Emerald Gemstone (Octagonal / Cushion)
      const emeraldGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.18, 8);
      const emerald = new THREE.Mesh(emeraldGeo, emeraldMaterial);
      emerald.rotation.x = Math.PI / 2;
      jewelryGroup.add(emerald);

      // Surrounding Polki Diamond Bezel halo
      for (let i = 0; i < 12; i++) {
        const ang = (i / 12) * Math.PI * 2;
        const polkiGeo = new THREE.DodecahedronGeometry(0.08);
        const polki = new THREE.Mesh(polkiGeo, diamondMaterial);
        polki.position.set(Math.cos(ang) * 0.68, Math.sin(ang) * 0.68, 0);
        jewelryGroup.add(polki);

        // Gold collet seat for each polki
        const colletGeo = new THREE.CylinderGeometry(0.09, 0.1, 0.05, 8);
        const collet = new THREE.Mesh(colletGeo, metalMaterial);
        collet.position.set(Math.cos(ang) * 0.68, Math.sin(ang) * 0.68, -0.02);
        collet.rotation.x = Math.PI / 2;
        jewelryGroup.add(collet);
        metalMeshesRef.current.push(collet);
      }

      // Teardrop pearl hanging below
      const pearlGeo = new THREE.SphereGeometry(0.2, 24, 24);
      pearlGeo.scale(1, 1.4, 1);
      const pearlMat = new THREE.MeshStandardMaterial({
        color: 0xfef9ee,
        roughness: 0.25,
        metalness: 0.1,
      });
      const pearl = new THREE.Mesh(pearlGeo, pearlMat);
      pearl.position.set(0, -1.05, 0);
      jewelryGroup.add(pearl);

      jewelryGroup.rotation.x = 0.2;
    } else if (modelType === 'orbital-ring') {
      // Future Luxe: Interlocking Mobius-like Parabolic Platinum Rings
      const ring1Geo = new THREE.TorusGeometry(0.85, 0.05, 32, 100);
      const ring1 = new THREE.Mesh(ring1Geo, metalMaterial);
      ring1.rotation.x = 0.6;
      ring1.rotation.y = 0.4;
      jewelryGroup.add(ring1);
      metalMeshesRef.current.push(ring1);

      const ring2Geo = new THREE.TorusGeometry(0.92, 0.04, 32, 100);
      const ring2 = new THREE.Mesh(ring2Geo, metalMaterial);
      ring2.rotation.x = -0.5;
      ring2.rotation.y = -0.6;
      jewelryGroup.add(ring2);
      metalMeshesRef.current.push(ring2);

      // Central floating suspended brilliant diamond
      const centralDiamondGeo = new THREE.OctahedronGeometry(0.48, 2);
      const centralDiamond = new THREE.Mesh(centralDiamondGeo, diamondMaterial);
      jewelryGroup.add(centralDiamond);

      // Floating starlight particles
      const particleGeo = new THREE.BufferGeometry();
      const count = 40;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 3;
        positions[i + 1] = (Math.random() - 0.5) * 3;
        positions[i + 2] = (Math.random() - 0.5) * 3;
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0x93c5fd,
        size: 0.04,
        transparent: true,
        opacity: 0.8,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      jewelryGroup.add(particles);

      jewelryGroup.rotation.x = 0.25;
    } else {
      // Faceted Solitaire Gemstone showcase
      const gemGeo = new THREE.IcosahedronGeometry(0.8, 1);
      const gem = new THREE.Mesh(gemGeo, diamondMaterial);
      jewelryGroup.add(gem);
    }

    // Animation Loop
    let lastTime = performance.now();
    const animate = (currentTime: number) => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (isRotating && jewelryGroupRef.current) {
        jewelryGroupRef.current.rotation.y += delta * 0.45;
      }

      if (controls) {
        controls.update();
      }

      renderer.render(scene, camera);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);
    setIsLoading(false);

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = typeof height === 'number' ? height : parseInt(height as string) || 420;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      if (rendererRef.current && rendererRef.current.domElement) {
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
      }
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
    };
  }, [modelType, interactive, height, isRotating]);

  // Update metal color dynamically without rebuilding scene
  useEffect(() => {
    const metalProp = metalColors[selectedMetal];
    if (!metalProp) return;

    metalMeshesRef.current.forEach((mesh) => {
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        mesh.material.color.setHex(metalProp.color);
        mesh.material.roughness = metalProp.roughness;
        mesh.material.metalness = metalProp.metalness;
        mesh.material.needsUpdate = true;
      }
    });
  }, [selectedMetal]);

  return (
    <div className={`relative overflow-hidden rounded-2xl select-none group ${className}`} style={{ height }}>
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-500"
        style={{ height }}
      />

      {/* WebGL Fallback if not supported */}
      {!webglSupported && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/90 p-6 text-center">
          <div className="w-16 h-16 rounded-full border border-amber-500/30 flex items-center justify-center mb-3 text-amber-400">
            <Sparkles className="w-8 h-8" />
          </div>
          <h4 className="text-white font-serif text-lg">Interactive 3D Preview</h4>
          <p className="text-zinc-400 text-xs mt-1 max-w-xs">
            High-carat brilliant jewellery rendered in real-time. Accelerated hardware rendering previewed.
          </p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && webglSupported && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/40 backdrop-blur-xs pointer-events-none">
          <div className="flex items-center gap-2 text-xs tracking-widest text-amber-200/80 uppercase">
            <RotateCw className="w-4 h-4 animate-spin text-amber-400" />
            <span>Calibrating 3D Refractions...</span>
          </div>
        </div>
      )}

      {/* Discreet 3D Floating HUD (Orbit, Auto-Spin, Finish Switcher) */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        {/* Metal Finishes Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 pointer-events-auto shadow-xl">
          <button
            onClick={() => setSelectedMetal('yellow-gold')}
            title="18K Yellow Gold"
            className={`w-6 h-6 rounded-full transition-transform ${
              selectedMetal === 'yellow-gold' ? 'scale-110 ring-2 ring-amber-400' : 'opacity-70 hover:opacity-100'
            }`}
            style={{ backgroundColor: '#D4AF37' }}
          />
          <button
            onClick={() => setSelectedMetal('rose-gold')}
            title="18K Rose Gold"
            className={`w-6 h-6 rounded-full transition-transform ${
              selectedMetal === 'rose-gold' ? 'scale-110 ring-2 ring-rose-400' : 'opacity-70 hover:opacity-100'
            }`}
            style={{ backgroundColor: '#E0A899' }}
          />
          <button
            onClick={() => setSelectedMetal('white-gold')}
            title="18K White Gold"
            className={`w-6 h-6 rounded-full transition-transform ${
              selectedMetal === 'white-gold' ? 'scale-110 ring-2 ring-slate-300' : 'opacity-70 hover:opacity-100'
            }`}
            style={{ backgroundColor: '#E2E8F0' }}
          />
          <button
            onClick={() => setSelectedMetal('platinum')}
            title="Platinum 950"
            className={`w-6 h-6 rounded-full transition-transform ${
              selectedMetal === 'platinum' ? 'scale-110 ring-2 ring-blue-300' : 'opacity-70 hover:opacity-100'
            }`}
            style={{ backgroundColor: '#94A3B8' }}
          />
        </div>

        {/* 3D Status / Interaction Pill */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border transition-all ${
              isRotating
                ? 'bg-black/60 text-amber-300 border-amber-500/40 shadow-lg shadow-amber-500/10'
                : 'bg-black/40 text-zinc-400 border-white/10 hover:text-white'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
            <span className="text-[11px] font-sans tracking-wide">360° {isRotating ? 'Spin' : 'Paused'}</span>
          </button>
        </div>
      </div>

      {/* Top 3D badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/90 text-[10px] tracking-wider uppercase font-sans">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Interactive 3D Atelier</span>
        </div>
      </div>

      {/* Interactive Drag Hint */}
      <div className="absolute top-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-zinc-300 text-[10px]">
          Drag to inspect
        </span>
      </div>
    </div>
  );
};
