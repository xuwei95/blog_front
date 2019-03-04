<template>
  <div>
    <div v-if="!user">
       <a @click="show_login" class="login_btn">登录</a>
    </div>
    <div v-else>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="login_img">
          <img :src="'' + head_img" class="headimg" width="35px" height="35px">
          <!--<i class="el-icon-caret-bottom"/>-->
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog :visible.sync="regist_show" title="注册" :modal-append-to-body='false'>
      <div class="highlight">
        <el-form ref="form" :model="regist_form" label-width="80px">
          <div class="center">
            <el-form-item label="用户名:">
              <el-input v-model="regist_form.username"/>
            </el-form-item>
            <el-form-item label="密码:">
              <el-input v-model="regist_form.password" type="password"/>
            </el-form-item>
            <el-form-item label="重复密码:">
              <el-input v-model="regist_form.repass" type="password"/>
            </el-form-item>
            <br><br><br>
            <el-button type="primary" @click="regist">确认</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="login_show" title="登录" :modal-append-to-body='false'>
      <el-form ref="form" :model="login_form" label-width="80px">
        <div class="center">
          <el-form-item label="用户名:">
            <el-input v-model="login_form.username"/>
          </el-form-item>
          <el-form-item label="密码:">
            <el-input v-model="login_form.password" type="password"/>
          </el-form-item>
          <br><br><br>
          <el-button type="primary" @click="login">确认</el-button>
          <a @click="show_regist">注册</a>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { user_regist } from '@/api/api'
import { user_login } from '@/api/api'
import { user_verify } from '@/api/api'
import { get_user_info } from '@/api/api'
import { getToken } from '@/utils/auth'
import { setToken } from '@/utils/auth'
import { removeToken } from '@/utils/auth'
import { Message } from 'element-ui'
export default {
  data () {
    return {
      regist_form: {
        username: '',
        password: '',
        repass: ''
      },
      regist_show: false,
      login_form: {
        username: '',
        password: ''
      },
      verify_form: {
        token: ''
      },
      login_show: false,
      user: false,
      head_img: '',
      token: ''
    }
  },
  methods: {
    regist() {
      this.login_show = false
      user_regist(this.regist_form).then((response) => {
        if (response.data.success === 1){
          Message({
            message: '注册成功',
            type: 'success',
            duration: 2 * 1000
          })
          this.login_form.username = this.regist_form.username
          this.login_form.password = this.regist_form.password
          this.login()
          this.regist_show = false
        }else{
          Message({
            message: '注册失败,' + response.data.msg,
            type: 'error',
            duration: 2 * 1000
          })
        }
      })
      .catch(error => {
        Message({
          message: '未知错误！',
          type: 'error',
          duration: 2 * 1000
        })
      })
    },
    show_regist() {
      this.opended = false
      this.login_show = false
      this.regist_show = true
    },
    login() {
      user_login(this.login_form).then((response) => {
        this.token = response.data.data.token
        setToken('jwt-Token', this.token)
        this.fetch_user_info()
        Message({
          message: '登录成功',
          type: 'success',
          duration: 2 * 1000
        })
        this.login_show = false
        window.location.reload()
      })
      .catch(error => {
        Message({
          message: '用户名或密码错误！',
          type: 'error',
          duration: 2 * 1000
        })
      })
    },
    show_login() {
      this.opended = false
      this.login_show = true
    },
    is_login() {
      this.verify_form.token = this.token
      user_verify(this.verify_form).then((response) => {
        this.fetch_user_info()
      })
      .catch(error => {
        if(error.response.status===400) {
          Message({
            message: '登录验证已过期，请重新登录！',
            type: 'error',
            duration: 2 * 1000
          })
          this.logout()
        }
      })
    },
    fetch_user_info() {
      get_user_info({token:this.token}).then((response) => {
        this.user = response.data.data.name
        this.head_img = response.data.data.head_img
        setToken('user', this.user)
        setToken('head_img', this.head_img)
      })
      .catch(error => console.log(error))
    },
    logout() {
      removeToken('jwt-Token')
      removeToken('user')
      removeToken('headimg')
      window.location.reload()
    }
  },
  created () {
    this.token = getToken('jwt-Token')
    if (this.token !== undefined){
      this.is_login()
    }
  },
  updated () {
  }
}
</script>

<style scoped>
.center{
  text-align: center;
}
.headimg{
  border-radius: 35px;
}
.login_btn{
  color: #666;
  font-size: 14px;
  display: block;
  line-height: 30px;
  padding: 0 15px;
  margin: 0 10px 10px 0;
  border-radius: 5px;
  text-decoration: none;
  color: #666;
  cursor:pointer;
}
.login_img{
  color: #666;
  font-size: 14px;
  display: block;
  line-height: 30px;
  padding: 0 15px;
  margin: 0 10px 10px 0;
  border-radius: 5px;
  text-decoration: none;
  color: #666;
  cursor:pointer;
}
.login_btn:hover{
  background: #666;
  color: #fff;
}
</style>
