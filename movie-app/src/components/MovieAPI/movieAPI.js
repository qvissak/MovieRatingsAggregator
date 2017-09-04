const API_KEY = "91bd051b40fb1fc3758231a786cb7949";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query={query}";
const DISCOVER_POPULAR_URL = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY;

const NYT_API_KEY = "56d9fd4f5a5949c4905cf2235993476f";
const NYT_REVIEWS_URL = "https://api.nytimes.com/svc/movies/v2/reviews/{query}.json?api-key=" + NYT_API_KEY + "&query={query}";

const get = async (url) => {
    return await fetch(url, 
        { mode: "cors" }
    ).then((response) => {
        if (response.status === 200) {
            return response.json();
        }
    }).catch((response) => {
        console.log(response.status);
    });
}

const getSearchResults = async (query) => {
    if (query) {
        return await get(SEARCH_URL.replace("{query}", query));
    } 
}

const getPopularResults = async () => {
    return await get(DISCOVER_POPULAR_URL);
}

const getReviewResults = async (query) => {
    return await get(NYT_REVIEWS_URL.replace("{query}", query).replace("{query}", query));
}

export { getSearchResults, getPopularResults, getReviewResults };