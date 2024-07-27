var AssetData;
async function GetAssets() {
  const response = await fetch('/assets');
  AssetData = response.status == 200 ? await response.json() : response.text();
}
async function requestAsset(assetID, remark){
  const response = await fetch('/user');
  if (response.status == 200) {
    let user = await response.json();
    let userID = user.userID;
    try{
      const options= {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          userID,
          assetID,
          remark
        })
      };
      const res = await fetch('/requestAsset', options);
      const data= await res.text();
      if(res.status==200){
        console.log(data);
      }else if(res.status==400){
        Swal.fire(data);
      }
    }catch(error){
      console.log(error.message);
    }
  } else {
    console.log();('server error');
  }
} 
GetAssets().then(() => {
  let data = "";
  AssetData.forEach(element => {
    console.log(element.id)
    data += `<tr>
              <td>${element.id}</td>
              <td>${element.name}</td>
              <td>${element.type}</td>`;
    if (element.status == "available") {
      data += `<td class="text-success">${element.status}</td>
        <td><button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modalId" data-id="${element.id}" data-name="${element.name}" data-desp="${element.desp.replace(/\s*\|\s*/g, "<br>")}">Request
                item</button></td>
      </tr>`;
    } else if (element.status == "waiting for patron") {
      data += `<td class="text-warning">${element.status}</td>
      <td>---</td>
      </tr>`;
    }
    else if (element.status == "borrowed") {
      data += `<td class="text-danger">${element.status}</td>
      <td>---</td>
      </tr>`;
    }
    else if (element.status == "disabled") {
      data += `<td class="text-secondary">${element.status}</td>
      <td>---</td>
      </tr>`;
    }
  })
  document.querySelector('tbody').innerHTML = data;
})
// const now = new Date();
document.addEventListener('DOMContentLoaded', function() {
  var myModal = document.getElementById('modalId');
  myModal.addEventListener('show.bs.modal', function(event) {
      var button = event.relatedTarget;
      var id = button.getAttribute('data-id');
      var name = button.getAttribute('data-name');
      var desp = button.getAttribute('data-desp');
      document.getElementById('modalTitleId').innerHTML= name;
      document.getElementById('display').innerHTML= desp;
      document.getElementById('save').value= id;
  });
});

document.querySelector('#save').onclick = function () {
  let id= document.getElementById('save').value;
  let remark= document.getElementById('remark').value;
  Swal.fire({
    title: "Do you want to book this item?",
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      requestAsset(id, remark);
    }
  });
};
 document.querySelector('#search').onclick= function() {
  const filterColumn = document.getElementById('searchBy');
  const searchInput = document.getElementById('searchTerm');
   const columnIndex = parseInt(filterColumn.value);
   const searchText = searchInput.value.toLowerCase();
   const rows = document.querySelectorAll('table tbody tr');
   rows.forEach(row => {
     const cellText = row.cells[columnIndex].textContent.toLowerCase();

     // Show row if it matches the filter criteria, otherwise hide it
     if (cellText.includes(searchText) || searchText === '') {
       row.style.display = '';
     } else {
       row.style.display = 'none';
     }
   });
 }