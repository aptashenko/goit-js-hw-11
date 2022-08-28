const axios = require('axios').default;

const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');

searchButton.addEventListener('click', search);


function search(e) {
    e.preventDefault();

    const prettyInputVal = searchInput.value.toLowerCase().replaceAll(' ', '+');

    const API_KEY = '29563200-0a1ddf81e988f89f2d7965560';

    axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${prettyInputVal}&image_type=photo`)
        .then(resp => {
            console.log(resp.data)
        })
}