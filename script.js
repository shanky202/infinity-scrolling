const imageContainer = document.getElementById("image-container");
const loader = document.getElementById('loader');

let ready = false;
let imgLoaded = 0;
let totalImage = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'aQzvsN2K1pCOeZINPz3mvA7Vnzl4wZrgcrUg6ekgBJg';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all image loaded 
function imageLoaded() {
    imgLoaded ++;
    if (imgLoaded === totalImage) {
        ready = true;
        loader.hidden = true;
    }
}
// Helper Function to Set Attributes On DOM Element
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Element For Links & Photos, Add to DOM
function displayPhotos() {
    totalImage = photosArray.length;
    photosArray.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            "href": photo.links.html,
            "target": "_blank"
        })
        //  Create <img> for photos
        const img = document.createElement("img");
        setAttributes(img, {
            "src": photo.urls.regular,
            "alt": photo.alt_description,
            "title": photo.alt_description
        })
        // Event Listerne. Check when each img is finished loading
        img.addEventListener('load', imageLoaded())
        // Put <img> inside <a> And then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
// Get photos from unsplash API
async function getPhotosFromApi() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (err) {
        getPhotosFromApi();
    } 
}

// Check to Scroll button near bottom of page
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotosFromApi();
        ready = false;
        imgLoaded = 0
    }
})

// On Load 
getPhotosFromApi()