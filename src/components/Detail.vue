<template>
  <div class="content">
    <div id="test-editormd-view" style="padding: 5px;" >
      <textarea style="display:none;" v-model="markdown" name="test-editormd-markdown-doc"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data () {
    return {
      markdown: '',
      id: 2
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
