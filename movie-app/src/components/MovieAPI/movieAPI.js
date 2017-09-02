const API_KEY = "91bd051b40fb1fc3758231a786cb7949";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query={query}";
const DISCOVER_POPULAR_URL = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY;

const get = async function (url) {
    return await fetch(url, 
        { mode: "cors" }
    ).then((response) => {
        if (response.status === 200) {
            return response.json();
        }
    }).catch((response) => {
        console.log("Status Code: " + response.status);
    });
}

const getSearchResults = async function (query) {
    if (query) {
        return await get(SEARCH_URL.replace("{query}", query));
    } 
}

const getPopularResults = async function () {
    return await get(DISCOVER_POPULAR_URL);
}

export { getSearchResults, getPopularResults };