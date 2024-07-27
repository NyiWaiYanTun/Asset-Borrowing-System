var AssetData;
var userID;
async function GetBorrowedAssets() {
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
      const res = await fetch('/borrowRequests', options);
      AssetData = res.status == 200 ? await res.json() : response.text();
    } catch (error) {
      console.log(error.message);
    }
  } else {
    console.log(); ('server error');
  }
  // const response = await fetch('/assets');
}
async function approve(id, assetID) {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        assetID,
        userID
      })
    };
    const res = await fetch('/approve', options);
    let data;
    if (res.status === 200) {
      data = 'approved';
      window.location.reload();
    } else if (res.status === 400) {
      data = 'not available anymore';
      Swal.fire({
        icon: "error",
        title: "Too late...",
        text: "Item not available anymore!"
      });      
    } else {
      data = 'server error';
    }
  } catch (error) {
    console.log(error.message);
  }
}
async function reject(id, assetID) {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        assetID,
        userID
      })
    };
    const res = await fetch('/reject', options);
    let data = res.status == 200 ? 'rejected' : 'server error';
    console.log(data);
    window.location.reload();
  } catch (error) {
    console.log(error.message);
  }
}
function confirm(isApproved, id, assetID) {
  Swal.fire({
    title: "Do you confirm?",
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      if (isApproved) {
        approve(id, assetID);
      } else {
        reject(id, assetID);
      }
    }
  });
};
GetBorrowedAssets().then(() => {
  let data = "";
  AssetData.forEach(element => {
    data += `<tr>
            <td>${element.assetName}</td>
            <td>${element.assetType}</td>
            <td>${element.borrower}</td>
            <td><button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modalId" data-remark="${element.remark}" data-booked_date="${element.booked_date.substring(0, 10)}">Details</button> </td>
            <td><button class="btn btn-success" onclick="confirm(true, '${element.id}', '${element.assetID}')">Approve</button> <button
                                    class="btn btn-warning" onclick="confirm(false, '${element.id}', '${element.assetID}')">Reject</button></td>
          </tr>`;
  })
  document.querySelector('tbody').innerHTML = data;
});
document.addEventListener('DOMContentLoaded', function () {
  var myModal = document.getElementById('modalId');
  myModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;
    var remark = button.getAttribute('data-remark');
    var booked_date = button.getAttribute('data-booked_date');
    console.log;
    document.getElementById('date').value = booked_date;
    document.getElementById('remark').value = remark;
  });
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
