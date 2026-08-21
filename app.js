const fetchExternalData = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    id: 1, title: "Her", description: "A beautiful creation of the god on earth.",
                    thumbnail: "https://drive.google.com/thumbnail?id=1tsyy0OIAWh-l6q4RbzAellncKxKrwb8_&sz=w1200",
                    videoEmbedUrl: "https://drive.google.com/file/d/1EFvsfwKlmsulQEDAAJSjraLoqLmNkKzj/preview"
                }
            ]);
        }, 1200); 
    });
};

const orbitalImages = [
    "https://drive.google.com/thumbnail?id=1yoGMAfJqxtYDVbGwFyfUOqksmJFjyyuV&sz=w800",
    "https://drive.google.com/thumbnail?id=1xnjGgxHiGJtyqF6A4Wwl8D2AjTE_yr1e&sz=w800",
    "https://drive.google.com/thumbnail?id=1SKYnz8UcFb4rleL4Q71CdDQZfjP4LzK1&sz=w800",
    "https://drive.google.com/thumbnail?id=1IYnFE0RePrUDYJb88tx5Q5FE7IlRAY7X&sz=w800",
    "https://drive.google.com/thumbnail?id=1z2w2CdXRCDwA7SILUlbqrGWGkcXP1fLJ&sz=w800",
    "https://drive.google.com/thumbnail?id=1JJKGVLHWpCZbmXodYox3BaAbwXt9vQMo&sz=w800",
    "https://drive.google.com/thumbnail?id=1pzDYoTwzqKD2wrwgIVAuYaJKfopyDjfY&sz=w800"
];

const loveNotes = [
    "I love your smile.", "I love the way your eyes light up when you're happy.", "I love how deeply you feel things.",
    "I love your softness.", "I love how much you care about people.", "I love your pure intentions.",
    "I love the way you try to see good in people.", "I love your little expressions.", "I love hearing your voice.",
    "I love the way you say my name.", "I love your laugh.", "I love when you get shy.", "I love your stubborn side.",
    "I love how passionate you can become about something you care about.", "I love your honesty with me.",
    "I love that you tell me what's actually going on inside your head.", "I love your vulnerable side.",
    "I love that you trust me with your fears.", "I love your random thoughts.", "I love our stupid conversations.",
    "I love the silence we can share too.", "I love the comfort of simply being around you.", "I love how your presence changes my mood.",
    "I love how one message from you can make my entire day different.", "I love your hugs.", "I love the feeling of having you close to me.",
    "I love looking at you when you don't know I'm looking.", "I love your sleepy face.", "I love your annoyed face.",
    "I love your cute angry moments.", "I love when you pretend not to care.", "I love when you secretly do care.",
    "I love the little things you remember.", "I love the way you notice things other people overlook.", "I love your emotional depth.",
    "I love how protective you can be about the people you love.", "I love how you want everyone around you to be okay.",
    "I love your kindness.", "I love your empathy.", "I love your ability to make people feel heard.",
    "I love that you don't have to pretend to be perfect around me.", "I love that I get to see the real you.",
    "I love your imperfections.", "I love your complicated sides.", "I love the parts of you that you're still learning to understand.",
    "I love that you're still growing.", "I love watching you become more confident.", "I love your strength, especially when you don't realize you have it.",
    "I love how much you've survived without letting it completely change your heart.", "I love that there's still softness inside you despite everything.",
    "I love your little habits.", "I love your random moods.", "I love your dramatic moments.", "I love when you tease me.",
    "I love when you make fun of me.", "I love our inside jokes.", "I love the memories we've already created.",
    "I love that some ordinary moments with you somehow become special.", "I love how time feels different when I'm with you.",
    "I love missing you because it reminds me how much you mean to me.", "I love the way you make me want to become better.",
    "I love that you make me think about my future differently.", "I love how seriously I take your happiness.",
    "I love wanting to protect your peace.", "I love being someone you can lean on.", "I love being able to make you smile.",
    "I love when I know I've made your difficult day a little easier.", "I love seeing you genuinely happy.",
    "I love when you get excited about something.", "I love listening to you talk about things you're passionate about.",
    "I love your dreams.", "I love your little hopes for the future.", "I love imagining the places we could go together.",
    "I love the possibility of all the memories we haven't made yet.", "I love that there's still so much about you I want to discover.",
    "I love learning new things about you.", "I love how you can surprise me.", "I love that you don't fit into one simple description.",
    "I love that you're more than just the version everyone else sees.", "I love the person you are when you feel completely safe.",
    "I love how your guard slowly comes down with me.", "I love every little moment when you let me closer.",
    "I love knowing that you don't have to carry everything alone when you're with me.", "I love the trust we're building.",
    "I love the connection we're creating.", "I love that our relationship isn't just about happy moments.",
    "I love that we can have difficult conversations and still choose to understand each other.", "I love that you're honest when you're scared.",
    "I love that you tell me when you're unsure.", "I love you even when you don't know how to receive my love.",
    "I love you even when your mind tells you things that make you doubt us.", "I love that I don't need you to be perfect to choose you.",
    "I love that I don't love some imaginary version of you.", "I love you as you are right now.",
    "I love the person I become when I'm genuinely caring for you.", "I love that knowing you has changed parts of me.",
    "I love that your happiness matters to me in a way that's difficult to explain.", "I love that out of all the people in the world, somehow I found you.",
    "I love every version of you I've gotten to know.", "And most of all, I love you—not because of 100 reasons, but because even after trying to list them all, I still feel like I've left something out."
];

const initApp = async () => {
    try {
        const videos = await fetchExternalData();
        
        // 1. Hero & Modal
        const hero = document.getElementById('hero-section');
        hero.style.backgroundImage = `linear-gradient(to right, rgba(20,20,20,0.9) 0%, rgba(20,20,20,0.4) 100%), url('${videos[0].thumbnail}')`;
        document.getElementById('hero-title').textContent = videos[0].title;
        document.getElementById('hero-desc').textContent = videos[0].description;

        document.querySelector('.play-btn').addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.95); z-index: 100000; display: flex; justify-content: center; align-items: center; opacity: 0;';
            modal.innerHTML = `
                <div class="close-video" style="position: absolute; top: 30px; right: 40px; color: white; font-size: 3.5rem; cursor: pointer; z-index: 100001;">&times;</div>
                <div style="width: 90vw; height: 85vh; max-width: 1600px;">
                    <iframe src="${videos[0].videoEmbedUrl}" style="width: 100%; height: 100%; border: none; border-radius: 8px;" allow="autoplay; fullscreen" allowfullscreen></iframe>
                </div>
            `;
            document.body.appendChild(modal);
            gsap.to(modal, { opacity: 1, duration: 0.4 });
            modal.querySelector('.close-video').addEventListener('click', () => {
                gsap.to(modal, { opacity: 0, duration: 0.3, onComplete: () => modal.remove() });
            });
        });

        // 2. 3D Image Orbit Logic
        const imageCarousel = document.getElementById('image-carousel-3d');
        const imgRadius = 450; 
        
        orbitalImages.forEach((src, i) => {
            const angle = (360 / orbitalImages.length) * i;
            const item = document.createElement('div');
            item.className = 'carousel-item';
            item.style.transform = `rotateY(${angle}deg) translateZ(${imgRadius}px)`;
            item.innerHTML = `<img src="${src}" alt="Orbital Image">`;
            imageCarousel.appendChild(item);
        });

        let imgRotY = 0, imgStartX = 0, imgDragging = false, imgStartRot = 0;
        const imgScene = document.querySelector('.image-scene');
        gsap.set(imageCarousel, { z: -imgRadius, rotationY: 0, transformStyle: "preserve-3d" });

        imgScene.addEventListener('pointerdown', (e) => {
            imgDragging = true; imgStartX = e.clientX; imgStartRot = imgRotY; gsap.killTweensOf(imageCarousel); 
        });
        window.addEventListener('pointermove', (e) => {
            if (!imgDragging) return;
            imgRotY = imgStartRot + ((e.clientX - imgStartX) * 0.4); 
            gsap.set(imageCarousel, { rotationY: imgRotY });
        });
        window.addEventListener('pointerup', (e) => {
            if (!imgDragging) return;
            imgDragging = false;
            gsap.to(imageCarousel, {
                rotationY: imgRotY + ((e.clientX - imgStartX) * 0.5), duration: 1.5, ease: "power2.out",
                onUpdate: () => imgRotY = gsap.getProperty(imageCarousel, "rotationY")
            });
        });

       // 3. Build Infinite Parallax Text Gallery
        const parallaxContainer = document.getElementById('infinite-parallax');
        const gridW = 4000; // The virtual width of our infinite universe
        const gridH = 4000; // The virtual height
        const cardsData = [];

        // Generate the universe of cards
        loveNotes.forEach((text, i) => {
            const card = document.createElement('div');
            card.className = 'parallax-card';
            card.innerHTML = `<p>${text}</p>`;
            parallaxContainer.appendChild(card);

            // Randomize position, depth, and size for parallax effect
            const depth = Math.random(); // 0 (background) to 1 (foreground)
            const speed = 0.5 + (depth * 1.5); // Foreground moves faster
            const scale = 0.6 + (depth * 0.6); // Foreground is larger
            const opacity = 0.3 + (depth * 0.7); // Background is faded
            
            // Random base coordinates within the virtual grid
            const baseX = Math.random() * gridW;
            const baseY = Math.random() * gridH;

            // Store physics data on the element
            cardsData.push({ el: card, baseX, baseY, speed, scale, opacity });
            
            // Apply static styling
            gsap.set(card, { scale: scale, opacity: opacity, transformOrigin: "center center" });
        });

        // Parallax Drag Logic
        let panX = 0, panY = 0;
        let pStartX = 0, pStartY = 0;
        let pDragging = false;

        parallaxContainer.addEventListener('pointerdown', (e) => {
            pDragging = true;
            pStartX = e.clientX - panX;
            pStartY = e.clientY - panY;
            gsap.killTweensOf(window); // Stop glide momentum
        });

        window.addEventListener('pointermove', (e) => {
            if (!pDragging) return;
            panX = e.clientX - pStartX;
            panY = e.clientY - pStartY;
            updateParallax();
        });

        window.addEventListener('pointerup', (e) => {
            if (!pDragging) return;
            pDragging = false;
            
            // Momentum glide based on velocity
            const deltaX = e.clientX - (pStartX + panX);
            const deltaY = e.clientY - (pStartY + panY);
            
            gsap.to(window, {
                duration: 1.5,
                ease: "power2.out",
                onUpdate: () => {
                    panX += deltaX * 0.1;
                    panY += deltaY * 0.1;
                    updateParallax();
                }
            });
        });

        // The core rendering engine for the infinite wrap
        function updateParallax() {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;

            cardsData.forEach(card => {
                // Apply drag offset multiplied by the card's specific parallax speed
                let currentX = card.baseX + (panX * card.speed);
                let currentY = card.baseY + (panY * card.speed);

                // Mathematical Infinite Wrap: Keeps the card inside the virtual grid
                let wrappedX = ((currentX % gridW) + gridW) % gridW;
                let wrappedY = ((currentY % gridH) + gridH) % gridH;

                // Center the virtual grid around the user's screen
                let renderX = wrappedX - (gridW / 2) + cx;
                let renderY = wrappedY - (gridH / 2) + cy;

                gsap.set(card.el, { x: renderX, y: renderY });
            });
        }
        
        // Initial render
        updateParallax();
        // 4. Preloader Destruction
        const tl = gsap.timeline();
        const heartLoader = document.querySelector('.heart-loader');
        const heartPath = heartLoader.querySelector('path'); 
        const preloader = document.getElementById('preloader');

        tl.to(heartLoader, { scale: 50, opacity: 0, duration: 0.8, ease: "power4.in", onStart: () => { heartPath.style.fill = '#FFB6C1'; heartPath.style.stroke = 'transparent'; heartLoader.style.animation = 'none'; }})
        .to(preloader, { opacity: 0, duration: 0.4, ease: "power2.out", onStart: () => preloader.style.pointerEvents = 'none', onComplete: () => preloader.remove() }, "-=0.4")
        .from('.navbar', { y: -80, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.2")
        .from('.hero-content > *', { y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }, "-=0.6")
        .from('.gallery-section', { opacity: 0, y: 50, duration: 1, stagger: 0.2 }, "-=0.2");

    } catch (error) {
        console.error("Failed to load application data:", error);
        document.getElementById('preloader')?.remove(); 
    }
};

document.addEventListener('DOMContentLoaded', initApp);
