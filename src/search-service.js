import fetchPics from './fetchPics';
export default class NewApiSearch {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.perPage = 40;
    }

    fetchData() {
        const API_KEY = '29563200-0a1ddf81e988f89f2d7965560';
        const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`;
        return fetchPics(BASE_URL).then(resp => {
            return resp
        });
    }


    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}