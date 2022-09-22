let createLoading = (obj) =>{
    let load = {
        creat : ()=>{
            let card = document.createElement('div');
            card.classList.add('bgLoad')
            let load = `
                            <div class="lds-roller">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        `
            card.innerHTML = load;
            obj.appendChild(card);
        },
        remove : ()=>{
            obj.querySelector('.bgLoad').remove()
        }
    }
    return load
}