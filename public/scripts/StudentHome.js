document.querySelector('.nav').classList.toggle('closedNav');
document.querySelector('.content').classList.toggle('closedContent');
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
})

