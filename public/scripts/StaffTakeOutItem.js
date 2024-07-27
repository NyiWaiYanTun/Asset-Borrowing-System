let userID;
var AssetData;
async function GetAssets() {
  const response = await fetch('/takeoutLoad');
  AssetData = response.status == 200 ? await response.json() :await response.text();
}
async function takeout(tranID, assetID){
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
      const res = await fetch('/takeout', options);
      let data= await res.text();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  } else {
    console.log(); ('server error');
  }
}
function confirm(tranID, assetID) {
  Swal.fire({
    title: "Do you confirm?",
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      takeout(tranID, assetID);
    }
    window.location.reload();
  });
}
GetAssets().then(() => {
  let data = "";
  AssetData.forEach(element => {
    data += `<tr>
              <td>${element.assetName}</td>
              <td>${element.assetType}</td>
              <td>${element.borrower}</td>
              <td>${element.booked_date.substring(0, 10)}</td>
              <td><button class="btn btn-success  return" onclick="confirm('${element.id}', '${element.assetID}')"> Take out this item </button></td>
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
