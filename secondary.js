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

//     const searchData  = search ? `&name=${search}` : ""
// const filters = `${searchInput}${status ? `&status=${status}` : ""}${gender ? `&gender=${gender}` : ""}`
const gender = $("#search-gender").value
const status = $("#search-status").value
const searchInput = search ? `&name=${search}` : ""
const filters = `${searchInput}${status ? `&status=${status}` : ""}${gender ? `&gender=${gender}` : ""}`

    urlapi = `https://rickandmortyapi.com/api/${tipo}/?page=${currentPage}${filters}`
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

async function getCharacterId(id){
  try {
    //loader.style.display = "block"
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
      const data = await response.json()
      datos = data
      console.log(data.id);
      
      
      //loader.style.display = "none"
  } catch (error) {
    console.log("Error en fetch:",error)
    //loader.style.display = "none"
    //loader.innerText = "Error al cargar datos."
  }
  printCharacterDescription(datos);
  getCharactersEpisodes(id)
}

// async function getCharactersEpisodes(id) {
//   try {
//       const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`)
//       const data = await response.json()
//       const episodesLinks = data
//       console.log(episodesLinks);
      
//       printCharactersEpisodes(episodesLinks)
//   } catch (error) {
//       console.error(error)
//   }
// }

async function getEpisodeId(id){
  try {
      const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`)
      const data = await response.json()
    datos = data
      console.log("episodios",data)
      
  } catch (error) {
      console.log(error);
  }
  printEpisodeDescription(datos)
  //getCharacterComics(id)
}

function renderCharacter(){
  clearTable("#cardstable")
    datos.forEach((character) => {
      
      if(tipo=="character"){
        $("#cardstable").innerHTML += `
          

              <div class="character-img-container  group relative m-10 flex h-70
               w-60 rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg" onclick="getCharacterId(${character.id})"> 
          
                  <div class="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">

                      <img src="${character.image}" alt="" class="character-thumbnail animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"/> 
                      </div>
                      
                      <div class="character-name-container absolute p-20 bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">

                      <h3 class="character-name">${character.name}</h3>
                    </div>
                </div>

        `
        console.log(character.id);
        
      }else{
        $("#cardstable").innerHTML += `
        <div class="group m-10 flex h-50 w-40  px-50 rounded-md shadow-xl border  sm:mx-auto sm:max-w-lg" onclick="getEpisodeId(${character.id})">

              <div class="z-10 h-full w-full rounded-md opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 ">

                  <div class="character-name-container  character-thumbnail  block h-full w-full scale-100 transform object-center opacity-100 transition duration-300 group-hover:scale-110">
                      <h3 class="character-name">${character.name}</h3>
                  </div> 
              </div>
        </div>
      `
      }
    })
}



  function printCharacterDescription (datos)  {
    clearTable("#cardstable")
    if (!Array.isArray(datos)) {
      datos = [datos];
    }
  
    for (const dato of datos) {
      let html = `
        <div>
          <img src="${dato.image}" alt=""/> 
          <p><strong>Status:</strong> ${dato.status}</p>
          <p><strong>Species:</strong> ${dato.species}</p>
          <p><strong>Gender:</strong> ${dato.gender}</p>
      `
    }
  }


  function printEpisodeDescription (datos)  {
    clearTable("#cardstable")
    if (!Array.isArray(datos)) {
      datos = [datos];
    }
  
    for (const dato of datos) {

      let htmlEpisodes = `
        <div>
        <p><strong>Name:</strong> ${dato.name}</p>
        <p><strong>Episodes:</strong></p>
          <ul class="list-disc ml-5">
      `
  
      dato.characters.forEach(url => {
        const characterNumber = url.split("/").pop()
        htmlEpisodes += `<li>Personaje ${characterNumber} - <a href="${url}"  class="episode-link text-blue-500 underline">Ver personaje</a></li>`
      })
  
      htmlEpisodes += `</ul></div>`
  
      $("#cardstable").innerHTML += htmlEpisodes;
    }
      
    }

$(".search-button").onclick = function (e) {
  search= $("#search-input").value 
  tipo= $("#search-type").value
  getApiInfo()
}



// function printCharactersEpisodes (episodesLinks)  {
//   if(episodesLinks.length===0){
//     $(".mainTable").innerHTML += `<p class="font-bold">No results</p>`
//   }else{
//   for (const dato of episodesLinks) {

//     let htmlEpisodes = `
//         <ul class="list-disc ml-5">
//     `

//     dato.characters.forEach(url => {
//       const characterNumber = url.split("/").pop()
//       htmlEpisodes += `<li>Personaje ${characterNumber} - <a href="${url}"  class="episode-link text-blue-500 underline">Ver personaje</a></li>`
//     })

//     htmlEpisodes += `</ul></div>`

//     $("#cardstable").innerHTML += htmlEpisodes;
//   }
    
//   }
// }




// document.getElementById('buscar').addEventListener('click', () => {
  
//   const contenedorResultados = document.getElementById('resultados');

//   if (personajesFiltrados.length === 0) {
//     contenedorResultados.innerHTML = '<p>No se encontraron personajes.</p>';
//   } else {
//     contenedorResultados.innerHTML = personajesFiltrados.map(personaje => `
//       <div>
//         <h3>${personaje.name}</h3>
//         <p>Género: ${personaje.gender}</p>
//         <p>Estado: ${personaje.status}</p>
//       </div>
//     `).join('');
//   }
// });















$("#search-type").onchange = function () { 
  tipo = $("#search-type").value;
  if (tipo === "episode") {
    console.log("episode");
    
    $("#search-gender").disabled = true;
    $("#search-status").disabled = true;

  } else {
    $("#search-gender").disabled = false;
    $("#search-status").disabled = false;
  }
}
  



$(".search-button").onclick = function (e) {
search= $("#search-input").value 
tipo= $("#search-type").value
const gender = $("#search-status").value;
  const status = $("#search-status").value;

  const personajesFiltrados = filtrarPersonajes(generoSeleccionado, estadoSeleccionado);

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
  $("#cardstable").addEventListener("click", async (e) => {
    const target = e.target;
  
    if (target.tagName === "A" && target.classList.contains("episode-link")) {
      e.preventDefault();
      const id = target.href.split("/").pop();
  
      const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
      const data = await res.json();
      printEpisodeDescription(data);
    }
  
    if (target.tagName === "A" && target.classList.contains("character-link")) {
      e.preventDefault();
      const id = target.href.split("/").pop();
  
      const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      const data = await res.json();
      printCharacterDescription(data);
    }
  })