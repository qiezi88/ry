<template>
  <div class="dictcontainer">
    <div class="el-col el-col-20 el-col-xs-24">
      <el-form :inline="true"
               :model="dictinput"
               :size="'small'"
               ref="dictinput"
               v-if="serchshow"
               class="demo-form-inline">
        <el-form-item label="字典名称"
                      prop="dictname">
          <el-input v-model="dictinput.dictname"
                    class="unameinput"
                    :clearable="true"
                    placeholder="请输入字典名称"></el-input>
        </el-form-item><!--
        --><el-form-item label="字典类型"
                      prop="dicttype">
          <el-input v-model="dictinput.dicttype"
                    class="uphoneinput"
                    :clearable="true"
                    placeholder="请输入字典类型"></el-input>
        </el-form-item><!--
        --><el-form-item label="状态"
                      class="status"
                      prop="status">
          <el-select v-model="dictinput.status"
                     :clearable="true"
                     placeholder="字典状态">
            <el-option label="正常"
                       value="正常"></el-option>
            <el-option label="停用"
                       value="停用"></el-option>
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
                     @click="onSubmit">搜索</el-button>
        </el-form-item><!--
        --><el-form-item>
          <el-button plain
                     size="mini"
                     icon="el-icon-edit"
                     @click="reset('dictinput')">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 按钮区域复制 -->
      <div class="mb8 el-row">
        <el-row>
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-plus"
                     @click="resetxzForm('dictaddForm')"
                     class="addbtn"
                     plain>新增</el-button>
          <!-- 新增弹框开始 -->
          <!-- dictaddForm: {
                  dictname: '',
                  dicttype: '',
                  status: '',
                  remark: ''
                }, -->
          <el-dialog title="添加字典类型"
                     :visible.sync="dialogFormVisible">
            <el-form :model="dictaddForm"
                     :rules="rules"
                     ref="dictaddForm"
                     label-width="100px"
                     class="demo-dictaddForm">
              <el-form-item label="字典名称"
                            prop="dictname">
                <el-input v-model="dictaddForm.dictname"
                          placeholder="请输入字典名称"></el-input>
              </el-form-item>
              <el-form-item label="字典类型"
                            prop="dicttype">
                <el-input v-model="dictaddForm.dicttype"
                          placeholder="请输入字典类型"></el-input>
              </el-form-item>
              <el-form-item label="岗位状态"
                            prop="status">
                <!-- <el-input v-model="dictaddForm.status"></el-input> -->
                <el-radio-group v-model="dictaddForm.status">
                  <el-radio :label="'正常'">正常</el-radio>
                  <el-radio :label="'停用'">停用</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="备注"
                            prop="remark">
                <el-input type="textarea"
                          v-model="dictaddForm.remark"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="submitForm('dictaddForm')">确定</el-button>
                <el-button @click="resetForm('dictaddForm')">取消</el-button>
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
          <el-button type="danger"
                     size="mini"
                     icon="el-icon-refresh"
                     disabled
                     plain>刷新缓存</el-button>
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
        <el-table ref="dictTable"
                  :data="dictinfo.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="85">
          </el-table-column>
          <el-table-column label="字典编号"
                           width="150">
            <template slot-scope="scope">{{ scope.row.dictid }}</template>
          </el-table-column>
          <el-table-column prop="dictname"
                           label="字典名称"
                           width="240">
          </el-table-column>
          <el-table-column prop="dicttype"
                           label="字典类型">
          </el-table-column>
          <el-table-column label="状态"
                           width="180">
            <template slot-scope="scope">
              <div slot="reference"
                   class="name-wrapper">
                <el-tag size="medium">{{ scope.row.status }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark"
                           label="备注"
                           width="180">
          </el-table-column>
          <el-table-column prop="create_time"
                           label="创建时间"
                           width="180">
          </el-table-column>
          <el-table-column label="操作"
                           width="240">

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
                <el-dialog title="修改字典类型"
                           :visible.sync="dialogxgFormVisible">
                  <el-form :model="dictaddForm"
                           :rules="rules"
                           ref="dictaddForm"
                           label-width="100px"
                           class="demo-dictaddForm">
                    <el-form-item label="字典名称"
                                  prop="dictname">
                      <el-input v-model="dictaddForm.dictname"
                                placeholder="请输入字典名称"></el-input>
                    </el-form-item>
                    <el-form-item label="字典类型"
                                  prop="dicttype">
                      <el-input v-model="dictaddForm.dicttype"
                                placeholder="请输入字典类型"></el-input>
                    </el-form-item>
                    <el-form-item label="岗位状态"
                                  prop="status">
                      <!-- <el-input v-model="dictaddForm.status"></el-input> -->
                      <el-radio-group v-model="dictaddForm.status">
                        <el-radio :label="'正常'">正常</el-radio>
                        <el-radio :label="'停用'">停用</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注"
                                  prop="remark">
                      <el-input type="textarea"
                                v-model="dictaddForm.remark"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary"
                                 @click="submitxgForm('dictaddForm')">确定</el-button>
                      <el-button @click="resetxgForm('dictaddForm')">取消</el-button>
                    </el-form-item>
                  </el-form>
                </el-dialog>
                <!-- 删除弹框结束 -->
                <el-button @click.native.prevent="deleteRow(scope, dictinfo)"
                           type="text"
                           size="small"
                           icon="el-icon-delete">
                  删除
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
                       :total="dictinfo.length">
        </el-pagination>
      </div>
      <!-- 分页结束 -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'Dict',
  data () {
    return {
      //分页数据相关
      currentPage: 1,
      pageSize: 10,
      // 备份数据
      originalData: [],
      // 隐藏显示 文本框
      serchshow: true,
      // 悬浮时候文字
      hovercontent: '隐藏搜索',
      flag: true,
      // 新增对话框属性
      dialogTableVisible: false,
      // 新增表单显示
      dialogFormVisible: false,
      // 新增对话框规则
      rules: {
        dictname: [
          { required: true, message: '字典名称不能为空', trigger: 'blur' },
        ],
        dicttype: [
          { required: true, message: '字典类型不能为空', trigger: 'blur' }
        ]
      },
      // 修改表单显示
      dialogxgFormVisible: false,
      // 新增弹框 需要建立一个新数据 开始
      dictaddForm: {
        dictid: 0,
        dictname: '',
        dicttype: '',
        status: '正常',
        remark: '',
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      },
      addid: 0,
      // 修改框显示隐藏
      dialogxgFormVisible: false,
      xgindex: 0, //修改动态下标  
      input2: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dictinput: {
        dictname: '',
        dicttype: '',
        status: '',
        create_time: ''
      },
      value1: '',
      dictinfo: [{
        dictid: 1,
        dictname: '用户性别',
        dicttype: 'sys_user_sex',
        status: "正常",
        remark: '用户性别列表',
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      }, {
        dictid: 2,
        dictname: '菜单状态',
        dicttype: 'sys_show_hide',
        status: "正常",
        remark: '菜单状态列表',
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      },
      {
        dictid: 3,
        dictname: '菜单状态',
        dicttype: 'sys_show_hide',
        status: "正常",
        remark: '菜单状态列表',
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      },
      {
        dictid: 4,
        dictname: '菜单状态',
        dicttype: 'sys_show_hide',
        status: "正常",
        remark: '菜单状态列表',
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      },
      {
        dictid: 5,
        dictname: '菜单状态',
        dicttype: 'sys_show_hide',
        status: "正常",
        remark: '菜单状态列表',
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      },
      {
        dictid: 6,
        dictname: '菜单状态',
        dicttype: 'sys_show_hide',
        status: "正常",
        remark: '菜单状态列表',
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      },
      {
        dictid: 7,
        dictname: '菜单状态',
        dicttype: 'sys_show_hide',
        status: "正常",
        remark: '菜单状态列表',
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      },
      {
        dictid: 8,
        dictname: '菜单状态',
        dicttype: 'sys_show_hide',
        status: "正常",
        remark: '菜单状态列表',
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      },
      {
        dictid: 9,
        dictname: '菜单状态',
        dicttype: 'sys_show_hide',
        status: "正常",
        remark: '菜单状态列表',
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      },
      {
        dictid: 10,
        dictname: '菜单状态',
        dicttype: 'sys_show_hide',
        status: "正常",
        remark: '菜单状态列表',
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      }
      ]
    };
  },
  mounted () {
    this.originalData = JSON.parse(JSON.stringify(this.dictinfo))
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    refreshdata () {
      this.dictinfo = this.originalData
    },
    onSubmit () {
      console.log('搜索!');
      this.dictinfo = JSON.parse(JSON.stringify(this.originalData))
      //搜索出的数据
      var searchList = []
      for (var key in this.dictinput) {
        if (this.dictinput[key] != '') {
          searchList = this.dictinfo.filter(ele => {
            return ele[key].toLowerCase().indexOf(this.dictinput[key].toLowerCase()) > -1
          })
        } else {
          searchList = JSON.parse(JSON.stringify(this.dictinfo))
        }
        //将第一次过滤出的信息保留，留着下一次搜索框内容过滤，直到搜索框没有内容
        this.dictinfo = JSON.parse(JSON.stringify(searchList))
      }
    },
    // 重置按钮--重置功能
    reset (dictinput) {
      this.$refs[dictinput].resetFields()
      // 清空搜索框后 还原表格
      this.dictinfo = JSON.parse(JSON.stringify(this.originalData))
      // console.log('reset')
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
      this.dictinfo = this.originalData
    },
    // 新增 -弹窗-添加人员功能 提交
    submitForm (dictaddForm) {
      console.log("添加。。。")
      // this.visible = true
      this.$refs[dictaddForm].validate(valid => {
        if (valid) {

          this.addid = this.dictinfo.length
          this.addid += 1;
          (this.dictaddForm.dictid = this.addid), this.dictinfo.push(JSON.parse(JSON.stringify(this.dictaddForm)))
          // (this.validateForm.id = this.dictid), (this.validateForm.editable = false), this.dictinfo.push(JSON.parse(JSON.stringify(this.validateForm)))
          //添加完人员，将最新表格数据记录一份
          this.originalData = JSON.parse(JSON.stringify(this.dictinfo))
          //每次添加完后都重置一下表单
          this.$refs[dictaddForm].resetFields()
          this.dialogFormVisible = false  //表单显示状态 dialogFormVisible=false 表单隐藏
          this.dictinfo = this.originalData  //我加的
          this.addid = this.dictinfo.length //5
          console.log(this.addid)
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
    // 点击新增按钮 重置表单
    resetxzForm (dictaddForm) {
      // console.log("每次打开新增 重置了一下")
      this.dialogFormVisible = true  //显示新增弹框
      //console.log(this.$refs[dictaddForm])  // !==undefined  就说明dictaddForm里有值
      if (this.$refs[dictaddForm] !== undefined) {
        this.$refs[dictaddForm].resetFields();
      }
    },
    // 新增-弹窗-取消功能
    resetForm (dictaddForm) {
      // console.log("取消")
      this.$refs[dictaddForm].resetFields()
      this.dialogFormVisible = false
    },
    filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    modifyRow (index, rows) {
      console.log("用户管理修改功能未完善...")
      //  dictaddForm: {
      //   dictid: 0,
      //   dictname: '',
      //   dicttype: '',
      //   status: '正常',
      //   remark: '',
      //   create_time: '2023-04-23 18:11:40',
      //   orderhide: true
      // }
      this.dictaddForm.dictname = rows.dictname
      this.dictaddForm.dicttype = rows.dicttype
      this.dictaddForm.status = rows.status
      this.dictaddForm.remark = rows.remark
      this.dictaddForm.create_time = rows.create_time
      this.dictaddForm.orderhide = rows.orderhide
      this.xgindex = index
    },
    // 修改-弹框-确定 提交
    submitxgForm (dictaddForm) {
      console.log("修改-提交。")
      this.$refs[dictaddForm].validate(valid => {
        if (valid) {
          // console.log(this.dictaddForm)
          this.dictinfo[this.xgindex] = this.dictaddForm
          this.originalData = JSON.parse(JSON.stringify(this.dictinfo))
          this.dialogxgFormVisible = false  //表单显示状态 dialogFormVisible=false 表单隐藏
          this.dictinfo = this.originalData  //我加的  显示修改后最终数据
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
    resetxgForm (dictaddForm) {
      this.$refs[dictaddForm].resetFields()
      this.dialogxgFormVisible = false
    },
    deleteRow (scope, rows) {
      // console.log(scope)
      let index = scope.row.dictid - 1 //数组下标
      this.$confirm('是否确认删除岗位编号为"' + scope.row.dictid + '"的数据项?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rows.splice(index, 1);
        // this.currentPage = this.currentPage - 1
        // console.log(this.dictinfo.length)  总数
        // console.log(this.currentPage)  当前页数
        // console.log(this.pageSize)  数据量
        //总页数（每次删除计算总页数）
        let totalPage = Math.ceil(this.dictinfo.length / this.pageSize)  // Meil(1.1) 就是2  它返回大于或等于该参数的最小整数 取天花板
        //当前页大于总页数代表已经删除最后一条数据 将总页数赋值给当前页 会跳转到上一页
        this.currentPage = totalPage
        console.log(rows)
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
/* 页面修改 删除文字间距 */
div /deep/ .userorder .el-button:nth-of-type(1) {
  margin-right: 10px !important;
}
/* 弹框文本框 */
div /deep/ .demo-dictaddForm .el-input__inner {
  height: 36px !important;
}
/* 字体与文本框之间的距离 */
div /deep/ .demo-dictaddForm .el-form-item__content {
  margin-left: 80px !important;
}
/* 新增弹框 */
div /deep/ .el-dialog {
  width: 500px !important;
  margin-top: 6vh !important;
}
.demo-dictaddForm {
  width: 460px;
}
/* 新增弹框的 左侧label */
div /deep/ .demo-dictaddForm .el-form-item__label {
  width: 80px !important;
}
/* 新增按钮左边距 */
div /deep/ .addbtn {
  margin-right: 10px !important;
}
/* 新增弹框 的确认取消按钮 靠右边*/
div /deep/ .demo-dictaddForm > div:nth-of-type(5) {
  text-align: right !important;
  margin-top: 60px !important;
  margin-bottom: 0px !important;
}
/* 新增弹框 的确认取消按钮 高度36px*/
div /deep/ .demo-dictaddForm > div:nth-of-type(5) .el-button {
  height: 36px !important;
}
/* 修改弹框 第三行 靠左 */
div
  /deep/
  .demo-dictaddForm
  .el-form-item:nth-of-type(3)
  .el-form-item__content {
  text-align: left !important;
}
.el-dialog__header {
  text-align: left !important;
}
/* 修改框 结束 */
.dictcontainer {
  padding: 20px;
}
div /deep/ .el-col-20 {
  width: 100% !important;
}
div /deep/ .el-col.el-col-20.el-col-xs-24[data-v-1b6e4b58] {
  padding-left: 0 !important;
  padding-right: 0 !important;
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
div /deep/ .el-table_1_column_1 .cell {
  text-align: left !important;
}
div /deep/ .el-table__header-wrapper .has-gutter .el-table_1_column_1 .cell {
  text-align: left !important;
}
/* 第一列按钮 */
div /deep/ .el-table-column--selection .cell {
  padding-left: 24px;
  padding-right: 14px;
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