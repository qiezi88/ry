import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Layout from '@/components/Layout'
import Home from '@/components/Home'
// import SysMan from '@/components/SysMan/index'
// import User from '@/components/SysMan/User'

const SysMan = ()=>import('@/components/SysMan/index')
const User = ()=>import('@/components/SysMan/User')
const Role = ()=>import('@/components/SysMan/Role')
const Menu = ()=>import('@/components/SysMan/Menu')
const Dept = ()=>import('@/components/SysMan/Dept')
const Post = ()=>import('@/components/SysMan/Post')
const Dict = ()=>import('@/components/SysMan/Dict')
const Para = ()=>import('@/components/SysMan/Para')
const Notice = ()=>import('@/components/SysMan/Notice')
const LogMan = ()=>import('@/components/SysMan/LogMan/index')
const Dolog = ()=>import('@/components/SysMan/LogMan/Dolog')
const Loginlog = ()=>import('@/components/SysMan/LogMan/Loginlog')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/layout',
      name: 'Layout',
      component: Layout, //布局
      redirect:'/home',
      meta:{
        title: '首页'
      },
      children:[
        {
        path:'/home',  // 路径 /layout
        name:'home',
        component:Home,
      }, 
      {
        path: '/sysman',  //路径 /sysman
        name: 'SysMan',
        component: SysMan,
        meta:{
          title:'系统管理'
        },
        children:[
          {
            path:'user',  //路径 /sysman/user
            name:'User',
            component: User,
            meta:{
          title:'用户管理'
        }
          },{
            path:'role',  //路径 /sysman/role
            name:'Role',
            component: Role,
            meta:{
          title:'角色管理'
        }
          },{
            path : 'menu',  //路径 /sysman/menu
            name : 'Menu',
            component : Menu,
            meta:{
              title:'菜单管理'
            }
          },{
            path : 'dept',  //路径 /sysman/dept
            name : 'Dept',
            component : Dept,
            meta:{
              title:'部门管理'
            }
          },{
            path : 'post',  //路径 /sysman/post
            name : 'Post',
            component : Post,
            meta:{
              title:'岗位管理'
            }
          },{
            path : 'dict',  //路径 /sysman/dict
            name : 'Dict',
            component : Dict,
            meta:{
              title:'字典管理'
            }
          },{
            path : 'para',  
            name : 'Para',
            component : Para,
            meta:{
              title:'参数设置'
            }
          },{
            path : 'notice',
            name : 'Notice',
            component : Notice,
            meta:{
              title:'通知公告'
            }
          },
          {
            path:'logman',  //路径 /sysman/logman
            name:'LogMan',
            component : LogMan,
            meta:{
              title:'日志管理'
            },
            children:[
              {
               path:'dolog',    //路径 /sysman/logman/dolog
               name:'Dolog',
               component : Dolog,
               meta:{
                title : '操作日志'
               }
              },{
                path:'loginlog',  //路径 /sysman/logman/loginlog
                name:'Loginlog',
                component : Loginlog,
                meta:{
                  title: '登录日志'
                }
              }
            ]
          }
        ]
    }]
    }
   
    //   children : [
    //     {
    //       path: '/sysman',  //路径 /home/sysman
    //       name: 'SysMan',
    //       component: SysMan,
    //       meta:{
    //         title:'系统管理'
    //       },
    //       children : [
    //         {
    //           path:'uesr',  //路径 /home/sysman/user
    //           name:'User',
    //           component: User,
    //           meta:{
    //             title:'用户管理'
    //           }
    //       }
    //       ]
    //     }
    //   ]
    
  ]
})
