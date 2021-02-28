// DOM //

let divContenedorTrendings = document.querySelector(".contenedor-gifs");

let api_key = "XwIVfn2f4tEdfYbgvP9Ph2sAOOCIIDHe";

const form = document.querySelector(".form-buscador");
const search = document.querySelector("#search");
const gifsBuscados = document.querySelector(".contenedor-gifs-buscados");
const submit = document.querySelector("#submit");
const verMas = document.querySelector(".ver-mas");
const contenedorPalabra = document.querySelector(".palabra-buscada");
const listaSugerencias = document.querySelector(".lista-sugerencias");
const lineaBusqueda = document.querySelector(".linea-busqueda");
const formBuscador = document.querySelector(".form-buscador");
const botonCerrar = document.querySelector(".btn-cerrar-busqueda");
const botonActiva = document.querySelector(".busqueda-activa");
const busquedaSinResultado = document.querySelector(".busqueda-sin-resultado")

// Buscar y mostrar Gifs buscados //

let offsetSearch = 0
const buscarGifs = async (query, offset) =>{  
  const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${query}&limit=12&offset=${offset}`);
  const json = await res.json();
  return json
}

const mostrarBusqueda = gifs =>{
  let gif = gifs.data
  if(gifs.data.length < 1){
    busquedaSinResultado.style.display = "flex";
    verMas.style.display = "none"
    contenedorPalabra.innerHTML = search.value;
    contenedorPalabra.style.display = "block";
    lineaBusqueda.style.display ="block";
  }else{
    busquedaSinResultado.style.display = "none"
    verMas.style.display = "block";  
    contenedorPalabra.innerHTML = search.value;
    contenedorPalabra.style.display = "block";
    lineaBusqueda.style.display ="block";
  }  
  for(let i = 0; i < 12; i++) {
    const divGifs = document.createElement('div'); 
    const img = document.createElement('img');
    img.setAttribute('src', gif[i].images.downsized.url);
    img.setAttribute('alt', `Imagen de ${gif[i].title}`);
    divGifs.appendChild(img);
    gifsBuscados.appendChild(divGifs);
    console.log(gif)
    opcionesGif(img, gif[i].username, gif[i].title, gif[i].id, gif[i].images.original.url, divGifs)
  }
}

form.addEventListener("submit", async (event)=> {
  event.preventDefault();
  offsetSearch = 0;  
  const gifs = await buscarGifs(search.value, offsetSearch);
  gifsBuscados.innerHTML = "";
  mostrarBusqueda(gifs);  
  offsetSearch += 12;   
  

})
verMas.addEventListener("click", async ()=>{  
  const gifs = await buscarGifs(search.value, offsetSearch);
  mostrarBusqueda(gifs);
  offsetSearch = offsetSearch + 12;
})
// Evento busqueda activa //
search.addEventListener("keyup",() =>{
  submit.style.display = "none";
  botonActiva.classList.remove("oculto");
  botonCerrar.classList.remove("oculto");
  botonCerrar.addEventListener("click", async ()=>{
  formBuscador.reset();
  busquedaSinResultado.style.display = "none"
  listaSugerencias.innerHTML = ""
  submit.style.display = "block";
  botonActiva.classList.add("oculto");
  botonCerrar.classList.add("oculto");
  })
  if (search.value == ""){
    submit.style.display = "block";
    botonActiva.classList.add("oculto");
    botonCerrar.classList.add("oculto")
  }
})

// Buscar y mostrar sugerencias //
const buscarSugerencias = async (query) => {
  const res = await fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=${api_key}&q=${query}&limit=4`);
  const json = await res.json();
  return json  
}
const mostrarSugerencias = sugerencias =>{
  listaSugerencias.innerHTML = "";
  sugerencias.forEach(sugerencia=>{
  const li = document.createElement("li");
  li.textContent = sugerencia.name;
  li.classList.add("item-busqueda");  
  listaSugerencias.appendChild(li);
  li.addEventListener("click", async () =>{
    search.value = li.textContent;
    const gifs = await buscarGifs(li.textContent, offsetSearch);
    contenedorPalabra.style.display = "block";
    contenedorPalabra.innerHTML = search.value;
    gifsBuscados.innerHTML = "";
    mostrarBusqueda(gifs);    
    offsetSearch += 12;
    verMas.style.display = "block"
  })
})
}

search.addEventListener("keyup", async ()=> {  
  const sugerencias = await buscarSugerencias(search.value);   
  mostrarSugerencias(sugerencias.data)
})

// Mostrar Palabras trendings //
const contenedorPalabrasTrendings = document.querySelector(".palabras-trendings");
const buscarPalabras = async ()=>{
  const res = await fetch(`https://api.giphy.com/v1/trending/searches?api_key=${api_key}`);
  const json = await res.json();
  return json.data
}
function convertirMayus(palabra) { 
  const mayuscula = palabra.charAt(0).toUpperCase() + palabra.slice(1);
  return mayuscula;
}
const mostrarPalabrasTrendings = palabrasTrendings =>{
  palabrasTrendings = palabrasTrendings.slice(0,5);
  for (let i = 0; i < palabrasTrendings.length; i++) {     
    if(i<palabrasTrendings.length-1){
    const contenedorPalabraTrending = document.createElement("h2");
    contenedorPalabraTrending.classList.add("palabra-trending");
    contenedorPalabraTrending.textContent = convertirMayus(palabrasTrendings[i] + ", ");
    contenedorPalabrasTrendings.appendChild(contenedorPalabraTrending)
    contenedorPalabraTrending.addEventListener('click', async () => {   
      offsetSearch = 0;
      gifsBuscados.innerHTML = "";
      contenedorPalabra.style.display = "block";
      lineaBusqueda.style.display ="block";
      contenedorPalabra.innerHTML = palabrasTrendings[i]; 
      search.value = palabrasTrendings[i]; 
      listaSugerencias.innerHTML=""
      const gifs = await buscarGifs(palabrasTrendings[i], offsetSearch);
      mostrarBusqueda(gifs);
      submit.style.display = "none";
      botonActiva.classList.remove("oculto");
      botonCerrar.classList.remove("oculto");
      botonCerrar.addEventListener("click", async ()=>{
      formBuscador.reset();
      busquedaSinResultado.style.display = "none"
      listaSugerencias.innerHTML = ""
      submit.style.display = "block";
      botonActiva.classList.add("oculto");
      botonCerrar.classList.add("oculto");
      })
      if (search.value == ""){
        submit.style.display = "block";
        botonActiva.classList.add("oculto");
        botonCerrar.classList.add("oculto")
      }
      offsetSearch += 12;         
      verMas.style.display = "block";
  })
    }else{
      const contenedorPalabraTrending = document.createElement("h2");
      contenedorPalabraTrending.classList.add("palabra-trending");
      contenedorPalabraTrending.textContent = convertirMayus(palabrasTrendings[i]);        
      contenedorPalabrasTrendings.appendChild(contenedorPalabraTrending);
      contenedorPalabraTrending.addEventListener('click', async () => {    
        offsetSearch = 0;
        gifsBuscados.innerHTML = "";
        contenedorPalabra.style.display = "block";
        lineaBusqueda.style.display ="block"
        contenedorPalabra.innerHTML = palabrasTrendings[i];   
        search.value = palabrasTrendings[i]; 
        listaSugerencias.innerHTML=""
        const gifs = await buscarGifs(palabrasTrendings[i], offsetSearch)
        mostrarBusqueda(gifs);
        submit.style.display = "none";
        botonActiva.classList.remove("oculto");
        botonCerrar.classList.remove("oculto");
        botonCerrar.addEventListener("click", async ()=>{
        formBuscador.reset();
        busquedaSinResultado.style.display = "none"
        listaSugerencias.innerHTML = ""
        submit.style.display = "block";
        botonActiva.classList.add("oculto");
        botonCerrar.classList.add("oculto");
        })
        if (search.value == ""){
          submit.style.display = "block";
          botonActiva.classList.add("oculto");
          botonCerrar.classList.add("oculto")
        }        
        offsetSearch += 12;         
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
    const json = await response.json();  
    return json.data
  }

mostrarTrendings = trendings =>{ 
    trendings.forEach(trending =>{
    let imagen = trending.images.original.url;
    let img = document.createElement("img");
    let divCont = document.createElement("div");    
    img.setAttribute("src", imagen);
    divCont.appendChild(img)
    divContenedorTrendings.appendChild(divCont);
    opcionesGif(img, trending.username, trending.title, trending.id, trending.images.original.url, divCont)
})
}
getGifs()
    .then(response => mostrarTrendings(response))

