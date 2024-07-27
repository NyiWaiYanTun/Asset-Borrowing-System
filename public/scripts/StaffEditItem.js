document.querySelector('.nav').classList.toggle('closedNav');
document.querySelector('.content').classList.toggle('closedContent');
async function showAssetInfo() {
    try {
        let id= sessionStorage.getItem('id');
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id
          })
        };
        //connect to /register api
        const response = await fetch('/getEditAsset', options);
        if (response.status === 200) {
          //display asset info
          let asset= await response.json();
          document.querySelector('#assetName').value= asset.name;
          document.querySelector('#assetType').value= asset.type;
          document.querySelector('#status').value= asset.status;
          document.querySelector('#desp').value= asset.desp;
        }else{
            let data = response.text();
          throw(data);
        }
      } catch (error) {
        console.log(error.message);
        alert('server error');
      }
}
async function editAsset(name, type, status, desp){
    try {
        let id= sessionStorage.getItem('id');
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            name,
            type,
            status,
            desp
          })
        };
        //connect to /register api
        const response = await fetch('/editAsset', options);
        if (response.status === 200) {
            Swal.fire("Saved!", "", "success");
        }else{
          let data =await response.text();
          document.querySelector('#message').innerHTML=data;
        }
      } catch (error) {
        console.log(error.message);
        document.querySelector('#message').innerHTML='server error';
      }
}
showAssetInfo();
document.querySelector('#save').onclick= ()=>{
    let name= document.querySelector('#assetName').value;
    let type= document.querySelector('#assetType').value;
    let status= document.querySelector('#status').value;
    let desp= document.querySelector('#desp').value;
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        if (result.isConfirmed) {
            editAsset(name, type, status, desp);
        } else if (result.isDenied) {
            
        }
        showAssetInfo();
      });
}