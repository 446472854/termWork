axios.defaults.timeoue = 3000
let that;
class FeedBack {
  constructor() {
    // 姓名
    this.uname = document.querySelector('td:nth-child(2) > input[type=text]')
    // 电话
    this.tel = document.querySelector('input[name=tel]')
    // 反馈类别
    this.cate = document.querySelector('select[name=backCate]')
    // 反馈内容
    this.feedBackCon = document.querySelector('textarea[name=feedContent]')
    // 填写时间
    this.time = document.querySelector('input.time')
    // 提交
    this.submit = document.querySelector('input[type=submit]')
    // 表单
    this.form = document.querySelector('form')
    this.formError = document.querySelectorAll('.form_error')
    this.formRight = document.querySelectorAll('.form_right')
    // 评分
    this.scoreImg = document.querySelectorAll('.score_img')
    // 显示评分 
    this.scoreInput = document.querySelector('.score_input')
    that = this
    // 初始化
    this.init()
  }
  init () {
    // 显示实时时间
    this.realTime()
    setInterval(() => {
      this.realTime()
    }, 1000)
    // 验证姓名
    this.vertifyName()
    // 验证名字
    this.vertifyTel()
    // 评分改变
    this.changeScore()
    // 表单提交
    this.formSubmit()
  }
  // 实时时间
  realTime () {
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    let day = new Date().getDate()
    let hours = new Date().getHours()
    let minutes = new Date().getMinutes()
    let seconds = new Date().getSeconds()
    let week = new Date().getUTCDay()
    switch (week) {
      case 1: week = '一'; break;
      case 2: week = '二'; break;
      case 3: week = '三'; break;
      case 4: week = '四'; break;
      case 5: week = '五'; break;
      case 6: week = '六'; break;
      case 7: week = '日'; break;
    }
    let completeTime = year + '年' + month + '月' + day + '日' + ' ' + '周' + week + '  ' + hours + " : " + minutes + " : " + seconds
    this.time.value = completeTime
  }
  // 验证姓名
  vertifyName () {
    this.uname.oninput = (e) => {
      let value = this.uname.value
      let nameReg = /^[\u4e00-\u9fa5]{2,6}$/
      console.log(nameReg.test(value));
      if (value == '' || (nameReg.test(value) == false)) {
        this.formError[0].style.display = 'table-cell'
        this.formRight[0].style.display = 'none'
      } else {
        this.formError[0].style.display = 'none'
        this.formRight[0].style.display = 'table-cell'
      }
    }
  }
  // 验证电话
  vertifyTel () {
    this.tel.oninput = () => {
      let value = this.tel.value
      let telReg = /^\d{11}$/;
      if (value == '' || (telReg.test(value) == false)) {
        this.formError[1].style.display = 'table-cell'
        this.formRight[1].style.display = 'none'
      } else {
        this.formRight[1].style.display = 'table-cell'
        this.formError[1].style.display = 'none'
      }
    }
  }
  // 表单提交时
  formSubmit () {
    // this.submit.onclick = (e) => {
    this.form.onsubmit = async (e) => {
      e.preventDefault();
      let flag = false;
      console.log(this.formRight[0].style.display);
      if (this.formError[0].style.display == 'none' && this.formError[1].style.display === 'none' && this.formRight[0].style.display == 'table-cell' && this.formRight[1].style.display === 'table-cell') {
        flag = true
      } else {
        alert("请正确填写表单")
      }
      if (flag) {
        let nameValue = this.uname.value
        let telValue = this.tel.value
        let selectValue = this.cate.value
        let content = this.feedBackCon.value
        let time = this.time.value
        let Url = `http://410df4c4.nat123.fun/vertify?name=${nameValue}&tel=${telValue}&backCate=${selectValue}&feedContent=${content}&time=${time}`
        await axios.get(Url).then(res => {
          let data = res.data
          if (data == true) {
            let result = window.confirm('提交成功, 是否返回首页 ')
            if (result) {
              that.formSubmited()
              window.location.href = './index.html'
            } else {
              that.formSubmited()
              window.location.href = './feedback.html'
            }
          }
        }).catch(err => {
          alert(err)
        })
      }
    }


  }
  // 表单提交后
  formSubmited () {
    that.uname.value = ''
    that.tel.value = ''
    that.feedBackCon.value = ''
    that.cate.value = 1
  }
  //评分改变
  changeScore () {
    for (let a = 0; a < this.scoreImg.length; a++) {
      this.scoreImg[a].onclick = function (e) {
        let index = this.getAttribute('data-index')
        console.log(index);
        switch (index) {
          case '1':
            that.scoreInput.value = '1.0分数';
            break;
          case '2':
            that.scoreInput.value = '2.0分';
            break;
          case '3':
            that.sco
            that.scoreInput.value = '3.0分';
            break;
          case '4':
            that.scoreInput.value = '4.0分';
            break;
          case '5':
            that.scoreInput.value = '5.0分';
            break;
        }
        console.log(that.scoreInput.value);
        for (let a = 0; a < that.scoreImg.length; a++) {
          if (a < index) {
            that.scoreImg[a].src = './img/good_score.png'
          } else {
            that.scoreImg[a].src = './img/poor_score.png'
          }
        }
      }
    }
  }
}

new FeedBack()
const qs = document.querySelector('body > div.container > div:nth-child(1) > div > div.Nav_Left > p')
qs.onclick = () => {
  window.location.href = './index.html'
}