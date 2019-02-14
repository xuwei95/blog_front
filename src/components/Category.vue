<template>
    <div class="content">
      <div v-if="id">
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
      </div>
      <div v-else>
        <div v-for="item in category_list" :key="item.id">
           <div class="blog-module shadow">
              <div class="blog-module-title">
                <a :href="'/#/category?id=' + item.id">{{ item.name }}</a>
              </div>
              <div v-for="i in item.article_list" :key="i.id">
                <ul class="fa-ul blog-module-ul" id="article_category">
                    <li><i class="fa-li fa fa-hand-o-right"></i><a :href="'/#/detail?id=' + i.id">{{ i.title }}</a></li>
                </ul>
              </div>
          </div>
          <!--<blockquote class="layui-elem-quote" style="text-align: center"><a :href="'/#/category?id=' + item.id">{{ item.name }}({{ item.article_list.length }})</a></blockquote>-->
        </div>
      </div>
      <div v-if="has_next">
        <div class="layui-flow-more"><button @click="getArticle_list">加载更多</button></div>
      </div>
      <div v-else>
        <div v-if="id">
          <div class="layui-flow-more">没有更多了</div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'Category',
  data () {
    return {
      id: null,
      category_list: null,
      article_list: null,
      article_count: 0,
      has_next: false,
      page: 1
    }
  },
  methods: {
    getArticle_list () {
      this.axios.get('/article_list/?page=' + this.page + '&limit=10&category_id=' + this.id)
        .then((response) => {
          this.article_list = response.data.data
        })
        .catch(error => console.log(error))
    },
    get_category_list () {
      this.axios.get('/article_category/')
        .then((response) => {
          this.category_list = response.data.data
        })
        .catch(error => console.log(error))
    },
    init_page () {
      this.id = this.$route.query.id
      if (this.id != null) {
        this.getArticle_list()
      } else {
        this.get_category_list()
      }
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
    this.init_page()
  },
  updated () {
    if (this.article_count > (this.page - 1) * 10) {
      this.has_next = true
    } else {
      this.has_next = false
    }
  },
  watch: {
    '$route' (to, from) {
      this.init_page()
    }
  }
}
</script>

<style scoped>
.content{
  padding-top: 55px;
  margin: 0 15px;
  position: relative;
}
.clear {
    clear: both;
}
.shadow {
    box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
}
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
/* 小屏幕（平板，大于等于 768px） */
@media (min-width: 768px) {
    .content {
        width: 738px;
        margin: 0 auto;
        position: relative;
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
    .content {
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
    .content {
        width: 1170px;
    }
}
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
</style>
