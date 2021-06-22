window.onload = () => {
  const body = document.body
  var swiper2;
  function swiper2Resize () {
    if (body.clientWidth <= 750) {
      swiper2 = new Swiper('.swiper2', {
        pagination: {
          el: '.pagination2',
        },
      });
    }
    // 第二个轮播图
    const SwiperImg2 = document.querySelectorAll('.slide2 img')
    const HtmlUrl = ['./vue.html', './react.html', './node.html']
    for (let i = 0; i < SwiperImg2.length; i++) {
      SwiperImg2[i].onclick = function () {
        XS
        window.open(HtmlUrl[i], 'top')
      }
    }
  }
  window.onresize = () => {
    swiper2Resize()

  }
  window.onload = () => {
    swiper2Resize()
  }

}