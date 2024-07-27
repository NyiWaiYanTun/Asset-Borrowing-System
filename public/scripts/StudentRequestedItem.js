var AssetData;
async function GetRequestedItems() {
  const response = await fetch('/user');
  if (response.status == 200) {
    let user = await response.json();
    let userID = user.userID;
    document.querySelector('#status-greeting').innerHTML = "Hello..." + user.name ;
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID
        })
      };
      const res = await fetch('/requestedAssets', options);
      AssetData = res.status == 200 ? await res.json() : response.text();
    } catch (error) {
      console.log(error.message);
    }
  } else {
    console.log(); ('server error');
  }
  // const response = await fetch('/assets');
}
function cancelRequest(assetID) {
  Swal.fire({
    title: "Do you want to cancel ?",
    showDenyButton: false,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`
  }).then(async (result) => {
    if (result.isConfirmed) {
      // if confirmed
      try {
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            assetID
          })
        };
        const res = await fetch('/cancelRequest', options);
        if (res.status == 200) {
          console.log('ok');
        } else {
          console.log('server error');
        }
        window.location.reload();
      } catch (error) {
        console.log(error.message);
      }
    }
  });
}
GetRequestedItems().then(() => {
  let data = "";
  AssetData.forEach(element => {
    if (element.status == 'disapproved' && element.notToday) {

    } else {
              data += `<tr>
              <td>${element.assetName}</td>
              <td>${element.assetType}</td>`;
              if (element.status == "pending") {
                data += `<td class="text-warning">${element.status}</td>
        <td><button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modalId" data-remark="${element.remark}" data-booked_date="${element.booked_date.substring(0, 10)}">Details</button> </td>
        <td> <button class="btn btn-danger" onclick="cancelRequest(${element.assetID})">Cancel request</button></td>
        </tr>`;
              } else if (element.status == "approved") {
                data += `<td class="text-success">${element.status}</td>
        <td><button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modalId" data-remark="${element.remark}" data-booked_date="${element.booked_date.substring(0, 10)}">Details</button> </td>
        <td> <button class="btn btn-danger" onclick="cancelRequest(${element.assetID})">Cancel request</button></td>
        </tr>`;
              }
              else if (element.status == "disapproved") {
                data += `<td class="text-danger">${element.status}</td>
        <td><button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modalId" data-remark="${element.remark}" data-booked_date="${element.booked_date.substring(0, 10)}">Details</button> </td>
        <td> <button class="btn btn-danger" onclick="cancelRequest(${element.assetID})">Cancel request</button></td>
        </tr>`;
              }
    }
  });
  document.querySelector('tbody').innerHTML = data;
});
document.addEventListener('DOMContentLoaded', function () {
  var myModal = document.getElementById('modalId');
  myModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;
    var remark = button.getAttribute('data-remark');
    var booked_date = button.getAttribute('data-booked_date');
    console.log(remark + " " + booked_date);
    document.getElementById('remark').value = remark;
    document.getElementById('date').value = booked_date;
  });
});