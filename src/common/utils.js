      // 对于refresh非常频繁的问题, 进行防抖操作
      
      // 所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
      // setTimeout函数是JavaScript语言内置提供的一个全局函数，它的作用类似于定时器，指定一个时长和一个函数，等待这一段时长过后调用func函数。可以看到，setTimeout的参数有两个，一个是指定的函数func，一个是指定的时长，该时长单位为毫秒。setTimeout返回一个id值，该id标识此定时器，该id值可以用来提前取消定时器（使用clearTimeout方法）。

      export function debounce(func,delay){
        let timer = null
        return function (...args){
          if (timer) clearTimeout(timer)
          timer = setTimeout(() =>{
            func.apply(this,args)
          },delay)
        }
      }
