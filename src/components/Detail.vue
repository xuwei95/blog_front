<template>
  <div class="content">
    <div id="test-editormd-view" style="padding: 5px;" >
      <textarea style="display:none;" v-model="markdown" name="test-editormd-markdown-doc"></textarea>
    </div>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="comments">
    </el-input>
    <el-button type="primary" @click="publish">发表评论</el-button>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data () {
    return {
      markdown: '',
      id: 2,
      comments: '',
      is_login: false,
      publish_form: {
        username: '',
        content: '',
        artical: ''
      },
      verify_form: {
        token: ''
      },
      user: ''
    }
  },
  methods: {
    getContent () {
      this.axios.get('detail/?id=' + this.id,
        {
          headers: {
            // 'Access-Control-Allow-Origin': '*'
          }
        })
        .then((response) => {
          this.markdown = response.data.data.content
        })
        .catch(error => console.log(error))
    },
    initEditor () {
      window.editormd.markdownToHTML('test-editormd-view', {
        htmlDecode: 'style,script,iframe',
        codeFold: true,
        emoji: true,
        taskList: true,
        tex: true,
        flowChart: true,
        sequenceDiagram: true
      })
    },
    get_user_info() {
      this.axios.get('/u_info/?token=' + this.token)
      .then((response) => {
        this.user = response.data.data.name
      })
      .catch(error => console.log(error))
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
    publish() {
      this.publish_form.username = this.username
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
  },
  created () {
    this.id = this.$route.query.id
    this.getContent()
    this.token = getToken()
    if (this.token !== undefined){
      this.is_login()
    }
  },
  updated () {
    this.initEditor()
  },
  watch: {
    '$route' (to, from) {
      if (this.id !== this.$route.query.id) {
        window.location.reload()
      }
    }
  }
}
</script>

<style scoped>
.content{
  padding-top: 55px;
  margin: 0 15px;
  margin-left: 5px;
  position: relative;
}
  /* 小屏幕（平板，大于等于 768px） */
@media (min-width: 768px) {
    .content {
        width: 738px;
        margin: 0 auto;
    }
}

/* 中等屏幕（桌面显示器，大于等于 992px） */
@media (min-width: 992px) {
    .content {
        width: 962px;
    }
}

/* 大屏幕（大桌面显示器，大于等于 1200px） */
@media (min-width: 1200px) {
    .content {
        width: 1170px;
    }
}
</style>
