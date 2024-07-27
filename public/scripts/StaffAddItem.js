document.querySelector('.nav').classList.toggle('closedNav');
document.querySelector('.content').classList.toggle('closedContent');
async function addAsset(name, type, status, desp){
    try{
        const options={
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name,
                type,
                status,
                desp
            })
        };
        const response = await fetch('/addAsset', options);
        let data= await response.text();
        if(response.status===200){
            Swal.fire("Saved!", "", "success");
            window.location.assign(data);
        }else{
            document.querySelector('#message').innerHTML=data;
        }
    }catch(error){
        console.log(error.message);
        alert('Server error');
    }
}
document.querySelector('#save').onclick= ()=>{
    let name= document.querySelector('#assetName').value;
    let type= document.querySelector('#assetType').value;
    let status= document.querySelector('#status').value;
    let desp= document.querySelector('#desp').value
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        if (result.isConfirmed) {
            addAsset(name, type, status, desp);
        } else if (result.isDenied) {
            window.location.reload();
        }
      });
}