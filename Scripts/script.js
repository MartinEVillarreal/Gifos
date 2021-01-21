// DOM //

let divContenedorTrendings = document.querySelector(".contenedor-gifs");



let api_key = "XwIVfn2f4tEdfYbgvP9Ph2sAOOCIIDHe"

// Buscar Gifs //
const form = document.querySelector(".form-buscador")
const search = document.querySelector("#search");
const gifsBuscados = document.querySelector(".contenedor-gifs-buscados")
const submit = document.querySelector("#submit")
const verMas = document.querySelector(".ver-mas")
const contenedorPalabra = document.querySelector(".palabra-buscada")
const listaSugerencias = document.querySelector(".lista-sugerencias")
const lineaBusqueda = document.querySelector(".linea-busqueda")

let offsetSearch = 0

const buscarGifs = async (query, offset) =>{
  const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${query}&limit=12&offset=${offset}`);
  const json = await res.json()
  return json
}
const mostrarBusqueda = gifs =>{
let gif = gifs.data
for(let i = 0; i < 12; i++) {
  const divGifs = document.createElement('div')  
  const img = document.createElement('img')
  img.setAttribute('src', gif[i].images.downsized.url)
  img.setAttribute('alt', `Imagen de ${gif[i].title}`)  
 
  divGifs.appendChild(img)
  gifsBuscados.appendChild(divGifs)
}}

form.addEventListener("submit", async (event)=> {
  event.preventDefault();
  offsetSearch = 0
  console.log(search.value)
  contenedorPalabra.style.display = "block"
  lineaBusqueda.style.display ="block"
  contenedorPalabra.innerHTML = search.value 
  const gifs = await buscarGifs(search.value, offsetSearch)
  gifsBuscados.innerHTML = ""
  
  mostrarBusqueda(gifs)
  offsetSearch += 12
  console.log(gifs)
  verMas.style.display = "block"
  
})
verMas.addEventListener("click", async ()=>{  
  const gifs = await buscarGifs(search.value, offsetSearch)
  mostrarBusqueda(gifs)
  offsetSearch = offsetSearch + 12
  console.log(offsetSearch)  
})
// Mostrar sugerencias //
const buscarSugerencias = async (query) => {
  const res = await fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=${api_key}&q=${query}&limit=4`);
  const json = await res.json()
  return json  
}
const mostrarSugerencias = sugerencias =>{
  listaSugerencias.innerHTML = ""
  sugerencias.forEach(sugerencia=>{
  const li = document.createElement("li")
  let item = sugerencia.name
  li.classList.add("item-busqueda")
  li.innerHTML = `
  <img src="assets/icon-search.svg">
		<p>${item}</p>`
  listaSugerencias.appendChild(li)
  document.querySelector(".item-busqueda").addEventListener("click", buscarGifs(item,offsetSearch))
  
})
}

search.addEventListener("keyup", async ()=> {  
  const sugerencias = await buscarSugerencias(search.value)  
  mostrarSugerencias(sugerencias.data)
})

// Mostrar Palabras trendings //
const contenedorPalabrasTrendings = document.querySelector(".palabras-trendings")
const buscarPalabras = async ()=>{
  const res = await fetch(`https://api.giphy.com/v1/trending/searches?api_key=${api_key}`);
  const json = await res.json()
  return json.data
}
function convertirMayus(palabra) {

  // converting first letter to uppercase
  const mayuscula = palabra.charAt(0).toUpperCase() + palabra.slice(1);

  return mayuscula;
}
const mostrarPalabrasTrendings = palabrasTrendings =>{
  palabrasTrendings = palabrasTrendings.slice(0,5);
  console.log(palabrasTrendings)
  for (let i = 0; i < palabrasTrendings.length; i++) {     
    if(i<palabrasTrendings.length-1){
    const contenedorPalabraTrending = document.createElement("h2");
    contenedorPalabraTrending.classList.add("palabra-trending")
    contenedorPalabraTrending.textContent = convertirMayus(palabrasTrendings[i] + ", ");
    console.log(contenedorPalabraTrending)    
    contenedorPalabrasTrendings.appendChild(contenedorPalabraTrending)
    contenedorPalabraTrending.addEventListener('click', async () => {   
      offsetSearch = 0
      contenedorPalabra.style.display = "block"
      lineaBusqueda.style.display ="block"
      contenedorPalabra.innerHTML = palabrasTrendings[i]   
      const gifs = await buscarGifs(palabrasTrendings[i], offsetSearch)
      mostrarBusqueda(gifs)
      offsetSearch += 12  
      search.value = palabrasTrendings[i]  
      verMas.style.display = "block"

  })
    }else{
      const contenedorPalabraTrending = document.createElement("h2");
      contenedorPalabraTrending.classList.add("palabra-trending")
      contenedorPalabraTrending.textContent = convertirMayus(palabrasTrendings[i]);
      console.log(contenedorPalabraTrending)    
      contenedorPalabrasTrendings.appendChild(contenedorPalabraTrending)
      contenedorPalabraTrending.addEventListener('click', async () => {    
        offsetSearch = 0
      contenedorPalabra.style.display = "block"
      lineaBusqueda.style.display ="block"
      contenedorPalabra.innerHTML = palabrasTrendings[i]   
        const gifs = await buscarGifs(palabrasTrendings[i], offsetSearch)
      mostrarBusqueda(gifs)
      offsetSearch += 12  
      search.value = palabrasTrendings[i]  
      verMas.style.display = "block"
    })
    }
    
}
}
buscarPalabras()
    .then(response => mostrarPalabrasTrendings(response))

// Mostrar Gifs trendings //
const getGifs = async () => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=12&rating=g`)
    const json = await response.json()
  
    return json.data
  }

mostrarTrendings = trendings =>{ 
    trendings.forEach(trending =>{
    let imagen = trending.images.original.url
    let img = document.createElement("img");
    img.setAttribute("src", imagen);
    divContenedorTrendings.appendChild(img)


})
}
getGifs()
    .then(response => mostrarTrendings(response))
