document.getElementById('photo').addEventListener('change', function () {
  var file = this.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var preview = document.createElement('img');
      preview.className = 'preview img-thumbnail';
      preview.src = e.target.result;
      document.getElementById('previewArea').innerHTML = '';
      document.getElementById('previewArea').appendChild(preview);
    };
    reader.readAsDataURL(file);
  }
});
// remove the photo
document.getElementById('removePhoto').addEventListener('click', function () {
  document.getElementById('photo').value = '';
  document.getElementById('previewArea').innerHTML = '<img src="/public/img/no-photo.jpg" class="preview img-thumbnail">';
});
//remove the values when clicked on calcel
document.querySelector('#cancel').onclick = function () {
  document.querySelector('#name').value = null;
  document.querySelector('#email').value = null;
  document.querySelector('#password').value = null;
  document.querySelector('#confirmPassword').value = null;
}
//verify
async function verify(email) {
  try {
    const options = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email
      })
    };
    const response = await fetch('/sendVerificationEmail', options);
    let data = await response.text();
    console.log(data);
    Swal.fire("Please check your email to verify your account");
  } catch (error) {
    console.log(error.message);
    alert('Server error');
  }
}
// when clicked on register button
document.querySelector('#register').onclick = async function () {
  let name = document.querySelector('#name').value;
  let email = document.querySelector('#email').value;
  let password = document.querySelector('#password').value;
  let confirmPassword = document.querySelector('#confirmPassword').value;
  let fileInput = document.getElementById('photo');
  try {
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    const options = {
      method: 'POST',
      body: formData
    }

    const res = await fetch('/register', options);
    const data = await res.text();
    // successful
    if (res.status === 200) {
      console.log('Hello');
      verify(email);
    } else {
      document.querySelector('#message').innerHTML = data;
    }
  } catch (error) {
    console.log(error.message);
  }
}