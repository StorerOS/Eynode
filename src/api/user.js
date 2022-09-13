import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/platform/logout',
    method: 'post'
  })
}

export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

export function checkValidity(data) {
  return request({
    url: '/verdict/time',
    method: 'post',
    data
  })
}

export function sendEmail(data) {
  return request({
    url: '/send/email',
    method: 'post',
    data
  })
}

export function recoverPassword(data) {
  return request({
    url: '/reset/password',
    method: 'post',
    data
  })
}

export function sessionValidity() {
  return request({
    url: '/session/timeout',
    method: 'post',
    data: {}
  })
}

export function getRequestTotalData() {
  return request({
    url: '/data/display',
    method: 'post',
    data: {}
  })
}
