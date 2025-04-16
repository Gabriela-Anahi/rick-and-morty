const $ = (query) => document.querySelector(query)
const $$ = (query) => document.querySelectorAll(query)

const clearTable = (selector) => $(selector).innerHTML = ''

const BASE_URL = 'https://rickandmortyapi.com/api'


const loader = $("#loader");
let tipo = "character"
let currentPage = 1
let totalPages = 1
let datos = []
let page = 1
let search =""
let urlapi = `https://rickandmortyapi.com/api/${tipo}/?page=${currentPage}`

//fetching
async function getApiInfo() {
  try{
    loader.style.display = "block"
    const searchData  = search ? `&name=${search}` : ""
    urlapi = `https://rickandmortyapi.com/api/${tipo}/?page=${currentPage}${searchData}`
    const response = await fetch(urlapi)
    const data = await response.json()
    loader.style.display = "none"
    datos =  data.results
    totalPages = data.info.count
    
    $(".results-number").textContent = `${totalPages}`

    console.log("loader is working");
    
    
  }catch (error) {
    console.log("Error en fetch:",error)
    loader.style.display = "none"
    loader.innerText = "Error al cargar datos."
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
            <h3 class="character-name">${character.name}</h3>
          </div> 
        </div>
      `
      }
    })
}

$(".search-button").onclick = function (e) {
  search= $("#search-input").value 
  tipo= $("#search-type").value
  getApiInfo()
}






$(".previous-page").onclick = function (e) {
  if (currentPage > 1) {
      currentPage--
      getApiInfo()
  }
};
$(".next-page").onclick = function (e) {
  if (currentPage < totalPages) {
    currentPage++;
  getApiInfo()
}}


$(".first-page").onclick = function (e) {
  if (currentPage !== 1) {
    currentPage = 1;
  getApiInfo()
}}

$(".last-page").onclick = function (e) {
  if(currentPage !== totalPages) {
    currentPage = totalPages;
  getApiInfo()
  
}}










const initializeApp = () => {

    getApiInfo()

  } 
  
  window.addEventListener("load", initializeApp)