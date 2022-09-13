let Dadoslogin = sessionStorage.getItem('login')
let showLogin = document.getElementById('showLogin')

let ShowLogin = ()=>{
    const login = document.querySelector('#login')
    const cadastro = document.querySelector('#cadastro')
    
    login.querySelector('.link').querySelector('a').addEventListener('click',()=>{
        login.classList.toggle('fadeOutLeft')
        setTimeout(()=> {
            cadastro.classList.remove('fadeOutLeft')
            login.classList.toggle('hidden')
            cadastro.classList.toggle('hidden')
            cadastro.classList.add('fadeInLeft')
        }, 100);
        
    })
    
    cadastro.querySelector('.link').querySelector('a').addEventListener('click',()=>{
        cadastro.classList.toggle('fadeOutLeft')
        setTimeout(()=> {
            login.classList.remove('fadeOutLeft')
            cadastro.classList.toggle('hidden')
            login.classList.toggle('hidden')
            login.classList.add('fadeInLeft')
        }, 100);
        
    })
}

if(!!showLogin){
    showLogin.addEventListener('click',()=>{ 
    function ajax(url, method, callback, params = null) {
        var obj;
        try { 
            obj = new XMLHttpRequest();  
        }catch(e){   
            try {     
                obj = new ActiveXObject("Msxml2.XMLHTTP");     
            } catch(e) {     
                try { 
                obj = new ActiveXObject("Microsoft.XMLHTTP");       
                } catch(e) {       
                alert("Your browser does not support Ajax.");       
                return false;       
                }     
            }   
        }
        obj.open(method, url, true);
        obj.setRequestHeader("Content-Type", "text/html");
        obj.onreadystatechange = function() {
            if(obj.readyState == 4) {
                callback(obj);
            } 
        }
        obj.send(JSON.stringify(params));
        return obj; 
    }
        var ajax = ajax('login/index.html', 'get',  function(obj) { 
            const parser = new DOMParser();
            const doc = parser.parseFromString(obj.responseText, "text/html");
            document.querySelector('body').classList.add('noScrool')
            document.querySelector('body').appendChild(doc.querySelector('.boxLogin'))
            ShowLogin()
        })
        console.log(Dadoslogin)
    })
}else{
    ShowLogin()
}