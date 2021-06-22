window.onload = async () => {
  axios.defaults.timeout = 3000;
  function waitfor () {
    return new Promise((resolve, reject) => {
      let timer = Math.random()
      setTimeout(() => {
        const body = document.body
        body.children[0].style.display = 'none'
        body.children[2].style.display = 'block'
        body.children[1].style.display = 'block'
        resolve()
      }, 1000 * timer + 100 * timer + 10 * timer)
    })
  }
  function SearchAjax (url = window.location.href.split('?')[1] || '') {
    return new Promise((resolve, reject) => {
      const isLoading = document.querySelector('.data-loading')
      const Tip = document.querySelector('.Tip')
      Tip.style.display = 'flex'
      isLoading && (isLoading.style.display = 'flex')
      // 加工请求的字符串
      // let url = window.location.href.split('?')[1] || ''
      if (url == '') {
        resolve('')
      } else {
        let searchData = {
          [url.split('=')[0]]: url.split('=')[1]
        }
        let Html = 'http://410df4c4.nat123.fun/search?' + url
        // 开始请求数据
        axios.get(Html).then(res => {
          resolve(res.data)
        }).catch(err => {
          resolve('')
        })
      }
    })
  }
  function writeDataToHtml (res, state) {
    return new Promise((resolve, reject) => {
      if (res == '' || res.length == 0) {
        const isLoaindg = document.querySelector('.data-loading')
        const DataShow = document.querySelector('.dataShow')
        const isNull = document.querySelector('.none')
        isLoaindg && (isLoaindg.style.display = 'none')
        isNull && (isNull.style.display = 'block')
        resolve('')
      } else {
        const isLoaindg = document.querySelector('.data-loading')
        const isNull = document.querySelector('.none')
        const Tip = document.querySelector('.Tip')
        Tip.style.display = 'none'
        isLoaindg.style.display = 'none'
        isNull.style.display = 'none'
        const DataShow = document.querySelector('.dataShow')
        let currentDetail = ''
        let str = ''
        for (let a = 0; a < res.length; a++) {
          if (currentDetail != res[a].cate) {
            currentDetail = res[a].cate
            str += renderHtml(currentDetail, res, a)
          }
        }
        DataShow.innerHTML = str
        resolve()
      }
    })
  }
  // 组合HTML
  function renderHtml (currentDetail, res, index) {
    let str = `<ul class="list">
    <h3 class="title">${currentDetail}</h3>
  `
    for (let a = index; a < res.length; a++) {
      let htmlName = './' + res[a].cate + '.html#'
      if (res[a].cate == currentDetail) {
        str += `<li class="item"><a href="${htmlName}C${res[a].searchId}" target="_black">${res[a].searchName}</a></li>`
      }
    }
    str += '</ul>'
    return str
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
        // slideBar.style.cssText = "box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);";
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
          slideBar.style.boxShadow = 'none'
          slideBar.style.left = '-2.34375rem'
        }
      }
      resolve()
    })
  }
  // 侧边栏
  await openSlideBar()
  // 网页等待动画
  await waitfor()
  // 数据请求
  let res = await SearchAjax()
  // 写入html
  await writeDataToHtml(res)
  let request = document.querySelector('.Nav_Center input')
  request.onkeyup = async (e) => {
    if (e.code === 'Enter') {
      const isLoading = document.querySelector('.data-loading')
      const isNull = document.querySelector('.none')
      isLoading && (isLoading.style.display = 'none')
      isNull && (isNull.style.display = 'none')
      let str = `name=${request.value}`
      let res = await SearchAjax(str)
      await writeDataToHtml(res)
    }
  }
  request.onblur = (e) => {
    request.value = ''
  }
  const qs = document.querySelector('.qs')
  qs.onclick = () => {
    window.location.href = './index.html'
  }

}