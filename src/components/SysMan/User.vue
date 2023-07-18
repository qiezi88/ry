<template>
  <div class="usercontainer">
    <div class="el-row tomoveten">
      <div class="el-col el-col-4 el-col-xs-24 userleft">
        <!-- 左侧区域 -->
        <div class="head-container1 ">
          <el-input placeholder="请输入部门名称"
                    prefix-icon="el-icon-search"
                    v-model="filterText"
                    :clearable="true"
                    size="small">
          </el-input>
        </div>
        <div class="head-container2">
          <el-tree class="filter-tree"
                   :data="data"
                   :props="defaultProps"
                   default-expand-all
                   :filter-node-method="filterNode"
                   ref="tree">
          </el-tree>
        </div>
      </div>
      <!-- 右侧区域 -->
      <div class="el-col el-col-20 el-col-xs-24">
        <el-form :inline="true"
                 :model="userinput"
                 :size="'small'"
                 ref="userinput"
                 v-if="serchshow"
                 class="demo-form-inline">
          <el-form-item label="用户名称"
                        prop="username">
            <el-input v-model="userinput.username"
                      class="unameinput"
                      :clearable="true"
                      placeholder="请输入用户名称"></el-input>
          </el-form-item><!--
        --><el-form-item label="手机号码"
                        prop="userphone">
            <el-input v-model="userinput.userphone"
                      class="uphoneinput"
                      :clearable="true"
                      placeholder="请输入岗位名称"></el-input>
          </el-form-item><!--
        --><el-form-item label="状态"
                        prop="status"
                        class="status">
            <el-select v-model="userinput.status"
                       v-on:change="indexSelect"
                       :clearable="true"
                       placeholder="用户状态">
              <el-option label="正常"
                         value="true"></el-option>
              <el-option label="停用"
                         value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间"
                        prop="create_time">
            <template>
              <div class="block">
                <el-date-picker v-model="userinput.create_time"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :clearable="true">
                </el-date-picker>
              </div>
            </template>
          </el-form-item>
          <br /><el-form-item>
            <el-button type="primary"
                       size="mini"
                       icon="el-icon-search"
                       @click="usersearch">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button plain
                       size="mini"
                       icon="el-icon-edit"
                       @click="reset('userinput')">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 按钮区域复制 -->
        <div class="mb8 el-row">
          <el-row>
            <el-button type="primary"
                       size="mini"
                       icon="el-icon-plus"
                       class="addbtn"
                       @click="resetxzForm('useraddForm')"
                       plain>新增</el-button>
            <!-- 新增弹框开始 -->
            <!-- useraddForm:{
                    usernc: '若依',
                    userdept: '研发部门',
                    userphone: '15855556666',
                    useremail : '',
                    username: 'admin',
                    userpass:'',
                    usersex:'',
                    status: true,
                    userpost : '',
                    userrole:'', 
                    userid: '1',
                    remark:''
                  } -->
            <el-dialog title="添加用户"
                       :visible.sync="dialogFormVisible"
                       class="demo-useraddForm">
              <el-form :model="useraddForm"
                       :rules="rules"
                       ref="useraddForm"
                       label-width="100px">
                <el-form-item label="用户昵称"
                              prop="usernc">
                  <el-input v-model="useraddForm.usernc"
                            placeholder="请输入用户昵称"></el-input>
                </el-form-item>
                <el-form-item label="归属部门">
                  <el-select v-model="useraddForm.userdept"
                             placeholder="请选择归属部门">
                    <el-option label="若依科技"
                               value="若依科技"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="手机号码"
                              prop="userphone">
                  <el-input v-model="useraddForm.userphone"
                            placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="邮箱"
                              prop="useremail">
                  <el-input v-model="useraddForm.useremail"
                            placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="用户名称"
                              prop="username"
                              class="el-col el-col-12">
                  <el-input v-model="useraddForm.username"
                            placeholder="请输入用户名称"></el-input>
                </el-form-item>
                <el-form-item label="用户密码"
                              prop="userpass">
                  <el-input v-model="useraddForm.userpass"
                            show-password></el-input>
                </el-form-item>
                <el-form-item label="用户性别">
                  <el-select v-model="useraddForm.usersex"
                             placeholder="请选择性别">
                    <el-option label="男"
                               value="男"></el-option>
                    <el-option label="女"
                               value="女"></el-option>
                    <el-option label="未知"
                               value="未知"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="状态"
                              prop="status">
                  <!-- <el-input v-model="useraddForm.status"></el-input> -->
                  <el-radio-group v-model="useraddForm.status">
                    <el-radio :label="true">正常</el-radio>
                    <el-radio :label="false">停用</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="岗位">
                  <el-select v-model="useraddForm.userpost"
                             placeholder="请选择岗位">
                    <el-option label="董事长"
                               value="董事长"></el-option>
                    <el-option label="项目经理"
                               value="项目经理"></el-option>
                    <el-option label="人力资源"
                               value="人力资源"></el-option>
                    <el-option label="普通员工"
                               value="普通员工"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="角色">
                  <el-select v-model="useraddForm.userrole"
                             placeholder="请选择角色">
                    <el-option label="普通角色"
                               value="普通角色"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注"
                              prop="remark">
                  <el-input type="textarea"
                            v-model="useraddForm.remark"
                            placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary"
                             @click="submitForm('useraddForm')">确 定</el-button>
                  <el-button @click="resetForm('useraddForm')">取 消</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
            <!-- 新增弹框结束 -->
            <el-button type="success"
                       size="mini"
                       icon="el-icon-edit"
                       disabled
                       plain>修改</el-button>
            <el-button type="danger"
                       size="mini"
                       icon="el-icon-delete"
                       disabled
                       plain>删除</el-button>
            <el-button type="info"
                       size="mini"
                       icon="el-icon-upload2"
                       plain>导入</el-button>
            <el-button type="warning"
                       size="mini"
                       icon="el-icon-download"
                       plain>导出</el-button>
            <div class="top-right-btn">
              <!-- <el-row>
                <el-button icon="el-icon-search"
                           circle></el-button>
                <el-button icon="el-icon-refresh"
                           circle></el-button>
                <el-button icon="el-icon-menu"
                           circle></el-button>
              </el-row> -->
              <el-row>
                <el-tooltip class="item"
                            effect="dark"
                            :content="hovercontent"
                            placement="top">
                  <el-button icon="el-icon-search"
                             @click="hidesearch()"
                             circle>
                  </el-button>
                </el-tooltip>
                <el-tooltip class="item"
                            effect="dark"
                            content="刷新"
                            placement="top">
                  <el-button icon="el-icon-refresh"
                             @click="refresh()"
                             circle>
                  </el-button>
                </el-tooltip>
                <el-tooltip class="item"
                            effect="dark"
                            content="显隐列"
                            placement="top">
                  <el-button icon="el-icon-menu"
                             @click="showhidelie()"
                             circle></el-button>
                </el-tooltip>
              </el-row>
            </div>
          </el-row>
        </div>
        <!-- table表单区域 -->
        <div class="el-table">
          <el-table ref="userTable"
                    :data="userinfo"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
            <el-table-column type="selection"
                             width="85">
            </el-table-column>
            <el-table-column label="用户编号"
                             width="180">
              <template slot-scope="scope">{{ scope.row.userid }}</template>
            </el-table-column>
            <el-table-column prop="username"
                             label="用户名称"
                             width="180">
            </el-table-column>
            <el-table-column prop="usernc"
                             label="用户昵称">
            </el-table-column>
            <el-table-column prop="userdept"
                             label="部门"
                             width="120">
            </el-table-column>
            <el-table-column prop="userphone"
                             label="手机号码"
                             width="180">
            </el-table-column>
            <el-table-column label="状态"
                             width="100">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.status"
                           active-color="#1890ff"
                           inactive-color="#dcdfe6">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="create_time"
                             label="创建时间"
                             width="180">
            </el-table-column>
            <el-table-column label="操作"
                             width="180">

              <template slot-scope="scope">
                <span class="userorder"
                      v-if="scope.row.orderhide">
                  <el-button @click.native.prevent="modifyRow(scope.$index, scope.row)"
                             type="text"
                             size="small"
                             @click="dialogxgFormVisible = true"
                             icon="el-icon-edit">
                    修改
                  </el-button>
                  <!-- 修改弹框开始 -->
                  <el-dialog title="修改岗位"
                             :visible.sync="dialogxgFormVisible"
                             class="demo-useraddForm">
                    <el-form :model="useraddForm"
                             :rules="rules"
                             ref="useraddForm"
                             label-width="100px">
                      <el-form-item label="用户昵称"
                                    prop="usernc">
                        <el-input v-model="useraddForm.usernc"></el-input>
                      </el-form-item>
                      <el-form-item label="归属部门">
                        <el-select v-model="useraddForm.userdept"
                                   :clearable="true">
                          <el-option label="若依科技"
                                     value="若依科技"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="手机号码"
                                    prop="userphone">
                        <el-input v-model="useraddForm.userphone"></el-input>
                      </el-form-item>
                      <el-form-item label="邮箱"
                                    prop="useremail">
                        <el-input v-model="useraddForm.useremail"></el-input>
                      </el-form-item>
                      <el-form-item label="用户名称"
                                    prop="username"
                                    style="display:none"
                                    class="el-col el-col-12">
                        <el-input v-model="useraddForm.username"
                                  placeholder="请输入用户名称"></el-input>
                      </el-form-item>
                      <el-form-item label="用户密码"
                                    style="display:none"
                                    prop="userpass">
                        <el-input v-model="useraddForm.userpass"
                                  show-password></el-input>
                      </el-form-item>
                      <el-form-item label="用户性别">
                        <el-select v-model="useraddForm.usersex">
                          <el-option label="男"
                                     value="男"></el-option>
                          <el-option label="女"
                                     value="女"></el-option>
                          <el-option label="未知"
                                     value="未知"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="状态"
                                    prop="status">
                        <!-- <el-input v-model="useraddForm.status"></el-input> -->
                        <el-radio-group v-model="useraddForm.status">
                          <el-radio :label="true">正常</el-radio>
                          <el-radio :label="false">停用</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="岗位">
                        <el-select v-model="useraddForm.userpost"
                                   multiple>
                          <el-option label="董事长"
                                     value="董事长"></el-option>
                          <el-option label="项目经理"
                                     value="项目经理"></el-option>
                          <el-option label="人力资源"
                                     value="人力资源"></el-option>
                          <el-option label="普通员工"
                                     value="普通员工"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="角色">
                        <el-select v-model="useraddForm.userrole"
                                   multiple>
                          <el-option label="普通角色"
                                     value="普通角色"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="备注"
                                    prop="remark">
                        <el-input type="textarea"
                                  v-model="useraddForm.remark"></el-input>
                      </el-form-item>

                      <el-form-item>
                        <el-button type="primary"
                                   @click="submitxgForm('useraddForm')">确定</el-button>
                        <el-button @click="resetxgForm('useraddForm')">取消</el-button>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                  <!-- 修改弹框结束 -->
                  <el-button @click.native.prevent="deleteRow(scope.$index, userinfo)"
                             type="text"
                             size="small"
                             icon="el-icon-delete">
                    删除
                  </el-button>
                  <el-button @click.native.prevent="moreRow(scope.$index, userinfo)"
                             type="text"
                             size="small"
                             icon="el-icon-d-arrow-right"
                             class="usermore">
                    更多
                  </el-button>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'User',
  data () {
    var validateuserphone = (rule, value, callback) => {
      const regExp = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if (!regExp.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    };
    return {
      // 备份数据
      originalData: [],
      serchshow: true,
      // 悬浮时候文字
      hovercontent: '隐藏搜索',
      flag: true,
      // 新增表单显示
      dialogFormVisible: false,
      // 弹框中id
      userid: 0,
      //用户新增弹框
      useraddForm: {
        userid: 0,
        usernc: '',
        userdept: '',
        userphone: '',
        useremail: '',
        username: '',
        userpass: '123456',
        usersex: '',
        status: true,
        userpost: '',
        userrole: '',
        remark: '',
        // 默认显示的属性
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      },
      // 用户新增弹框 - 规则
      rules: {
        usernc: [
          { required: true, message: '用户昵称不能为空', trigger: 'blur' },
        ],
        username: [
          { required: true, message: '用户名称不能为空', trigger: 'blur' }
        ],
        userpass: [
          { required: true }
        ],
        userphone: [
          { validator: validateuserphone, trigger: 'blur' }
        ]
      },
      // 修改框显示隐藏
      dialogxgFormVisible: false,
      xgindex: 0, //修改动态下标  
      input2: '',
      filterText: '',
      data: [{
        id: 1,
        label: '若依科技',
        children: [{
          id: 3,
          label: '深圳总公司',
          children: [{
            id: 4,
            label: '研发部门'
          }, {
            id: 5,
            label: '市场部门'
          }, {
            id: 6,
            label: '测试部门'
          }, {
            id: 7,
            label: '财务部门'
          }, {
            id: 8,
            label: '运维部门'
          }]
        }, {
          id: 2,
          label: '长沙分公司',
          children: [{
            id: 9,
            label: '市场部门'
          }, {
            id: 10,
            label: '财务部门'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      userinput: {
        username: '',
        userphone: '',
        status: '',
        create_time: ''
      },
      value1: '',
      userinfo: [{
        userid: '1',
        username: 'admin',
        usernc: '若依',
        userdept: '研发部门',
        userphone: '15855556666',
        status: true,
        create_time: '2023-04-23 18:11:40',
        orderhide: false
      }, {
        userid: '2',
        username: 'ry',
        usernc: '若依',
        userdept: '测试部门',
        userphone: '15955553366',
        status: true,
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      }
      ]
    };
  },
  mounted () {
    this.originalData = JSON.parse(JSON.stringify(this.userinfo))
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    // 点击新增按钮 
    resetxzForm (useraddForm) {
      console.log("每次打开新增 重置了一下")
      this.dialogFormVisible = true  //显示新增弹框
      this.useraddForm = {
        userid: 0,
        usernc: '',
        userdept: '',
        userphone: '',
        useremail: '',
        username: '',
        userpass: '123456',
        usersex: '',
        status: true,
        userpost: '',
        userrole: '',
        remark: '',
        // 默认显示的属性
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      }
      // console.log(this.$refs[useraddForm])  // !==undefined  就说明useraddForm里有值
      // if (this.$refs[useraddForm] != undefined) {
      //   this.$refs[useraddForm].resetFields();
      // }
    },
    // 点击新增弹框的提交功能
    submitForm (useraddForm) {
      console.log("提交。")
      this.$refs[useraddForm].validate(valid => {
        if (valid) {
          this.userid = this.userinfo.length
          this.userid += 1;
          (this.useraddForm.userid = this.userid), this.userinfo.push(JSON.parse(JSON.stringify(this.useraddForm)))
          // (this.validateForm.id = this.addId), (this.validateForm.editable = false), this.userinfo.push(JSON.parse(JSON.stringify(this.validateForm)))
          //添加完人员，将最新表格数据记录一份
          this.originalData = JSON.parse(JSON.stringify(this.userinfo))
          //每次添加完后都重置一下表单
          this.$refs[useraddForm].resetFields()
          this.dialogFormVisible = false  //表单显示状态 dialogFormVisible=false 表单隐藏
          this.userinfo = this.originalData
          this.addid = this.userinfo.length //5
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 新增-弹窗-取消功能
    resetForm (useraddForm) {
      // console.log("取消")
      this.$refs[useraddForm].resetFields()
      this.dialogFormVisible = false
    },
    // 隐藏搜索功能
    hidesearch () {
      // console.log("隐藏搜索功能")
      if (this.flag) {
        this.serchshow = false
        this.hovercontent = "显示搜索"
        this.flag = false
      } else {
        // console.log("我要显示。")
        this.serchshow = true
        this.hovercontent = "隐藏搜索"
        this.flag = true
      }
    },
    // 刷新功能
    refresh () {
      console.log("刷新功能。")
      this.userinfo = this.originalData
    },
    // 显示隐藏列功能
    showhidelie () {
      console.log("显示隐藏列功能-")
    },
    indexSelect () {
      console.log(this.userinput['status']);  // 搜索框里的状态是字符串true false
    },
    // 重置按钮 -- 重置功能
    reset (userinput) {
      this.$refs[userinput].resetFields()
    },
    // 搜索框
    usersearch () {
      console.log("user 搜索。")
      this.userinfo = JSON.parse(JSON.stringify(this.originalData))
      //搜索出的数据
      var searchList = []
      for (var key in this.userinput) {
        if (this.userinput[key] != '') {
          searchList = this.userinfo.filter(ele => {
            return String(ele[key]).toLowerCase().indexOf(String(this.userinput[key]).toLowerCase()) > -1
          })
        } else {
          searchList = JSON.parse(JSON.stringify(this.userinfo))
        }
        //将第一次过滤出的信息保留，留着下一次搜索框内容过滤，直到搜索框没有内容
        this.userinfo = JSON.parse(JSON.stringify(searchList))
      }
    },
    filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }, handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    modifyRow (index, rows) {
      console.log("用户管理修改功能未完善...")
      //     usernc: '',
      //     userdept: '',
      //     userphone: '',
      //     useremail: '',
      //     username: '',
      //     userpass: '123456',
      //     usersex: '',
      //     status: true,
      //     userpost: '',
      //     userrole: '',
      //     remark: ''
      //  create_time: '2023-04-23 18:11:40',
      //     orderhide
      this.useraddForm.usernc = rows.usernc
      this.useraddForm.userdept = rows.userdept
      this.useraddForm.userphone = rows.userphone
      this.useraddForm.username = rows.username
      this.useraddForm.userpass = '123456'
      this.useraddForm.usersex = rows.usersex
      this.useraddForm.status = rows.status
      this.useraddForm.userpost = rows.userpost
      this.useraddForm.userrole = rows.userrole
      this.useraddForm.remark = rows.remark
      this.useraddForm.create_time = rows.create_time
      this.useraddForm.orderhide = rows.orderhide
      this.xgindex = index
    },
    // 修改-弹框-确定 提交
    submitxgForm (useraddForm) {
      console.log("修改-提交。")
      this.$refs[useraddForm].validate(valid => {
        if (valid) {
          // console.log(this.useraddForm)
          this.userinfo[this.xgindex] = this.useraddForm
          this.originalData = JSON.parse(JSON.stringify(this.userinfo))
          this.dialogxgFormVisible = false  //表单显示状态 dialogFormVisible=false 表单隐藏
          this.userinfo = this.originalData  //我加的  显示修改后最终数据
          this.$message({
            type: 'success',
            message: "修改成功"
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 修改-弹框-取消
    resetxgForm (useraddForm) {
      this.$refs[useraddForm].resetFields()
      this.dialogxgFormVisible = false
    },
    deleteRow (index, rows) {
      this.$confirm('是否确认删除岗位编号为"' + rows[index].userid + '"的数据项?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rows.splice(index, 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    moreRow (index, rows) {
      console.log("用户管理更多功能未完善...")
    },
  }
};
</script>
<style scoped>
/* 范围选择样式 */
div /deep/ .el-range-editor.el-input__inner {
  padding: 0px 10px !important;
}
/* 新增弹框样式开始 */
div /deep/ .demo-useraddForm .el-dialog {
  width: 600px;
  margin-top: 6vh !important;
}
div /deep/ .demo-useraddForm .el-form-item {
  width: 50% !important;
  float: left !important;
}
div /deep/ .demo-useraddForm .el-dialog ::after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
div /deep/ .demo-useraddForm .el-textarea__inner {
  width: 240% !important;
  margin-bottom: 20px !important;
}
div /deep/ .demo-useraddForm .el-form-item:nth-of-type(12) {
  width: 100% !important;
  text-align: right;
  margin-bottom: 0;
}
div /deep/ .el-form-item__label {
  width: 80px !important;
}
*,
:after,
:before {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
}
/* 字体与文本框之间的距离 */
div /deep/ .demo-useraddForm .el-form-item__content {
  margin-left: 80px !important;
}
/* 新增按钮左边距 */
div /deep/ .addbtn {
  margin-right: 10px !important;
}
/* 新增弹框样式结束 */
.usercontainer {
  padding: 20px;
}
div /deep/ .tomoveten {
  margin-left: -10px;
  margin-right: -10px;
}
div /deep/ .head-container1 {
  margin-bottom: 20px;
}
div /deep/ .userleft {
  padding-left: 10px;
  padding-right: 10px;
}
/* 右边区域 */
/* 表单区域 */
.el-form-item--small.el-form-item {
  margin-bottom: 18px;
}
.el-form--inline .el-form-item {
  display: inline-block;
  margin-right: 10px;
  vertical-align: top;
}
.el-form-item--small .el-form-item__content,
.el-form-item--small .el-form-item__label {
  line-height: 32px;
}

.el-form--inline .el-form-item__label {
  float: none;
  display: inline-block;
}
.el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
div /deep/ label {
  font-weight: 700 !important;
}
div /deep/ .el-input--small .el-input__inner {
  height: 32px;
  line-height: 32px;
  padding-right: 30px !important;
}
div /deep/ .status > .el-form-item__label {
  width: 68px !important;
}
/* 按钮区域 */
.mb8 {
  margin-bottom: 8px;
  font-size: 0;
}
.el-row {
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.top-right-btn {
  position: relative;
  float: right;
}
div /deep/ .top-right-btn > .el-row .el-button i {
  font-size: 12px;
}
.el-button.is-circle {
  border-radius: 50%;
  padding: 7px;
}
.el-col.el-col-20.el-col-xs-24 {
  padding-left: 10px;
  padding-right: 10px;
}
div /deep/ .block > .el-date-editor {
  width: 240px;
}
div /deep/ .unameinput,
div /deep/ .uphoneinput,
div /deep/ .status .el-input__inner {
  width: 240px !important;
}
/* table区域 */
div /deep/ .el-table .el-table__header-wrapper th {
  word-break: break-word;
  background-color: #f8f8f9;
  color: #515a6e;
  height: 40px;
  font-size: 13px;
}
div /deep/ .el-table__row td {
  padding: 0;
}
div /deep/ .el-table--medium .el-table__cell {
  padding: 10px 0 !important;
}

div /deep/ .el-table .el-table__cell {
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  line-height: 23px;
  height: 44px;
}
div /deep/ .el-table .cell > .userorder {
  font-size: 0;
}
div /deep/ .el-table th.el-table__cell > .cell {
  text-align: center !important;
}
div /deep/ .el-table__row > td {
  text-align: center !important;
}
/* 只删除操作里面的默认样式  margin-left: 5px;*/
div /deep/ .userorder .el-button [class*="el-icon-"] + span {
  margin-left: 0;
}

/* 修改按钮 */
div /deep/ .el-table .cell button {
  /* padding-left: 0 !important;
  padding-right: 0 !important; */
  margin-left: 10px;
  width: inherit;
}
/* 缩小页面 不显示横向滑动 */
/* div /deep/ .el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden !important;
} */
/* 分页区域 */
.pagination-container {
  position: relative;
  height: 25px;
  margin-bottom: 10px;
  margin-top: 15px;
  padding: 10px 20px !important;
}
.pagination-container .el-pagination {
  right: 0;
  position: absolute;
}
/* placeholder占位文字颜色修改 */
div /deep/ .el-pagination__jump .el-input__inner::placeholder,
div /deep/ .pagecolor .el-input__inner::placeholder {
  color: #606266 !important;
}
/* 第一列文本框样式 */
div /deep/ .el-table th.el-table__cell:nth-of-type(1) > .cell {
  text-align: left !important;
}
div /deep/ .el-table__row > td:nth-of-type(1) {
  text-align: left !important;
}
/* table中的文本框居中 第一列  */
div /deep/ .el-table-column--selection .cell {
  padding-left: 24px;
  padding-right: 14px;
}
</style>