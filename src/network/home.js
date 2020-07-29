import {request} from './request';


// 一般页面会根据自己里面的子组件展示内容的不同，而进行多次网络请求，所以就需要封装不同的网络请求方法，根据不同的详细数据地址，请求相应的数据。此时把该页面里面的所有网络请求都封装在一个js文件里面就易于系统管理
// 这里面封装了首页所有的网络请求方法，不同的方法对应不同的子组件，有些方法需要传入参数，有些不要参数
// 发送网络请求需要用到传入的request方法，因为在调用request方法时，它里面创建了网络请求axios实例对象，通过这个对象，只需要在调用request方法时把相应的参数传入，这个对象便会拿到参数去服务器请求数据，请求到数据后得到一个promise对象，并返回出去。

// 请求服务器首页multidata数据
export function getHomeMultiData(){
  return request({
    url: '/home/multidata',
  })
}

//请求服务器首页商品数据,需要传入参数
export function getHomeGoods(type,page){
  return request({
    url: '/home/data',
    // 网络请求对应参数，到时候url和params会一起拼接到baseURL后面，进行网络请求。
    params: {
      type,
      page
    }
  })
}