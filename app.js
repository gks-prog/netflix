// This simulates fetching data from a remote database/CMS
// NEVER upload video files directly to the GitHub repo
const fetchExternalData = async () => {
    // In production: const response = await fetch('https://your-api.com/videos');
    // return await response.json();
    
    return [
        {
            id: 1,
            title: "Cyberpunk City",
            description: "A deep dive into futuristic urban landscapes.",
            thumbnail: "https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&w=800&q=80",
            videoUrl: "#" // Link to Mux or CDN stream here
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
    ];
};

const initApp = async () => {
    const videos = await fetchExternalData();
    
    // Set Hero Section
    const hero = document.getElementById('hero-section');
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    
    hero.style.backgroundImage = `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%), url(${videos[0].thumbnail})`;
    heroTitle.textContent = videos[0].title;
    heroDesc.textContent = videos[0].description;

    // Populate Carousel
    const carousel = document.getElementById('trending-carousel');
    
    videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.backgroundImage = `url(${video.thumbnail})`;
        
        card.addEventListener('click', () => {
            // Logic to open video player module
            console.log(`Play video: ${video.title} from ${video.videoUrl}`);
            // Save state to localStorage for the login-free history tracking
            localStorage.setItem('lastWatched', video.id);
        });
        
        carousel.appendChild(card);
    });
};

document.addEventListener('DOMContentLoaded', initApp);
