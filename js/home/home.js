window.onload = () => {
  function waitfor () {
    return new Promise((resolve, reject) => {
      let timer = Math.random()
      setTimeout(() => {
        resolve()
      }, 1000 * timer + 100 * timer + 10 * timer)

    })
  }
  function openIndex () {
    return new Promise((resolve, reject) => {
      // 进入页面
      const bodyChild = document.body.children
      bodyChild[0].style.display = 'none'
      bodyChild[1].style.display = 'block'
      bodyChild[2].style.display = 'block'
      bodyChild[3].style.display = 'block'
      resolve()
    })
  }
  function firstSwiper () {
    return new Promise((resolve, reject) => {
      var swiper = new Swiper('.swiper1', {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        // pagination: {
        //   el: '.pagination1',
        // },
      });
      resolve()
    })
  }
  function BindUrl () {
    return new Promise((resolve, reject) => {
      // 第一个轮播图
      const SwiperImg = document.querySelectorAll('.slide1 img')
      const HtmlUrl = ['./vue.html', './react.html', './node.html']
      for (let i = 0; i < SwiperImg.length / 3; i++) {
        SwiperImg[i].onclick = function () {
          window.location.href = HtmlUrl[i]
        }
        SwiperImg[i + 3].onclick = function () {
          window.location.href = HtmlUrl[i]
        }
        SwiperImg[i + 6].onclick = function () {
          window.location.href = HtmlUrl[i]
        }
      }
      resolve()
    })
  }
  function openSlideBar () {
    return new Promise((resolve, reject) => {
      // 侧边栏的滑出
      const slideBar = document.querySelector('.slideBar')
      slideBar.style.boxShadow = 'none';
      const more = document.querySelector('.Nav_End img')
      let slideBarFlag = 'f'
      more.onclick = function (e) {
        slideBar.style.left = '0'
        slideBar.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
        slideBarFlag = 't'
        e.stopPropagation()
      }
      window.onclick = function () {
        if (slideBarFlag == 't') {
          slideBarFlag = 'f'
          slideBar.style.left = '-2.34375rem';
          slideBar.style.boxShadow = 'none';
        }
      }
      const body = document.body
      window.addEventListener('resize', () => {
        if (body.clientWidth >= 768) {
          slideBar.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
        } else {
          slideBar.style.left = '-2.34375rem'
          slideBar.style.boxShadow = 'none';
        }
      })
      resolve()
    })
  }
  const body = document.body
  function swiper2Resize () {
    if (body.clientWidth < 768) {
      // 防止多次实例化, 导致错误
      if (!swiper2) {
        swiper2 = new Swiper('.swiper2', {
          pagination: {
            el: '.pagination2'
          },
        });
      }
    }
    // 第二个轮播图
    const SwiperImg2 = document.querySelectorAll('.slide2 img')
    const HtmlUrl = ['./vue.html', './node.html', './react.html']
    for (let i = 0; i < SwiperImg2.length; i++) {
      SwiperImg2[i].onclick = function () {
        window.open(HtmlUrl[i], 'top')
      }
    }
  }
  var swiper2;
  function twoSwiper () {
    return new Promise((resolve, reject) => {
      window.onload = () => {
        swiper2Resize()
      }
      swiper2Resize()
      resolve()
    })
  }
  (async () => {
    // 网页等待动画
    await waitfor()
    // 开始首页界面
    await openIndex()
    // 开始渲染第一个轮播图
    await firstSwiper()
    // 为第一个轮播图的图片绑定点击事件转到网页
    // await BindUrl()
    // 开始渲染第二个轮播图
    await twoSwiper()
    // 控制侧边栏
    await openSlideBar()
    window.onresize = () => {
      swiper2Resize()
    }

    // 问答专区  已移出
    // await controlComment()
    // 时间过滤  已移出
    // await selectTime()
  })()
}