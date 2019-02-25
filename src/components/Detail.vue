<template>
  <div class="content">
    <div class="article_meta">
      <h1 class="title">{{ meta.title }}</h1>
      <br>
      <div class="article-footer">
        <span><i class="fa fa-clock-o"></i>{{ meta.created_at }}</span>
        <span class="article-author"><i class="fa fa-user"></i>{{ meta.author }}</span>
        <span><i class="fa fa-tag"></i>&nbsp;&nbsp;<a :href="'/#/category?id=' + meta.category_id">{{ meta.category }}</a></span>
        <span class="article-viewinfo"><i class="fa fa-eye"></i>{{ meta.viewers }}</span>
      </div>
    </div>
    <div>
      <div id="test-editormd-view" style="padding: 5px;" >
        <textarea style="display:none;" v-model="markdown" name="test-editormd-markdown-doc"></textarea>
      </div>
    </div>
    <Comments></Comments>
  </div>
</template>

<script>
import { get_article_detail } from '@/api/api'
import Comments from '@/components/Comments'
export default {
  data () {
    return {
      markdown: '',
      id: 2,
      meta: {
        author: '',
        category: '',
        category_id: '',
        content: '',
        created_at: '',
        id: '',
        is_delete: '',
        tags: '',
        title: '',
        viewers: 0
      }
    }
  },
  methods: {
    getContent () {
      get_article_detail({id:this.id}).then((response) => {
          this.meta = response.data.data
          this.markdown = this.meta.content
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
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getContent()
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
  },
  components: {Comments}
}
</script>

<style scoped>
.content{
  padding-top: 55px;
  margin: 0 15px;
  margin-left: 5px;
  position: relative;
}
.title{
  font-size: 36px;
  text-align: center;
}
.article-footer {
  height: 20px;
  margin-top: 5px;
  font-size: 11px;
  padding: 2px;
  color: #a6a6a6;
  text-align: center;
}
.article-footer > span {
  padding-right: 3%;
}

.article-footer a {
  color: #009688;
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
