let api_key = "XwIVfn2f4tEdfYbgvP9Ph2sAOOCIIDHe";
let divContenedorTrendings = document.querySelector(".contenedor-gifs");
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



const favsContainer = document.querySelector('.favsContainer')
const favsNoContent = document.querySelector('.sin-favoritos')
const buttonContainerFavs = document.querySelector('.buttonContainerFavs')

if (favsList.length == 0){
    
    favsNoContent.style.display = 'flex'
    buttonContainerFavs.style.display = 'none'
    favsContainer.style.display = 'none'
}else{
    var start = 0;
    console.log(favsList.length)
    var limit = 12;
    favsNoContent.style.display = 'none'
    function showFavs (favsList, start, limit, buttonContainerFavs) {
        for(i=start; i<limit; i++){
            if(favsList[i]===undefined){break;}
            var favGif = favsList[i]            
            const gifFav = document.createElement('img')
            const gifFavContainer = document.createElement('div')
            favsContainer.appendChild(gifFavContainer)
            gifFavContainer.appendChild(gifFav)
            gifFavContainer.classList.add('gifContainer')
            gifFav.classList.add('gif')
            gifFav.src=favGif.url
            opcionesGif(gifFav, favGif.username, favGif.title, favGif.id, favGif.urlAlone, gifFavContainer)
            if(i==favsList.length-1){buttonContainerFavs.style.display = 'none'}
        }
    }

    showFavs(favsList, start, limit, buttonContainerFavs)

    if(favsList.length > 12){
        buttonContainerFavs.style.display = 'block'
        buttonContainerFavs.addEventListener('click', async () =>{
            limit+=12
            start+=12
            showFavs(favsList, start, limit, buttonContainerFavs)
        })
    }

}