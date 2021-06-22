
// 渲染sliderBar 内容
// 定义数据
const NodeData = [
  { id: 1, title: "小技巧", child: ['{ }复制对象', '嵌套解构', '消息订阅及发布'] },
  { id: 2, title: "React介绍", child: ['react', '开发者', '学习的原因', '特点', '高效的原因'] },
  { id: 1, title: "JSX语法规则", child: ['语法规则', 'babel.js的作用'] },
  { id: 3, title: "组件化编程", child: ['函数式组件', '类式组件'] },
  { id: 4, title: "state", child: ['理解', '注意', '简写'] },
  { id: 1, title: "props", child: ['理解 ', '作用', '限制props', '简写方式', '类式组件中的构造器和  props', '函数式组件使用props'] },
  { id: 1, title: "refs", child: ['理解', '字符串形式的ref ', '回调函数形式的ref', 'createRef API', '总结'] },
  { id: 1, title: "事件处理", child: ['通过onxxx 属性定义的事件处理函数', '通过event.target 得到发生事件的DOM元素对象'] },
  { id: 1, title: "收集表单数据", child: ['受控组件', '非受控组件'] },
  { id: 1, title: "函数柯里化", child: ['高阶函数', '函数的柯里化'] },
  { id: 1, title: "生命周期", child: [' 理解', '生命周期三个阶段( 旧 )', '生命周期三个阶段( 新 )', '对比新旧组件'] },
  { id: 1, title: "DOM 的 diffing 算法", child: [' diffing 算法', 'key的作用', 'HTTP状态码', '常见状态码', '请求方法', '浏览器URL地址渲染过程'] },
  { id: 1, title: "脚手架", child: [' 错误', ' react脚手架', ' 脚手架配置代理'] },
  { id: 1, title: "样式的模块化", child: ['css文件的名字', 'js文件中的应用'] },
  { id: 1, title: "toDolist 案例", child: ['父传子 ', '子传父', '为每一个todo 设置一个唯一的id', '判断存在相同的数据', '通过鼠标的移出移出控制 Item 的背景颜色', '修改App中的done 状态值  ---是否选中', '对传递props 进行限制', '删除todo'] },
  { id: 1, title: "React Ajax", child: ['ajax 请求库'] },
  { id: 1, title: "兄弟组件通信", child: ['消息订阅 - 发布机制'] },
  { id: 1, title: "Fetch", child: ['文档', '特点', '相关API'] },
  { id: 1, title: "React 路由", child: ['SPA', '路由', 'React-router-dom', '组件的使用', '嵌套路由', '路由传递参数', '编程式导航', 'withRouter', 'BrowserRouter 和  HashRouter', '细节'] }
]
for (let a = 0; a < NodeData.length; a++) {
  NodeData[a].id = a + 1
}
let collectID = []
// 获取父元素
const NodeParent = document.querySelector('.sliderBar')
//开始渲染
for (let a = 0; a < NodeData.length; a++) {
  if (NodeData[a].child.length !== 0) {
    collectID[collectID.length] = [(a + 1 + ''), NodeData[a].title]
    let StartStr = `<div>
    <ul>
      <h4>
        <a href="#C${a + 1}">${NodeData[a].title}</a>
      </h4>`
    let liStr = ``
    for (let b = 0; b < NodeData[a].child.length; b++) {
      collectID[collectID.length] = [(a + 1) + '' + (b + 1), NodeData[a].child[b]]
      liStr += `<li>
      <a href="#C${(a + 1) + '' + (b + 1)}">${NodeData[a].child[b]}</a>
    </li>`
    }
    liStr += `
    </ul>
  </div>
    `
    let AllStr = StartStr + liStr;
    NodeParent.insertAdjacentHTML('beforeend', AllStr)
  } else {
    collectID[collectID.length] = [(a + 1 + ''), NodeData[a].title]
    let str = `<div>
    <h4>
      <a href="#C${a + 1}">${NodeData[a].title}</a>
    </h4>
  </div>`
    NodeParent.insertAdjacentHTML('beforeend', str)
  }
}
// console.log(collectID);
// 将数据  通过请求后台, 提前写入数据库
// for (let a = 0; a < collectID.length; a++) {
//   let str = `
//   http://localhost:8080/search?id=${collectID[a][0]}&name=${collectID[a][1]}
//   `
//   console.log(str);
//   axios.get(str).then(res => {
//     console.log(res.data);
//   })
// }

// 设置点击滑出侧边栏
const MoreImg = document.querySelector('body > div > div.row > div > div.Nav_End > img');
const SliderBar = document.querySelector('body > div > div.sliderBar')
SliderBar.style.boxShadow = 'none';
let ImgFlag = 'f'
MoreImg.onclick = function (e) {
  if (ImgFlag == 'f') {
    SliderBar.style.left = '0rem'
    SliderBar.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
    ImgFlag = 't'
  } else {
    SliderBar.style.left = '-2.34375rem'
    slideBar.style.boxShadow = 'none';
    ImgFlag = 'f'
  }
  e.stopPropagation();
}
window.document.onclick = () => {
  if (ImgFlag == 't') {
    ImgFlag = 'f'
    SliderBar.style.left = '-2.34375rem'
    SliderBar.style.boxShadow = 'none';
  }
}
const body = document.body
window.onresize = () => {
  if (body.clientWidth >= 768) {
    SliderBar.style.left = '0'
    SliderBar.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
  } else {
    SliderBar.style.left = '-2.34375rem'
    SliderBar.style.boxShadow = 'none';
  }
}

// 对子选项卡进行展开和闭合
// 对子选项卡进行展开和闭合
const uls = document.querySelectorAll('.sliderBar div > ul');
for (let a = 0; a < uls.length; a++) {
  uls[a].setAttribute('data-index', a)
  for (let b = 1; b < uls[a].children.length; b++) {
    uls[a].children[b].style.display = 'none'
  }
  uls[a].onclick = function () {
    let style = window.getComputedStyle(uls[a].children[1])
    console.log(style.display);
    if (style.display == 'block') {
      for (let b = 1; b < uls[a].children.length; b++) {
        uls[a].children[b].style.display = 'none'
      }
    } else {
      for (let a = 0; a < uls.length; a++) {
        for (let b = 1; b < uls[a].children.length; b++) {
          uls[a].children[b].style.display = 'none'
        }
        let index = uls[a].getAttribute('data-index')
        for (let c = 1; c < this.children.length; c++) {
          this.children[c].style.display = 'block'
        }
      }
    }
  }
}


const SiteName = document.querySelector('div.Nav_Left > p')
SiteName.onclick = function () {
  window.location.href = './index.html'
}



// 渲染侧边栏数据
const SliderBarData = ['小技巧', 'React介绍', 'JSX语法规则', '组件化编程', 'state', 'props', 'refs', '事件处理', '手机表单数据', '函数柯里化', '生命周期', 'DOM的diffing算法', '脚手架', '样式的模块化', 'toDolist案例', 'React Ajax', '兄弟组件通信', 'Fetch', 'React 路由']
let titles = document.querySelectorAll('.C h1')
for (let a = 0; a < titles.length; a++) {
  titles[a].innerHTML = SliderBarData[a]
}



// 回到顶部模块
const goTop = document.querySelector('.goTop')
const DataContent = document.querySelector('.content')
goTop.onclick = function () {

  DataContent.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })
}
DataContent.addEventListener('scroll', function (e) {
  let x = DataContent.scrollTop
  if (x >= 1149) {
    goTop.style.display = 'block'
  } else {
    goTop.style.display = 'none'
  }
})
const qs = document.querySelector('.qs')
qs.onclick = () => {
  window.location.href = './index.html'
}