const themeToggler = document.querySelector(".theme-btn");
const returnTop = document.querySelector(".returnTop");
const searchBar = document.querySelector(".search-bar");

const search = searchBar.querySelector(".search");
const inputSearch = searchBar.querySelector("input");

const cards = document.querySelector('.cards');

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

let SearchProducts = () => {
    inputSearch.blur()
    if(inputSearch.value.length > 0){
        searchBar.classList.remove('error')
        
        for(let card of cards.querySelectorAll(".card")){
            if(card.querySelector('h1').textContent.toLowerCase().includes(inputSearch.value.toLowerCase())){
                card.classList.remove('hidden')
            }else{
                card.classList.add('hidden')
            }
        }
    }else{
        for(let card of cards.querySelectorAll(".card")){card.classList.remove('hidden')}
    }
}

search.addEventListener('click',SearchProducts)

inputSearch.addEventListener("keypress", (event) => {if(event.key === "Enter") SearchProducts()});
