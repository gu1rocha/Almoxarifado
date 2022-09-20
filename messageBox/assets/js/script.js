let showMessageBox = (objeto)=> {

    GetHTML('/Almoxarifado/messageBox/index.html', 'get',  function(obj) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(obj.responseText, "text/html");
        
        document.querySelector('body').classList.add('noScrool')
        document.querySelector('body').appendChild(doc.querySelector('.bgMessageBox'))

        let bgMessageBox = document.querySelector('.bgMessageBox')
        let messageBox = document.querySelector('.messageBox')

        
        let Close = ()=>{
            bgMessageBox.remove()
            document.querySelector('body').classList.remove('noScrool')
        }

        !!objeto.type ? messageBox.classList.add(objeto.type) : ''
        !!objeto.title ? messageBox.querySelector('.titulo').querySelector('h2').innerHTML = objeto.title : ''
        !!objeto.text ? messageBox.querySelector('.boxTexto').querySelector('p').innerHTML = objeto.text : ''

        if(!!objeto.boxInput){

        }else{
            messageBox.querySelector('.boxInput').remove()
        }

        if(!!objeto.accept){
            !!objeto.accept.text ? messageBox.querySelector('.boxButtons').querySelector('.accept').innerText = objeto.accept.text : ''
            !!objeto.accept.function ? 
            messageBox.querySelector('.boxButtons').querySelector('.accept').addEventListener('click',()=>{
                objeto.accept.function()
                Close()
            }) : ''
        }else{
            messageBox.classList.add('unit')
            messageBox.querySelector('.boxButtons').querySelector('.cancel').innerText = 'Ok'
            messageBox.querySelector('.boxButtons').querySelector('.accept').remove()
        }

        if(!!objeto.cancel){

        }else{
            messageBox.querySelector('.boxButtons').querySelector('.cancel').addEventListener('click',()=> Close())
        }
        
    })
}
