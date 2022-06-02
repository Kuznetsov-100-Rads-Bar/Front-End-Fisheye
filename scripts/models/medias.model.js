/* It's a class that creates a list of media objects, and displays them on the page. */
export class MediaList {
    /**
     * It takes an object with a photographerName and media object as parameters, then it creates a
     * source variable that is a string of the photographer's name and the media's image or video, then
     * it pushes the source, photographerName, and media object into the medias array, and then it
     * returns true.
     */
    constructor() {
        this.medias = [];
    }

    init = (photographer, medias) => {
        const filterSelector = document.getElementById("filterSelector");

        filterSelector.addEventListener("change", (event) => {
            const selectedValue = event.target.value;

            const updatedMedias = medias.sort((a, b) =>
                selectedValue === "popularity" ? a.likes < b.likes :
                    selectedValue === "date" ? new Date(a.date) - new Date(b.date) :
                        selectedValue === "title" ? a.title > b.title :
                            a.likes < b.likes
            );

            this.clear();

            updatedMedias.forEach((media) => {
                media.initialLikes = media.likes;
                this.add({ photographerName: photographer.name, media: media });
            });

            this.display();
        });

        medias.sort((a, b) => a.likes < b.likes)
            .forEach((media) => {
                media.initialLikes = media.likes;
                this.add({ photographerName: photographer.name, media: media });
            });

        this.display();
        this.displayLikes();
    }

    add = ({ photographerName, media }) => {
        const source = `assets/medias/${photographerName.split(" ")[0]}/${media.image ? media.image : media.video}`
        this.medias.push({ source: source, media: media });
        return this.medias;
    }

    clear = () => {
        this.medias = [];
        return "Media list cleared";
    }

    display = () => {
        const mediaSection = document.getElementById("mediaSection");
        mediaSection.innerHTML = "";
        this.medias.forEach((element) => {
            const media = element.media;

            const cardContainer = document.createElement("div");
            cardContainer.classList.add("media-card");

            const sourceType = element.source.split(".");

            const cardImage = document.createElement(sourceType[1] === "mp4" ? "video" : "img");
            cardImage.setAttribute("src", element.source);
            cardImage.classList.add("media-img");
            cardImage.setAttribute("alt", "Media " + media.title);

            const mediaCardBody = document.createElement("div");
            mediaCardBody.classList.add("media-card-body");

            const mediaCardBodyTitle = document.createElement("p");
            mediaCardBodyTitle.classList.add("media-card-body-title");
            mediaCardBodyTitle.textContent = media.title;

            const mediaCardBodyLikes = document.createElement("div");
            mediaCardBodyLikes.classList.add("media-card-body-likes");

            const mediaCardLikesCount = document.createElement("span");
            mediaCardLikesCount.classList.add("likes-count");
            mediaCardLikesCount.textContent = media.likes

            const mediaCardHeartIcon = document.createElement("button");
            mediaCardHeartIcon.setAttribute("type", "button");
            mediaCardHeartIcon.classList.add("heart-icon");
            mediaCardHeartIcon.innerHTML = "&#10084;";

            mediaCardHeartIcon.addEventListener("click", (event) => this.updateLikes(event, element));

            cardContainer.appendChild(cardImage);
            cardContainer.appendChild(mediaCardBody);
            mediaCardBody.appendChild(mediaCardBodyTitle);
            mediaCardBody.appendChild(mediaCardBodyLikes);
            mediaCardBodyLikes.appendChild(mediaCardLikesCount);
            mediaCardBodyLikes.appendChild(mediaCardHeartIcon);

            return mediaSection.append(cardContainer);
        });

        return this.medias;
    }

    displayLikes = () => {
        const likesSpan = document.querySelector(".user_statistics_likes");

        let likes = 0;
        this.medias.forEach((media) => likes += media.media.likes);

        likesSpan.innerHTML = `${likes} &#10084;`;
        return likes;
    }

    updateLikes = (event, element) => {
        const mediaLikes = element.media.initialLikes;
        const likeSpan = event.target.parentNode.firstChild;

        likeSpan.textContent = parseInt(likeSpan.textContent) === mediaLikes ? mediaLikes + 1 : mediaLikes;
        element.media.likes === mediaLikes ? element.media.likes += 1 : element.media.likes = mediaLikes;
        this.displayLikes();

        return { initialLikes: mediaLikes, updateTo: element.media.likes };
    }
}