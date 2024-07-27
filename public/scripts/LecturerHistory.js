var AssetData;
let userID;
async function GetHistory() {
  const response = await fetch('/user');
  if (response.status == 200) {
    let user = await response.json();
    userID = user.userID;
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID
        })
      };
      const res = await fetch('/lecturerHistory', options);
      AssetData = res.status == 200 ? await res.json() : response.text();
    } catch (error) {
      console.log(error.message);
    }
  } else {
    console.log(); ('server error');
  }
}
function returnItem(value) {
  Swal.fire({
    title: "Enter your password",
    input: "password",
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      const password = result.value;
    }
  });
}
GetHistory().then(() => {
  let data = "";
  AssetData.forEach(element => {
    data += `<tr>
              <td>${element.assetName}</td>
              <td>${element.assetType}</td>
              <td>${element.borrower}</td>
              <td>${element.validated_date.substring(0,10)}</td>`;
    if(element.status=='disapproved'){
      data+='<td class="text-danger">rejected</td></tr>';
    }else{
      data+='<td class="text-success">approved</td></tr>';
    }
  })
  document.querySelector('tbody').innerHTML = data;
});
document.querySelector('#search').onclick = function() {
  const searchByColumn = document.getElementById('searchBy').value;
  const searchTerm = document.getElementById('searchTerm').value.toLowerCase();
  const validatedDate = document.getElementById('validatedDate').value;

  const rows = document.querySelectorAll('table tbody tr');
  rows.forEach(row => {
    const cellText = row.cells[searchByColumn].textContent.toLowerCase();
    const rowValidatedDate = row.cells[3].textContent.toLowerCase();  

    const matchesSearchTerm = cellText.includes(searchTerm) || searchTerm === '';
    const matchesDate = validatedDate === '' || rowValidatedDate.includes(validatedDate);

    // Show row if it matches all filter criteria, otherwise hide it
    if (matchesSearchTerm && matchesDate) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
};