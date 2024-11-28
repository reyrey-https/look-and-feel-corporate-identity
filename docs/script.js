

const gallery = document.getElementById("gallery");

// Lijst met valid Picsum image IDs
const validIds = [
    1, 10, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112,
    113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125,
];


const generateImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * validIds.length);
    const id = validIds[randomIndex];
    return `https://picsum.photos/id/${id}/300/300`;
};


const loadImage = () => {
    const img = document.createElement("img");
    img.src = generateImageUrl();
    img.alt = "Dynamic Image";
    img.classList.add("masonry-image");

    img.addEventListener("error", () => {
        console.warn("Image failed to load. Retrying...");
        img.src = generateImageUrl(); 
    });

    return img;
};


const loadImages = (count = 25) => {
    for (let i = 0; i < count; i++) {
        gallery.appendChild(loadImage());
    }
};


const infiniteScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadImages(20); 
    }
};


const fillScreenWithImages = () => {
    const screenHeight = window.innerHeight;
    const imageHeight = 310; 
    const columns = Math.ceil(window.innerWidth / 210); 
    const rows = Math.ceil(screenHeight / imageHeight);
    const totalImages = columns * rows;

    loadImages(totalImages); 
};

// Event listeners
window.addEventListener("scroll", infiniteScroll); 
window.addEventListener("resize", fillScreenWithImages); 

fillScreenWithImages(); 
loadImages(25); 



