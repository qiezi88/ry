<template>
  <div class="rolecontainer">
    <div class="el-col el-col-20 el-col-xs-24">
      <el-form :inline="true"
               :model="roleinput"
               :size="'small'"
               ref="roleinput"
               v-if="serchshow"
               class="demo-form-inline">
        <el-form-item label="角色名称"
                      prop="rolename">
          <el-input v-model="roleinput.rolename"
                    class="unameinput"
                    :clearable="true"
                    placeholder="请输入角色名称"></el-input>
        </el-form-item><!--
        --><el-form-item label="权限字符"
                      prop="limitchar">
          <el-input v-model="roleinput.limitchar"
                    class="uphoneinput"
                    :clearable="true"
                    placeholder="请输入权限字符"></el-input>
        </el-form-item><!--
        --><el-form-item label="状态"
                      class="status"
                      prop="status">
          <el-select v-model="roleinput.status"
                     :clearable="true"
                     placeholder="角色状态">
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
              <el-date-picker v-model="value1"
                              type="daterange"
                              range-separator="-"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              :clearable="true">
              </el-date-picker>
            </div>
          </template>
        </el-form-item>
        <!--
        --><el-form-item>
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-search"
                     @click="rolesearch">搜索</el-button>
        </el-form-item><!--
        --><el-form-item>
          <el-button plain
                     size="mini"
                     icon="el-icon-edit"
                     @click="reset('roleinput')">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 按钮区域复制 -->
      <div class="mb8 el-row">
        <el-row>
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-plus"
                     class="addbtn"
                     @click="resetxzForm('roleaddForm')"
                     plain>新增</el-button>
          <!-- 新增弹框开始 -->
          <!-- roleaddForm: {
            roleid:'',
            rolename: '',
            limitchar: '',
            showorder: '',
            status: true,
            menu_limit: '',
            remark: ''
          } -->
          <el-dialog title="添加角色"
                     :visible.sync="dialogFormVisible">
            <el-form :model="roleaddForm"
                     :rules="rules"
                     ref="roleaddForm"
                     label-width="100px"
                     class="demo-roleaddForm">
              <el-form-item label="角色名称"
                            prop="rolename">
                <el-input v-model="roleaddForm.rolename"
                          placeholder="请输入角色名称"></el-input>
              </el-form-item>
              <el-form-item label="权限字符"
                            prop="limitchar">
                <el-input v-model="roleaddForm.limitchar"
                          placeholder="请输入权限字符"></el-input>
              </el-form-item>
              <el-form-item label="角色顺序"
                            prop="showorder">
                <!-- <el-input-number v-model="roleaddForm.postorder"
                               placeholder="0"></el-input-number> -->
                <el-input-number v-model="roleaddForm.showorder"
                                 controls-position="right"
                                 :min="0"></el-input-number>
              </el-form-item>
              <el-form-item label="状态"
                            prop="status">
                <!-- <el-input v-model="roleaddForm.status"></el-input> -->
                <el-radio-group v-model="roleaddForm.status">
                  <el-radio :label="true">正常</el-radio>
                  <el-radio :label="false">停用</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="菜单权限"
                            prop="menu_limit">
                <template>
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox label="展开/折叠"></el-checkbox>
                    <el-checkbox label="全选/全不选"></el-checkbox>
                    <el-checkbox label="父子联动"></el-checkbox>
                  </el-checkbox-group>
                </template>
              </el-form-item>
              <el-form-item label="备注"
                            prop="remark">
                <el-input type="textarea"
                          v-model="roleaddForm.remark"
                          placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="submitForm('roleaddForm')">确定</el-button>
                <el-button @click="resetForm('roleaddForm')">取消</el-button>
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
          <el-button type="warning"
                     size="mini"
                     icon="el-icon-download"
                     plain>导出</el-button>
          <div class="top-right-btn">
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
            </el-row>
          </div>
        </el-row>
      </div>
      <!-- table表单区域 -->
      <div class="el-table">
        <el-table ref="userTable"
                  :data="roleinfo.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="85">
          </el-table-column>
          <el-table-column label="角色编号"
                           width="120">
            <template slot-scope="scope">{{ scope.row.roleid }}</template>
          </el-table-column>
          <el-table-column prop="rolename"
                           label="角色名称"
                           width="120">
          </el-table-column>
          <el-table-column prop="limitchar"
                           label="权限字符"
                           width="120">
          </el-table-column>
          <el-table-column prop="showorder"
                           label="显示顺序"
                           width="120">
          </el-table-column>
          <el-table-column label="状态"
                           width="120">
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
          <el-table-column label="操作">
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
                <el-dialog title="修改角色"
                           :visible.sync="dialogxgFormVisible">
                  <el-form :model="roleaddForm"
                           :rules="rules"
                           ref="roleaddForm"
                           label-width="100px"
                           class="demo-roleaddForm">
                    <el-form-item label="角色名称"
                                  prop="rolename">
                      <el-input v-model="roleaddForm.rolename"
                                placeholder="请输入角色名称"></el-input>
                    </el-form-item>
                    <el-form-item label="权限字符"
                                  prop="limitchar">
                      <el-input v-model="roleaddForm.limitchar"
                                placeholder="请输入权限字符"></el-input>
                    </el-form-item>
                    <el-form-item label="角色顺序"
                                  prop="showorder">
                      <!-- <el-input-number v-model="roleaddForm.postorder"
                               placeholder="0"></el-input-number> -->
                      <el-input-number v-model="roleaddForm.showorder"
                                       controls-position="right"
                                       :min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item label="状态"
                                  prop="status">
                      <!-- <el-input v-model="roleaddForm.status"></el-input> -->
                      <el-radio-group v-model="roleaddForm.status">
                        <el-radio :label="true">正常</el-radio>
                        <el-radio :label="false">停用</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="菜单权限"
                                  prop="menu_limit">
                      <template>
                        <el-checkbox-group v-model="checkList">
                          <el-checkbox label="展开/折叠"></el-checkbox>
                          <el-checkbox label="全选/全不选"></el-checkbox>
                          <el-checkbox label="父子联动"></el-checkbox>
                        </el-checkbox-group>
                      </template>
                    </el-form-item>
                    <el-form-item label="备注"
                                  prop="remark">
                      <el-input type="textarea"
                                v-model="roleaddForm.remark"
                                placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary"
                                 @click="submitxgForm('roleaddForm')">确定</el-button>
                      <el-button @click="resetxgForm('roleaddForm')">取消</el-button>
                    </el-form-item>
                  </el-form>
                </el-dialog>
                <!-- 修改弹框结束 -->
                <el-button @click.native.prevent="deleteRow(scope.$index, roleinfo)"
                           type="text"
                           size="small"
                           icon="el-icon-delete">
                  删除
                </el-button>
                <el-button @click.native.prevent="moreRow(scope.$index, roleinfo)"
                           type="text"
                           size="small"
                           icon="el-icon-d-arrow-right">
                  更多
                </el-button>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页开始 -->
      <div class="pagination-container">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       background
                       :current-page="currentPage"
                       :page-sizes="[10, 20, 30, 50]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="roleinfo.length">
        </el-pagination>
      </div>
      <!-- 分页结束 -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'Role',
  data () {
    return {
      //分页数据相关
      currentPage: 1,
      pageSize: 10,
      checkList: ['父子联动'],
      // 备份数据
      originalData: '',
      //隐藏显示搜索框
      serchshow: true,
      // 悬浮时候文字
      hovercontent: '隐藏搜索',
      flag: true,
      //新增表单 false
      dialogFormVisible: false,
      // 新增弹框 需要建立一个新数据 开始
      roleaddForm: {
        roleid: '',
        rolename: '',
        limitchar: '',
        showorder: '',
        status: true,
        menu_limit: '',
        remark: '',
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      },
      roleid: 0,
      // 修改弹框
      dialogxgFormVisible: false,
      xgindex: 0,
      rules: {
        rolename: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        limitchar: [
          { required: true, message: '权限字符不能为空', trigger: 'blur' }
        ],
        showorder: [{ required: true }]
      },

      roleinput: {
        rolename: '',
        limitchar: '',
        status: '',
        create_time: '',
      },
      value1: '',
      roleinfo: [{
        roleid: '1',
        rolename: '超级管理员',
        limitchar: 'admin',
        showorder: '1',
        status: true,
        create_time: '2023-04-23 18:11:40',
        orderhide: false
      }, {
        roleid: '2',
        rolename: '普通角色',
        limitchar: 'common',
        showorder: '2',
        status: true,
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      }
      ]
    };
  },
  mounted () {
    this.originalData = JSON.parse(JSON.stringify(this.roleinfo))
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    // 搜索框
    rolesearch () {
      console.log("role 搜索。")
      this.roleinfo = JSON.parse(JSON.stringify(this.originalData))
      //搜索出的数据
      var searchList = []
      for (var key in this.roleinput) {
        if (this.roleinput[key] != '') {
          searchList = this.roleinfo.filter(ele => {
            return String(ele[key]).toLowerCase().indexOf(String(this.roleinput[key]).toLowerCase()) > -1
          })
        } else {
          searchList = JSON.parse(JSON.stringify(this.roleinfo))
        }
        //将第一次过滤出的信息保留，留着下一次搜索框内容过滤，直到搜索框没有内容
        this.roleinfo = JSON.parse(JSON.stringify(searchList))
      }
    },
    // 重置框-重置搜索框内容
    reset (roleinput) {
      this.$refs[roleinput].resetFields()
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
      this.roleinfo = this.originalData
    },
    // 重置按钮 重置功能
    reset (roleinput) {
      this.$refs[roleinput].resetFields()
    },
    // 点击新增按钮 重置表单
    resetxzForm (roleaddForm) {
      // console.log("每次打开新增 重置了一下")
      this.dialogFormVisible = true  //显示新增弹框
      if (this.$refs[roleaddForm] !== undefined) {
        this.$refs[roleaddForm].resetFields();
      }
    },
    // 新增 -弹窗-添加人员功能 提交
    submitForm (roleaddForm) {
      console.log("添加。。。")
      // this.visible = true
      this.$refs[roleaddForm].validate(valid => {
        if (valid) {
          this.roleid = this.roleinfo.length
          this.roleid += 1;
          (this.roleaddForm.roleid = this.roleid), this.roleinfo.push(JSON.parse(JSON.stringify(this.roleaddForm)))
          // (this.validateForm.id = this.roleid), (this.validateForm.editable = false), this.roleinfo.push(JSON.parse(JSON.stringify(this.validateForm)))
          //添加完人员，将最新表格数据记录一份
          this.originalData = JSON.parse(JSON.stringify(this.roleinfo))
          //每次添加完后都重置一下表单
          this.$refs[roleaddForm].resetFields()
          this.dialogFormVisible = false  //表单显示状态 dialogFormVisible=false 表单隐藏
          this.roleinfo = this.originalData  //我加的
          this.roleid = this.roleinfo.length //5
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
    // 新增弹框 取消
    resetForm (roleaddForm) {
      console.log("新增弹框 取消")
      this.$refs[roleaddForm].resetFields()
      this.dialogFormVisible = false
    },
    // 修改-弹框-确定 提交
    submitxgForm (roleaddForm) {
      console.log("修改-提交。")
      this.$refs[roleaddForm].validate(valid => {
        if (valid) {
          // console.log(this.roleaddForm)
          this.roleinfo[this.xgindex] = this.roleaddForm
          this.originalData = JSON.parse(JSON.stringify(this.roleinfo))
          this.dialogxgFormVisible = false  //表单显示状态 dialogFormVisible=false 表单隐藏
          this.roleinfo = this.originalData  //我加的  显示修改后最终数据
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
    resetxgForm (roleaddForm) {
      this.$refs[roleaddForm].resetFields()
      this.dialogxgFormVisible = false
    },
    filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }, handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    modifyRow (index, rows) {
      console.log("角色管理修改功能未完善...")

      //   rolename: '',
      //   limitchar: '',
      //   showorder: '',
      //   status: true,
      //   menu_limit: '',
      //   remark: '',
      this.roleaddForm.roleid = rows.roleid
      this.roleaddForm.rolename = rows.rolename
      this.roleaddForm.limitchar = rows.limitchar
      this.roleaddForm.showorder = rows.showorder
      this.roleaddForm.status = rows.status
      this.roleaddForm.menu_limit = rows.menu_limit
      this.roleaddForm.remark = rows.remark
      this.xgindex = index
    },
    deleteRow (index, rows) {
      this.$confirm('是否确认删除岗位编号为"' + rows[index].roleid + '"的数据项?', '系统提示', {
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
      console.log("角色管理更多功能未完善...")
    },
    //当前页数改变
    handleCurrentChange (val) {
      this.currentPage = val
      // console.log("当前页：" + this.currentPage)
    },
    //页面展示的数据发生改变
    handleSizeChange (val) {
      this.pageSize = val
      // console.log("每页的数据：" + this.pageSize)
    },
  }
}
</script>
<style scoped>
/* 其他改动 */
div /deep/ .demo-roleaddForm .el-form-item__content {
  text-align: left !important;
}
/* 确定取消按钮 固定在右边 */
div
  /deep/
  .demo-roleaddForm
  .el-form-item:nth-of-type(7)
  .el-form-item__content {
  text-align: right !important;
}
.userorder .el-button:nth-of-type(2) {
  margin-left: 10px !important;
}
/* 新增弹框 */
div /deep/ .el-dialog {
  width: 500px !important;
  margin-top: 6vh !important;
}
.demo-roleaddForm {
  width: 460px;
}
/* 新增弹框的 左侧label */
div /deep/ .demo-roleaddForm .el-form-item__label {
  width: 80px !important;
}
/* 新增按钮左边距 */
div /deep/ .addbtn {
  margin-right: 10px !important;
}
/* 新增弹框 的确认取消按钮 靠右边*/
div /deep/ .demo-roleaddForm > div:nth-of-type(7) {
  text-align: right !important;
  margin-top: 60px !important;
  margin-bottom: 0px !important;
}
/* 字段与文本框之间的距离 */
div /deep/ .demo-roleaddForm .el-form-item__content {
  margin-left: 80px !important;
}
div /deep/ .el-checkbox,
div /deep/ .el-radio {
  font-weight: 500 !important;
}
.rolecontainer {
  padding: 20px;
}
div /deep/ .el-col-20 {
  width: 100% !important;
}
div /deep/ .el-col.el-col-20.el-col-xs-24[data-v-15ac6018] {
  padding-left: 0;
  padding-right: 0;
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
  text-align: left !important;
}
div /deep/ .el-table__row > td {
  text-align: left !important;
}
/* table中的文本框居中 第一列 第八列 */
div /deep/ .el-table-column--selection .cell {
  padding-left: 24px;
  padding-right: 14px;
}
/* div /deep/ .el-table__header-wrapper .has-gutter .el-table_1_column_1 > .cell,
div /deep/ .el-table__body-wrapper .el-table__row .el-table_1_column_1 .cell {
  text-align: center !important;
}
div /deep/ .el-table__header-wrapper .has-gutter .el-table_1_column_8 > .cell,
div /deep/ .el-table__body-wrapper .el-table__row .el-table_1_column_8 .cell {
  text-align: center !important;
} */
/* 由于虚拟结点是变化的 所以需要这样写 样式才能居中 */
div /deep/ .has-gutter > tr > th:nth-of-type(7) .cell {
  text-align: center !important;
}
div /deep/ .el-table__row > td:nth-of-type(7) .cell {
  text-align: center !important;
}
div /deep/ .has-gutter > tr > th:nth-of-type(8) .cell {
  text-align: center !important;
}
div /deep/ .el-table__row > td:nth-of-type(8) .cell {
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
</style>