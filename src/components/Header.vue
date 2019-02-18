<template>
  <div class="container" v-cloak>
      <nav>
          <!-- 窄屏下的菜单按钮 -->
          <div class="nav-menu-button" @click="toggleSidebar">
              <span></span>
              <span></span>
              <span></span>
          </div>
          <!-- logo -->
          <div class="nav-logo"><router-link :to="{name: 'Home'}">blog</router-link></div>
          <!-- 搜索框 -->
          <div class="nav-search">
            <el-autocomplete
              class="inline-input"
              v-model="state1"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
              suffix-icon="el-icon-search"
            ></el-autocomplete>
          </div>
          <!-- 菜单项 -->
          <ul :class="['nav-list',{'nav-list-opend': opended}]">
            <!--v-clickoutside="clickOutside"-->
              <li v-for="item in navList" :key="item.url">
                  <a v-if="item.hasList">{{item.text}}<div class="nav-down-arrow"></div></a>
                  <router-link v-if="!item.hasList" :to="{name: item.url}" @click.native="clickOutside">{{item.text}}</router-link>
                  <ul class="nav-list-menu" v-if="item.hasList">
                      <li v-for="childItem in item.list" :key="childItem.url">
                          <router-link :to="{name: childItem.url}" @click.native="clickOutside">{{childItem.text}}</router-link>
                      </li>
                  </ul>
              </li>
              <li v-if="!user">
                 <a href="#" @click="show_login">登录</a>
              </li>
              <li v-else>
                <el-dropdown class="avatar-container" trigger="click">
                  <div class="avatar-wrapper">
                    <img :src="'' + head_img" class="user-avatar headimg" width="35px" height="35px">
                    <i class="el-icon-caret-bottom"/>
                  </div>
                  <el-dropdown-menu slot="dropdown" class="user-dropdown">
                    <!--<router-link class="inlineBlock" to="/setting/my_setting/my_setting">-->
                      <!--<el-dropdown-item>-->
                        <!--基本资料-->
                      <!--</el-dropdown-item>-->
                    <!--</router-link>-->
                    <!--<router-link class="inlineBlock" to="/setting/my_setting/password_setting">-->
                      <!--<el-dropdown-item>-->
                        <!--安全设置-->
                      <!--</el-dropdown-item>-->
                    <!--</router-link>-->
                    <el-dropdown-item>
                      <span style="display:block;" @click="logout">退出</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
          </ul>
      </nav>
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
          <a href="#" @click="show_regist">注册</a>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { setToken } from '@/utils/auth'
import { removeToken } from '@/utils/auth'
import { Message } from 'element-ui'
export default {
  data () {
    return {
      navList: [
        {
          text: '首页',
          url: 'Home',
          hasList: false
        },
        {
          text: '分类',
          url: 'Category',
          hasList: false
        },
        // {
        //   text: '分类',
        //   hasList: true,
        //   list: [
        //     {
        //       text: 'HTML',
        //       url: 'htmlPage'
        //     },
        //     {
        //       text: 'CSS',
        //       url: 'cssPage'
        //     },
        //     {
        //       text: 'JavaScript',
        //       url: 'javascriptPage'
        //     },
        //     {
        //       text: 'Vue.js',
        //       url: 'vuePage'
        //     },
        //     {
        //       text: '杂七杂八',
        //       url: 'otherPage'
        //     }
        //   ]
        // },
        {
          text: '关于',
          url: 'About'
        }
      ],
      opended: false,
      state1: '',
      restaurants: [],
      queryString: '',
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
    toggleSidebar (e) {
      this.opended = !this.opended
      e.stopPropagation()
    },
    clickOutside () {
      this.opended = false
    },
    querySearch (String, cb) {
      this.queryString = String
      var restaurants = this.restaurants
      cb(restaurants)
    },
    query_data () {
      if (this.queryString.length !== 0) {
        this.axios.get('/serach/?queryString=' + this.queryString)
          .then((response) => {
            this.restaurants = response.data.data
          })
          .catch(error => console.log(error))
      }
    },
    handleSelect (item) {
      this.$router.push({path: '/detail/?id=' + item.id})
    },
    regist() {
      this.login_show = false
      this.axios.post('/regist/',
        this.regist_form
      ).then((response) => {
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
      this.axios.post('/api_auth/',
        this.login_form
      ).then((response) => {
        this.token = response.data.data.token
        setToken(this.token)
        this.get_user_info()
        Message({
          message: '登录成功',
          type: 'success',
          duration: 2 * 1000
        })
        this.login_show = false
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
      this.axios.post('/api_auth_verify/',
        this.verify_form
      )
      .then((response) => {
        this.get_user_info()
      })
      .catch(error => {
        Message({
        message: '登录验证已过期，请重新登录！',
        type: 'error',
        duration: 2 * 1000
      })
        removeToken()
      })
    },
    get_user_info() {
      this.axios.get('/u_info/?token=' + this.token)
      .then((response) => {
        this.user = response.data.data.name
        this.head_img = response.data.data.head_img
      })
      .catch(error => console.log(error))
    },
    logout() {
      removeToken()
      window.location.reload()
    }
  },
  created () {
    this.token = getToken()
    if (this.token !== undefined){
      this.is_login()
    }
  },
  updated () {
    this.query_data()
  }
}
</script>

<style scoped>
/* 宽屏模式 */
.container {
  width: 100%;
  height: auto;
  background: #fff;
  position: fixed;
  z-index: 999;
  margin:-8px;
  border-bottom: 1px solid #eaecef;
}
nav {
  max-width: 980px;
  margin: 0 auto;
  height: 55px;
  box-sizing: border-box;
  padding: 10px 0;
}
nav .nav-logo {
  width: auto;
  height: 100%;
  margin-left: 20px;
  float: left;
}
nav .nav-logo a {
  text-decoration: none;
  color: #666;
  font-size: 30px;
  font-weight: bold;
}
nav .nav-logo a:hover {
  color: #777;
}
nav .nav-list {
  float: right;
  margin: 5px 0 0 0;
}
nav .nav-list > li {
  list-style: none;
  float: left;
  text-align: center;
}
nav .nav-list > li a {
  display: block;
  line-height: 30px;
  padding: 0 15px;
  margin: 0 10px 10px 0;
  border-radius: 5px;
  text-decoration: none;
  color: #666;
}
nav .nav-list > li a:hover {
  color: #fff;
  background: #666;
}
nav .nav-list > li .nav-list-menu {
  background: #fff;
  box-shadow: 0 2px 10px #ccc;
  position: absolute;
  border-radius: 5px;
  height: 0;
  overflow: hidden;
  padding: 0;
}
nav .nav-list > li .nav-list-menu li {
  list-style: none;
}
nav .nav-list > li .nav-list-menu li a {
  margin: 15px 0 0 0;
}
nav .nav-list > li:hover .nav-list-menu {
  height: auto;
}
nav .nav-down-arrow {
  border-top: 6px solid;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  width: 0;
  height: 0;
  display: inline-block;
  margin-left: 5px;
}
nav .nav-menu-button {
  display: none;
  background: #fff;
  margin-left: 30px;
}
nav .nav-menu-button:active {
    box-shadow: 0 0 2px 1px #ccc;
}
/* 窄屏 */
@media (max-width: 980px) {
  nav .nav-list {
    position: fixed;
    height: 100%;
    width: 65%;
    background: #fff;
    margin-top: 48px;
    top: 0;
    left: -65%;
    padding: 5px 0 0 0;
    transition: 0.5s;
  }
  nav .nav-list > li {
    width: 100%;
    margin: 0 0 15px 0;
  }
  nav .nav-list > li .nav-list-menu {
    position: relative;
  }
  nav .nav-list > li a {
    border-radius: 0;
    margin: 0;
  }
  nav .nav-menu-button {
    display: block;
    float: left;
    right: 20px;
    padding: 8px 5px;
    position: relative;
  }
  nav .nav-menu-button span {
    height: 2px;
    width: 25px;
    display: block;
    background: #2c3e50;
  }
  nav .nav-menu-button span + span {
    margin-top: 6px;
  }
  nav .nav-logo {
      margin-left: 20px;
  }
}
nav .nav-list-opend {
  left: 0%;
  overflow: auto;
  box-shadow: 2px 0px 8px #ccc;
}
nav .nav-search{
  width: 35%;
  display: inline-block;
  float: right;
}
/* .router-link-exact-active {
  background: #888;
} */
.center{
  text-align: center;
}
.headimg{
  border-radius: 35px;
}
</style>
