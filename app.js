const fetchExternalData = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    title: "Cyberpunk City",
                    description: "A deep dive into futuristic urban landscapes.",
                    thumbnail: "https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&w=1200&q=80",
                    videoUrl: "#"
                },
                {
                    id: 2,
                    title: "Mountain Heights",
                    description: "Exploring the highest peaks.",
                    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
                    videoUrl: "#"
                },
                {
                    id: 3,
                    title: "Ocean Depths",
                    description: "Into the blue.",
                    thumbnail: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=800&q=80",
                    videoUrl: "#"
                }
            ]);
        }, 1200); // Wait 1.2s to simulate network latency and show preloader
    });
};

const initApp = async () => {
    try {
        const videos = await fetchExternalData();
        
        // 1. Build DOM Elements First
        const hero = document.getElementById('hero-section');
        const heroTitle = document.getElementById('hero-title');
        const heroDesc = document.getElementById('hero-desc');
        
        hero.style.backgroundImage = `linear-gradient(to right, rgba(20,20,20,0.9) 0%, rgba(20,20,20,0.4) 100%), url(${videos[0].thumbnail})`;
        heroTitle.textContent = videos[0].title;
        heroDesc.textContent = videos[0].description;

        const carousel = document.getElementById('trending-carousel');
        videos.forEach(video => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.backgroundImage = `url(${video.thumbnail})`;
            
            card.addEventListener('click', () => {
                console.log(`Play video: ${video.title}`);
                localStorage.setItem('lastWatched', video.id);
            });
            carousel.appendChild(card);
        });

        // 2. Trigger the GSAP Timeline
        const tl = gsap.timeline();
        const heartLoader = document.querySelector('.heart-loader');
        const preloader = document.getElementById('preloader');

        tl.to(heartLoader, {
            scale: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power4.in",
            onStart: () => {
                heartLoader.style.animation = 'none'; // Stop CSS loop
            }
        })
        .to(preloader, { 
            opacity: 0, 
            duration: 0.4, 
            ease: "power2.out",
            onStart: () => {
                preloader.style.pointerEvents = 'none'; // Unblock clicks immediately
            },
            onComplete: () => preloader.remove() // Strip from DOM
        }, "-=0.4")
        .from('.navbar', { 
            y: -80, 
            opacity: 0, 
            duration: 0.8, 
            ease: "power3.out" 
        }, "-=0.2")
        .from('.hero-content > *', { 
            y: 30, 
            opacity: 0, 
            duration: 0.8, 
            stagger: 0.15, 
            ease: "power3.out" 
        }, "-=0.6")
        .from('.card', { 
            x: 40, 
            opacity: 0, 
            duration: 0.6, 
            stagger: 0.1, 
            ease: "back.out(1.5)" 
        }, "-=0.4");

    } catch (error) {
        console.error("Failed to load application data:", error);
        document.getElementById('preloader')?.remove(); // Fail-safe
    }
};

document.addEventListener('DOMContentLoaded', initApp);
