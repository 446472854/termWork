
// 渲染sliderBar 内容
// 定义数据
const NodeData = [
  { id: 1, title: "解决爬虫乱码", child: [] },
  { id: 2, title: "前端解决跨域", child: [] },
  { id: 1, title: "后端解决跨域", child: [] },
  { id: 3, title: "Node简介", child: ['Node是什么', 'Node能做什么'] },
  { id: 4, title: "OS Module", child: ['os.EOL', ' os.arch(  )', 'os.tmpdir', ' os.totalmem (  )', 'os.freemem(  )'] },
  { id: 1, title: "pathModule", child: ['extname ', 'join', 'resolve', 'accessSync', 'isAbsolute', 'parse'] },
  { id: 1, title: "Url", child: ['code', 'parse', 'resolve'] },
  { id: 1, title: "Request", child: ['请求配置', '案例- 爬取电影'] },
  { id: 1, title: "cherrio", child: ['安装', '简介', '基本使用', '案例- 爬取- 表情包'] },
  { id: 1, title: "反爬虫策略", child: [] },
  { id: 1, title: "Puppeteer", child: ['出现背景', '作用', '安装', '使用', '案例'] },
  { id: 1, title: "HTTP", child: ['简介', '特点', 'HTTP状态码', '常见状态码', '请求方法', '浏览器URL地址渲染过程'] },
  { id: 1, title: "Mysql", child: ['Navicat', 'Node连接Mysql', '数据库相关', '条件', '数据操作', '类型', '高级数据操作', '查询数据', '查询运算符', '连接查询', '子查询', '范式', '视图', '事务'] },
  { id: 1, title: "Express", child: ['前言', '安装方式', 'express使用及介绍', 'express路由', '', '基本准备', 'Get/Post获取'] },
  { id: 1, title: "Ejs引擎", child: ['使用'] },
  { id: 1, title: "中间件", child: ['简介', '应用级中间件', '路由中间件', '错误处理中间件', '其他中间件'] },
  { id: 1, title: "Cookie", child: ['简介', '安装及使用', '设置加密'] },
  { id: 1, title: "session", child: ['简介', '设置sessiom'] },
]
for (let a = 0; a < NodeData.length; a++) {
  NodeData[a].id = a + 1
}
// 收集ID
let collectID = []
// 获取父元素
const NodeParent = document.querySelector('.sliderBar')
//开始渲染
for (let a = 0; a < NodeData.length; a++) {
  if (NodeData[a].child.length !== 0) {
    let StartStr = `<div>
    <ul>
      <h4>
        <a href="#C${a + 1}">${NodeData[a].title}</a>
      </h4>`
    collectID[collectID.length] = [a + 1 + '', NodeData[a].title]
    let liStr = ``
    for (let b = 0; b < NodeData[a].child.length; b++) {
      liStr += `<li>
      <a href="#C${(a + 1) + '' + (b + 1)}">${NodeData[a].child[b]}</a>
    </li>`
      collectID[collectID.length] = [(a + 1) + '' + (b + 1), NodeData[a].child[b]]
    }
    liStr += `
    </ul>
  </div>
    `
    let AllStr = StartStr + liStr;
    NodeParent.insertAdjacentHTML('beforeend', AllStr)
  } else {
    collectID[collectID.length] = [a + 1 + '', NodeData[a].title]
    let str = `<div>
    <h4>
      <a href="#C${a + 1}">${NodeData[a].title}</a>
    </h4>
  </div>`
    NodeParent.insertAdjacentHTML('beforeend', str)
  }
}
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
    SliderBar.style.boxShadow = 'none';
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
    slideBar.style.boxShadow = 'none';
  }
}

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