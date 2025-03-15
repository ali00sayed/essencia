'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ProductViewerProps {
  productType: 'tshirt' | 'hoodie' | 'sweatshirt';
  color: string;
  logo?: string;
  customText?: string;
  textColor?: string;
}

const ProductViewer: React.FC<ProductViewerProps> = ({
  productType,
  color,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene>(new THREE.Scene());
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  // Combined setup and model loading
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = sceneRef.current;
    scene.background = new THREE.Color(0xffffff);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.5, 3);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 1.5;
    controls.minPolarAngle = Math.PI / 2.5;
    controls.enableZoom = true;
    controls.maxDistance = 5;
    controls.minDistance = 2.5;
    controls.target.set(0, 1.8, 0);
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 1);
    frontLight.position.set(0, 1, 3);
    scene.add(frontLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.7);
    backLight.position.set(0, 1, -3);
    scene.add(backLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 0.5);
    topLight.position.set(0, 3, 0);
    scene.add(topLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []); // Initial setup only runs once

  // Combined model loading and color updating
  useEffect(() => {
    if (!sceneRef.current) return;

    const loader = new GLTFLoader();
    loader.load(`/models/${productType}Model.glb`, gltf => {
      // Remove existing model if it exists
      if (modelRef.current) {
        sceneRef.current.remove(modelRef.current);
      }

      const newModel = gltf.scene;
      newModel.scale.setScalar(0.045);
      newModel.position.set(0, 0.5, 0);
      newModel.rotation.set(0, Math.PI, 0);

      // Apply material with current color
      newModel.traverse(child => {
        if (child instanceof THREE.Mesh) {
          console.log(`Applying color to mesh: ${child.name}`);
          const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
            metalness: 0.1,
            roughness: 0.85,
            side: THREE.DoubleSide,
            emissive: new THREE.Color(color),
            emissiveIntensity: 0.02,
          });
          child.material = material;
          child.castShadow = true;
          child.receiveShadow = true;
          material.needsUpdate = true;
        }
      });

      modelRef.current = newModel;
      sceneRef.current.add(newModel);

      // Center camera on model with adjusted position
      if (cameraRef.current) {
        const box = new THREE.Box3().setFromObject(newModel);
        const size = box.getSize(new THREE.Vector3());

        const fov = cameraRef.current.fov * (Math.PI / 180);
        const cameraDistance =
          Math.max(size.x / cameraRef.current.aspect, size.y) /
          (2 * Math.tan(fov / 2));

        cameraRef.current.position.set(0, 0.5, cameraDistance * 1.3);
        cameraRef.current.lookAt(new THREE.Vector3(0, 0.5, 0));

        if (controlsRef.current) {
          controlsRef.current.target.set(0, 0.5, 0);
          controlsRef.current.update();
        }
      }
    });
  }, [productType, color]); // Only re-run when product type or color changes

  return (
    <div
      ref={containerRef}
      className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg bg-white"
    />
  );
};

export default ProductViewer;
