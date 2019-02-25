import request from '@/utils/request'


export function get_Info(params) {
  return request({
    url: '/info/',
    method: 'get',
    params
  })
}

export function get_user_info(params) {
  return request({
    url: '/user/',
    method: 'get',
    params
  })
}

export function user_regist(params) {
  return request({
    url: '/user/',
    method: 'post',
    data: params
  })
}
export function user_login(params) {
  return request({
    url: '/user/auth/',
    method: 'post',
    data: params
  })
}
export function user_verify(params) {
  return request({
    url: '/user/verify/',
    method: 'post',
    data: params
  })
}
export function get_article_list(params) {
  return request({
    url: '/article/list/',
    method: 'get',
    params
  })
}
export function get_article_hot(params) {
  return request({
    url: '/article/hot/',
    method: 'get',
    params
  })
}

export function get_article_detail(params) {
  return request({
    url: '/article/detail/',
    method: 'get',
    params
  })
}
export function serach(params) {
  return request({
    url: '/serach/',
    method: 'get',
    params
  })
}
export function get_category_list(params) {
  return request({
    url: '/category/',
    method: 'get',
    params
  })
}

export function get_comments_list(params) {
  return request({
    url: '/comments/',
    method: 'get',
    params
  })
}

export function publish_comments(params) {
  return request({
    url: '/comments/',
    method: 'post',
    data: params
  })
}
