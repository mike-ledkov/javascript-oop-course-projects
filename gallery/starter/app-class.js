function getElement(selection) {
    const element = document.querySelector(selection)
    if (element) {return element}
    throw new Error(`Please check if the "${selection}" exists.`)
}

// ***** CLASS *****
class Gallery {
    constructor(element) {
        this.imageList = element.querySelectorAll(".img")
    
        this.closeBtn = getElement(".close-btn")
        this.prevBtn = getElement(".prev-btn")
        this.nextBtn = getElement(".next-btn")
        
        // We have to bind openModal to the gallery, otherwise "this" in the event listener will point to "element", i.e. a section (HTML element), that does not have access to this.imageList (because this.imageList belongs to the Gallery)
        // this.openModal = this.openModal.bind(this)
        // UPD: or we bind this right in the callback, see below
        
        element.addEventListener("click", this.openModal.bind(this))
    }

    openModal(event) {
        if (!event.target.src) return
    
        const clickedImage = event.target
        let DOMThumbs = ""
        let thumbnailClass
    
        for (const image of this.imageList) {
            if (image.dataset.id === clickedImage.dataset.id) {
                thumbnailClass = "thumbnail-img selected"
            }
            else {
                thumbnailClass = "thumbnail-img"
            }
            DOMThumbs += `<img src="${image.src}" title="${image.title}" alt="${image.alt}" class="${thumbnailClass}" data-id="${image.dataset.id}">`
        }
    
        // assign JS to HTML
        this.makeMain(clickedImage)
        thumbnails.innerHTML = DOMThumbs
    
        // open modal
        modal.classList.add("open")
    
        // Add event listeners
        this.closeModal = this.closeModal.bind(this)
        this.nextImg = this.nextImg.bind(this)
        this.prevImg = this.prevImg.bind(this)
        this.closeBtn.addEventListener("click", this.closeModal)
        this.prevBtn.addEventListener("click", this.prevImg)
        this.nextBtn.addEventListener("click", this.nextImg)
        thumbnails.addEventListener("click", this.selectImage)
    }
    
    closeModal() {
        modal.classList.remove("open")
        this.closeBtn.removeEventListener("click", this.closeModal)
        this.prevBtn.removeEventListener("click", this.prevImg)
        this.nextBtn.removeEventListener("click", this.nextImg)
        thumbnails.removeEventListener("click", this.selectImage)
    }
    
    nextImg() {
        // ci - current image, ni - next image
        const t0 = performance.now()
        const ci = thumbnails.querySelector(".selected")
        const ni = ci.nextElementSibling || thumbnails.firstElementChild
        ci.classList.remove("selected")
        ni.classList.add("selected")
        this.makeMain(ni)
        const t1 = performance.now()
        console.log(`It took ${(t1 - t0).toFixed(5)} milliseconds.`)
    }
    
    prevImg() {
        // ci - current image, pi - previous image
        const t0 = performance.now()
        const ci = thumbnails.querySelector(".selected")
        const pi = ci.previousElementSibling || thumbnails.lastElementChild
        ci.classList.remove("selected")
        pi.classList.add("selected")
        this.makeMain(pi)
        const t1 = performance.now()
        console.log(`It took ${(t1 - t0).toFixed(5)} milliseconds.`)
    }
    
    makeMain(source) {
        mainImg.src = source.src
        mainImg.title = source.title
        mainImg.alt = source.alt
        mainImg.dataset.id = source.dataset.id
        imageName.textContent = source.title
    }
    
    selectImage(e) {
        if (e.target.classList.contains("selected")) {
            console.log("it is already displayed")
            return
        }
        const t0 = performance.now()
        const ci = thumbnails.querySelector(".selected")
        ci.classList.remove("selected")
        e.target.classList.add("selected")
        Gallery.prototype.makeMain(e.target)
        const t1 = performance.now()
        console.log(`It took ${(t1 - t0).toFixed(5)} milliseconds.`)
    }
}
// *****

// Select elements
const modal = getElement(".modal")
const modalContent = getElement(".modal-content")
const mainImg = getElement(".main-img")
const thumbnails = getElement(".thumbnails") // modal-images
const imageName = getElement(".image-name")

// Create each gallery instance
const hungary = new Gallery(getElement(".hungary"))
const montenegro = new Gallery(getElement(".montenegro"))