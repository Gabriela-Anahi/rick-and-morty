// basic functions and utilities

  const $ = (query) => document.querySelector(query)
  const $$ = (query) => document.querySelectorAll(query)

  const BASE_URL = 'https://rickandmortyapi.com/api'


  let urlapi = 'https://rickandmortyapi.com/api/${tipo}/?page=${currentPage}'
  let tipo = "character"
  let searchinput= ""
  let currentPage = 1
  let totalPages = 1

//fetching
  async function getApiInfo() {
    try{
      const urlapi= 'https://rickandmortyapi.com/api/character/?page=1'
      const response = await fetch(urlapi)
      const data = await response.json()
      datos =  data.data.results
      console.log("hasta aqui funciono")
      renderCharacter()
    }catch (error) {
      console.log(error);
    }

  }




  // const fetchURL = async (url) => {
  //   const response = await fetch(url)
  //   const data = await response.json()
  //   return data
  // }

// //const getApiURL = () => {
// const searchInput = $('#search-input')
//   let url = `${BASE_URL}/${tipo}/?page=${currentPage}`

//   if (searchInput.value.trim()) {
//     url += `&name=${searchInput.value.trim()}`
//   }

//   return url
// }

// const clearResults = () => {
//   const resultsContainer = $('.results')
//   resultsContainer.innerHTML = ''
// }

// const updateResultsCount = (count) => {
//   $('.results-number').innerHTML = count
// }



// const resetPage = () => {
//   currentPage = 1
// }

// const hideLoader = () => {
//   $('.loader-container').classList.add('hidden')
// }

// const showLoader = () => {
//   $('.loader-container').classList.remove('hidden')
// }

// const fetchCharacters = async () => {
//   showLoader()
//   const data = await fetchURL(getApiURL())

//   const { results, info } = data

//   totalPages = info.pages
//   clearResults()
//   appendCharacters(results)
//   updateResultsCount(info.count)
//   updatePagination()
//   hideLoader()
// }



 function renderCharacter(){
  datos.forEach((character) => {
          $("#cardtable").innerHTML += `
      <div class="character-img-container">
        <h3 class="character-name">${character.name}</h3>
      </div>

    `
  });
//   if (!characters || characters.length === 0) {
//     $('.results').innerHTML =
//       '<h2 class="no-results">No se han encontrado resultados</h2>'
//     return
//   }

//   for (const character of characters) {
//     if (tipo==character) {
//       $("#cardtable").innerHTML = `
//       <div class="character-img-container">
//         <img src="${character.image}" alt="" class="character-thumbnail" />
//       </div>
//       <div class="character-name-container">
//         <h3 class="character-name">${character.name}</h3>
//         <p>${character.status} - ${character.species}</p>
//         <p>${character.type} - ${character.location}</p>
//         <p>En que episodio aparece${character.episode}</p>
//       </div>
//     `
//     $('.results').append(characterCard)
//   } else {
//     $("#cardtable").innerHTML = `
//     <div class="episode-name-container">
//       <h3 class="episode-name">${episode.characters}</h3>
//       <p>${episode.url}</p>
//     </div>
//   `}
//   //$('.results').append(characterCard)
// }
 }

// const updatePaginationCallback = (callback) => {
//   $('.first-page').onclick = () => {
//     currentPage = 1
//     callback()
//   }

//   $('.previous-page').onclick = () => {
//     if (currentPage > 1) {
//       currentPage--
//       callback()
//     }
//   }

//   $('.next-page').onclick = () => {
//     if (currentPage < totalPages) {
//       currentPage++
//       callback()
//     }
//   }

//   $('.last-page').onclick = () => {
//     currentPage = totalPages
//     callback()
//   }
// }

// const updatePagination = () => {
//   $('.first-page').disabled = currentPage === 1
//   $('.previous-page').disabled = currentPage === 1
//   $('.next-page').disabled = currentPage === totalPages
//   $('.last-page').disabled = currentPage === totalPages
// }

// const search = () => {
//   showLoader()
//   resetPage()
//   //updateResultsTitle('Personajes encontrados')
//   fetchCharacters()
//   }

const initialize = () => {
  getApiInfo()
  // $('.search-button').onclick = () => {
  //   search()
  //   updatePaginationCallback(fetchCharacters)
  // }

  // $('#search-type').style.display = 'none'
  // $('#search-sort').style.display = 'none'

  // updatePaginationCallback(fetchCharacters)
  // search()
}

window.onload = initialize
