document.querySelector('.nav').classList.toggle('closedNav');
document.querySelector('.content').classList.toggle('closedContent');
var id = 0;
var pp = '';
var name = '';
var isPhotoRemoved = false;
async function showUserInfo() {
  const response = await fetch('/user');
  if (response.status == 200) {
    let user = await response.json();
    id = user.userID;
    pp = user.pp
    document.querySelector('#currentPhoto').src = pp;
    document.querySelector('#name').value = user.name;
    document.querySelector('#email').value = user.email;
  } else {
    alert('server error');
  }
}
showUserInfo();// function called to show current user info
$(document).ready(function () {
  //form submission
  $('#editProfileForm').submit(function (e) {
    e.preventDefault();
  });
  // removing photo
  $('#removePhoto').click(function () {
    $('#currentPhoto').attr('src', '/public/img/no-photo.jpg');
    isPhotoRemoved = true;
  });

  // Code to handle changing photo
  $('#photo').change(function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#currentPhoto').attr('src', e.target.result);
    };
    reader.readAsDataURL(file);
  });
});
document.querySelector('#save').onclick =() => {
  let fileInput = document.getElementById('photo');
  let name = document.querySelector('#name').value
  Swal.fire({
    title: "Are you sure you want to save?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const formData = new FormData();
        formData.append('image', fileInput.files[0]);
        formData.append('name', name);
        formData.append('id', id);
        formData.append('isPhotoRemoved', isPhotoRemoved);
        formData.append('pp', pp);
        const options = {
          method: 'POST',
          body: formData
        }
    
        const res = await fetch('/EditProfile', options);
        const data = await res.text();
        if (res.status === 200) {
          window.location.reload();
        } else {
          document.querySelector('#message').innerHTML = data;
          window.location.reload();
        }
      } catch (error) {
        console.log(error.message);
      }
    } else if (result.isDenied) {
      window.location.reload();
    }
  });
}
document.querySelector('#savepsw').onclick=async ()=>{
  const old= document.querySelector('#old').value;
  const new1= document.querySelector('#new1').value;
  const new2= document.querySelector('#new2').value;
  try {
    // connect to service on server
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        old,
        new1,
        new2,
        id
      })
    };
    //connect to /register api
    const res = await fetch('/ChangePassword', options);
    const data = await res.text();
    // successful
    if (res.status === 200) {
      console.log('changed');
      window.location.reload();
    }else{
      document.querySelector('#messagepsw').innerHTML=data;
    }
  } catch (error) {
    document.querySelector('#messagepsw').innerHTML=error.message;
  }
}
