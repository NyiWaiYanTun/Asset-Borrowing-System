let showUser= async ()=>{
    const response = await fetch('/user');
    if(response.status==200){
        let user=await response.json();
        document.querySelector('#profileLogo').src= user.pp;
        document.querySelector('#profileLogoBig').src= user.pp;
        document.querySelector('#profileName').innerHTML = user.name;
        document.querySelector('#profileEmail').innerHTML = user.email;
    }else{
       alert('server error');
    }
}
showUser();

document.querySelector('#nav-toggle').onclick = ()=> {
    document.querySelector('.nav').classList.toggle('closedNav');
    document.querySelector('.content').classList.toggle('closedContent');
};
document.querySelector('#profileLogo').onclick = ()=> {
    document.querySelector('.sub-menu-wrap').classList.toggle('showProfile');
};
document.querySelector('#logout').onclick=async ()=>{
    const response = await fetch('/logout');
    let data=await response.text();
    if(response.status==200){
        location.replace(data);
    }else{
        alert('server error');
    }
}
