var AssetData;
async function GetAssets() {
  console.log('getassets');
  const response = await fetch('/staffHistoryLoad');
  AssetData = response.status == 200 ? await response.json() : await response.text();
  console.log(response.status);
}
function returnItem(value) {
  Swal.fire({
    title: "Enter your password",
    input: "password",
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      const password = result.value;
      // put further codes here
    }
  });
}
GetAssets().then(() => {
  let data = "";
  AssetData.forEach(element => {
    data += `<tr>
              <td>${element.assetName}</td>
              <td>${element.assetType}</td>
              <td>${element.borrower}</td>`;
            if (element.status == "disapproved") {
              data += `<td class="text-danger">${element.status}</td>
              </tr>`;
            } else if (element.status == "timeout") {
              data += `<td class="text-warning">${element.status}</td>
              </tr>`;
            }
            else if (element.status == "returned") {
              data += `<td class="text-success">${element.status}</td>
              </tr>`;
            }
            else if (element.status == "cancelled") {
              data += `<td class="text-secondary">${element.status}</td>
              </tr>`;
            }
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