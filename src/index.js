import Notiflix from 'notiflix';

const axios = require('axios').default;

const input = document.querySelector('input');
const searchForm = document.querySelector('.search-form');
const button = document.querySelector('button');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

let page = 1;
let per_page = 40;

gallery.classList.add('gallery__div');

const searchImages = async e => {
    const params = new URLSearchParams({
        key: "35166786-6cff48c73f51fd457f4a9ef76",
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: page,
        per_page: per_page,
    });

    const response = await axios.get(`https://pixabay.com/api/?${params}&q=` + searchForm.elements.searchQuery.value);
    return response;
};

const showImages = (response) => {
    const totalHits = response.data.total;
    const photos = response.data.hits;
    const totalPages = Math.ceil(totalHits / per_page);
    if (photos.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else if (page > totalPages) {
        loadMore.classList.remove('isVisible');
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }
    else {
        loadMore.classList.add('isVisible');
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
        const markup = photos
            .map((photo) =>
                `<div class= "photo-card">
                    <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b> ${photo.likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b> ${photo.views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b> ${photo.comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b> ${photo.downloads}
                        </p></div>
                    </div >`
            )
            .join("");
        gallery.insertAdjacentHTML("beforeend", markup);
    }
};

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    gallery.innerHTML = '';
    page = 1;
    searchImages()
        .then(
            response => {
                showImages(response);
                page += 1;
            })
        .catch((error) => console.log(error))
});

loadMore.addEventListener("click", () => {
    searchImages()
        .then(
            response => {
                showImages(response);
                page += 1;
                const { height: cardHeight } = document
                .querySelector(".gallery")
                .firstElementChild.getBoundingClientRect();

                window.scrollBy({top: cardHeight * 2, behavior: "smooth",
});
            })
        .catch((error) => console.log(error))
});