var news;
async function loadNews() {
  const res = await fetch('/news');
  news = res.status == 200 ? await res.json() : await res.text();
  console.log(news);
  let data = "";
  news.forEach(element => {
    data += `<div class="news-item carousel-item">
                            <div class="card">
                                <div class="img-wrapper"><img src="${element.img}" alt="..." height="250px"></div>
                                <div class="card-body">
                                    <h5 class="card-title">${element.title}</h5>
                                    <p class="card-text">${element.desp}</p>
                                </div>
                            </div>
                        </div>`;
  });
  document.querySelector('#news-display').innerHTML = data;
}
loadNews().then(() => {
  //carrusal rotation
  var carouselWidth = $('.news-inner')[0].scrollWidth;
  var cardWidth = $('.news-item').width();
  var scrollPosition = 0;

  $('.carousel-control-next').on('click', function () {
    scrollPosition = scrollPosition + cardWidth;
    $('.news-inner').animate({ scrollLeft: scrollPosition }, 600);
  })
  $('.carousel-control-prev').on('click', function () {
    scrollPosition = scrollPosition - cardWidth;
    $('.news-inner').animate({ scrollLeft: scrollPosition }, 600);
  })
});
// form
$(document).ready(function () {
  //form submission
  $('#editProfileForm').submit(function (e) {
    e.preventDefault();
  });
  // removing photo
  $('#removePhoto').click(function () {
    $('#currentPhoto').attr('src', '/public/img/anouncement.jpg');
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
document.querySelector('#save').onclick = () => {
  let fileInput = document.getElementById('photo');
  let title = document.querySelector("#title").value;
  let desp = document.querySelector("#desp").value;
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
        formData.append('title', title);
        formData.append('desp', desp);
        const options = {
          method: 'POST',
          body: formData
        }

        const res = await fetch('/AddNews', options);
        if (res.status === 200) {
          window.location.reload();
        } else {
          const data = await res.text();
          document.querySelector('#message').innerHTML = data;
          window.location.reload();
        }
      } catch (error) {
        document.querySelector('#message').innerHTML = "server error";
        console.log(error.message);
      }
    } else if (result.isDenied) {
      window.location.reload();
    }
  });
}