const returnTop = document.querySelector(".returnTop");

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