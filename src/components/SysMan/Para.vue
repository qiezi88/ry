<template>
  <div class="paracontainer">
    <div class="el-col el-col-20 el-col-xs-24">
      <el-form :inline="true"
               ref="parainput"
               :model="parainput"
               :size="'small'"
               v-if="serchshow"
               class="demo-form-inline">
        <el-form-item label="参数名称"
                      prop="paraname">
          <el-input v-model="parainput.paraname"
                    class="unameinput"
                    :clearable="true"
                    placeholder="请输入参数名称"></el-input>
        </el-form-item><!--
        --><el-form-item label="参数键名"
                      prop="parakeyname">
          <el-input v-model="parainput.parakeyname"
                    class="uphoneinput"
                    :clearable="true"
                    placeholder="请输入参数键名"></el-input>
        </el-form-item><!--
        --><el-form-item label="系统内置"
                      class="status"
                      prop="sysinner">
          <el-select v-model="parainput.sysinner"
                     placeholder="系统内置"
                     :clearable="true">
            <el-option label="是"
                       value="是"></el-option>
            <el-option label="否"
                       value="否"></el-option>
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
                     @click="parasearch">搜索</el-button>
        </el-form-item><!--
        --><el-form-item>
          <el-button plain
                     size="mini"
                     icon="el-icon-edit"
                     @click="reset('parainput')">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 按钮区域复制 -->
      <div class="mb8 el-row">
        <el-row>
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-plus"
                     @click="resetxzForm('paraaddForm')"
                     class="addbtn"
                     plain>新增</el-button>
          <!-- paraaddForm: {
            paraid: 0,
            paraname: '',
            parakeyname: '',
            paravalue: '',
            sysinner: '是',
            remark: '',
            create_time: '2023-04-23 18:11:40',
            orderhide: true
          }, -->
          <!-- 新增弹框开始 -->
          <el-dialog title="添加参数"
                     :visible.sync="dialogFormVisible">
            <el-form :model="paraaddForm"
                     :rules="rules"
                     ref="paraaddForm"
                     label-width="100px"
                     class="demo-paraaddForm">
              <el-form-item label="参数名称"
                            prop="paraname">
                <el-input v-model="paraaddForm.paraname"></el-input>
              </el-form-item>
              <el-form-item label="参数键名"
                            prop="paravalue">
                <el-input v-model="paraaddForm.paravalue"></el-input>
              </el-form-item>
              <el-form-item label="参数键值"
                            prop="parakeyname">
                <el-input v-model="paraaddForm.parakeyname"></el-input>
              </el-form-item>
              <el-form-item label="系统内置"
                            prop="sysinner">
                <!-- <el-input v-model="paraaddForm.status"></el-input> -->
                <el-radio-group v-model="paraaddForm.sysinner">
                  <el-radio :label="'是'">是</el-radio>
                  <el-radio :label="'否'">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="备注"
                            prop="remark">
                <el-input type="textarea"
                          v-model="paraaddForm.remark"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="submitForm('paraaddForm')">确定</el-button>
                <el-button @click="resetForm('paraaddForm')">取消</el-button>
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
                  :data="parainfo.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="85">
          </el-table-column>
          <el-table-column label="参数主键"
                           width="150">
            <template slot-scope="scope">{{ scope.row.paraid }}</template>
          </el-table-column>
          <el-table-column prop="paraname"
                           label="参数名称"
                           width="240">
          </el-table-column>
          <el-table-column prop="parakeyname"
                           label="参数键名">
          </el-table-column>
          <el-table-column prop="paravalue"
                           label="参数键值">
          </el-table-column>
          <el-table-column label="系统内置"
                           width="180">
            <template slot-scope="scope">
              <div slot="reference"
                   class="name-wrapper">
                <el-tag size="medium">{{ scope.row.sysinner }}</el-tag>
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
                <el-dialog title="添加参数"
                           :visible.sync="dialogxgFormVisible">
                  <el-form :model="paraaddForm"
                           :rules="rules"
                           ref="paraaddForm"
                           label-width="100px"
                           class="demo-paraaddForm">
                    <el-form-item label="参数名称"
                                  prop="paraname">
                      <el-input v-model="paraaddForm.paraname"></el-input>
                    </el-form-item>
                    <el-form-item label="参数键名"
                                  prop="paravalue">
                      <el-input v-model="paraaddForm.paravalue"></el-input>
                    </el-form-item>
                    <el-form-item label="参数键值"
                                  prop="parakeyname">
                      <el-input v-model="paraaddForm.parakeyname"></el-input>
                    </el-form-item>
                    <el-form-item label="系统内置"
                                  prop="sysinner">
                      <!-- <el-input v-model="paraaddForm.status"></el-input> -->
                      <el-radio-group v-model="paraaddForm.sysinner">
                        <el-radio :label="'是'">是</el-radio>
                        <el-radio :label="'否'">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注"
                                  prop="remark">
                      <el-input type="textarea"
                                v-model="paraaddForm.remark"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary"
                                 @click="submitxgForm('paraaddForm')">确定</el-button>
                      <el-button @click="resetxgForm('paraaddForm')">取消</el-button>
                    </el-form-item>
                  </el-form>
                </el-dialog>
                <!-- 修改弹框结束 -->
                <el-button @click.native.prevent="deleteRow(scope, parainfo)"
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
                       :total="parainfo.length">
        </el-pagination>
      </div>
      <!-- 分页结束 -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'Para',
  data () {
    return {
      //分页数据相关
      currentPage: 1,
      pageSize: 10,
      //备份数据
      originalData: [],
      // 隐藏显示 文本框
      serchshow: true,
      // 悬浮时候文字
      hovercontent: '隐藏搜索',
      flag: true,
      // 新增弹框 需要建立一个新数据 开始
      paraaddForm: {
        paraid: 0,
        paraname: '',
        parakeyname: '',
        paravalue: '',
        sysinner: '是',
        remark: '',
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      },
      //新增弹框 显示属性
      dialogFormVisible: false,
      //修改弹框 显示属性
      dialogxgFormVisible: false,
      paraid: 0,
      rules: {
        paraname: [
          { required: true, message: '参数名称不能为空', trigger: 'blur' }
        ],
        parakeyname: [
          { required: true, message: '参数键名不能为空', trigger: 'blur' }
        ],
        paravalue: [
          { required: true, message: '参数键值不能为空', trigger: 'blur' }
        ]
      },
      xgindex: 0, //动态修改下标
      input2: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      parainput: {
        paraname: '',
        parakeyname: '',
        sysinner: '',
        create_time: ''
      },
      value1: '',
      parainfo: [{
        paraid: '1',
        paraname: '主框架页面-默认皮肤样式名称',
        parakeyname: 'sys:index:sKinName',
        paravalue: 'skin-blue',
        sysinner: "是",
        remark: '蓝色 skin-blue、绿色 skin-green、紫色 skin-purple、红色 skin-red、黄色 skin-yellow',
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      }, {
        paraid: '2',
        paraname: '主框架页-默认皮肤样式名称',
        parakeyname: 'sys:index:sKinName',
        paravalue: 'skin-blue',
        sysinner: "是",
        remark: '蓝色 skin-blue',
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      },
      {
        paraid: '3',
        paraname: '主框架页-默认皮肤样式名称',
        parakeyname: 'sys:index:sKinName',
        paravalue: 'skin-blue',
        sysinner: "是",
        remark: '蓝色 skin-blue',
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      },
      {
        paraid: '4',
        paraname: '主框架页-默认皮肤样式名称',
        parakeyname: 'sys:index:sKinName',
        paravalue: 'skin-blue',
        sysinner: "是",
        remark: '蓝色 skin-blue',
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      },
      {
        paraid: '5',
        paraname: '主框架页-默认皮肤样式名称',
        parakeyname: 'sys:index:sKinName',
        paravalue: 'skin-blue',
        sysinner: "是",
        remark: '蓝色 skin-blue',
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      },
      {
        paraid: '6',
        paraname: '主框架页-默认皮肤样式名称',
        parakeyname: 'sys:index:sKinName',
        paravalue: 'skin-blue',
        sysinner: "是",
        remark: '蓝色 skin-blue',
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      }
      ]
    };
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted () {
    this.originalData = JSON.parse(JSON.stringify(this.parainfo))
  },
  methods: {
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
      this.parainfo = this.originalData
    },
    // 搜索功能
    parasearch () {
      console.log('搜索!');
      // this.forbid = false 隐藏
      this.parainfo = JSON.parse(JSON.stringify(this.originalData))
      //搜索出的数据
      var searchList = []
      // 第一种情况 搜索框有数据  key postcode postname status
      for (var key in this.parainput) {
        if (this.parainput[key] != '') {
          searchList = this.parainfo.filter(ele => {
            // ele.editable = false 隐藏
            return ele[key].toLowerCase().indexOf(this.parainput[key].toLowerCase()) > -1
          })
        } else {
          searchList = JSON.parse(JSON.stringify(this.parainfo))
        }
        //将第一次过滤出的信息保留，留着下一次搜索框内容过滤，直到搜索框没有内容
        this.parainfo = JSON.parse(JSON.stringify(searchList))
      }
    },
    // 重置按钮--重置功能
    reset (parainput) {
      this.$refs[parainput].resetFields()
      // 清空搜索框后 还原表格
      this.parainfo = JSON.parse(JSON.stringify(this.originalData))
      // console.log('reset')
    },
    // 点击新增按钮 重置表单
    resetxzForm (paraaddForm) {
      // console.log("每次打开新增 重置了一下")
      this.dialogFormVisible = true  //显示新增弹框
      //console.log(this.$refs[paraaddForm])  // !==undefined  就说明paraaddForm里有值
      if (this.$refs[paraaddForm] !== undefined) {
        this.$refs[paraaddForm].resetFields();
      }
    },
    // 新增 -弹窗-添加人员功能 提交
    submitForm (paraaddForm) {
      console.log("添加。。。")
      // this.visible = true
      this.$refs[paraaddForm].validate(valid => {
        if (valid) {
          this.paraid = this.parainfo.length
          this.paraid += 1;
          (this.paraaddForm.paraid = this.paraid), this.parainfo.push(JSON.parse(JSON.stringify(this.paraaddForm)))
          // (this.validateForm.id = this.paraid), (this.validateForm.editable = false), this.parainfo.push(JSON.parse(JSON.stringify(this.validateForm)))
          //添加完人员，将最新表格数据记录一份
          this.originalData = JSON.parse(JSON.stringify(this.parainfo))
          //每次添加完后都重置一下表单
          this.$refs[paraaddForm].resetFields()
          this.dialogFormVisible = false  //表单显示状态 dialogFormVisible=false 表单隐藏
          this.parainfo = this.originalData  //我加的
          this.paraid = this.parainfo.length //5
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
    resetForm (paraaddForm) {
      // console.log("取消")
      this.$refs[paraaddForm].resetFields()
      this.dialogFormVisible = false
    },
    filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }, handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    modifyRow (index, rows) {
      // paraaddForm: {
      //   paraid: 0,
      //   paraname: '',
      //   parakeyname: '',
      //   paravalue: '',
      //   sysinner: '是',
      //   remark: '',
      //   create_time: '2023-04-23 18:11:40',
      //   orderhide: true
      // },
      console.log("用户管理修改功能未完善...")
      this.paraaddForm.paraid = rows.paraid
      this.paraaddForm.paraname = rows.paraname
      this.paraaddForm.parakeyname = rows.parakeyname
      this.paraaddForm.paravalue = rows.paravalue
      this.paraaddForm.sysinner = rows.sysinner
      this.paraaddForm.remark = rows.remark
      this.xgindex = index
    },
    // 修改-弹框-确定 提交
    submitxgForm (paraaddForm) {
      // console.log(this.$refs[paraaddForm])
      this.$refs[paraaddForm].validate(valid => {
        if (valid) {
          // console.log(this.paraaddForm)
          this.parainfo[this.xgindex] = this.paraaddForm
          this.originalData = JSON.parse(JSON.stringify(this.parainfo))
          this.dialogxgFormVisible = false  //表单显示状态 dialogFormVisible=false 表单隐藏
          this.parainfo = this.originalData  //我加的  显示修改后最终数据
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
    resetxgForm (paraaddForm) {
      this.$confirm('是否要取消编辑?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$refs[paraaddForm].resetFields()
          this.dialogxgFormVisible = false
          this.$message({
            type: 'success',
            message: '取消编辑成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消编辑'
          })
        })
    },
    deleteRow (scope, rows) {
      let index = scope.row.paraid - 1 //数组下标
      this.$confirm('是否确认删除岗位编号为"' + scope.row.paraid + '"的数据项?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rows.splice(index, 1);
        let totalPage = Math.ceil(this.parainfo.length / this.pageSize)
        //当前页大于总页数代表已经删除最后一条数据 将总页数赋值给当前页 会跳转到上一页
        this.currentPage = totalPage
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
    // 当前页
    handleCurrentChange (val) {
      this.currentPage = val
      console.log("当前页：" + this.currentPage)
    },
    //页面展示的数据发生改变
    handleSizeChange (val) {
      this.pageSize = val
      console.log("每页的数据：" + this.pageSize)
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
div /deep/ .demo-paraaddForm .el-input__inner {
  height: 36px !important;
}
/* 字体与文本框之间的距离 */
div /deep/ .demo-paraaddForm .el-form-item__content {
  margin-left: 80px !important;
}
/* 新增弹框 */
div /deep/ .el-dialog {
  width: 500px !important;
  margin-top: 6vh !important;
}
.demo-paraaddForm {
  width: 460px;
}
/* 新增弹框的 左侧label */
div /deep/ .demo-paraaddForm .el-form-item__label {
  width: 80px !important;
}
/* 新增按钮左边距 */
div /deep/ .addbtn {
  margin-right: 10px !important;
}
/* 新增弹框 的确认取消按钮 靠右边*/
div /deep/ .demo-paraaddForm > div:nth-of-type(6) {
  text-align: right !important;
  margin-top: 60px !important;
  margin-bottom: 0px !important;
}
/* 新增弹框 的确认取消按钮 高度36px*/
div /deep/ .demo-paraaddForm > div:nth-of-type(6) .el-button {
  height: 36px !important;
}
/* 修改弹框 第三行 靠左 */
div
  /deep/
  .demo-paraaddForm
  .el-form-item:nth-of-type(4)
  .el-form-item__content {
  text-align: left !important;
}
div /deep/ .el-dialog__header {
  text-align: left !important;
}
/* 修改框 结束 */
.paracontainer {
  padding: 20px;
}
div /deep/ .el-col-20 {
  width: 100% !important;
}
div /deep/ .el-col.el-col-20.el-col-xs-24[data-v-6b577e82] {
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
/* div /deep/ .status .el-input__inner 这是状态框长度 */
div /deep/ .unameinput,
div /deep/ .uphoneinput {
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
  padding-left: 14px;
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
/* para新加样式 */
div /deep/ .el-table__body-wrapper .el-table__row td .cell {
  overflow: hidden !important; /*超出的部分隐藏起来。*/
  white-space: nowrap !important; /*不显示的地方用省略号...代替*/
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