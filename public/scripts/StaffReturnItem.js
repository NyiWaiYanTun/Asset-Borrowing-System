var AssetData;
let userID;
async function GetAssets() {
  const response = await fetch('/returnLoad');
  AssetData = response.status == 200 ? await response.json() : await response.text();
  console.log(response.status);
}
async function returnItem(tranID, assetID){
  const response = await fetch('/user');
  if (response.status == 200) {
    let user = await response.json();
    userID = user.userID;
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID,
          tranID,
          assetID
        })
      };
      const res = await fetch('/return', options);
      let data= await res.text();
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  } else {
    console.log('server error');
  }
}
function confirm(tranID, assetID) {
  Swal.fire({
    title: "Do you confirm?",
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      returnItem(tranID, assetID);
    }
  });
}
GetAssets().then(() => {
  let data = "";
  AssetData.forEach(element => {
    data += `<tr>
            <td>${element.assetName}</td>
            <td>${element.assetType}</td>
            <td>${element.borrower}</td>
            <td>${element.borrow_date.substring(0, 10)}</td>
            <td><button class="btn btn-success return" onclick="confirm(${element.id}, ${element.assetID})"> Return this item </button></td>
          </tr>`;
  })
  document.querySelector('tbody').innerHTML = data;
})
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
 
