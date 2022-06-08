const lightBoxModal = document.querySelector(".lightbox_modal");
const lightBoxMediaContainer = document.querySelector(".media_container");

const root = document.querySelector(".photographer");


export class Lightbox {
    constructor(medias, photographerName) {
        this.medias = medias;
        this.currentImageIndex = 0;
        this.photographerName = photographerName;
        this.isDisplayed = false;
    }

    keyHandler = (event) => {
        const key = event.key;

        if (key === "ArrowRight") {
            this.change("next");
        } else if (key === "ArrowLeft") {
            this.change("previous");
        } else if (key === "Escape") {
            this.close();
        }
        // console.log(key);
    }

    display = (selectedMedia) => {
        if (this.isDisplayed) {
            root.removeEventListener("keyup", (event) => this.keyHandler(event));
            return this.close();
        }


        root.addEventListener("keyup", this.keyHandler);

        const splittedSelectedMedia = selectedMedia.split(".");
        const isMediaVideo = Boolean(splittedSelectedMedia[splittedSelectedMedia.length - 1] === "mp4");

        this.currentImageIndex = this.medias.findIndex((media) => isMediaVideo ? media.video : media.image === selectedMedia)

        const mediaSource = `assets/medias/${this.photographerName.split(" ")[0]}/${isMediaVideo ? this.medias[this.currentImageIndex].video : this.medias[this.currentImageIndex].image}`

        const mediaName = this.medias[this.currentImageIndex].title;


        let media;

        isMediaVideo ? (
            media = document.createElement("video"),
            media.setAttribute("autoplay", true)
        ) : !isMediaVideo ? (
            media = document.createElement("img")
        ) : media = document.createElement("span");

        media.setAttribute("src", mediaSource);
        media.classList.add("lightbox_media");
        media.setAttribute("alt", "Media");


        const mediaTitle = document.createElement("p");
        mediaTitle.classList.add("lightbox_media_title");
        mediaTitle.textContent = mediaName;

        lightBoxMediaContainer.innerHTML = '';
        lightBoxMediaContainer.appendChild(media);
        lightBoxMediaContainer.appendChild(mediaTitle);


        this.isDisplayed = true;
        return lightBoxModal.style.display = 'block';
    }

    close = () => {
        // console.log("IsShowed ?", this.isDisplayed)
        if (this.isDisplayed) {
            root.removeEventListener("keyup", this.keyHandler);
            this.isDisplayed = false;
            return lightBoxModal.style.display = 'none';
        }
    }

    change = (direction) => {
        direction === "next" ? (
            !this.medias[this.currentImageIndex + 1] ? this.currentImageIndex = 0 : this.currentImageIndex += 1
        ) : (
            !this.medias[this.currentImageIndex - 1] ? this.currentImageIndex = (this.medias.length - 1) : this.currentImageIndex -= 1
        );

        const isMediaVideo = Boolean(this.medias[this.currentImageIndex].video);

        const mediaSource = `assets/medias/${this.photographerName.split(" ")[0]}/${isMediaVideo ? this.medias[this.currentImageIndex].video : this.medias[this.currentImageIndex].image}`

        const mediaName = this.medias[this.currentImageIndex].title;

        let media;

        isMediaVideo ? (
            media = document.createElement("video"),
            media.setAttribute("autoplay", true)
        ) : !isMediaVideo ? (
            media = document.createElement("img")
        ) : media = document.createElement("span");

        media.setAttribute("src", mediaSource);
        media.classList.add("lightbox_media");
        media.setAttribute("alt", "Media");


        const mediaTitle = document.createElement("p");
        mediaTitle.classList.add("lightbox_media_title");
        mediaTitle.textContent = mediaName;

        lightBoxMediaContainer.innerHTML = '';
        lightBoxMediaContainer.appendChild(media);
        lightBoxMediaContainer.appendChild(mediaTitle);

        return "change media";
    }


}