const searchInput = document.querySelectorAll('input')
searchWatch()
window.onresize = () => {
  searchWatch()
}
function searchWatch () {
  if (document.body.clientWidth > 768) {
    searchInput[0].onkeyup = (e) => {
      let value = searchInput[0].value
      if (e.code == 'Enter') {
        window.location.href = './detail.html?name=' + value
        searchInput[0].value = ''
      }
      searchInput.onblur = () => {
        searchInput.value = ''
      }
    }
  } else {
    searchInput[1].onkeyup = (e) => {
      console.log(searchInput);
      let value = searchInput[1].value
      if (e.code == 'Enter') {
        window.location.href = './detail.html?name=' + value
        searchInput[1].value = ''
      }
      searchInput.onblur = () => {
        searchInput.value = ''
      }
    }
  }


}