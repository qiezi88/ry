<template>
  <div class="home">
    <div class="sidebar-container has-logo">
      <el-row class="tac">
        <el-col :span="12">
          <div class="sidebar-logo-container"
               style="background-color='rgb(48, 65, 86)'">
            <a>
              <img class="sidebar-logo"
                   src="../static/img/logo.4eeb8a8e.png">
              <h1 class="sidebar-title">若依管理系统</h1>
            </a>
          </div>
          <el-menu default-active="1"
                   class="el-menu-vertical-demo"
                   :unique-opened="true"
                   background-color="rgb(48, 65, 86)"
                   text-color="rgb(191, 203, 217)"
                   active-text-color="rgb(64, 158, 255)">
            <!-- 第一个菜单 -->
            <router-link to="/home"
                         tag="span">
              <el-menu-item index="1"
                            class="el-submenu__title sy">
                <i class="el-icon-menu svg-icon"></i><!--
              --><span slot="title">首页</span>
              </el-menu-item>
            </router-link>
            <!-- 第二个菜单 -->
            <el-submenu index="2"
                        class="sysman">
              <template slot="title">
                <i class="el-icon-menu svg-icon"></i><span><router-link to="/sysman"
                               tag="span">系统管理</router-link></span>
              </template>
              <router-link to="/sysman/user"
                           tag="span"><el-menu-item index="2-1"><i class="el-icon-menu svg-icon"></i>用户管理</el-menu-item></router-link>
              <router-link to="/sysman/role"
                           tag="span"><el-menu-item index="2-2"><i class="el-icon-menu svg-icon"></i>角色管理</el-menu-item></router-link>
              <router-link to="/sysman/menu"
                           tag="span"><el-menu-item index="2-3"><i class="el-icon-menu svg-icon"></i>菜单管理</el-menu-item></router-link>
              <router-link to="/sysman/dept"
                           tag="span"><el-menu-item index="2-4"><i class="el-icon-menu svg-icon"></i>部门管理</el-menu-item></router-link>
              <router-link to="/sysman/post"
                           tag="span"><el-menu-item index="2-5"><i class="el-icon-menu svg-icon"></i>岗位管理</el-menu-item></router-link>
              <router-link to="/sysman/dict"
                           tag="span"><el-menu-item index="2-6"><i class="el-icon-menu svg-icon"></i>字典管理</el-menu-item></router-link>
              <router-link to="/sysman/para"
                           tag="span"><el-menu-item index="2-7"><i class="el-icon-menu svg-icon"></i>参数设置</el-menu-item></router-link>
              <router-link to="/sysman/notice"
                           tag="span"><el-menu-item index="2-8"><i class="el-icon-menu svg-icon"></i>通知公告</el-menu-item></router-link>
              <el-submenu index="2-9"
                          class="twomenu">
                <template slot="title"><i class="el-icon-menu svg-icon"></i><router-link to="/sysman/logman"
                               tag="span">日志管理</router-link></template>
                <router-link to="/sysman/logman/dolog"
                             tag="span"><el-menu-item index="2-9-1"><i class="el-icon-menu svg-icon"></i>操作日志</el-menu-item></router-link>
                <router-link to="/sysman/logman/loginlog"
                             tag="span"><el-menu-item index="2-9-2"><i class="el-icon-menu svg-icon"></i>登录日志</el-menu-item></router-link>
              </el-submenu>
            </el-submenu>
            <!-- 第三个菜单 -->
            <el-submenu index="3"
                        class="sysman">
              <template slot="title">
                <i class="el-icon-menu svg-icon"></i><!--
                --><span>系统监控</span>
              </template>
              <el-menu-item index="3-1"><i class="el-icon-menu svg-icon"></i>在线用户</el-menu-item>
              <el-menu-item index="3-2"><i class="el-icon-menu svg-icon"></i>定时任务</el-menu-item>
              <el-menu-item index="3-2"><i class="el-icon-menu svg-icon"></i>数据监控</el-menu-item>
              <el-menu-item index="3-2"><i class="el-icon-menu svg-icon"></i>服务监控</el-menu-item>
              <el-menu-item index="3-2"><i class="el-icon-menu svg-icon"></i>缓存监控</el-menu-item>
              <el-menu-item index="3-2"><i class="el-icon-menu svg-icon"></i>缓存列表</el-menu-item>
            </el-submenu>
            <!-- 第四个菜单 -->
            <el-submenu index="4"
                        class="sysman">
              <template slot="title">
                <i class="el-icon-menu svg-icon"></i><!--
              --><span>系统工具</span>
              </template>
              <el-menu-item index="4-1"><i class="el-icon-menu svg-icon"></i>表单构建</el-menu-item>
              <el-menu-item index="4-2"><i class="el-icon-menu svg-icon"></i>代码生成</el-menu-item>
              <el-menu-item index="4-2"><i class="el-icon-menu svg-icon"></i>系统接口</el-menu-item>
            </el-submenu>
            <!-- 第五个菜单 -->
            <el-menu-item index="5"
                          class="el-submenu__title sy">
              <i class="el-icon-menu svg-icon"></i><span slot="title">若依官网</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="main-container hasTagsView">
      <div class="topNav">
        <div class="navbar">
          <span class="hamburger">
            <i class="el-icon-s-fold hamburger-container"
               style="width"></i>
          </span>
          <div class="el-breadcrumb app-breadcrumb breadcrumb-container">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="item in navs"
                                  :key="item.path"
                                  :class="item.name">
                <router-link :to="item.path">{{item.meta.title}}</router-link>
              </el-breadcrumb-item>
            </el-breadcrumb>
            <!-- <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
              <el-breadcrumb-item>活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb> -->
          </div>
        </div>
        <!-- <div class="tags-view-container">
          <div class="el-scrollbar__wrap">
            <div class="el-scrollbar__view">
              <span class="tags-view-item router-link-exact-active router-link-active active"
                    style="background-color: rgb(64, 158, 255); border-color: rgb(64, 158, 255);">
                首页
              </span>
            </div>

          </div>

        </div> -->
        <div class="tags-view-container">
          <el-button type="primary"
                     class="tags-view-item">首页</el-button>
        </div>

      </div>
      <div class="app-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Layout',
  data () {
    return {
      list: []
    }
  },
  methods: {
  },
  computed: {
    navs () {
      this.$route.matched[0].path = "/home"
      return this.$route.matched
    }
  },
  watch: {
    // $route () {
    //   console.log(this.$route)
    // }
  }
}
</script>
<style scoped>
.home {
  height: 100%;
}
/**左侧导航栏*/
.sidebar-container {
  -webkit-transition: width 0.28s;
  transition: width 0.28s;
  width: 200px !important;
  background-color: rgb(48, 65, 86);
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  -webkit-box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}
.tac .el-col-12 {
  width: 100%;
}
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  overflow: hidden;
  color: red;
}
.sidebar-logo {
  width: 32px;
  height: 32px;
  vertical-align: middle;
  margin-right: 12px;
}
.sidebar-title {
  display: inline-block;
  margin: 0;
  color: #fff;
  font-weight: 600;
  line-height: 50px;
  font-size: 14px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  vertical-align: middle !important;
}
.svg-icon {
  font-size: 14px;
  color: rgb(191, 203, 217);
}
.el-menu {
  border-right: 0;
}
.el-menu-item {
  background-color: #1f2d3d !important;
}
.sy {
  background-color: rgb(48, 65, 86) !important;
}
div /deep/ .twomenu > .el-submenu__title {
  background-color: #1f2d3d !important;
}
.sy:hover,
div /deep/ .sysman > .el-submenu__title:hover {
  background-color: rgb(38, 52, 69) !important;
  /* background-color: red !important; */
}
.el-menu--inline .el-menu-item:hover,
div /deep/ .twomenu > .el-submenu__title:hover {
  /* background-color: aqua !important; */
  background-color: #001528 !important;
}
/* 左侧文字和图标 */
.el-submenu [class^="el-icon-"],
.el-menu-item [class^="el-icon-"] {
  text-align: left !important;
}
/**右侧样式*/
.main-container {
  height: 100%;
  -webkit-transition: margin-left 0.28s;
  transition: margin-left 0.28s;
  margin-left: 200px;
  position: relative;
  /* background-color: yellow; */
}
/**顶部导航栏*/
.main-container .topNav {
  width: 100%;
  height: 84px;
  /* background-color: red; */
}
/* 面包屑上面 */
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  /* background-color: pink; */
  -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.hamburger {
  font-size: 20px;
}
.navbar .hamburger-container {
  float: left !important;
  padding: 0px 15px;
  line-height: 50px;
  height: 100%;
  float: left;
  cursor: pointer;
  -webkit-transition: background 0.3s;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;
  /* background-color: blue; */
}
.navbar .hamburger-container:hover {
  background-color: #f1f1f1;
}
.navbar .breadcrumb-container {
  float: left;
}
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
}
.el-breadcrumb__item {
  font-size: 14px;
  line-height: 50px;
}
div /deep/ .el-breadcrumb__item .is-link {
  color: black !important;
  font-weight: none;
}
div /deep/ .el-breadcrumb__inner {
  color: #97a8be !important;
}
.el-breadcrumb__inner > a {
  font-weight: 400 !important;
}
/* 面包屑文字不可点击 不跳转路由 */
.el-breadcrumb__inner > .router-link-active {
  pointer-events: none !important;
  color: #97a8be !important;
  /* cursor: text; */
}
/* 面包屑 日志管理 隐藏 */
.el-breadcrumb .LogMan {
  display: none;
}
/* 面包屑下面 */
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  /* background-color: goldenrod; */
  border-bottom: 1px solid #d8dce5;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}
.tags-view-item {
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 28px;
  line-height: 28px;
  border: 1px solid #d8dce5;
  color: #fff;
  /* background: #fff; */
  padding: 0 8px;
  font-size: 12px !important;
  margin-left: 15px;
  margin-top: 4px;
  font-size: 12px;
}
.tags-view-item:before {
  content: "";
  background: #fff;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin-right: 2px;
}

/* 内容展示区域 */
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  /* background-color: orange; */
}
</style>