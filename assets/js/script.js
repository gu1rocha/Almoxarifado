const themeToggler = document.querySelector(".theme-btn");
const returnTop = document.querySelector(".returnTop");
const searchBar = document.querySelector(".search-bar");

const search = searchBar.querySelector(".search");
const inputSearch = searchBar.querySelector("input");

const cards = document.querySelector('.cards');
const noFound = document.querySelector('.noFound');

const download = document.querySelector('.download-button');

const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");

returnTop.addEventListener('click', () => {
    window.scrollTo(0, 0);
});

window.addEventListener('scroll', () => {
    if(window.pageYOffset > window.screen.height/2){
        returnTop.classList.add('active');
    }else{
        returnTop.classList.remove('active');
    }
});

let TogglerTheme = () => {
    document.body.classList.toggle('dark-theme-variables');
    if(document.body.classList.value !== ''){
        localStorage.setItem('theme','dark')
    }else{
        localStorage.setItem('theme','white')
    }

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
}

themeToggler.addEventListener('click', TogglerTheme);

if(localStorage.getItem("theme") === 'dark'){
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span:nth-child(1)').classList.remove('active');
    themeToggler.querySelector('span:nth-child(2)').classList.add('active');
}

function alterar_url(nova){
    history.pushState({}, null, nova);
}

const urlParams = new URLSearchParams(location.search)

let SearchProducts = () => {
    if(inputSearch.value.length > 0){
        alterar_url(location.origin+location.pathname+`?p=${inputSearch.value.toLowerCase()}`)
        searchBar.classList.remove('error')
        let cont = 0;
        for(let card of cards.querySelectorAll(".card")){
            if(card.querySelector('h3').textContent.toLowerCase().includes(inputSearch.value.toLowerCase())){
                cont++
                card.classList.remove('hidden')
            }else{
                card.classList.add('hidden')
            }
        }
        if(cont > 0){
            noFound.classList.add('hidden')
        }else{
            noFound.classList.remove('hidden')
        }
    }else{
        alterar_url(location.origin+location.pathname)
        for(let card of cards.querySelectorAll(".card")){card.classList.remove('hidden')}
        noFound.classList.add('hidden')
    }
}

if(urlParams.get('p') !== ''){
    inputSearch.value = urlParams.get('p')
    SearchProducts()
}

search.addEventListener('click',SearchProducts)

inputSearch.addEventListener("keypress", (event) => {if(event.key === "Enter") SearchProducts()});

menuBtn.addEventListener('click', () =>{
    console.log('click')
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.removeAttribute('style')
});

download.addEventListener('click', ()=>{genPDF()})