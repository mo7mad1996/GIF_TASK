const API_KEY = '364VKSDC1HO4' // tenor API KEY
const API_URI = 'https://g.tenor.com/v1/trending?key=' + API_KEY
const SEARCH_URI = 'https://g.tenor.com/v1/search?key=' + API_KEY
const API_ID = 'https://g.tenor.com/v1/gifs?key=' + API_KEY + '&ids='

export const state = () => ({
  API_URI,
  SEARCH_URI,
  API_ID
})
export const getters = {
  API_URI: (state) => state.API_URI,
  SEARCH_URI: (state) => state.SEARCH_URI,
  API_ID: (state) => state.API_ID
}
export const mutations = {
  update_uri_id(state, id) {
    state.API_ID = API_ID + id
  }
}
export const actions = {}
