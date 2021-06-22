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
          slideBar.style.left = '-240px';
          slideBar.style.boxShadow = 'none';
        }
      }
      const body = document.body
      window.onresize = function () {
        if (body.clientWidth <= 768) {
          if (slideBarFlag == 't') {
            slideBarFlag = 'f'
            slideBar.style.left = '0'
          }
        } else {
          slideBar.style.left = '-2.34375rem'
        }
      }
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
  function controlComment () {
    return new Promise((resolve, reject) => {
      const catelis = document.querySelectorAll('.cate ul li ')
      const contents = document.querySelectorAll('.showContent')
      for (let a = 0; a < catelis.length; a++) {
        catelis[a].onclick = function () {
          for (let b = 0; b < catelis.length; b++) {
            contents[b].style.display = 'none'
            catelis[b].className = ''
          }
          catelis[a].className = 'active'
          contents[a].style.display = 'block'
        }
      }
      resolve()
    })
  }
  function selectTime () {
    return new Promise((resolve, reject) => {
      const times = document.querySelectorAll('.selectTime div input')
      times[2].onclick = function (e) {
        if (e.target.checked) {
          times[0].checked = true
          times[1].checked = true
        } else {
          times[0].checked = false
          times[1].checked = false
        }
      }
      for (let a = 0; a < times.length; a++) {
        times[a].onchange = (e) => {
          const { target: { checked } } = e
          if (checked == false) {
            times[2].checked = false
          }
          if (checked == true) {
            if (a == 1) {
              if (times[0].checked == true) {
                times[2].checked = true
              }
            } else if (a == 0) {
              if (times[1].checked == true) {
                times[2].checked = true
              }
            }
          }
        }
      }
      resolve()
    })
  }
  (async () => {
    document.querySelector('.showContent').style.display = 'block'
    // 网页等待动画
    await waitfor()
    // 开始首页界面
    await openIndex()
    // 开始渲染第一个轮播图
    await firstSwiper()
    // 为第一个轮播图的图片绑定点击事件转到网页
    await BindUrl()
    // 开始渲染第二个轮播图
    await twoSwiper()
    // 控制侧边栏
    await openSlideBar()
    window.onresize = () => {
      swiper2Resize()
    }

    // 问答专区
    await controlComment()
    // 时间过滤
    await selectTime()
  })()
}