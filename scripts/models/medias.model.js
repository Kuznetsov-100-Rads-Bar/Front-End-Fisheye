/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* It's a class that creates a list of media objects, and displays them on the page. */
export default class {
  /**
     * It takes an object with a photographerName and media object as parameters, then it creates a
     * source variable that is a string of the photographer's name and the media's image or video, then
     * it pushes the source, photographerName, and media object into the medias array, and then it
     * returns true.
     */
  constructor() {
    this.medias = [];
    this.tabIndex = 3;
  }

  init = (photographer, medias) => {
    const filterSelector = document.getElementById('filterSelector');

    /* It's a function that takes an event as a parameter, then it creates a selectedValue variable that
   is the value of the event's target, then it creates an updatedMedias variable that is an empty
   array, then it checks if the selectedValue is equal to 'popularity', and if it is, then it sets
   the updatedMedias variable to the medias array sorted by the likes property, then it checks if
   the selectedValue is equal to 'date', and if it is, then it sets the updatedMedias variable to
   the medias array sorted by the date property, then it checks if the selectedValue is equal to
   'title', and if it is, then it sets the updatedMedias variable to the medias array sorted by the
   title property, then it logs the updatedMedias variable to the console, then it calls the clear
   function, then it loops through the updatedMedias array and calls the add function, then it sets
   the tabIndex variable to 3, and then it calls the display function. */
    filterSelector.addEventListener('change', (event) => {
      const selectedValue = event.target.value;
      let updatedMedias = [];

      if (selectedValue === 'popularity') {
        updatedMedias = medias.sort((a, b) => (a.likes < b.likes ? 1 : -1));
      }

      if (selectedValue === 'date') {
        updatedMedias = medias.sort((a, b) => (new Date(a.date) - new Date(b.date)));
      }

      if (selectedValue === 'title') {
        updatedMedias = medias.sort((a, b) => (a.title > b.title ? 1 : -1));
      }

      // const updatedMedias = medias.sort((a, b) =>
      //     selectedValue === "popularity" ? a.likes < b.likes :
      //         selectedValue === "date" ? new Date(a.date) - new Date(b.date) :
      //             selectedValue === "title" ? a.title > b.title :
      //                 a.likes < b.likes
      // );

      // eslint-disable-next-line no-console
      console.log(updatedMedias);

      this.clear();

      updatedMedias.forEach((media) => {
        media.initialLikes = media.likes;
        this.add({ photographerName: photographer.name, media });
      });

      this.tabIndex = 3;
      this.display();
    });

    medias.sort((a, b) => a.likes < b.likes)
      .forEach((media) => {
        media.initialLikes = media.likes;
        this.add({ photographerName: photographer.name, media });
      });

    this.tabIndex = 3;
    this.display();
    this.displayLikes();
  };

  add = ({ photographerName, media }) => {
    const source = `assets/medias/${photographerName.split(' ')[0]}/${media.image ? media.image : media.video}`;
    this.medias.push({ source, media });
    return this.medias;
  };

  clear = () => {
    this.medias = [];
    return 'Media list cleared';
  };

  display = () => {
    const mediaSection = document.getElementById('mediaSection');
    mediaSection.innerHTML = '';
    this.medias.forEach((element) => {
      const { media } = element;

      const cardContainer = document.createElement('div');
      cardContainer.classList.add('media-card');

      this.tabIndex += 1;
      cardContainer.setAttribute('tabindex', this.tabIndex);

      const sourceType = element.source.split('.');

      const cardImage = document.createElement(sourceType[1] === 'mp4' ? 'video' : 'img');
      cardImage.setAttribute('src', element.source);
      cardImage.classList.add('media-img');
      cardImage.setAttribute('alt', `Media ${media.title}`);

      const mediaCardBody = document.createElement('div');
      mediaCardBody.classList.add('media-card-body');

      const mediaCardBodyTitle = document.createElement('p');
      mediaCardBodyTitle.classList.add('media-card-body-title');
      mediaCardBodyTitle.textContent = media.title;

      const mediaCardBodyLikes = document.createElement('div');
      mediaCardBodyLikes.classList.add('media-card-body-likes');

      const mediaCardLikesCount = document.createElement('span');
      mediaCardLikesCount.classList.add('likes-count');
      mediaCardLikesCount.textContent = media.likes;

      const mediaCardHeartIcon = document.createElement('button');
      mediaCardHeartIcon.setAttribute('type', 'button');
      mediaCardHeartIcon.classList.add('heart-icon');
      mediaCardHeartIcon.setAttribute('tabindex', this.tabIndex);

      mediaCardHeartIcon.addEventListener('click', (event) => this.updateLikes(event, element));

      const mediaCardHeartIconImage = document.createElement('img');
      mediaCardHeartIconImage.setAttribute('src', './assets/icons/HeartIcon.png');
      mediaCardHeartIconImage.setAttribute('alt', 'Icone de coeur pour le bouton qui permet de liker le media.');

      cardContainer.appendChild(cardImage);
      cardContainer.appendChild(mediaCardBody);
      mediaCardBody.appendChild(mediaCardBodyTitle);
      mediaCardBody.appendChild(mediaCardBodyLikes);
      mediaCardBodyLikes.appendChild(mediaCardLikesCount);
      mediaCardBodyLikes.appendChild(mediaCardHeartIcon);
      mediaCardHeartIcon.appendChild(mediaCardHeartIconImage);
      return mediaSection.append(cardContainer);
    });

    return this.medias;
  };

  displayLikes = () => {
    const likesSpan = document.querySelector('.user_statistics_likes');

    let likes = 0;
    this.medias.forEach((media) => {
      likes += media.media.likes;
    });

    likesSpan.innerHTML = `${likes} &#10084;`;
    return likes;
  };

  updateLikes = (event, element) => {
    const mediaLikes = element.media.initialLikes;
    const likeSpan = event.target.nodeName === 'IMG' ? event.target.parentNode.parentNode.firstChild : event.target.parentNode.firstChild;

    likeSpan.textContent = parseInt(likeSpan.textContent, 10) === mediaLikes ? mediaLikes + 1 : mediaLikes;

    if (element.media.likes === mediaLikes) {
      element.media.likes += 1;
    } else {
      element.media.likes = mediaLikes;
    }

    this.displayLikes();

    return { initialLikes: mediaLikes, updateTo: element.media.likes };
  };
}
