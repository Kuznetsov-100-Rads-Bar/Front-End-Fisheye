/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* It's a class that creates a list of media objects, and displays them on the page. */

const factoryMediaDom = (src) => document.createElement(src === 'mp4' ? 'video' : 'img');

/* C'est une classe qui a un constructeur, une fonction init, une fonction add, une fonction clear, un display
fonction, une fonction displayLikes et une fonction updateLikes. */
export default class {
  /**
     * Il prend un objet avec un nom de photographe et un objet multimédia comme paramètres, puis il crée un variable source qui est une chaîne du nom du photographe et de l'image ou de la vidéo du média, puis il pousse la source, le nom du photographe et l'objet multimédia dans le tableau des médias, puis il renvoie true.
     */
  constructor() {
    this.medias = [];
    this.tabIndex = 3;
  }

  init = (photographer, medias) => {
    const filterSelector = document.getElementById('filterSelector');

    /* C'est une fonction qui prend un événement comme paramètre, puis crée une variable selectedValue qui
   est la valeur de la cible de l'événement, puis il crée une variable updatedMedias qui est vide
   tableau, puis il vérifie si la valeur sélectionnée est égale à 'popularité', et si c'est le cas, alors il définit
   la variable updatedMedias au tableau medias trié par la propriété likes, puis il vérifie si
   le selectedValue est égal à 'date', et si c'est le cas, il définit la variable updatedMedias sur
   le tableau des médias trié par la propriété date, puis il vérifie si la valeur sélectionnée est égale à
   'title', et si c'est le cas, il définit la variable updatedMedias sur le tableau medias trié par le
   title propriété, puis il enregistre la variable updatedMedias dans la console, puis il appelle le clear
   fonction, puis il parcourt le tableau updatedMedias et appelle la fonction add, puis il définit
   la variable tabIndex à 3, puis il appelle la fonction d'affichage. */
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

    /* Il trie le tableau medias par la propriété likes, puis il parcourt le tableau medias
    et en définissant la propriété initialLikes sur la propriété likes , puis il appelle l'add fonction. */
    medias.sort((a, b) => a.likes < b.likes)
      .forEach((media) => {
        media.initialLikes = media.likes;
        this.add({ photographerName: photographer.name, media });
      });

    this.tabIndex = 3;
    this.display();
    this.displayLikes();
  };

  /* C'est une fonction qui prend un objet avec un nom de photographe et un objet média comme paramètres,
 puis il crée une variable source qui est une chaîne du nom du photographe et de l'image ou de la vidéo
 du média, puis il pousse la source, le nom du photographe et l'objet média dans le média
 tableau, alors il retourne true. */
  add = ({ photographerName, media }) => {
    const source = `assets/medias/${photographerName.split(' ')[0]}/${media.image ? media.image : media.video}`;
    this.medias.push({ source, media });
    return this.medias;
  };

  /* C'est une fonction qui efface la liste des médias. */
  clear = () => {
    this.medias = [];
    return 'Media list cleared';
  };

  /* C'est une fonction qui affiche la liste des médias sur la page. */
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

      const cardImage = factoryMediaDom(sourceType[1]);
      // const cardImage = document.createElement(sourceType[1] === 'mp4' ? 'video' : 'img');
      /* Il définit l'attribut src de l'élément cardImage sur la propriété source de l'élément
      paramètre. */
      cardImage.setAttribute('src', element.source);
      /* Il ajoute la classe media-img à l'élément cardImage. */
      cardImage.classList.add('media-img');
      /* Il définit l'attribut alt de l'élément cardImage sur la valeur de media.title
      propriété. */
      cardImage.setAttribute('alt', `Media ${media.title}`);

      /* Il crée un élément div et y ajoute la classe media-card-body. */
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

      /* Il ajoute un écouteur d'événement à l'élément mediaCardHeartIcon, et lorsque l'événement est
      déclenché, il appelle la fonction updateLikes avec l'événement et l'élément en paramètres. */
      mediaCardHeartIcon.addEventListener('click', (event) => this.updateLikes(event, element));

      /* Il crée un élément d'image. */
      const mediaCardHeartIconImage = document.createElement('img');
      /* Il définit l'attribut src de l'élément mediaCardHeartIconImage sur HeartIcon.png
      image. */
      mediaCardHeartIconImage.setAttribute('src', './assets/icons/HeartIcon.png');
      /* Il définit l'attribut alt de l'élément mediaCardHeartIconImage sur 'Icone de coeur pour
      le bouton qui permet de liker le media.'. */
      mediaCardHeartIconImage.setAttribute('alt', 'Icone de coeur pour le bouton qui permet de liker le media.');

      /* C'est créer une carte avec les médias et les likes. */
      cardContainer.appendChild(cardImage);
      cardContainer.appendChild(mediaCardBody);
      mediaCardBody.appendChild(mediaCardBodyTitle);
      mediaCardBody.appendChild(mediaCardBodyLikes);
      mediaCardBodyLikes.appendChild(mediaCardLikesCount);
      mediaCardBodyLikes.appendChild(mediaCardHeartIcon);
      mediaCardHeartIcon.appendChild(mediaCardHeartIconImage);
      return mediaSection.append(cardContainer);
    });

    /* Il renvoie le tableau des médias. */
    return this.medias;
  };

  /* C'est une fonction qui affiche le nombre de likes dans la section des statistiques des utilisateurs. */
  displayLikes = () => {
    const likesSpan = document.querySelector('.user_statistics_likes');

    /* Il ajoute les likes de chaque média à la variable likes. */
    let likes = 0;
    this.medias.forEach((media) => {
      likes += media.media.likes;
    });

    /* Il affiche le nombre de likes dans la section des statistiques de l'utilisateur. */
    likesSpan.innerHTML = `${likes} &#10084;`;
    /* Il renvoie la valeur de la variable likes. */
    return likes;
  };

  /* C'est une fonction qui prend un événement et un élément en paramètre, puis crée une variable
 mediaLikes qui est la propriété initialeLikes de la propriété media de l'élément, puis il crée
 une variable likeSpan qui est le firstChild du parentNode du parentNode de la cible de
 l'événement si le nodeName de la cible de l'événement est égal à 'IMG', et si ce n'est pas le cas,
 c'est le premier enfant du parentNode de la cible de l'événement, puis il vérifie si les goûts de
 les médias sont égaux aux likes initiaux, et si c'est le cas, il ajoute 1 aux likes du
 médias, et si ce n'est pas le cas, il définit les goûts des médias sur les goûts initiaux, puis il
 vérifie si les likes du média sont égaux aux likes initiaux, et si c'est le cas, il ajoute 1 à
 les goûts des médias, et si ce n'est pas le cas, il met les goûts des médias à l'initiale
 likes, puis il appelle la fonction displayLikes, puis il renvoie un objet avec les likes initiaux
 et les likes mis à jour. */
  updateLikes = (event, element) => {
    const mediaLikes = element.media.initialLikes;
    const likeSpan = event.target.nodeName === 'IMG' ? event.target.parentNode.parentNode.firstChild : event.target.parentNode.firstChild;

    /* Il vérifie si les likes des médias sont égaux aux likes initiaux, et si c'est le cas, il ajoute 1 au
les goûts des médias, et si ce n'est pas le cas, il définit les goûts des médias sur les goûts initiaux. */
    likeSpan.textContent = parseInt(likeSpan.textContent, 10) === mediaLikes ? mediaLikes + 1 : mediaLikes;

    /* Il vérifie si les likes du média sont égaux aux likes initiaux, et si c'est le cas, il ajoute 1 au
   goûts des médias, et si ce n'est pas le cas, il définit les goûts des médias sur les goûts initiaux. */
    if (element.media.likes === mediaLikes) {
      element.media.likes += 1;
    } else {
      element.media.likes = mediaLikes;
    }

    /* Il affiche le nombre de likes dans la section des statistiques de l'utilisateur. */
    this.displayLikes();

    /* Il renvoie un objet avec les likes initiaux et les likes mis à jour. */
    return { initialLikes: mediaLikes, updateTo: element.media.likes };
  };
}
