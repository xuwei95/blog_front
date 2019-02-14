<template>
    <div class="content">
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
    </div>
</template>
<script>
export default {
  name: 'About',
  data () {
    return {
      msg: 'about'
    }
  }
}
</script>

<style scoped>
.content{
  padding-top: 55px;
}
.shadow {
    box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
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
