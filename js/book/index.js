window.onload = () => {
  // 定义外部变量存储接受到的数据
  let BookData;
  // 定义购物车
  let ShopCart = [];
  const RenderBox = document.querySelector('.renderData')

  // 对span进行显示和隐藏  内含变化修改  
  // BindUrlMoreAxios SpanInsertValue
  function hoverMoreShowBox () {
    const more = document.querySelector('.cate > ul > span')
    const box = document.querySelector('.cate > ul > span >div.box')
    more.addEventListener('click', (e) => {
      e.stopPropagation()
      let value = acquireCssValue(box, 'display')
      box.style.display = value == 'none' ? 'block' : 'none'
    })
    document.body.addEventListener('click', (e) => {
      // e.stopPropagation();
      box.style.display = 'none'
    })
    SpanInsertValue(box)
    BindUrlMoreAxios()
    window.onresize = () => {
      box.style.display = 'none'
      SpanInsertValue(box)
      BindUrlMoreAxios()
    }
  }
  hoverMoreShowBox()


  // 得到CSS属性值 函数
  function acquireCssValue (obj, prototype) {
    if (obj.currentStyle) {
      return obj.currentStyle[prototype];
    }
    else {
      return document.defaultView.getComputedStyle(obj, null)[prototype]
    }
  }
  // 向span中插入值
  function SpanInsertValue (box) {
    // 每次开始前清空值 
    box.innerHTML = ''
    // 开始插入元素
    let lis = document.querySelectorAll('.cate > ul >li')
    for (let a = 0; a < lis.length; a++) {
      let value = acquireCssValue(lis[a], 'display')
      let Text = lis[a].innerText
      if (value === 'none') {
        str = `
        <span><a href="Javascript:;">${Text}</a></span>
                 `
        box.insertAdjacentHTML('beforeend', str)
      }
    }
  }

  // 接口http://czf4ut5r.dongtaiyuming.net/book?name=%E9%A2%86%E4%B8%BB%E8%B4%B5%E6%97%8F

  // 渲染数据
  function renderData (val) {
    RenderBox.innerHTML = ''
    let Url = `http://czf4ut5r.dongtaiyuming.net/book?name=${val}
    `
    axios.get(Url).then(res => {
      BookData = res.data
      RenderBox.innerHTML = ''
      for (let a = 0; a < BookData.length; a++) {
        let HtmlStr = `
        <div class="item ">
        <img src="${BookData[a].imgUrl}" alt="">
      </div>
        `
        RenderBox.insertAdjacentHTML('beforeend', HtmlStr)
      }
    }).then(() => {
      ActiveShowDetail()
    })
  }
  renderData('洪荒封神')

  // 点击item 显示详情页
  function ActiveShowDetail () {
    const item = document.querySelectorAll('body > div.container > div.row > div > div')
    for (let a = 0; a < item.length; a++) {
      item[a].onclick = () => {
        const wrapper = document.querySelector('.bookInfo .wrapper')
        wrapper.innerHTML = ''
        const BookInfo = document.querySelector('.bookInfo')
        let itemData = [BookData[a].imgUrl, BookData[a].name, BookData[a].newartical, BookData[a].wordnumber, BookData[a].author, BookData[a].updatetime, getRandomIntInclusive(100, 500)]
        let str = `<div class="img">
        <img src="${itemData[0]}" alt="">
      </div>
      <div class="detail">
        <div class="name">
          <span>书名: </span>
          <span>${itemData[1]}</span>
        </div>
        <div class="newArtical">
          <span>最新章节</span>
          <span>${itemData[2]}</span>
        </div>
        <div class="wordNumber">
          <span>字数</span>
          <span>${itemData[3]}</span>
        </div>
        <div class="author">
          <span>作者</span>
          <span>${itemData[4]}</span>
        </div>
        <div class="updateTime">
          <span>更新时间</span>
          <span>${itemData[5]}</span>
        </div>
        <div class="price">
          <span>价格</span>
          <span>${itemData[6]}</span>
        </div>
        <div class="add">
          <span>加入购物车</span>
        </div>
        <div class="shut">
          <span>关闭</span>
        </div>
      </div>
        
        `
        wrapper.insertAdjacentHTML('beforeend', str)
        BookInfo.className = 'bookInfo animate__animated animate__fadeInUp'
        BookInfo.style.display = 'flex'
        // 得到关闭按钮并绑定相应的事件
        const shut = document.querySelector('body > div.container > div.bookInfo > div > div.detail > div.shut > span')
        shut.onclick = () => {
          // 动画加载完成自动隐藏
          BookInfo.className = 'bookInfo  animate__animated animate__fadeOutDown'
          // setTimeout(() => {
          //   // BookInfo.style.display = 'none'
          // }, 400)
        }
        // 得到 加入购物车 按钮
        const AddBtn = document.querySelector('body > div.container > div.bookInfo > div > div.detail > div.add > span')
        AddBtn.onclick = () => {
          ShopCart.push(itemData)
          DesignShopCart()
          alert('加入购物城完成 ！ ！ ！ ')
          // 动画加载完成自动隐藏
          BookInfo.className = 'bookInfo  animate__animated animate__fadeOutDown'
        }
      }
    }
  }

  // 购物车设计
  function DesignShopCart () {
    // 购物车的数量
    const cartCount = document.querySelector('.cartImg span')
    cartCount.innerText = ShopCart.length
    // 购物车图片的点击
    const cartImg = document.querySelector('.cartImg')
    const shopCaty = document.querySelector('.shopCart')
    cartImg.onclick = () => {
      shopCaty.className = 'shopCart animate__animated animate__fadeInRight'
      shopCaty.style.display = 'flex'
    }
    // 关闭按钮的点击
    const shut = document.querySelector('.shopCart .footer .shut')
    shut.onclick = () => {
      // 动画加载完成自动隐藏
      shopCaty.className = 'shopCart animate__animated animate__fadeOutLeft'
    }
    // 购物车的渲染
    const list = document.querySelector('.shopCart .list')
    list.innerHTML = ''
    for (let a = 0; a < ShopCart.length; a++) {
      let HTMLUrl = ` <div class="item">
      <div class="left">
        <input type="checkbox">
      </div>
      <div class="right">
        <img src="${ShopCart[a][0]}" alt="">
        <div class="divFlex">
          <div class="name">
            <span>${ShopCart[a][1]}</span>
          </div>
          <div class="author">
            ${ShopCart[a][2]}
          </div>
          <div class="price">
            ${ShopCart[a][6]}元
          </div>
        </div>
        <div class="delete">
          <span>删除</span>
        </div>
      </div>
    </div>`
      list.insertAdjacentHTML('beforeend', HTMLUrl)
    }
    DeleteOrder()

    AllCheckedOrNot()

  }
  DesignShopCart()
  // 将购物车设计中的删除订单分离出来  
  //DesignShopCart 每一次渲染都要调用下面的 DeleteOrder AllCheckedOrNot
  function DeleteOrder () {
    const del = document.querySelectorAll('body > div.container > div.shopCart > div.list > div > div.right > div.delete > span')
    for (let a = 0; a < del.length; a++) {
      del[a].onclick = () => {
        if (window.confirm('是否要删除  ！ ！ ！ ')) {
          ShopCart.splice(a, 1)
          DesignShopCart()
        }
      }
    }
  }
  // 全选全不选的抽离
  function AllCheckedOrNot () {
    const inputs = document.querySelectorAll('.shopCart .list .item .left input')
    const AllCheckd = document.querySelector('.footer .AllStatecheck input')
    let state = []
    if (inputs.length != 0) {
      for (let a = 0; a < inputs.length; a++) {
        state[a] = 0
        inputs[a].onchange = function () {
          state[a] = this.checked

          let isAll = state.every(s => s)
          isAll ? AllCheckd.checked = true : AllCheckd.checked = false
        }
      }

    }
    AllCheckd.checked = false
    AllCheckd.onchange = function () {
      if (inputs.length == 0) {
        AllCheckd.checked = false
      }
      for (let a = 0; a < inputs.length; a++) {
        inputs[a].checked = this.checked
      }
    }

  }

  // 得到两个随机整数
  function getRandomIntInclusive (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
  }

  // 对每个标签做出点击事件
  // 请求i相应的数据
  const navlis = document.querySelectorAll('body > div.container-fluid > div.main > div > ul > li')
  for (let a = 0; a < navlis.length; a++) {
    navlis[a].onclick = () => {
      for (let b = 0; b < navlis.length; b++) {
        if (b == a) {
          navlis[b].className = 'active'
        } else {
          navlis[b].className = ''
        }
      }
      const moreBox = document.querySelectorAll('div.main > div > ul > span > div > span > a')
      for (let b = 0; b < moreBox.length; b++) {
        moreBox[b].className = ''
      }
      renderData(navlis[a].innerText)
    }
  }

  // 对小屏幕下的more 做出的axios绑定
  function BindUrlMoreAxios () {
    const moreBox = document.querySelectorAll('div.main > div > ul > span > div > span > a')
    for (let a = 0; a < moreBox.length; a++) {
      moreBox[a].onclick = function (e) {
        for (let b = 0; b < moreBox.length; b++) {
          if (b == a) {
            moreBox[b].className = 'active'
          } else {
            moreBox[b].className = ''
          }
        }
        for (let b = 0; b < navlis.length; b++) {
          navlis[b].className = ''
        }
        e.preventDefault();
        renderData(this.innerText)
      }
    }
  }

  // 点击logo 跳转
  const qs = document.querySelector('.qs')
  qs.onclick = () => {
    window.location.href = './index.html'
  }
}