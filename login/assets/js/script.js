let user = {}

let ShowHidePassword = (box)=>{
    if (box.querySelector('input').type === "password") {
        box.querySelector('input').type = "text"
        box.querySelector('span').innerText = 'visibility_off'
    } else {
        box.querySelector('input').type = "password";
        box.querySelector('span').innerText = 'visibility'
    }
}

let ShowLogin = ()=>{
    const boxLogin = document.querySelector('.boxLogin')
    const login = document.querySelector('#login')
    const cadastro = document.querySelector('#cadastro')

    const boxSenhaLogin = login.querySelector('p.senha')
    const boxSenhaCadastro = cadastro.querySelector('p.senha')

    boxSenhaLogin.querySelector('span').addEventListener('click',()=>ShowHidePassword(boxSenhaLogin))
    boxSenhaCadastro.querySelector('span').addEventListener('click',()=>ShowHidePassword(boxSenhaCadastro))

    let Require = {}

    boxLogin.querySelector('form').addEventListener('submit',(e)=>{
        e.preventDefault()
        user.usuario = login.querySelector('#nome_login').value
        user.senha = login.querySelector('#senha_login').value
        
        Require = ConsoltarBaseUsuario()
        if(Require.senha && Require.user){
            document.querySelector('body').querySelector('.boxLogin').remove()
            document.querySelector('body').classList.remove('noScrool')
            sessionStorage.setItem('login',JSON.stringify(user))
            showMenuLateral()
        }else{
            VerificarErro(Require.senha, login.querySelector('h3'), 'Senha Incorreta')
            VerificarErro(Require.user, login.querySelector('h3'), 'Usuário Incorreto')
        }
    })

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