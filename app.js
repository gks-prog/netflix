const fetchExternalData = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    id: 1, title: "Her", description: "A beautiful creation of the god on earth.",
                    thumbnail: "https://drive.google.com/thumbnail?id=1tsyy0OIAWh-l6q4RbzAellncKxKrwb8_&sz=w1200",
                    videoEmbedUrl: "https://drive.google.com/file/d/1EFvsfwKlmsulQEDAAJSjraLoqLmNkKzj/preview"
                },
                {
                    id: 2, title: "Earrings", description: "Exploring the highest peaks.",
                    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
                    videoEmbedUrl: ""
                },
                {
                    id: 3, title: "Ocean like Eyes", description: "Into the blue.",
                    thumbnail: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=800&q=80",
                    videoEmbedUrl: ""
                }
            ]);
        }, 1200); 
    });
};

// Data for the 3D Gallery Orbit
const orbitalImages = [
    "https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1755569309049-98410b94f66d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1755497595318-7e5e3523854f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1755353985163-c2a0fe5ac3d8?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1745965976680-d00be7dc0377?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1752588975228-21f44630bb3c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&w=600&q=80"
];

const initApp = async () => {
    try {
        const videos = await fetchExternalData();
        
        // 1. Build Hero
        const hero = document.getElementById('hero-section');
        const heroTitle = document.getElementById('hero-title');
        const heroDesc = document.getElementById('hero-desc');
        
        hero.style.backgroundImage = `linear-gradient(to right, rgba(20,20,20,0.9) 0%, rgba(20,20,20,0.4) 100%), url('${videos[0].thumbnail}')`;
        heroTitle.textContent = videos[0].title;
        heroDesc.textContent = videos[0].description;

        // 2. Build Video Modal (Google Drive Embed)
        const playBtn = document.querySelector('.play-btn');
        playBtn.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.id = 'video-modal';
            modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.95); z-index: 100000; display: flex; justify-content: center; align-items: center; opacity: 0;';
            
            modal.innerHTML = `
                <div class="close-video" style="position: absolute; top: 30px; right: 40px; color: white; font-size: 3.5rem; cursor: pointer; z-index: 100001;">&times;</div>
                <div class="video-container" style="width: 90vw; height: 85vh; max-width: 1600px;">
                    <iframe src="${videos[0].videoEmbedUrl}" style="width: 100%; height: 100%; border: none; border-radius: 8px;" allow="autoplay; fullscreen" allowfullscreen></iframe>
                </div>
            `;
            document.body.appendChild(modal);

            gsap.to(modal, { opacity: 1, duration: 0.4, ease: "power2.out" });

            modal.querySelector('.close-video').addEventListener('click', () => {
                gsap.to(modal, { opacity: 0, duration: 0.3, onComplete: () => modal.remove() });
            });
        });

        // 3. Build Catalog Carousel
        const carousel = document.getElementById('trending-carousel');
        videos.forEach(video => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.backgroundImage = `url('${video.thumbnail}')`;
            
            const overlay = document.createElement('div');
            overlay.className = 'card-overlay';
            overlay.textContent = 'work in progress please wait to be amused';
            card.appendChild(overlay);

            card.addEventListener('click', () => localStorage.setItem('lastWatched', video.id));
            carousel.appendChild(card);
        });

        // --- NEW: 4. Build 3D Orbital Gallery ---
        const carousel3d = document.getElementById('carousel-3d');
        const radius = 450; // Distance of images from center point
        
        // Inject images in a circular pattern
        orbitalImages.forEach((src, i) => {
            const angle = (360 / orbitalImages.length) * i;
            const item = document.createElement('div');
            item.className = 'carousel-item';
            // TranslateZ pushes it outward, RotateY orbits it
            item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
            item.innerHTML = `<img src="${src}" alt="Orbital Image">`;
            carousel3d.appendChild(item);
        });

        // Orbital Drag Logic
        let rotationY = 0;
        let startX = 0;
        let isDragging = false;
        let startRotation = 0;
        const scene = document.querySelector('.scene');

        // Set initial GSAP 3D position
        gsap.set(carousel3d, { z: -radius, rotationY: 0, transformStyle: "preserve-3d" });

        // Pointer Events for Desktop + Mobile Touch support
        scene.addEventListener('pointerdown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startRotation = rotationY;
            gsap.killTweensOf(carousel3d); // Stop momentum if grabbed mid-spin
        });

        window.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - startX;
            rotationY = startRotation + (deltaX * 0.4); // 0.4 is drag sensitivity
            gsap.set(carousel3d, { rotationY: rotationY });
        });

        window.addEventListener('pointerup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            // Add momentum/glide after release
            const deltaX = e.clientX - startX;
            rotationY = startRotation + (deltaX * 0.4);
            
            gsap.to(carousel3d, {
                rotationY: rotationY + (deltaX * 0.5), 
                duration: 1.5,
                ease: "power2.out",
                onUpdate: () => {
                    // Sync our local variable with GSAP's physics calculations
                    rotationY = gsap.getProperty(carousel3d, "rotationY");
                }
            });
        });

        // 5. Trigger Preloader Destruction Timeline
        const tl = gsap.timeline();
        const heartLoader = document.querySelector('.heart-loader');
        const heartPath = heartLoader.querySelector('path'); 
        const preloader = document.getElementById('preloader');

        tl.to(heartLoader, {
            scale: 50, opacity: 0, duration: 0.8, ease: "power4.in",
            onStart: () => {
                heartPath.style.fill = '#FFB6C1';
                heartPath.style.stroke = 'transparent';
                heartLoader.style.animation = 'none'; 
            }
        })
        .to(preloader, { 
            opacity: 0, duration: 0.4, ease: "power2.out",
            onStart: () => preloader.style.pointerEvents = 'none',
            onComplete: () => preloader.remove() 
        }, "-=0.4")
        .from('.navbar', { y: -80, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.2")
        .from('.hero-content > *', { y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }, "-=0.6")
        .from('.card', { x: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" }, "-=0.4")
        .from('.gallery-section', { opacity: 0, y: 50, duration: 1 }, "-=0.2");

    } catch (error) {
        console.error("Failed to load application data:", error);
        document.getElementById('preloader')?.remove(); 
    }
};

document.addEventListener('DOMContentLoaded', initApp);
