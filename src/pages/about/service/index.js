import http from '@/api/index'

async function getSomething () {
  let url = `https://getman.cn/mock/test/iiissssi`
  return http.get(url)
}

export {
  getSomething
}