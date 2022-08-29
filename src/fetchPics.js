const axios = require('axios').default;

async function fetchPics(url) {
    try {
        return await (await axios.get(url)).data;
    } catch (error) {
        console.log(error);
    }
}

export default fetchPics