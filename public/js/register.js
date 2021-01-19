window.onload = function () {
  const usernameNeedCheck = document.getElementById('username')//拿到username输入框
  const usernameTip = document.getElementById('usernameTip')//拿到用户名提示区域

  function checkName(e) {//检查名字的函数
    const username = usernameNeedCheck.value
    const xhr = new XMLHttpRequest()
    xhr.open('post', 'http://localhost:5000/checkname')
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
    xhr.send('username=' + username)

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          console.log(xhr.responseText)
          if (xhr.responseText === 'yes') {
            usernameTip.innerText = '可以用,没问题\(^o^)/'
            usernameTip.style.color = 'green'
          } else {
            usernameTip.innerText = '不..不可以,名字重复啦o(╥﹏╥)o'
            usernameTip.style.color = 'red'
          }
        }
      }
    }
  }


  function debounce(fn, time) {//搞一个防抖
    let timer = null
    return function () {
      clearTimeout(timer)
      const arg = arguments
      timer = setTimeout(() => {
        fn.call(this, arg[0])
      }, time);
    }
  }
  username.onkeyup = debounce(checkName, 1000)//1秒检查一次名字
}