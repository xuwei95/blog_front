<template>
    <div class="blog-container">
      <div class="blog-main">
          <!--左边文章列表-->
          <div class="blog-main-left" >
              <div class="article_list">
                <div v-for="item in article_list" :key="item.id">
                  <div class="article shadow">
                    <div class="article-right">
                      <div class="article-title">
                          <a :href="'/#/detail?id=' + item.id">{{ item.title }}</a>
                      </div>
                      <div class="article-abstract"><a :href="'/#/detail?id=' + item.id">{{ item.content }}</a></div>
                    </div>
                    <div class="clear"></div>
                  <div class="article-footer">
                      <span><i class="fa fa-clock-o"></i>{{ item.created_at }}</span>
                      <span class="article-author"><i class="fa fa-user"></i>{{ item.author }}</span>
                      <span><i class="fa fa-tag"></i>&nbsp;&nbsp;<a :href="'/#/category?id=' + item.category_id">{{ item.category }}</a></span>
                      <span class="article-viewinfo"><i class="fa fa-eye"></i>{{ item.viewers }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="has_next">
              <div class="layui-flow-more"><button @click="getArticle_list">加载更多</button></div>
            </div>
            <div v-else>
              <div class="layui-flow-more">没有更多了</div>
            </div>
          </div>
          <!--右边小栏目-->
          <div class="blog-main-right">
              <div class="blogerinfo shadow">
                  <div class="blogerinfo-figure">
                      <img src="static/images/head.jpg" height="50" width="50" />
                  </div>
                  <p class="blogerinfo-nickname">xuwei</p>
                  <p class="blogerinfo-introduce">python开发工程师</p>
                  <p class="blogerinfo-location"><i class="fa fa-location-arrow"></i>&nbsp;江苏 - 南京</p>
                  <hr />
                  <div class="blogerinfo-contact">
                      <!--<a target="_blank" title="QQ交流" href="javascript:layer.msg('启动QQ会话窗口')"><i class="fa fa-qq fa-2x"></i></a>-->
                      <!--<a target="_blank" title="给我写信" href="javascript:layer.msg('启动邮我窗口')"><i class="fa fa-envelope fa-2x"></i></a>-->
                      <a target="_blank" title="github" href="https://github.com/xuwei95"><i class="fa fa-git fa-2x"></i></a>
                  </div>
              </div>
              <div class="blog-module shadow">
                  <div class="blog-module-title">热文排行</div>
                  <div v-for="item in article_hots" :key="item.id">
                    <ul class="fa-ul blog-module-ul" id="hots_article">
                      <li><i class="fa-li fa fa-hand-o-right"></i><a :href="'/#/detail?id=' + item.id">{{ item.title }}</a></li>
                    </ul>
                  </div>
              </div>
              <div class="blog-module shadow">
                  <div class="blog-module-title">文章分类</div>
                  <div v-for="item in article_category" :key="item.id">
                    <ul class="fa-ul blog-module-ul" id="article_category">
                        <li><i class="fa-li fa fa-hand-o-right"></i><a :href="'/#/category?id=' + item.id">{{ item.name }}({{ item.article_list.length }})</a></li>
                    </ul>
                  </div>
              </div>
              <div class="blog-module shadow">
                  <div class="blog-module-title">友情链接</div>
                  <ul class="blogroll">
                      <li><a target="_blank" href="http://www.layui.com/" title="Layui">Layui</a></li>
                      <li><a target="_blank" href="http://www.pagemark.cn/" title="页签">页签</a></li>
                  </ul>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'home',
      article_list: [],
      article_hots: null,
      article_category: null,
      article_count: 0,
      has_next: false,
      page: 1
    }
  },
  methods: {
    getArticle_list () {
      this.axios.get('/article_list/?page=' + this.page + '&limit=10',
        {
          headers: {
            // 'Access-Control-Allow-Origin': '*'
          }
        })
        .then((response) => {
          var data = response.data.data
          for (var i = 0; i < data.length; i++) {
            this.article_list.push(data[i])
          }
        })
        .catch(error => console.log(error))
      this.page += 1
    },
    getArticle_hot () {
      this.axios.get('/article_hot/')
        .then((response) => {
          this.article_hots = response.data.data
        })
        .catch(error => console.log(error))
    },
    getArticle_category () {
      this.axios.get('/article_category/')
        .then((response) => {
          this.article_category = response.data.data
        })
        .catch(error => console.log(error))
    },
    get_info () {
      this.axios.get('/info/')
        .then((response) => {
          this.article_count = response.data.data.article_count
        })
        .catch(error => console.log(error))
    }
  },
  created () {
    this.get_info()
    this.getArticle_list()
    this.getArticle_hot()
    this.getArticle_category()
  },
  updated () {
    if (this.article_count > (this.page - 1) * 10) {
      this.has_next = true
    } else {
      this.has_next = false
    }
  }
}
</script>

<style scoped>
.clear {
    clear: both;
}
.shadow {
    box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
}
  .blog-container {
    padding-top: 55px;
    margin: 0 15px;
    position: relative;
}

.blog-main {
    margin-top: 15px;
    width: 100%;
    position: relative;
    min-height: 100vh;
}

    .blog-main > .home-tips {
        padding: 10px 10px;
        background: #fff;
        font-size: 13px;
        margin-bottom: 15px;
    }

        .blog-main > .home-tips > i {
            color: #009688;
            font-size: 15px;
        }

        .blog-main > .home-tips > .home-tips-container {
            margin-left: 20px;
            height: 17px;
            overflow: hidden;
        }

            .blog-main > .home-tips > .home-tips-container > span {
                display: block;
            }

    .blog-main > .blog-main-left {
        background-color: white;
        width: 100%;
        float: left;
    }

    .blog-main > .blog-main-right {
        width: 100%;
        float: right;
    }
/* 小屏幕（平板，大于等于 768px） */
@media (min-width: 768px) {
    .blog-container {
        width: 738px;
        margin: 0 auto;
    }

    .blog-main > .blog-main-right > .blog-module {
        width: 45%;
        margin-bottom: 15px;
    }

        .blog-main > .blog-main-right > .blog-module:nth-child(odd) {
            float: left;
            clear: left;
        }

            .blog-main > .blog-main-right > .blog-module:nth-child(odd).blog-module:last-child {
                width: auto;
                float: none;
                clear: both;
            }

        .blog-main > .blog-main-right > .blog-module:nth-child(even) {
            float: right;
            clear: right;
        }
}

/* 中等屏幕（桌面显示器，大于等于 992px） */
@media (min-width: 992px) {
    .blog-container {
        width: 962px;
    }

    .blog-main > .blog-main-left {
        width: 66%;
    }

    .blog-main > .blog-main-right {
        width: 33%;
    }

        .blog-main > .blog-main-right > .blog-module {
            width: auto;
            float: none !important;
        }
}

/* 大屏幕（大桌面显示器，大于等于 1200px） */
@media (min-width: 1200px) {
    .blog-container {
        width: 1170px;
    }
}
/*全局样式END*/

/*面包屑导航*/
.sitemap {
    background: #fff;
    margin-top: 79px;
    padding: 5px 15px;
    line-height: normal;
    border-radius: 0 !important;
}

    .sitemap a {
        font-size: 12px;
    }

@media (min-width: 768px) {
    .sitemap {
        padding: 6px 15px;
    }

        .sitemap a {
            font-size: 13px;
        }
}

@media (min-width: 992px) {
    .sitemap {
        padding: 8px 15px;
    }

        .sitemap a {
            font-size: 14px;
        }
}
/*面包屑导航END*/

/*顶部导航*/
.blog-nav {
    width: 100%;
    height: 64px;
    position: fixed;
    top: 0;
    background-color: #393D49;
    border-bottom: 1px solid #5FB878;
}

    .blog-nav .layui-nav {
        position: absolute;
        top: 0;
        left: 15%;
        width: 85%;
        background: none;
        display: none;
        text-align: center;
    }

        .blog-nav .layui-nav .layui-nav-item {
            line-height: 64px;
            margin: 0 5px;
        }

            .blog-nav .layui-nav .layui-nav-item a {
                padding: 0 15px;
            }

    .blog-nav .blog-user {
        line-height: 64px;
        position: absolute;
        z-index: 10;
    }

        .blog-nav .blog-user img {
            width: 40px;
            height: 40px;
            border-radius: 50px;
        }

            .blog-nav .blog-user img:hover {
                opacity: .5;
            }

        .blog-nav .blog-user .fa-qq {
            line-height: 64px;
            font-size: 24px;
            color: #c2c2c2;
        }

            .blog-nav .blog-user .fa-qq:hover {
                color: #fff;
            }
    .blog-nav .blog-logo {
        position: absolute;
        top: 0px;
        left: 25%;
        width: 50%;
        text-align: center;
        margin: 0 auto;
        line-height: 64px;
        font-size: 30px;
        color: white;
        font-weight: bold;
        font-family: KaiTi;
        display: inline-block;
        z-index: 10;
    }

    .blog-nav .blog-navicon {
        position: absolute;
        left: 0;
        padding: 10px 12px;
        color: white;
        border: 1px solid #009688;
        margin-top: 13px;
    }

        .blog-nav .blog-navicon:hover {
            border: 1px solid #5FB878;
        }

@media (min-width: 992px) {
    .blog-nav .layui-nav {
        display: block;
    }

    .blog-nav .blog-user {
        right: 0;
    }

    .blog-nav .blog-logo {
        position: absolute;
        left: 10%;
        width: auto;
    }

    .blog-nav .blog-navicon {
        display: none;
    }

    .blog-nav-left {
        display: none !important;
    }
}

/*侧边导航*/
.blog-nav-left {
    top: 65px;
    border-radius: 0;
    border-top: 1px solid #5FB878;
    box-shadow: 0 0 8px #fff;
}

.leftIn {
    -moz-animation: leftIn 0.5s;
    -o-animation: leftIn 0.5s;
    -webkit-animation: leftIn 0.5s;
    animation: leftIn 0.5s;
}

.leftOut {
    -moz-animation: leftOut 0.5s;
    -o-animation: leftOut 0.5s;
    -webkit-animation: leftOut 0.5s;
    animation: leftOut 0.5s;
}

@media (min-width: 992px) {
    .blog-nav-left {
        display: none !important;
    }
}
/*侧边导航END*/

/*侧边导航遮罩*/
.blog-mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 65px;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 998;
}

.maskIn {
    -moz-animation: maskFadeIn 0.5s;
    -o-animation: maskFadeIn 0.5s;
    -webkit-animation: maskFadeIn 0.5s;
    animation: maskFadeIn 0.5s;
}

.maskOut {
    -moz-animation: maskFadeOut 0.5s;
    -o-animation: maskFadeOut 0.5s;
    -webkit-animation: maskFadeOut 0.5s;
    animation: maskFadeOut 0.5s;
}

@media (min-width: 992px) {
    .blog-mask {
        display: none;
    }
}
/*侧边导航遮罩END*/

/*文章列表（网站首页和文章专栏共用）*/
.article {
    padding: 15px;
    margin-bottom: 10px;
    background: #fff;
    border-left: 5px solid #fff;
    -moz-transition: all 0.3s linear;
    -o-transition: all 0.3s linear;
    -webkit-transition: all 0.3s linear;
    transition: all 0.3s linear;
}

    .article:hover {
        border-left: 5px solid #009688;
        -moz-transition: all 0.3s linear;
        -o-transition: all 0.3s linear;
        -webkit-transition: all 0.3s linear;
        transition: all 0.3s linear;
    }

    .article > .article-right {
        width: 100%;
        float: right;
        padding-left: 2%;
    }

        .article > .article-right > .article-title a {
            font-size: 18px;
        }

            .article > .article-right > .article-title a:hover {
                color: #009688;
            }

        /*.article > .article-right > .article-abstract {*/
            /*display: none;*/
        /*}*/

    .article > .article-footer {
        margin-top: 5px;
        font-size: 11px;
        padding: 2px;
        color: #a6a6a6;
    }

        .article > .article-footer > span {
            padding-right: 3%;
        }

        .article > .article-footer a {
            color: #009688;
        }

        .article > .article-footer .article-viewinfo,
        .article > .article-footer .article-author {
            display: none;
        }

.icon-stick {
    border: 1px solid #FF5722;
    color: #FF5722;
    padding: 0 2px 0 0;
    font-family: SimHei;
    display: inline-block;
    margin-right: 3px;
    position: relative;
    top: -1px;
    font-size: 13px;
}

@media (min-width: 768px) {
    .article > .article-right > .article-title a {
        font-size: 18px;
    }

    .article > .article-right > .article-abstract {
        font-size: 14px;
        display: block;
        margin-top: 10px;
        text-indent: 2em;
    }

    .article > .article-footer {
        margin-top: 10px;
        font-size: 13px;
    }

        .article > .article-footer .article-viewinfo {
            display: inline;
            float: right;
        }

        .article > .article-footer .article-author {
            display: inline;
        }

    .icon-stick {
        font-size: 14px;
    }
}

@media (min-width: 992px) {
    .article > .article-right > .article-title a {
        font-size: 18px;
    }

    .icon-stick {
        font-size: 15px;
    }
}
/*文章列表END*/

/*右侧模块（网站首页和文章列表以及文章详细共用）*/
.blog-module {
    margin-bottom: 10px;
    padding: 15px;
    background: #fff;
    height: 100%;
}

    .blog-module > .blog-module-title {
        border-bottom: 1px solid #009688;
        font-size: 15px;
        font-weight: 500;
        padding: 0 0 5px 0;
        margin-bottom: 5px;
    }

.blog-module-ul li,
.blog-module-ul .fa {
    margin: 3px 0;
}

    .blog-module-ul li .fa {
        color: #009688;
    }
/*右侧模块END*/

/*文章分类导航*/
.article-category {
    position: fixed;
    top: 64px;
    right: 0;
    bottom: 0;
    background: #393D49;
    color: #eee;
    width: 130px;
    font-size: 11px;
    padding: 10px;
    display: none;
    margin: 0;
    z-index: 999;
}

    .article-category > .article-category-title {
        text-align: center;
        border-bottom: 1px solid #009688;
        font-size: 15px;
        font-weight: 500;
        padding: 0 0 5px 0;
        margin-bottom: 5px;
    }

    .article-category > a {
        display: block;
        color: #eee;
        padding: 5px 1%;
        margin: 4px 0;
        background: #009688;
        width: 98%;
        text-align: center;
        line-height: 19px;
        word-break: keep-all; /* 不换行 */
        white-space: nowrap; /* 不换行 */
        overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
        float: left;
    }

        .article-category > a:hover {
            color: #fff;
            background: #5FB878;
        }

.category-toggle {
    position: fixed;
    right: 0;
    top: 40%;
    width: 15px;
    background: #009688;
    color: #fff;
    font-size: 16px;
    padding: 30px 0;
    z-index: 9999;
}

    .category-toggle > i {
        display: block;
        height: 16px;
    }

.categoryIn {
    -moz-animation: categoryIn 0.5s;
    -o-animation: categoryIn 0.5s;
    -webkit-animation: categoryIn 0.5s;
    animation: categoryIn 0.5s;
}

.categoryOut {
    -moz-animation: categoryOut 0.5s;
    -o-animation: categoryOut 0.5s;
    -webkit-animation: categoryOut 0.5s;
    animation: categoryOut 0.5s;
}

/*分类导航In动画*/
@keyframes categoryIn {
    from {
        right: -140px;
    }

    to {
        right: 0;
    }
}

@-moz-keyframes categoryIn {
    from {
        right: -140px;
    }

    to {
        right: 0;
    }
}

@-webkit-keyframes categoryIn {
    from {
        right: -140px;
    }

    to {
        right: 0;
    }
}

/*分类导航Out动画*/
@keyframes categoryOut {
    from {
        right: 0;
    }

    to {
        right: -140px;
    }
}

@-moz-keyframes categoryOut {
    from {
        right: 0;
    }

    to {
        right: -140px;
    }
}

@-webkit-keyframes categoryOut {
    from {
        right: 0;
    }

    to {
        right: -140px;
    }
}

@media (min-width: 768px) {
    .article-category {
        font-size: 13px;
        width: 260px !important;
    }

        .article-category > .blog-module-title {
            text-align: start;
        }

        .article-category > a {
            padding: 7px 1%;
            margin: 5px 0;
            width: 46%;
        }

            .article-category > a:nth-child(odd) {
                float: right;
            }

            .article-category > a:nth-child(even) {
                float: left;
            }

    @keyframes categoryIn {
        from {
            right: -280px;
        }

        to {
            right: 0;
        }
    }

    @-moz-keyframes categoryIn {
        from {
            right: -280px;
        }

        to {
            right: 0;
        }
    }

    @-webkit-keyframes categoryIn {
        from {
            right: -280px;
        }

        to {
            right: 0;
        }
    }

    @keyframes categoryOut {
        from {
            right: 0;
        }

        to {
            right: -280px;
        }
    }

    @-moz-keyframes categoryOut {
        from {
            right: 0;
        }

        to {
            right: -280px;
        }
    }

    @-webkit-keyframes categoryOut {
        from {
            right: 0;
        }

        to {
            right: -280px;
        }
    }
}

@media (min-width: 992px) {
    .article-category {
        display: block;
        position: static;
        background: #fff;
        color: #333;
        width: auto !important;
        font-size: 14px;
        margin: 0 0 15px 0;
    }

        .article-category a {
            background: inherit;
            border: 1px solid #d2d2d2;
            color: #444;
        }

            .article-category a:hover {
                border: 1px solid #5FB878;
                background: inherit;
                color: #5FB878;
            }

    .category-toggle {
        display: none;
    }
}
/*文章分类导航END*/

/*评论与留言*/
.blog-comment {
    position: relative;
    margin-bottom: 10px;
}

    .blog-comment li {
        border-bottom: 1px dotted #01AAED;
        padding: 15px 0 10px 0;
    }

    .blog-comment .content,
    .blog-comment .info,
    .blog-comment .replycontainer {
        margin-left: 53px;
    }

    .blog-comment .info-footer {
        font-size: 13px;
    }

    .blog-comment .info,
    .blog-comment .replycontainer {
        padding-top: 5px;
    }

        .blog-comment .replycontainer .layui-form-item {
            margin-bottom: 5px;
        }

        .blog-comment .info span {
            padding-right: 5px;
        }

        .blog-comment .info .username {
            color: #01AAED;
        }

        .blog-comment .info .btn-reply {
            color: #009688;
        }

    .blog-comment .content {
        padding: 2px 0 5px 0;
        min-height: 30px;
        font-size: 13px;
    }

    .blog-comment hr {
        margin-left: 53px;
    }

.comment-parent > img {
    width: 45px;
    height: 45px;
    margin: 5px 5px 5px 0;
    position: absolute;
    border-radius: 50px;
}

.comment-child img {
    width: 40px;
    height: 40px;
    margin: 5px 5px 5px 0;
    position: absolute;
    border-radius: 50px;
}

.comment-child {
    margin-left: 53px;
    min-height: 50px;
}

    .comment-child .info {
        margin-left: 48px;
        font-size: 12px;
        line-height: 20px;
    }
/*评论与留言END*/
/***********************************************动画定义*************************************************/
/*侧边导航In动画*/
@keyframes leftIn {
    from {
        left: -200px;
    }

    to {
        left: 0;
    }
}

@-moz-keyframes leftIn {
    from {
        left: -200px;
    }

    to {
        left: 0;
    }
}

@-webkit-keyframes leftIn {
    from {
        left: -200px;
    }

    to {
        left: 0;
    }
}

/*侧边导航Out动画*/
@keyframes leftOut {
    from {
        left: 0;
    }

    to {
        left: -200px;
    }
}

@-moz-keyframes leftOut {
    from {
        left: 0;
    }

    to {
        left: -200px;
    }
}

@-webkit-keyframes leftOut {
    from {
        left: 0;
    }

    to {
        left: -200px;
    }
}

/*分享In动画*/
@keyframes shareIn {
    from {
        right: -200px;
    }

    to {
        right: 80px;
    }
}

@-moz-keyframes shareIn {
    from {
        right: -200px;
    }

    to {
        right: 80px;
    }
}

@-webkit-keyframes shareIn {
    from {
        right: -200px;
    }

    to {
        right: 80px;
    }
}

/*分享Out动画*/
@keyframes shareOut {
    from {
        right: 80px;
    }

    to {
        right: -200px;
    }
}

@-moz-keyframes shareOut {
    from {
        right: 80px;
    }

    to {
        right: -200px;
    }
}

@-webkit-keyframes shareOut {
    from {
        right: 80px;
    }

    to {
        right: -200px;
    }
}

/*淡入动画*/
@keyframes maskFadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@-moz-keyframes maskFadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@-webkit-keyframes maskFadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

/*淡出动画*/
@keyframes maskFadeOut {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

@-moz-keyframes maskFadeOut {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

@-webkit-keyframes maskFadeOut {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}
.blogerinfo {
    text-align: center;
    padding: 0 15px;
    background: #fff;
    margin-bottom: 15px;
}

.blogerinfo-figure {
    display: inline-block;
    margin: 20px auto;
}

    .blogerinfo-figure img {
        border-radius: 50px;
    }

.blogerinfo-nickname {
    font-size: 32px;
    font-weight: bold;
    margin: 0 0 15px 0;
}

.blogerinfo-introduce {
    margin: 15px auto;
    font-size: 18px;
    width: 90%;
}

.blogerinfo-location {
    color: #808080;
    margin: 15px;
}

.blogerinfo-contact {
    padding: 15px;
    padding-top: 5px;
}

    .blogerinfo-contact > a {
        padding: 0 10px;
    }
</style>
