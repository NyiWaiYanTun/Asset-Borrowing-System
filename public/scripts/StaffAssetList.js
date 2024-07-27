var AssetData;
async function GetAssets() {
  const response = await fetch('/assets');
  AssetData = response.status == 200 ? await response.json() : response.text();
}
function prepareEdit(id){
  sessionStorage.setItem('id', id);
  window.location.assign('/StaffEditItem');
}
async function disable(id){
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id
      })
    };
    //connect to /register api
    const response = await fetch('/disableAsset', options);
    if (response.status === 200) {
       window.location.reload();
    }else{
      let data =await response.text();
      throw(data);
    }
  } catch (error) {
    console.log(error.message);
  }
}
function message(action, status){
  console.log(status);
  Swal.fire("You cannot "+action+" the item with status: "+ status);
}
GetAssets().then(() => {
  let data = "";
  AssetData.forEach(element => {
    data += `<tr>
                <td>${element.name}</td>
                <td>${element.type}</td>`;
    if (element.status == "available") {
      data += `<td class="text-success">${element.status}</td>
            <td><button class="btn btn-warning" onclick="prepareEdit(${element.id})"> Edit </button>  <button class="btn btn-dark disable" onclick="disable(${element.id})">Disable</button></td>
        </tr>`;
    } else if (element.status == "waiting for patron") {
      data += `<td class="text-warning">${element.status}</td>
        <td><button class="btn btn-warning" onclick= "message('edit','${element.status}')"> Edit </button>  <button class="btn btn-dark disable" onclick= "message('disable','${element.status}')">Disable</button></td>
        </tr>`;
    }
    else if (element.status == "borrowed") {
      data += `<td class="text-danger">${element.status}</td>
        <td><button class="btn btn-warning" onclick= "message('edit','${element.status}')"> Edit </button>  <button class="btn btn-dark disable" onclick= "message('disable','${element.status}')">Disable</button></td>
        </tr>`;
    }
    else if (element.status == "disabled") {
      data += `<td class="text-secondary">${element.status}</td>
        <td><button class="btn btn-warning" onclick="prepareEdit(${element.id})"> Edit </button>  <button class="btn btn-dark disable" onclick= "message('disable','${element.status}')">Disable</button></td>
        </tr>`;
    }
  })
  document.querySelector('tbody').innerHTML = data;
});
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