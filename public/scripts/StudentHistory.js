var AssetData;
async function getHistory() {
  const response = await fetch('/user');
  if (response.status == 200) {
    let user = await response.json();
    let userID = user.userID;
    try{
      const options= {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          userID
        })
      };
      const res = await fetch('/studentHistory', options);
      AssetData = res.status == 200 ? await res.json() : response.text();
      console.log(AssetData.length);
    }catch(error){
      console.log(error.message);
    }
  } else {
    console.log();('server error');
  }
  // const response = await fetch('/assets');
}
getHistory().then(()=>{
  let data="";
  AssetData.forEach(element => {
    data+= `<tr>
              <td>${element.assetName}</td>
              <td>${element.assetType}</td>
              <td>${element.borrow_date.substring(0, 10)}</td>
              <td>${element.return_date.substring(0, 10)}</td>
              <td>${element.approved_by}</td>
            </tr>`;
  });
  document.querySelector('tbody').innerHTML=data;
});
document.querySelector('#search').onclick = function() {
  const searchByColumn = document.getElementById('searchBy').value;
  const searchTerm = document.getElementById('searchTerm').value.toLowerCase();
  const borrowedDate = document.getElementById('borrowDate').value;
  const returnedDate = document.getElementById('returnDate').value;

  const rows = document.querySelectorAll('table tbody tr');
  console.log(borrowedDate+" "+returnedDate);
  rows.forEach(row => {
    const cellText = row.cells[searchByColumn].textContent.toLowerCase();
    const rowBorrowedDate = row.cells[2].textContent.toLowerCase(); 
    const rowReturnedDate = row.cells[3].textContent.toLowerCase(); 

    const matchesSearchTerm = cellText.includes(searchTerm) || searchTerm === '';
    const matchesBorrowedDate = borrowedDate === '' || rowBorrowedDate.includes(borrowedDate);
    const matchesReturnedDate = returnedDate === '' || rowReturnedDate.includes(returnedDate);

    // Show row if it matches all filter criteria, otherwise hide it
    if (matchesSearchTerm && matchesBorrowedDate && matchesReturnedDate) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
};
