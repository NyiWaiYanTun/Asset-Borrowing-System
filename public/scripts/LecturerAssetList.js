var AssetData;
async function GetAssets() {
  const response = await fetch('/assets');
  AssetData = response.status == 200 ? await response.json() : response.text();
}
GetAssets().then(()=>{
  let data="";
  AssetData.forEach(element => {
    data+= `<tr>
              <td>${element.id}</td>
              <td>${element.name}</td>
              <td>${element.type}</td>`;
    if(element.status=="available"){
          data+=`<td class="text-success">${element.status}</td>`;
    }else if(element.status=="waiting for patron"){
      data+=`<td class="text-warning">${element.status}</td>`;
    }
    else if(element.status=="borrowed"){
      data+=`<td class="text-danger">${element.status}</td>`;
    }
    else if(element.status=="disabled"){
      data+=`<td class="text-secondary">${element.status}</td>`;
    }
      data+=`<td><button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modalId" data-desp="${element.desp.replace(/\s*\|\s*/g, "<br>")}" data-name="${element.name}">View details</button></td>
      </tr>`;
  })
document.querySelector('tbody').innerHTML=data;
})
document.addEventListener('DOMContentLoaded', function() {
  var myModal = document.getElementById('modalId');
  myModal.addEventListener('show.bs.modal', function(event) {
      var button = event.relatedTarget;
      var desp = button.getAttribute('data-desp');
      console.log(desp);
      var name = button.getAttribute('data-name');
      document.getElementById('modalTitleId').innerHTML= name;
      document.getElementById('display').innerHTML= desp;
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

