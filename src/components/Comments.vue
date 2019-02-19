<template>
  <div>
    <div v-if="user">
      <br>
      <div class="layui-inline comment_form">
        <!--<img :src="'' + head_img" class="headimg" width="42px" height="42px" >-->
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="comments" class="comment_text">
        </el-input>
        <el-button type="primary" @click="publish" class="publish_btn">发送</el-button>
      </div>
      <br><br>
    </div>
    <div v-else>
      <Login class="layui-inline"></Login>后发表评论
    </div>
    <ul v-for="item in comments_list" :key="item.id">
      <li>
        <div class="comment">
          <img :src="'' + item.head_img" class="headimg" width="42px" height="42px">
          <div class="layui-inline meta">
            <p class="username layui-inline">{{ item.user }}</p>
            <span class="datetime layui-inline">&nbsp;{{ item.created_at }}</span>
          </div>
          <div class="content">
            {{ item.content }}
          </div>
        </div>
        <br>
      </li>
    </ul>
  </div>

</template>

<script>
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import Login from '@/components/Login'
export default {
  data () {
    return {
      id: 0,
      comments: '',
      user: '',
      head_img: '',
      publish_form: {
        username: '',
        content: '',
        artical: ''
      },
      comments_list: []
    }
  },
  methods: {
    publish() {
      this.publish_form.username = this.user
      this.publish_form.content = this.comments
      this.publish_form.artical = this.id
      this.axios.post('/publish_comment/',
        this.publish_form
      )
      .then((response) => {
         Message({
          message: response.data.msg,
          type: 'success',
          duration: 2 * 1000
        })
        this.get_comments_list()
      })
      .catch(error => {
       console.log(error)
      })
    },
    get_comments_list(){
      this.axios.get('/comments_list/?article_id=' + this.id)
      .then((response) => {
        this.comments_list = response.data.data
      })
      .catch(error => console.log(error))
    }
  },
  created () {
    this.id = this.$route.query.id
    this.get_comments_list()
    this.user = getToken('user')
    this.head_img = getToken('head_img')
  },
  updated () {
  },
  components: {Login}
}
</script>

<style scoped>
.headimg{
  border-radius: 42px;
}
.username{
  font-size: 16px;
  color: rgba(0,0,0,0.8);
  font-weight: bold;
}
.datetime{
  margin-top: 2px;
  position: relative;
  color: #8c92a4;
  display: inline-block;
  font-size: smaller;
  font-weight: normal;
}
.content{
  font-size: 1rem;
  margin-left: 60px;
  margin-top: -15px;
}
.comment{
  min-height: 60px;
}
.meta{
  margin-top: -20px;
  margin-left: 18px;
}
.comment_text {
    width: 90%;
}

.comment_form {
  width: 100%;
}
@media (max-width: 992px) {
  .comment_text {
    width: 70%;
  }
}
</style>
