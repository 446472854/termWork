
// 渲染sliderBar 内容
// 定义数据
const Vue = [
  { id: 1, title: "初识TS", child: ['TypeScript介绍', 'TypeScript特点', '安装TypeScript', '编译js代码'] },
  { id: 2, title: "编译ts", child: ['使用tsc', '自动编译ts文件', '使用webpack进行打包', '打包命令'] },
  { id: 1, title: "TypeScript数据类型", child: ['布尔值(boolean)', '字符型', '数组类型(array)', '元组类型', '枚举类型', 'any', 'void', 'object', '联合数据类型', '类型断言', '类型推断'] },
  { id: 3, title: "接口", child: ['释义', '函数类型', '类类型', '接口继承接口'] },
  { id: 4, title: "类", child: ['类的使用', '继承', '成员修饰符 ', '存取器', '静态成员', '抽象类'] },
  { id: 1, title: "函数", child: ['命名函数', '匿名函数', '函数的完整写法', '默认参数和可选参数', 'rest参数', '函数重载'] },
  { id: 1, title: "泛型", child: ['多个泛型参数的函数', '泛型接口 ', '泛型类', '泛型约束'] },
  { id: 1, title: "声明文件", child: ['声明'] },
  { id: 1, title: "内置对象", child: ['TypeScript内置对象', 'DOM内置对象'] },
  { id: 1, title: "Vue3 认识", child: ['介绍', '创建Vue3项目', ' Vue3是如何变快的'] },
  { id: 1, title: "Vite", child: ['介绍', '使用'] },
  { id: 1, title: "CompositionAPI", child: ['setup', ['setup的执行', 'setup返回值', 'setup参数'], ' ref', ['定义基本数据类型', '获取DOM 元素'], 'reactive', '比较Vue2和Vue3的响应式', ['Vue2的响应式', 'Vue3的响应式', '响应式原理'], 'reactive-ref细节', '计算属性和监视', ['computed 函数', 'watch函数', 'watchEffect函数'], ' 生命周期函数', 'shallowReactive-shallowRef', ['shallowReactive ', 'shallowRef ', 'treggerRef '], 'readonly-shallowReadonly', ['readonly ', 'shallowReadonly ', '应用场景'], 'toRaw-markRaw', ['toRaw', 'markRaw', '应用场景'], 'toRef', 'ref-toRef 的区别', 'toRefs', 'customRef', ' provide-inject (跨组件通信)', '响应式数据的判断', ['isRef', 'isReactive ', 'isReadonly', 'isProxy']] },
  { id: 1, title: " 新组件", child: ['  Fragment ', ' Teleport ', ' Suspense '] },
  { id: 1, title: "setup ", child: [] }
]
for (let a = 0; a < Vue.length; a++) {
  Vue[a].id = a + 1
}
let collectID = []
// 获取父元素
const NodeParent = document.querySelector('.sliderBar')
//开始渲染
for (let a = 0; a < Vue.length; a++) {
  collectID[collectID.length] = [(a + 1 + ''), Vue[a].title]
  if (Vue[a].child.length !== 0) {
    let StartStr = `<div>
    <ul>
      <h4>
        <a href="#C${a + 1}">${Vue[a].title}</a>
      </h4>`
    let liStr = ``
    for (let b = 0; b < Vue[a].child.length; b++) {
      if (Array.isArray(Vue[a].child[b])) {
        liStr += `<li>
      <ul>`
        for (let k = 0; k < Vue[a].child[b].length; k++) {
          collectID[collectID.length] = [(a + 1) + '-' + (b) + "" + (k + 1), Vue[a].child[b][k]]
          liStr += `<li>
        <a href="#C${(a + 1) + '-' + (b) + "" + (k + 1)}">${Vue[a].child[b][k]}</a></li>`
        }
        let tmp = `</ul></li>`
        liStr += tmp;
      } else {
        collectID[collectID.length] = [(a + 1) + '-' + (b + 1), Vue[a].child[b]]
        liStr += `<li>
      <a href="#C${(a + 1) + '-' + (b + 1)}">${Vue[a].child[b]}</a>
    </li>`
      }
    }
    liStr += `
    </ul>
  </div>
    `
    let AllStr = StartStr + liStr;
    NodeParent.insertAdjacentHTML('beforeend', AllStr)
  } else {
    let str = `<div>
    <h4>
      <a href="#C${a + 1}">${Vue[a].title}</a>
    </h4>
  </div>`
    NodeParent.insertAdjacentHTML('beforeend', str)
  }
}
// console.log(collectID);
// 将数据  通过请求后台, 提前写入数据库
// for (let a = 0; a < collectID.length; a++) {
//   let str = `
//   http://localhost:8080/search?id=${collectID[a][0]}&name=${collectID[a][1].trim()}
//   `
//   console.log(str);
//   axios.get(str).then(res => {
//     console.log(res.data);
//   })
// }

// 设置点击滑出侧边栏
const MoreImg = document.querySelector('body > div > div.row > div > div.Nav_End > img');
const SliderBar = document.querySelector('body > div > div.sliderBar')
SliderBar.style.boxShadow = 'none'
let ImgFlag = 'f'
MoreImg.onclick = function (e) {
  if (ImgFlag == 'f') {
    SliderBar.style.left = '0rem'
    SliderBar.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
    ImgFlag = 't'
  } else {
    SliderBar.style.boxShadow = 'none';
    SliderBar.style.left = '-2.34375rem'
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
  } else {
    SliderBar.style.left = '-2.34375rem'
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
    if (style.display == 'block') {
      for (let b = 1; b < uls[a].children.length; b++) {
        uls[a].children[b].style.display = 'none'
      }
    } else {
      for (let a = 0; a < uls.length; a++) {
        for (let b = 1; b < uls[a].children.length; b++) {
          uls[a].children[b].style.display = 'none'
          uls[a].children[b].onclick = function (e) {
            e.stopPropagation()
          }
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
const SliderBarData = []
for (let a = 0; a < Vue.length; a++) {
  SliderBarData[a] = Vue[a].title
}
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