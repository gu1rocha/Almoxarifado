
Dadoslogin = sessionStorage.getItem('login')
let pathname = (location.pathname).replaceAll('/','')
pathname === 'index.html' || pathname === "" ? pathname = 'home' : ''
if(!!Dadoslogin){
    let resources = ConsoltarBaseUsuarioResources(JSON.parse(Dadoslogin))
    if(!(resources[0].toString()).includes(pathname)){
        window.location.href = '/'
    }
}else{
    window.location.href = '/'
}