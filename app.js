const fetchExternalData = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    title: "Her",
                    description: "A beautiful creation of the god on earth.",
                    // CRITICAL FIX: Using Google Drive's hidden thumbnail API
                    thumbnail: "https://drive.google.com/thumbnail?id=1tsyy0OIAWh-l6q4RbzAellncKxKrwb8_&sz=w1200",
                    videoUrl: "#" // Not used for the Drive iframe workaround
                },
                {
                    id: 2,
                    title: "Earrings",
                    description: "Exploring the highest peaks.",
                    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
                    videoUrl: "#"
                },
                {
                    id: 3,
                    title: "Ocean like Eyes",
                    description: "Into the blue.",
                    thumbnail: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=800&q=80",
                    videoUrl: "#"
                }
            ]);
        }, 1200); 
    });
};

const initApp = async () => {
    try {
        const videos = await fetchExternalData();
        
        // 1. Build DOM Elements First
        const hero = document.getElementById('hero-section');
        const heroTitle = document.getElementById('hero-title');
        const heroDesc = document.getElementById('hero-desc');
        
        hero.style.backgroundImage = `linear-gradient(to right, rgba(20,20,20,0.9) 0%, rgba(20,20,20,0.4) 100%), url('${videos[0].thumbnail}')`;
        heroTitle.textContent = videos[0].title;
        heroDesc.textContent = videos[0].description;

        // --- Hero Play Button Logic (Video Modal) ---
        const playBtn = document.querySelector('.play-btn');
        playBtn.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.id = 'video-modal';
            
            const closeBtn = document.createElement('div');
            closeBtn.className = 'close-video';
            closeBtn.innerHTML = '&times;';
            
            // CRITICAL FIX: Swap <video> for <iframe> to bypass CORS block
            const iframe = document.createElement('iframe');
            iframe.src = 'https://drive.google.com/file/d/1EFvsfwKlmsulQEDAAJSjraLoqLmNkKzj/preview';
            iframe.width = '80%'; // Keeps it cinematic inside the modal
            iframe.height = '80%';
            iframe.style.border = 'none';
            iframe.allow = 'autoplay'; 
            
            modal.appendChild(closeBtn);
            modal.appendChild(iframe);
            document.body.appendChild(modal);
            
            gsap.to(modal, { opacity: 1, duration: 0.4, ease: "power2.out" });
            
            closeBtn.addEventListener('click', () => {
                // Iframe audio keeps playing if you don't destroy the node immediately
                gsap.to(modal, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => modal.remove()
                });
            });
        });
        // ---------------------------------------------

        const carousel = document.getElementById('trending-carousel');
        videos.forEach(video => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.backgroundImage = `url('${video.thumbnail}')`;
            
            // Inject Hover Overlay
            const overlay = document.createElement('div');
            overlay.className = 'card-overlay';
            overlay.textContent = 'work in progress please wait to be amused';
            card.appendChild(overlay);

            card.addEventListener('click', () => {
                console.log(`Play video: ${video.title}`);
                localStorage.setItem('lastWatched', video.id);
            });
            carousel.appendChild(card);
        });

        // 2. Trigger GSAP Timeline
        const tl = gsap.timeline();
        const heartLoader = document.querySelector('.heart-loader');
        const heartPath = heartLoader.querySelector('path'); 
        const preloader = document.getElementById('preloader');

        tl.to(heartLoader, {
            scale: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power4.in",
            onStart: () => {
                heartPath.style.fill = '#FFB6C1';
                heartPath.style.stroke = 'transparent';
                heartLoader.style.animation = 'none'; 
            }
        })
        .to(preloader, { 
            opacity: 0, 
            duration: 0.4, 
            ease: "power2.out",
            onStart: () => {
                preloader.style.pointerEvents = 'none'; 
            },
            onComplete: () => preloader.remove() 
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
        document.getElementById('preloader')?.remove(); 
    }
};

document.addEventListener('DOMContentLoaded', initApp);
