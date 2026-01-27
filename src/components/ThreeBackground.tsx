import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
    isHovered?: boolean;
}

export default function ThreeBackground({ isHovered = false }: ThreeBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const meshesRef = useRef<THREE.Mesh[]>([]);
    const threadsRef = useRef<THREE.Line[]>([]);
    const isHoveredRef = useRef(isHovered);
    const mouseRef = useRef(new THREE.Vector2(9999, 9999)); // Start off-screen
    const raycasterRef = useRef(new THREE.Raycaster());

    // Update ref when prop changes
    useEffect(() => {
        isHoveredRef.current = isHovered;
    }, [isHovered]);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const meshes: THREE.Mesh[] = [];

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 5;
        cameraRef.current = camera;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Create realistic balloon with gradient and glow
        const createBalloon = (color: number, size: number, initialPos: THREE.Vector3, targetPos: THREE.Vector3) => {
            const geometry = new THREE.SphereGeometry(size, 64, 64);

            // Create gradient texture for glossy look
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d')!;

            // Create radial gradient for balloon effect
            const gradient = ctx.createRadialGradient(256, 200, 50, 256, 256, 350);
            const hexColor = '#' + color.toString(16).padStart(6, '0');
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(0.3, hexColor);
            gradient.addColorStop(1, hexColor);

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 512, 512);

            // Add soft glow around edges
            ctx.globalCompositeOperation = 'screen';
            const glowGradient = ctx.createRadialGradient(256, 256, 200, 256, 256, 300);
            glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
            glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = glowGradient;
            ctx.fillRect(0, 0, 512, 512);

            const texture = new THREE.CanvasTexture(canvas);

            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0.85,
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.copy(initialPos);

            // Store initial and target positions
            (mesh as any).initialPosition = initialPos.clone();
            (mesh as any).targetPosition = targetPos.clone();
            (mesh as any).currentProgress = 0;
            (mesh as any).size = size; // Store size for thread attachment
            (mesh as any).mouseOffset = new THREE.Vector3(0, 0, 0); // Offset from mouse repulsion
            (mesh as any).velocity = new THREE.Vector3(0, 0, 0); // For smooth movement

            return mesh;
        };

        // Create thread attached to balloon
        const createThread = (balloonMesh: THREE.Mesh, threadLength: number = 3) => {
            const points: THREE.Vector3[] = [];
            const segments = 20;
            
            // Create curve points for the thread
            for (let i = 0; i <= segments; i++) {
                const y = -i * (threadLength / segments);
                points.push(new THREE.Vector3(0, y, 0));
            }

            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: 0x666666,
                transparent: true,
                opacity: 0.6,
                linewidth: 2
            });

            const thread = new THREE.Line(geometry, material);
            
            // Position thread at bottom of balloon
            const balloonSize = (balloonMesh as any).size;
            thread.position.copy(balloonMesh.position);
            thread.position.y -= balloonSize;
            
            // Store reference to parent balloon
            (thread as any).parentBalloon = balloonMesh;
            (thread as any).segments = segments;
            (thread as any).threadLength = threadLength;
            (thread as any).baseOffset = new THREE.Vector3(0, -balloonSize, 0);

            return thread;
        };

        // Define positions for 5 smaller balloons with threads
        const balloons = [
            // Top-left corner (yellow-green) - will form top of R
            createBalloon(
                0xc8f464,
                1.2,
                new THREE.Vector3(-8, 5, -2),
                new THREE.Vector3(-5, 2.5, -2)
            ),

            // Top-right corner (turquoise) - will form curve of R
            createBalloon(
                0x5dd4bf,
                1.4,
                new THREE.Vector3(8, 5, -2),
                new THREE.Vector3(-5, 0, -2)
            ),

            // Bottom-left corner (blue) - will form stem of R
            createBalloon(
                0x96c4ff,
                1.3,
                new THREE.Vector3(-8, -5, -2),
                new THREE.Vector3(-5, -2.5, -2)
            ),

            // Bottom-right corner (pink/peach) - will form top of S
            createBalloon(
                0xffb4d4,
                1.25,
                new THREE.Vector3(8, -5, -2),
                new THREE.Vector3(-1.5, 2.5, -2)
            ),

            // Right side (orange/yellow) - will form bottom of S
            createBalloon(
                0xffc864,
                1.2,
                new THREE.Vector3(8, 0, -2),
                new THREE.Vector3(-1.5, -2.5, -2)
            ),
        ];

        const threads: THREE.Line[] = [];

        balloons.forEach(balloon => {
            scene.add(balloon);
            meshes.push(balloon);
            
            // Create and add thread for each balloon
            const thread = createThread(balloon, 2.5);
            scene.add(thread);
            threads.push(thread);
        });
        
        meshesRef.current = meshes;
        threadsRef.current = threads;

        // Mouse event handlers
        const handleMouseMove = (event: MouseEvent) => {
            // Convert mouse position to normalized device coordinates (-1 to +1)
            mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        const handleMouseLeave = () => {
            // Reset mouse position when leaving the window
            mouseRef.current.set(9999, 9999);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        // Animation
        let frameId: number;
        const animate = () => {
            frameId = requestAnimationFrame(animate);

            const time = Date.now() * 0.001;

            // Update raycaster for mouse interaction
            if (cameraRef.current) {
                raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
            }

            // Animate each balloon and its thread
            meshesRef.current.forEach((mesh: any, index) => {
                const targetProgress = isHoveredRef.current ? 1 : 0;
                const transitionSpeed = 0.05;

                // Smoothly transition between positions
                mesh.currentProgress += (targetProgress - mesh.currentProgress) * transitionSpeed;

                // Calculate base position (lerp between initial and target)
                const basePosition = new THREE.Vector3();
                basePosition.lerpVectors(
                    mesh.initialPosition,
                    mesh.targetPosition,
                    mesh.currentProgress
                );

                // Enhanced floating animation with more natural movement
                const floatSpeed = 0.5;
                const floatAmplitudeY = 0.15;
                const floatAmplitudeX = 0.1;
                const floatAmplitudeZ = 0.05;
                
                basePosition.y += Math.sin(time * floatSpeed + index * 1.5) * floatAmplitudeY;
                basePosition.x += Math.cos(time * floatSpeed * 0.7 + index * 1.2) * floatAmplitudeX;
                basePosition.z += Math.sin(time * floatSpeed * 0.5 + index) * floatAmplitudeZ;

                // Mouse repulsion effect
                if (mouseRef.current.x !== 9999 && cameraRef.current) {
                    // Get 3D position of mouse on the plane of the balloon
                    const raycaster = raycasterRef.current;
                    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -mesh.position.z);
                    const mousePos3D = new THREE.Vector3();
                    raycaster.ray.intersectPlane(plane, mousePos3D);

                    if (mousePos3D) {
                        // Calculate distance from mouse to balloon
                        const distance = mousePos3D.distanceTo(basePosition);
                        const repulsionRadius = 3.5; // Radius of repulsion effect

                        if (distance < repulsionRadius) {
                            // Calculate repulsion force
                            const direction = new THREE.Vector3()
                                .subVectors(basePosition, mousePos3D)
                                .normalize();
                            
                            // Stronger repulsion when closer (inverse square falloff)
                            const strength = Math.pow(1 - distance / repulsionRadius, 2) * 2.5;
                            const repulsionForce = direction.multiplyScalar(strength);

                            // Apply force to velocity for smooth movement
                            mesh.velocity.add(repulsionForce.multiplyScalar(0.15));
                        }
                    }
                }

                // Apply velocity with damping for smooth return
                mesh.mouseOffset.add(mesh.velocity);
                mesh.velocity.multiplyScalar(0.85); // Damping
                mesh.mouseOffset.multiplyScalar(0.92); // Return to original position

                // Apply final position
                mesh.position.copy(basePosition).add(mesh.mouseOffset);

                // Gentle rotation for more realistic look
                mesh.rotation.x = Math.sin(time * 0.3 + index) * 0.1;
                mesh.rotation.y += 0.002;
                mesh.rotation.z = Math.cos(time * 0.4 + index) * 0.05;
            });

            // Animate threads to follow balloons and sway
            threadsRef.current.forEach((thread: any, index) => {
                const balloon = thread.parentBalloon;
                const balloonSize = balloon.size;
                
                // Update thread base position to follow balloon
                const basePos = balloon.position.clone();
                basePos.y -= balloonSize;
                
                // Create swaying effect for the thread
                const swaySpeed = 0.5;
                const swayAmount = 0.15;
                const swayX = Math.sin(time * swaySpeed + index * 1.3) * swayAmount;
                const swayZ = Math.cos(time * swaySpeed * 0.8 + index * 1.5) * swayAmount * 0.5;
                
                // Update thread geometry points
                const positions = thread.geometry.attributes.position;
                const segments = thread.segments;
                const threadLength = thread.threadLength;
                
                for (let i = 0; i <= segments; i++) {
                    const t = i / segments;
                    const segmentY = -t * threadLength;
                    
                    // Apply progressive sway (more at the bottom)
                    const swayFactor = t * t; // Quadratic falloff
                    const x = swayX * swayFactor;
                    const z = swayZ * swayFactor;
                    
                    positions.setXYZ(i, x, segmentY, z);
                }
                
                positions.needsUpdate = true;
                
                // Position thread at balloon bottom
                thread.position.copy(basePos);
            });

            renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        const handleResize = () => {
            if (!cameraRef.current || !rendererRef.current) return;

            cameraRef.current.aspect = window.innerWidth / window.innerHeight;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);

            if (container && rendererRef.current) {
                container.removeChild(rendererRef.current.domElement);
            }

            meshes.forEach(mesh => {
                mesh.geometry.dispose();
                (mesh.material as THREE.Material).dispose();
            });

            threads.forEach(thread => {
                thread.geometry.dispose();
                (thread.material as THREE.Material).dispose();
            });

            rendererRef.current?.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                filter: 'blur(0px)',
            }}
        />
    );
}
