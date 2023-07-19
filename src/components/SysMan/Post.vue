<template>
  <div class="postcontainer">
    <div>
      <el-form :inline="true"
               :model="postinfo"
               :size="'small'"
               ref="postinfo"
               v-if="serchshow"
               class="demo-form-inline">
        <el-form-item label="岗位编码"
                      prop="postcode">
          <el-input v-model="postinfo.postcode"
                    clearable
                    placeholder="请输入岗位编码"></el-input>
        </el-form-item><!--
        --><el-form-item label="岗位名称"
                      prop="postname">
          <el-input v-model="postinfo.postname"
                    placeholder="请输入岗位名称"
                    clearable></el-input>
        </el-form-item><!--
        --><el-form-item label="状态"
                      class="status"
                      prop="status">
          <el-select v-model="postinfo.status"
                     v-on:change="indexSelect"
                     placeholder="岗位状态">
            <el-option label="正常"
                       value="正常"></el-option>
            <el-option label="停用"
                       value="停用"></el-option>
          </el-select>
        </el-form-item><!--
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
                     @click="reset('postinfo')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mb8 el-row">
      <el-row>
        <el-button type="primary"
                   size="mini"
                   icon="el-icon-plus"
                   class="addbtn"
                   @click="resetxzForm('postaddForm')"
                   plain>新增</el-button>
        <!-- 新增弹框开始 -->
        <el-dialog title="添加岗位"
                   :visible.sync="dialogFormVisible">
          <el-form :model="postaddForm"
                   :rules="rules"
                   ref="postaddForm"
                   label-width="100px"
                   class="demo-postaddForm">
            <el-form-item label="岗位名称"
                          prop="postname">
              <el-input v-model="postaddForm.postname"></el-input>
            </el-form-item>
            <el-form-item label="岗位编码"
                          prop="postcode">
              <el-input v-model="postaddForm.postcode"></el-input>
            </el-form-item>
            <el-form-item label="岗位顺序"
                          prop="postorder">
              <!-- <el-input-number v-model="postaddForm.postorder"
                               placeholder="0"></el-input-number> -->
              <el-input-number v-model="postaddForm.postorder"
                               controls-position="right"
                               :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="岗位状态"
                          prop="status">
              <!-- <el-input v-model="postaddForm.status"></el-input> -->
              <el-radio-group v-model="postaddForm.status">
                <el-radio :label="'正常'">正常</el-radio>
                <el-radio :label="'停用'">停用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式"
                          prop="remark">
              <el-input type="textarea"
                        v-model="postaddForm.remark"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="submitForm('postaddForm')">确定</el-button>
              <el-button @click="resetForm('postaddForm')">取消</el-button>
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
                   @click="delAll()"
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
    <!-- table区域 -->
    <div class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition el-table--medium">
      <el-table ref="multipleTable"
                :data="tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="85">
        </el-table-column>
        <el-table-column label="岗位编号"
                         width="230">
          <template slot-scope="scope">{{ scope.row.postid }}</template>
        </el-table-column>
        <el-table-column prop="postcode"
                         label="岗位编码"
                         width="200">
        </el-table-column>
        <el-table-column prop="postname"
                         label="岗位名称"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="postorder"
                         label="岗位排序"
                         show-overflow-tooltip>
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
        <el-table-column prop="create_time"
                         label="创建时间">
        </el-table-column>
        <el-table-column label="操作"
                         width="180">
          <template slot-scope="scope">
            <el-button @click.native.prevent="modifyRow(scope.$index, scope.row)"
                       type="text"
                       size="small"
                       @click="dialogxgFormVisible = true"
                       icon="el-icon-edit">
              修改
            </el-button>
            <!-- 修改弹框开始 -->
            <el-dialog title="修改岗位"
                       :visible.sync="dialogxgFormVisible">
              <el-form :model="postaddForm"
                       :rules="rules"
                       ref="postaddForm"
                       label-width="100px"
                       class="demo-postaddForm">
                <el-form-item label="岗位名称"
                              prop="postname">
                  <el-input v-model="postaddForm.postname"></el-input>
                </el-form-item>
                <el-form-item label="岗位编码"
                              prop="postcode">
                  <el-input v-model="postaddForm.postcode"></el-input>
                </el-form-item>
                <el-form-item label="岗位顺序"
                              prop="postorder">
                  <!-- <el-input-number v-model="postaddForm.postorder"
                               placeholder="0"></el-input-number> -->
                  <el-input-number v-model="postaddForm.postorder"
                                   controls-position="left"
                                   class="xgpostorder"
                                   :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="岗位状态"
                              prop="status">
                  <!-- <el-input v-model="postaddForm.status"></el-input> -->
                  <el-radio-group v-model="postaddForm.status"
                                  class="xgpoststatus">
                    <el-radio :label="'正常'">正常</el-radio>
                    <el-radio :label="'停用'">停用</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="活动形式"
                              prop="remark">
                  <el-input type="textarea"
                            v-model="postaddForm.remark"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary"
                             @click="submitxgForm('postaddForm')">确定</el-button>
                  <el-button @click="resetxgForm('postaddForm')">取消</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
            <!-- 修改弹框结束 -->
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)"
                       type="text"
                       size="small"
                       icon="el-icon-delete">
              删除
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <!-- 分页开始 -->
    <template>
      <div class="pagination-container">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       background
                       :current-page="currentPage"
                       :page-sizes="[10, 20, 30, 50]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="tableData.length">
        </el-pagination>
      </div>
    </template>
    <!-- 分页结束 -->
  </div>
</template>
<script>
export default {
  name: 'Post',
  data () {
    return {
      // 隐藏显示 文本框
      serchshow: true,
      // 悬浮时候文字
      hovercontent: '隐藏搜索',
      flag: true,
      // 新增对话框属性
      dialogTableVisible: false,
      // 新增表单显示
      dialogFormVisible: false,
      // 修改表单显示
      dialogxgFormVisible: false,
      xgindex: 0,
      //选择框
      multipleSelection: [],
      // 新增弹框 需要建立一个新数据 开始
      postaddForm: {
        postid: '',
        postname: '',
        postcode: '',
        postorder: '',
        status: '正常',
        create_time: '2023-04-23 16:11:40',
        remark: ''
      },
      addid: 0,
      rules: {
        postname: [
          { required: true, message: '请输入岗位名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        postcode: [
          { required: true, message: '请输入岗位编码', trigger: 'blur' }
        ],
        postorder: [{ required: true }]
      },
      // 新增弹框规则 结束
      //分页数据相关
      currentPage: 1,
      pageSize: 10,
      //备份数据表格，用于搜索完记录后，还原数据，只有删除才需要重新备份，因此在created或者mounted声生命周期函数深拷贝
      originalData: [],
      //表单显示状态
      // visible: false,
      // 岗位编号的数组
      postidarr: [],
      // 岗位编号的字符串组合
      postidstrs: '',
      postinfo: {
        postcode: '',
        postname: '',
        status: ''
      },
      tableData: [{
        postid: '1',
        postcode: 'ceo',
        postname: '董事长',
        postorder: '1',
        status: '正常',
        create_time: '2023-04-23 16:11:40'
      }, {
        postid: '2',
        postcode: 'se',
        postname: '项目经理',
        postorder: '2',
        status: '正常',
        create_time: '2023-04-23 16:11:40'
      }, {
        postid: '3',
        postcode: 'hr',
        postname: '人力资源',
        postorder: '3',
        status: '正常',
        create_time: '2023-04-23 16:11:40'
      }, {
        postid: '4',
        postcode: 'user',
        postname: '普通员工',
        postorder: '4',
        status: '正常',
        create_time: '2023-04-23 16:11:40'
      }]
    }
  },
  created () {
  },
  mounted () {
    this.originalData = JSON.parse(JSON.stringify(this.tableData))
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
      this.tableData = this.originalData
    },
    indexSelect () {
      // console.log(this.postinfo.status);  //获取了文本框状态
      console.log(this.postinfo['status']);
    },
    // 搜索功能
    onSubmit () {
      console.log('搜索!');
      // this.forbid = false 隐藏
      this.tableData = JSON.parse(JSON.stringify(this.originalData))
      //搜索出的数据
      var searchList = []
      // 第一种情况 搜索框有数据  key postcode postname status
      for (var key in this.postinfo) {
        if (this.postinfo[key] != '') {
          searchList = this.tableData.filter(ele => {
            // ele.editable = false 隐藏
            return ele[key].toLowerCase().indexOf(this.postinfo[key].toLowerCase()) > -1
          })
        } else {
          searchList = JSON.parse(JSON.stringify(this.tableData))
        }
        //将第一次过滤出的信息保留，留着下一次搜索框内容过滤，直到搜索框没有内容
        this.tableData = JSON.parse(JSON.stringify(searchList))
      }
    },
    // 重置按钮--重置功能
    reset (postinfo) {
      this.$refs[postinfo].resetFields()
      // 清空搜索框后 还原表格
      this.tableData = JSON.parse(JSON.stringify(this.originalData))
      // console.log('reset')
    },
    // 新增 -弹窗-添加人员功能 提交
    submitForm (postaddForm) {
      console.log("添加。。。")
      // this.visible = true
      this.$refs[postaddForm].validate(valid => {
        if (valid) {
          this.addid = this.tableData.length
          this.addid += 1;
          (this.postaddForm.postid = this.addid), this.tableData.push(JSON.parse(JSON.stringify(this.postaddForm)))
          // (this.validateForm.id = this.addId), (this.validateForm.editable = false), this.tableData.push(JSON.parse(JSON.stringify(this.validateForm)))
          //添加完人员，将最新表格数据记录一份
          this.originalData = JSON.parse(JSON.stringify(this.tableData))
          //每次添加完后都重置一下表单
          this.$refs[postaddForm].resetFields()
          this.dialogFormVisible = false  //表单显示状态 dialogFormVisible=false 表单隐藏
          this.tableData = this.originalData  //我加的
          this.addid = this.tableData.length //5
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
    resetxzForm (postaddForm) {
      // console.log("每次打开新增 重置了一下")
      this.dialogFormVisible = true  //显示新增弹框
      //console.log(this.$refs[postaddForm])  // !==undefined  就说明postaddForm里有值
      if (this.$refs[postaddForm] !== undefined) {
        this.$refs[postaddForm].resetFields();
      }
    },
    // 新增-弹窗-取消功能
    resetForm (postaddForm) {
      // console.log("取消")
      this.$refs[postaddForm].resetFields()
      this.dialogFormVisible = false
    },
    handleSelectionChange (val) {
      // console.log("选择选择框内容对象---")
      this.multipleSelection = val;
      // console.log(val)
    },
    // 修改函数
    modifyRow (index, rows) {
      this.postaddForm.postid = rows.postid
      this.postaddForm.postname = rows.postname
      this.postaddForm.postcode = rows.postcode
      this.postaddForm.postorder = rows.postorder
      this.postaddForm.status = rows.status
      this.postaddForm.create_time = rows.create_time
      this.postaddForm.remark = rows.remark
      this.xgindex = index
    },
    // 修改-弹框-确定 提交
    submitxgForm (postaddForm) {
      // console.log(this.$refs[postaddForm])
      this.$refs[postaddForm].validate(valid => {
        if (valid) {
          // console.log(this.postaddForm)
          this.tableData[this.xgindex] = this.postaddForm
          this.originalData = JSON.parse(JSON.stringify(this.tableData))
          this.dialogxgFormVisible = false  //表单显示状态 dialogFormVisible=false 表单隐藏
          this.tableData = this.originalData  //我加的  显示修改后最终数据
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
    resetxgForm (postaddForm) {
      this.$confirm('是否要取消编辑?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$refs[postaddForm].resetFields()
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
    deleteRow (index, rows) {
      // console.log(rows[index].postid)  //获取到了岗位编号
      // rows.splice(index, 1);
      this.$confirm('是否确认删除岗位编号为"' + rows[index].postid + '"的数据项?', '系统提示', {
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
    // 根据复选框 删除
    delAll () {
      //没有点击选择框，点击删除直接提示
      if (this.multipleSelection.length == 0) {
        this.$alert('选择框未选择，点击删除按钮无效', '警告', {
          confirmButtonText: '确定',
          // callback: () => {
          //   this.$message({
          //     type: 'info',
          //     message: `删除失败`
          //   })
          // }
        })
        return
      }
      for (let key in this.multipleSelection) {
        // console.log(key)
        this.postidarr.push(this.multipleSelection[key].postid)
      }
      this.postidstrs = this.postidarr.toString();
      console.log(this.postidstrs)
      this.$confirm('是否确认删除岗位编号为' + this.postidstrs + '的数据项?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }, this.postidarr = []).then(() => {
        for (let key in this.multipleSelection) {
          this.tableData = this.tableData.filter(ele => this.multipleSelection[key].postid != ele.postid)
        }
        console.log(this.postidarr)
        this.originalData = JSON.parse(JSON.stringify(this.tableData))
        this.$message({
          type: 'success',
          message: '删除' + this.multipleSelection.length + "条数据成功!"
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })

    },
    // handleSizeChange (val) {
    //   console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange (val) {
    //   console.log(`当前页: ${val}`);
    // }
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
/* 字体与文本框之间的距离 */
div /deep/ .demo-postaddForm .el-form-item__content {
  margin-left: 80px !important;
}
/* 新增弹框 */
div /deep/ .el-dialog {
  width: 500px !important;
  margin-top: 6vh !important;
}
.demo-postaddForm {
  width: 460px;
}
/* 新增弹框的 左侧label */
div /deep/ .demo-postaddForm .el-form-item__label {
  width: 80px !important;
}
/* 新增按钮左边距 */
div /deep/ .addbtn {
  margin-right: 10px !important;
}
/* 新增弹框 的确认取消按钮 靠右边*/
div /deep/ .demo-postaddForm > div:nth-of-type(6) {
  text-align: right !important;
  margin-top: 60px !important;
  margin-bottom: 0px !important;
}
/* 修改弹框-岗位顺序 */
div /deep/ .el-form-item__content .xgpostorder {
  margin-left: -180px;
}
/* 修改弹框-岗位状态 */
div /deep/ .el-form-item__content .xgpoststatus {
  margin-left: -227px;
}
/* 容器 */
.postcontainer {
  padding: 20px;
}
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
/* table区域 */
div /deep/ .el-table .el-table__header-wrapper .el-table__cell {
  word-break: break-word;
  background-color: #f8f8f9 !important;
  color: #515a6e;
  height: 40px;
  font-size: 13px;
}
.el-table .fixed-width .el-button--mini {
  padding-left: 0;
  padding-right: 0;
  width: inherit;
}
.el-table td.el-table__cell div {
  box-sizing: border-box;
}

.el-table-column--selection .cell {
  padding-left: 14px;
  padding-right: 14px;
}
div /deep/ .el-table .cell {
  line-height: 23px;
}
div /deep/ .el-table th.el-table__cell > .cell {
  text-align: center !important;
}
div /deep/ .el-table__row > td > .cell {
  text-align: center !important;
}
/* 多选框左侧对齐 */
div /deep/ .el-table__row > td:nth-of-type(1) > .cell {
  text-align: left !important;
}
/* 多选框左侧对齐 */
div /deep/ .has-gutter .el-table__cell:nth-of-type(1) .cell {
  text-align: left !important;
}
div /deep/ .el-button [class*="el-icon-"] + span {
  margin-left: 0 !important;
}
div /deep/ .el-table td.el-table__cell,
div /deep/ .el-table th.el-table__cell.is-leaf {
  border-bottom: 1px solid #dfe6ec;
}
div /deep/ .el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden !important;
}
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
/* div /deep/ .el-table th.el-table__cell:nth-of-type(1) > .cell {
  text-align: left !important;
} */
div /deep/ .el-table__row > td:nth-of-type(1) {
  text-align: left !important;
}
/* table中的文本框居中 第一列  */
div /deep/ .el-table-column--selection .cell {
  padding-left: 24px;
  padding-right: 14px;
}
</style>