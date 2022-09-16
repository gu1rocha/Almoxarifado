let showMenuLateral = ()=> {
    GetHTML('./menuLateral/index.html', 'get',  function(obj) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(obj.responseText, "text/html");

        if(!!document.querySelector('aside'))
        document.querySelector('aside').remove()

        let aside = doc.querySelector('aside')

        document.querySelector('.box').insertBefore(aside, document.querySelector('.box').firstChild)

        const menuBtn = document.querySelector("#menu-btn");
        const closeBtn = document.querySelector("#close-btn");

        menuBtn.addEventListener('click', () =>{
            aside.style.display = 'block';
        });
        
        closeBtn.addEventListener('click', () => {
            aside.removeAttribute('style')
        });

        Dadoslogin = sessionStorage.getItem('login')
        let pathname = (location.pathname).replace('/','')
        pathname === 'index.html' || pathname === "" ? pathname = 'home' : ''
        if(!!JSON.parse(Dadoslogin)){
            let resources = ConsoltarBaseUsuarioResources(JSON.parse(Dadoslogin))
            aside.querySelector('h2').innerText = Capitalize(resources[1])
            for (const link of aside.querySelectorAll('a')) {
                if(!(link.className.includes('home') || link.className.includes('logout'))&&!(resources[0].toString()).includes(link.className)){
                    link.remove()
                }

                if(pathname.includes(link.className)){
                    link.classList.add('active')
                }
            }
            aside.querySelector('#logout').addEventListener('click',()=>{
                sessionStorage.removeItem('login')
                window.location.href = '/'
            })
        }else{
            for (const link of aside.querySelectorAll('a')) {
                if(!(link.className.includes('home') || link.className.includes('login'))){
                    link.remove()
                }

                if(pathname.includes(link.className)){
                    link.classList.add('active')
                }
            }
            
            showLogin.addEventListener('click',()=>{
                var ajax = GetHTML('./../login/index.html', 'get',  function(obj) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(obj.responseText, "text/html");
                    document.querySelector('body').classList.add('noScrool')
                    document.querySelector('body').appendChild(doc.querySelector('.boxLogin'))
                    document.querySelector('body').querySelector('.boxLogin').querySelector('.close').addEventListener('click',()=>{
                        document.querySelector('body').querySelector('.boxLogin').remove()
                        document.querySelector('body').classList.remove('noScrool')
                    })
                    ShowLogin()
                })
            })
        }
    })
}

showMenuLateral()