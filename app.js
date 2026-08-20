const fetchExternalData = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    title: "Her",
                    description: "A beautiful creation of the god on earth.",
                    thumbnail: "https://drive.google.com/thumbnail?id=1tsyy0OIAWh-l6q4RbzAellncKxKrwb8_&sz=w1200",
                    videoUrl: "https://drive.google.com/uc?export=download&id=1EFvsfwKlmsulQEDAAJSjraLoqLmNkKzj" 
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

        // --- Custom HTML5 Player Logic ---
        const playBtn = document.querySelector('.play-btn');
        playBtn.addEventListener('click', async () => {
            const modal = document.createElement('div');
            modal.id = 'video-modal';
            
            modal.innerHTML = `
                <div class="close-video">&times;</div>
                <div class="video-container" id="video-container">
                    <video id="main-video" src="${videos[0].videoUrl}"></video>
                    <div class="custom-controls">
                        <input type="range" id="progress-bar" value="0" min="0" max="100" step="0.1">
                        <div class="control-buttons">
                            <div class="control-left">
                                <button id="play-pause">⏸</button>
                                <select id="speed-control">
                                    <option value="0.5">0.5x</option>
                                    <option value="1" selected>1x Normal</option>
                                    <option value="1.5">1.5x</option>
                                    <option value="2">2x</option>
                                </select>
                            </div>
                            <button id="fullscreen-btn">⛶</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            const video = document.getElementById('main-video');
            const container = document.getElementById('video-container');
            const progressBar = document.getElementById('progress-bar');
            const playPauseBtn = document.getElementById('play-pause');
            const speedControl = document.getElementById('speed-control');
            const fullscreenBtn = document.getElementById('fullscreen-btn');
            const closeBtn = modal.querySelector('.close-video');

            // Playbar Sync
            video.addEventListener('timeupdate', () => {
                if(video.duration) {
                    progressBar.value = (video.currentTime / video.duration) * 100;
                }
            });

            // Seeking
            progressBar.addEventListener('input', (e) => {
                video.currentTime = (e.target.value / 100) * video.duration;
            });

            // Play/Pause
            playPauseBtn.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    playPauseBtn.textContent = '⏸';
                } else {
                    video.pause();
                    playPauseBtn.textContent = '▶';
                }
            });

            // Playback Speed
            speedControl.addEventListener('change', (e) => {
                video.playbackRate = e.target.value;
            });

            // Fullscreen API
            fullscreenBtn.addEventListener('click', () => {
                if (!document.fullscreenElement) {
                    container.requestFullscreen().catch(err => console.log(err));
                } else {
                    document.exitFullscreen();
                }
            });

            // GSAP Fade-in
            gsap.to(modal, { opacity: 1, duration: 0.4, ease: "power2.out" });

            // Force Play and attempt Fullscreen immediately
            try {
                await video.play();
                await container.requestFullscreen();
            } catch (err) {
                console.warn("Browser blocked auto-fullscreen or auto-play without gesture:", err);
            }
            
            // Destruction Logic
            closeBtn.addEventListener('click', () => {
                video.pause(); 
                if (document.fullscreenElement) document.exitFullscreen();
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
