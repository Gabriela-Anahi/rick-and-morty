const $ = (query) => document.querySelector(query)
const $$ = (query) => document.querySelectorAll(query)

const clearTable = (selector) => $(selector).innerHTML = ''

const BASE_URL = 'https://rickandmortyapi.com/api'



let tipo = "character"
let searchinput= ""
let currentPage = 1
let totalPages = 1
let datos = []
let search =""
let urlapi = `https://rickandmortyapi.com/api/${tipo}/?page=${currentPage}`

//fetching
async function getApiInfo() {
  try{
    const searchData  = search ? `&name=${search}` : ""
    urlapi = `https://rickandmortyapi.com/api/${tipo}/?page=${currentPage}${searchData}`
    const response = await fetch(urlapi)
    const data = await response.json()
    datos =  data.results
    console.log(urlapi)
    console.log(search)
    
  }catch (error) {
    console.log("Error en fetch:",error)
  }
  renderCharacter()
}






function renderCharacter(){
  clearTable("#cardstable")
    datos.forEach((character) => {
      
      if(tipo=="character"){
        $("#cardstable").innerHTML += `
                <div >
          <div class="character-img-container min-w-40 max-w-48 m-5" >
            <img src="${character.image}" alt="" class="character-thumbnail items-center m-8"/>
          </div>
          <div class="character-name-container">
            <h3 class="character-name">${character.name}</h3>
          </div> </div>
        `
      }else{
        $("#cardstable").innerHTML += `
        <div >
          <div class="character-name-container">
            <h3 class="character-name">${episode.name}</h3>
          </div> 
        </div>
      `
      }
    })
}
$("#search-type").onchange = function (e) {
  tipo = e.target.value
}
$("#search-input").onchange = function (e) {
  search = e.target.value
}
$(".search-button").onclick = function (e) {
  getApiInfo()
}









const initializeApp = () => {
    getApiInfo()

  } 
  
  window.addEventListener("load", initializeApp)