<template>
  <div>
    <div class="deptkeytainer">
      <div class="el-col el-col-20 el-col-xs-24">
        <el-form :inline="true"
                 :model="deptinput"
                 :size="'small'"
                 class="demo-form-inline">
          <el-form-item label="部门名称">
            <el-input v-model="deptinput.deptname"
                      class="unameinput"
                      :clearable="true"
                      placeholder="请输入部门名称"></el-input>
          </el-form-item><!--
        --><el-form-item label="状态"
                        class="status">
            <el-select v-model="deptinput.status"
                       placeholder="部门状态"
                       :clearable="true">
              <el-option label="正常"
                         value="normal"></el-option>
              <el-option label="停用"
                         value="unnormal"></el-option>
            </el-select>
          </el-form-item><!--
        --><el-form-item>
            <el-button type="primary"
                       size="mini"
                       ikey="el-ikey-search"
                       @click="deptsearch">搜索</el-button>
          </el-form-item><!--
        --><el-form-item>
            <el-button plain
                       size="mini"
                       ikey="el-ikey-edit">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 按钮区域复制 -->
        <div class="mb8 el-row">
          <el-row>
            <el-button type="primary"
                       size="mini"
                       ikey="el-ikey-plus"
                       plain>新增</el-button>
            <el-button type="info"
                       size="mini"
                       ikey="el-ikey-sort"
                       disabled
                       plain>展开/折叠</el-button>
            <div class="top-right-btn">
              <el-row>
                <el-button ikey="el-ikey-search"
                           circle></el-button>
                <el-button ikey="el-ikey-refresh"
                           circle></el-button>
                <el-button ikey="el-ikey-menu"
                           circle></el-button>
              </el-row>
            </div>
          </el-row>
        </div>
        <!-- table表单区域 -->
        <div class="el-table">
          <!-- 尝试2 -->
          <el-table :data="deptinfo"
                    style="width: 100%;"
                    row-key="id"
                    default-expand-all
                    ref="depttree"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="deptname"
                             label="部门名称"
                             width="240">
            </el-table-column>
            <el-table-column prop="deptorder"
                             label="排序"
                             width="200">
            </el-table-column>
            <el-table-column label="状态"
                             width="100">
              <template slot-scope="scope">
                <div slot="reference"
                     class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.status }}</el-tag>
                </div>
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
                  <el-button @click.native.prevent="modifyRow(scope.$index, tableData)"
                             type="text"
                             size="small"
                             ikey="el-ikey-edit">
                    修改
                  </el-button>
                  <el-button @click.native.prevent="addRow(scope.$index, tableData)"
                             type="text"
                             size="small"
                             ikey="el-ikey-plus">
                    新增
                  </el-button>
                  <el-button @click.native.prevent="deleteRow(scope.$index, tableData)"
                             class="delbtn"
                             type="text"
                             size="small"
                             ikey="el-ikey-delete">
                    删除
                  </el-button>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Dept',
  data () {
    return {
      originalData: '',
      searchList: [],
      deptinput: {
        deptname: '',
        status: ''
      },
      value1: '',
      deptinfo: [{
        id: 1,
        deptname: '若依科技',
        deptorder: '0',
        status: '正常',
        create_time: '2023-04-23 18:11:40',
        orderhide: true,
        children: [{
          id: 3,
          deptid: 1,
          deptname: '深圳总公司',
          deptorder: '1',
          status: '正常',
          create_time: '2023-04-23 18:11:40',
          orderhide: true,
          children: [
            {
              id: 31,
              deptname: '研发部门',
              deptorder: '1',
              status: '正常',
              create_time: '2023-04-23 18:11:40',
              orderhide: true
            }, {
              id: 32,
              deptname: '市场部门',
              deptorder: '2',
              status: '正常',
              create_time: '2023-04-23 18:11:40',
              orderhide: true,
            },
            {
              id: 33,
              deptname: '测试部门',
              deptorder: '3',
              status: '正常',
              create_time: '2023-04-23 18:11:40',
              orderhide: true,
            }, {
              id: 34,
              deptname: '财务部门',
              deptorder: '4',
              status: '正常',
              create_time: '2023-04-23 18:11:40',
              orderhide: true,
            }, {
              id: 35,
              deptname: '运维部门',
              deptorder: '5',
              status: '正常',
              create_time: '2023-04-23 18:11:40',
              orderhide: true,
            }
          ]
        }, {
          id: 2,
          deptid: 2,
          deptname: '长沙分公司',
          deptorder: '2',
          status: '正常',
          create_time: '2023-04-23 18:11:40',
          orderhide: true,
          children: [{
            id: 21,
            deptname: '市场部门',
            deptorder: '1',
            status: '正常',
            create_time: '2023-04-23 18:11:40',
            orderhide: true,
          }, {
            id: 22,
            deptname: '财务部门',
            deptorder: '2',
            status: '正常',
            create_time: '2023-04-23 18:11:40',
            orderhide: true,
          }]
        }]
      }]
    };
  },
  mounted () {
    this.originalData = JSON.parse(JSON.stringify(this.deptinfo))
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    // 搜索框 搜索功能
    deptsearch () {
      console.log("dept 搜索。")
      //搜索出的数据
    },
    filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }, handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    modifyRow (index, rows) {
      keysole.log("菜单管理修改功能未完善...")
    },
    deleteRow (index, rows) {
      rows.splice(index, 1);
    },
    moreRow (index, rows) {
      keysole.log("角菜单管理更多功能未完善...")
    }
  }
}
</script>
<style scoped>
.deptkeytainer {
  padding: 20px;
}
div /deep/ .el-col-20 {
  width: 100% !important;
}
div /deep/ .el-col.el-col-20.el-col-xs-24[data-v-5e045e67] {
  padding-left: 0 !important;
  padding-right: 0 !important;
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
.el-form-item--small .el-form-item__keytent,
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
/* 取消状态文字的宽度 */
/* div /deep/ .status > .el-form-item__label {
  width: 68px !important;
} */
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
/* 文本框宽度设置 */
/* div /deep/ .block > .el-date-editor {
  width: 240px;
}
div /deep/ .unameinput,
div /deep/ .uphoneinput,
div /deep/ .status .el-input__inner {
  width: 240px !important;
} */
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
  padding-left: 14px;
  padding-right: 14px;
}
div /deep/ .el-table__header-wrapper .has-gutter .el-table_1_column_4 > .cell,
div /deep/ .el-table__header-wrapper .has-gutter .el-table_1_column_5 > .cell {
  text-align: center !important;
}
div /deep/ .el-table__row .el-table_1_column_4 > .cell,
div /deep/ .el-table__row .el-table_1_column_5 > .cell {
  text-align: center !important;
}
/* 只删除操作里面的默认样式  margin-left: 5px;*/
div /deep/ .userorder .el-button [class*="el-ikey-"] + span {
  margin-left: 0;
}
/* 修改按钮 */
div /deep/ .el-table .cell button {
  padding-left: 0 !important;
  padding-right: 0 !important;
  width: inherit;
}
/* 缩小页面 不显示横向滑动 */
/* div /deep/ .el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden !important;
} */
div /deep/ .el-table__row--level-0 .delbtn {
  display: none !important;
}
/* 由于虚拟结点是变化的 所以需要这样写 样式才能居中 */
div /deep/ .has-gutter > tr > th:nth-of-type(4) .cell {
  text-align: center !important;
}
div /deep/ .el-table__row > td:nth-of-type(4) .cell {
  text-align: center !important;
}
div /deep/ .has-gutter > tr > th:nth-of-type(5) .cell {
  text-align: center !important;
}
div /deep/ .el-table__row > td:nth-of-type(5) .cell {
  text-align: center !important;
}
</style>