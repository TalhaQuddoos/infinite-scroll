// Unsplash API
const imageContainer = document.getElementById("image-container")
var photoArray = []
const apiKey = 'KAHykfn2KRI8nSk8Gkxoz8oCvmqzIFI4BkFrBm5k_Dw'
const count = 10
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}
function imageLoaded(){
    console.log('image loaded')
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = ready;
    }
}

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photoArray.length;
    photoArray.forEach((photo) => {
        const item = document.createElement('a')

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        const image = document.createElement('img')

        image.addEventListener('load', imageLoaded)
        setAttributes(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        item.appendChild(image)

        imageContainer.appendChild(item)
    });
}

async function getPhotos(){
    try{
        const response = await fetch(apiUrl)
        photoArray = await response.json()
        displayPhotos();
    } catch(error) {
        console.log(error)
    }
}

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000){
        getPhotos();
        console.log('get photos')
    }
})

getPhotos()