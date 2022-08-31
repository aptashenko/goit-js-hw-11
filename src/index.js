import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewApiSearch from './search-service';
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchApi = new NewApiSearch;

searchButton.addEventListener('click', search);
loadMoreBtn.addEventListener('click', nextPage);


function search(e) {
    e.preventDefault();

    searchApi.query = searchInput.value.trim().toLowerCase().replaceAll(' ', '+'); 
    if (searchApi.query.length > 0) {
        galleryEl.innerHTML = '';
        searchApi.resetPage();
        fetchImages();
    } else {
        Notify.failure('Please input search query')
    }
}

function renderImages(images) {
    const markup = images.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
        return `
        <div class="photo-card">
            <a href="${largeImageURL}" class="photo-link">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item">
                <b>Likes</b>
                ${likes}
                </p>
                <p class="info-item">
                <b>Views</b>
                ${views}
                </p>
                <p class="info-item">
                <b>Comments</b>
                ${comments}
                </p>
                <p class="info-item">
                <b>Downloads</b>
                ${downloads}
                </p>
            </div>
        </div>`
    }).join(',').replaceAll(',', '');
    return markup;
}

async function fetchImages() {
    const resp = await searchApi.fetchData();
    const totalHits = resp.totalHits;
    const allPages = searchApi.perPage;
    const currentPage = searchApi.page;

    if (currentPage >= totalHits / allPages && resp.hits.length !== 0) {
        loadMoreBtn.style.display = 'none';
        Notify.info('We\'re sorry, but you\'ve reached the end of search results.');
    } else if (resp.hits.length > 0 && currentPage === 1) {
        loadMoreBtn.style.display = 'block';
        Notify.success(`Hooray! We found ${totalHits} images.`)
    }
    if (resp.hits.length === 0) {
        loadMoreBtn.style.display = 'none';
        Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    } else {
        galleryEl.insertAdjacentHTML('beforeend', renderImages(resp.hits));
        let gallery = new SimpleLightbox('.gallery a');
    }
}

function nextPage() {
    searchApi.incrementPage();
    fetchImages();
}
