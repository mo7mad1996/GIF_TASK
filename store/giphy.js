const API_KEY = '2nzcgcQ6iz9DG9r9tSKQX9eoqjHaDJOa' // giphy API KEY
const API_URI = 'https://api.giphy.com/v1/gifs/trending?api_key=' + API_KEY
const SEARCH_URI = 'https://api.giphy.com/v1/gifs/search?api_key=' + API_KEY
const API_ID = 'https://api.giphy.com/v1/gifs/'

export const state = () => ({
  API_URI,
  SEARCH_URI,
  API_ID
})
export const getters = {
  API_URI: (state) => state.API_URI,
  SEARCH_URI: (state) => state.SEARCH_URI,
  API_ID: (state) => state.API_ID,
}
export const mutations = {
  update_uri_id(state, id) {
    state.API_ID = API_ID + id + '?api_key=' + API_KEY
  }
}
export const actions = {}
