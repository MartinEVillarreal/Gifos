
if (localStorage.getItem('favoritos') == null){
    var favsList = []
}else{
    var favsList = JSON.parse(localStorage.getItem('favoritos'))
}

function opcionesGif (gif, usuario, tituloGif, IDgif, URLgif, gifContainer) {
    gif.addEventListener('mouseenter', async () => {
        const gifOptions = document.createElement('div') 
        gifOptions.classList.add('gifOptions')
        gifContainer.appendChild(gifOptions)
        const addFavsBtn = document.createElement('img')
        const removeFavBtn = document.createElement('img')
        const addDownloadBtn = document.createElement('img')
        const addmaxBtn = document.createElement('img')
        const adduser = document.createElement('p')
        const addtitleGif = document.createElement('p')
        gifOptions.appendChild(addmaxBtn)
        gifOptions.appendChild(addDownloadBtn)
        gifOptions.appendChild(removeFavBtn)
        gifOptions.appendChild(addFavsBtn)
        gifOptions.appendChild(adduser)
        gifOptions.appendChild(addtitleGif)
        addFavsBtn.classList.add('addFavsBtn')
        removeFavBtn.classList.add('removeFavBtn')
        addDownloadBtn.classList.add('downloadBtn')
        addmaxBtn.classList.add('maxBtn')
        adduser.classList.add('user')
        addtitleGif.classList.add('titleGif')
        let userIF= ''
        usuario=='' ? userIF='Anonymous' : userIF=usuario
        adduser.textContent = userIF
        addtitleGif.textContent=tituloGif

        let gifInfo = {
            url: URLgif,
            username: userIF,
            title: tituloGif,
            id: IDgif,
            urlAlone: URLgif
        }
        
        if(favsList.some(e => e.id === gifInfo.id)){
            console.log('ya esta')
            addFavsBtn.style.display='none'
            removeFavBtn.style.display='block'
            removeFavGif(addFavsBtn, removeFavBtn, gifInfo)
        }else{
            addFavGif(addFavsBtn, removeFavBtn, gifInfo)
            console.log('no esta')
        }
        console.log(favsList)
        const screenSize900 = window.matchMedia('(max-width: 900px)')

        if (screenSize900.matches){expand(gif, gifInfo)}
        else{expand(addmaxBtn, gifInfo)}

        gifOptions.addEventListener('mouseleave', async () => {
        gifOptions.remove()
        })
    })
    
}

//GIF MAX

function expand (addmaxBtn, gifInfo){
    addmaxBtn.addEventListener('click', async () => {
        
        console.log('Ampliar')
        let overlay = document.createElement('div')
        let close = document.createElement('img')
        let gif = document.createElement("img")
        let username = document.createElement("h2")
        let maxFav = document.createElement('img')
        let maxDownload = document.createElement('img')
        let title = document.createElement("h2");
        overlay.classList.add('overlay')
        close.classList.add('close')
        gif.classList.add('gifMax') 
        username.classList.add('gifMaxUsername')
        maxFav.classList.add('maxFav')
        maxDownload.classList.add('maxDownload')
        title.classList.add('gifMaxTitle')
        close.src = '../assets/close.svg'

        gif.src = gifInfo.urlAlone

        username.textContent = gifInfo.username
        maxFav.src = '../assets/icon-fav.svg'
        maxDownload.src = '../assets/icon-download.svg'
        title.textContent = gifInfo.title 

        let flexBreak = document.createElement('div')
        flexBreak.style.flexBasis = '100%'
        flexBreak.style.height = '0'

        let removeFavBtn = document.createElement('img')
        removeFavBtn.classList.add('removeFavBtn')

        document.body.appendChild(overlay)
        overlay.appendChild(close)
        overlay.appendChild(gif)
        overlay.appendChild(flexBreak)
        overlay.appendChild(username)
        overlay.appendChild(maxFav)
        overlay.appendChild(removeFavBtn)
        overlay.appendChild(maxDownload)
        overlay.appendChild(title)       

        if(favsList.some(e => e.id === gifInfo.id)){
            console.log('ya esta')
            maxFav.style.display='none'
            removeFavBtn.style.display='block'
            removeFavGif(maxFav, removeFavBtn, gifInfo)
        }else{
            addFavGif(maxFav, removeFavBtn, gifInfo)
            console.log('no esta')
        }

        

        close.addEventListener('click', () => {
           
            overlay.remove()
            gifOptions.remove()
        })


    })
    addmaxBtn
}

// ADD FAVORITE GIF

function addFavGif (favBtn, removeFavBtn, gifInfo) {
    favBtn.addEventListener('click', async () =>{
        favsList.push(gifInfo)
        localStorage.setItem('favoritos', JSON.stringify(favsList))
        favBtn.style.display='none'
        removeFavBtn.style.display='block'
        removeFavGif(removeFavBtn, favBtn) 
        location.reload()
    })
}

function removeFavGif (favBtn, removeFavBtn, gifInfo) {
    removeFavBtn.addEventListener('click', async () => {
        const index = favsList.map(function(e){return e.title;}).indexOf(gifInfo.title)
        favsList.splice(index, 1)      
        localStorage.setItem('favoritos', JSON.stringify(favsList))
        favBtn.style.display='block'
        removeFavBtn.style.display='none'
        location.reload()
    })
}
