import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchImg } from './js/fetch-images';
import { renderGallery } from './js/render-gallery';
import { onScroll, onTopBtn } from './js/scroll';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import simpleLightbox from 'simplelightbox';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
let query = '';
let page = 1;
let simpleLightBox;
let perPage = 40;


searchForm.addEventListener('submit', onSearchForm);
loadMore.addEventListener('click', onLoadMore);

onScroll();
onTopBtn();

function onSearchForm(e) {
    e.preventDefault();
    window.scrollTo({ top: 0 });
    page = 1;
    query = e.currentTarget.searchQuery.value.trim();
    gallery.innerHTML = '';
    loadMore.classList.add('is-hidden');

    if (query === '') {
        emptySearch();
        return;
    }

    fetchImg(query, page, perPage).then(({ data }) => {
        if (data.totalHits === 0) {
            imagesNotFound();
        } else {
            renderGallery(data.hits);
            simpleLightBox = new SimpleLightbox('.gallery a').refresh();
            imagesFound(data);

            if (data.totalHits > perPage) {
                loadMore.classList.remove('is-hidden');
            }
        }
    })
        .catch(error => console.log(error))
        .finally(() => {
        searchForm.reset();
    });
}


function onLoadMore() {
    page += 1;
    simpleLightBox.destroy();

    fetchImg(query, page, perPage)
        .then(({ data }) => {
            renderGallery(data.hits);
            simpleLightBox = new SimpleLightbox('.gallery a').refresh();
            const totalPages = Math.ceil(data.totalHits / perPage);

            if (page > totalPages) {
                loadMore.classList.add('is-hidden');
                endOfSearch();
            }
        })
        .catch(error => console.log(error));
}

function emptySearch() {
    Notiflix.Notify.failure(
      'The search string cannot be empty. Please specify your search query.');
}

function imagesNotFound() {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.');
}

function imagesFound(data) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

function endOfSearch() {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results.");
}