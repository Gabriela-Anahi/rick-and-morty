const $ = (query) => document.querySelector(query)
const $$ = (query) => document.querySelectorAll(query)

const BASE_URL = 'https://rickandmortyapi.com/api'

let currentPage = 1
let totalPages = 1

const fetchURL = async (url) => {
  const response = await fetch(url)
  const data = await response.json()
  return data
}

const getApiURL = () => {
  const searchInput = $('#search-input')
  let url = `${BASE_URL}/episode/?page=${currentPage}`

  if (searchInput.value.trim()) {
    url += `&name=${searchInput.value.trim()}`
  }

  return url
}

const clearResults = () => {
  const resultsContainer = $('.results')
  resultsContainer.innerHTML = ''
}

const updateResultsCount = (count) => {
  $('.results-number').innerHTML = count
}

const updateResultsTitle = (title) => {
  $('.results-title').innerHTML = title
}

const resetPage = () => {
  currentPage = 1
}

const hideLoader = () => {
  $('.loader-container').classList.add('hidden')
}

const showLoader = () => {
  $('.loader-container').classList.remove('hidden')
}

const fetchCharacters = async () => {
  showLoader()
  const data = await fetchURL(getApiURL())

  const { results, info } = data

  totalPages = info.pages
  clearResults()
  appendCharacters(results)
  updateResultsCount(info.count)
  updatePagination()
  hideLoader()
}

const appendCharacters = (characters) => {
  if (!characters || characters.length === 0) {
    $('.results').innerHTML =
      '<h2 class="no-results">No se han encontrado resultados</h2>'
    return
  }

  for (const character of characters) {
    const characterCard = document.createElement('div')
    characterCard.classList.add('character')

    characterCard.innerHTML = `
      <div class="character-img-container">
        <img src="${character.image}" alt="" class="character-thumbnail" />
      </div>
      <div class="character-name-container">
        <h3 class="character-name">${character.name}</h3>
        <p>${character.status} - ${character.species}</p>
      </div>
    `
    $('.results').append(characterCard)
  }
}

const updatePaginationCallback = (callback) => {
  $('.first-page').onclick = () => {
    currentPage = 1
    callback()
  }

  $('.previous-page').onclick = () => {
    if (currentPage > 1) {
      currentPage--
      callback()
    }
  }

  $('.next-page').onclick = () => {
    if (currentPage < totalPages) {
      currentPage++
      callback()
    }
  }

  $('.last-page').onclick = () => {
    currentPage = totalPages
    callback()
  }
}

const updatePagination = () => {
  $('.first-page').disabled = currentPage === 1
  $('.previous-page').disabled = currentPage === 1
  $('.next-page').disabled = currentPage === totalPages
  $('.last-page').disabled = currentPage === totalPages
}

const search = () => {
  showLoader()
  resetPage()
  updateResultsTitle('Personajes encontrados')
  fetchCharacters()
}

const initialize = () => {
  $('.search-button').onclick = () => {
    search()
    updatePaginationCallback(fetchCharacters)
  }

  $('#search-type').style.display = 'none'
  $('#search-sort').style.display = 'none'

  updatePaginationCallback(fetchCharacters)
  search()
}

window.onload = initialize
