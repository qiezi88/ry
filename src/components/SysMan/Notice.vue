<template>
  <div class="noticecontainer">
    <div class="el-col el-col-20 el-col-xs-24">
      <el-form :inline="true"
               :model="noticeinput"
               :size="'small'"
               class="demo-form-inline">
        <el-form-item label="公告标题">
          <el-input v-model="noticeinput.noticetitle"
                    class="unameinput"
                    placeholder="请输入公告标题"></el-input>
        </el-form-item><!--
        --><el-form-item label="操作人员">
          <el-input v-model="noticeinput.noticeworker"
                    class="uphoneinput"
                    placeholder="请输入操作人员"></el-input>
        </el-form-item><!--
        --><el-form-item label="类型"
                      class="status">
          <el-select v-model="noticeinput.noticetype"
                     placeholder="公告类型">
            <el-option label="通知"
                       value="notice"></el-option>
            <el-option label="公告"
                       value="public"></el-option>
          </el-select>
        </el-form-item>
        <!--
        --><el-form-item>
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-search">搜索</el-button>
        </el-form-item><!--
        --><el-form-item>
          <el-button plain
                     size="mini"
                     icon="el-icon-edit">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 按钮区域复制 -->
      <div class="mb8 el-row">
        <el-row>
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-plus"
                     plain>新增</el-button>
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
          <div class="top-right-btn">
            <el-row>
              <el-button icon="el-icon-search"
                         circle></el-button>
              <el-button icon="el-icon-refresh"
                         circle></el-button>
              <el-button icon="el-icon-menu"
                         circle></el-button>
            </el-row>
          </div>
        </el-row>
      </div>
      <!-- table表单区域 -->
      <div class="el-table">
        <el-table ref="dictTable"
                  :data="noticeinfo"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="85">
          </el-table-column>
          <el-table-column label="序号"
                           width="100">
            <template slot-scope="scope">{{ scope.row.noticeid }}</template>
          </el-table-column>
          <el-table-column prop="noticetitle"
                           label="公告标题"
                           width="500">
          </el-table-column>
          <el-table-column label="公告类型"
                           width="100">
            <template slot-scope="scope">
              <div slot="reference"
                   class="name-wrapper">
                <el-tag size="medium"
                        :type="scope.row.noticetype === '通知' ? 'warning' : 'success'">{{ scope.row.noticetype }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="状态"
                           width="100">
            <template slot-scope="scope">
              <div slot="reference"
                   class="name-wrapper">
                <el-tag size="medium">{{ scope.row.noticestatus }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="creater"
                           label="创建者"
                           width="100">
          </el-table-column>
          <el-table-column prop="create_time"
                           label="创建时间"
                           width="100">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="userorder"
                    v-if="scope.row.orderhide">
                <el-button @click.native.prevent="modifyRow(scope.$index, tableData)"
                           type="text"
                           size="small"
                           icon="el-icon-edit">
                  修改
                </el-button>
                <el-button @click.native.prevent="deleteRow(scope.$index, tableData)"
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
      <div class="pagination-container">
        <div data-v-cf1facd6=""
             class="el-pagination is-background"><span class="el-pagination__total">共 2 条</span><span class="el-pagination__sizes">
            <div class="el-select el-select--mini">
              <div class="el-input el-input--mini el-input--suffix pagecolor"><input type="text"
                       readonly="readonly"
                       autocomplete="off"
                       placeholder="10条/页"
                       class="el-input__inner"><span class="el-input__suffix"><span class="el-input__suffix-inner"><i class="el-select__caret el-input__icon el-icon-arrow-up"></i><!----><!----><!----><!----><!----></span><!----></span><!----><!----></div>
              <div class="el-select-dropdown el-popper"
                   style="display: none; min-width: 110px;">
                <div class="el-scrollbar"
                     style="">
                  <div class="el-select-dropdown__wrap el-scrollbar__wrap"
                       style="margin-bottom: -6px; margin-right: -6px;">
                    <ul class="el-scrollbar__view el-select-dropdown__list">
                      <li class="el-select-dropdown__item selected"><span>10条/页</span></li>
                      <li class="el-select-dropdown__item"><span>20条/页</span></li>
                      <li class="el-select-dropdown__item"><span>30条/页</span></li>
                      <li class="el-select-dropdown__item"><span>50条/页</span></li>
                    </ul>
                  </div>
                  <div class="el-scrollbar__bar is-horizontal">
                    <div class="el-scrollbar__thumb"
                         style="transform: translateX(0%);"></div>
                  </div>
                  <div class="el-scrollbar__bar is-vertical">
                    <div class="el-scrollbar__thumb"
                         style="transform: translateY(0%);"></div>
                  </div>
                </div>
              </div>
            </div>
          </span><button type="button"
                  disabled="disabled"
                  class="btn-prev"><i class="el-icon el-icon-arrow-left"></i></button>
          <ul class="el-pager">
            <li class="number active">1</li>
          </ul><button type="button"
                  disabled="disabled"
                  class="btn-next"><i class="el-icon el-icon-arrow-right"></i></button><span class="el-pagination__jump">
            前往<div class="el-input el-input--medium el-pagination__editor is-in-pagination">
              <input type="number"
                     autocomplete="off"
                     min="1"
                     max="1"
                     class="el-input__inner"
                     placeholder="1">
            </div>页</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Para',
  data () {
    return {
      input2: '',

      defaultProps: {
        children: 'children',
        label: 'label'
      },
      noticeinput: {
        noticetitle: '',
        noticeworker: '',
        noticetype: ''
      },
      value1: '',
      noticeinfo: [{
        noticeid: '1',
        noticetitle: '温馨提醒：2018-07-01 若依新版本发布啦',
        noticetype: '公告',
        noticestatus: '正常',
        creater: "admin",
        create_time: '2023-04-23',
        orderhide: true
      }, {
        noticeid: '2',
        noticetitle: '维护通知：2018-07-01 若依系统凌晨维护',
        noticetype: '通知',
        noticestatus: '正常',
        creater: "admin",
        create_time: '2023-04-23',
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
  methods: {
    filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }, handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    modifyRow (index, rows) {
      console.log("用户管理修改功能未完善...")
    },
    deleteRow (index, rows) {
      rows.splice(index, 1);
    }, moreRow (index, rows) {
      console.log("用户管理更多功能未完善...")
    },
    filterTag (value, row) {
      return row.noticetype === value;
    },
  }
}
</script>
<style scoped>
.noticecontainer {
  padding: 20px;
}
div /deep/ .el-col-20 {
  width: 100% !important;
}
div /deep/ .el-col.el-col-20.el-col-xs-24[data-v-121aca0c] {
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
/* 文本框宽度设置 */
/* div /deep/ .status .el-input__inner 这是状态框长度 */
/* div /deep/ .unameinput,
div /deep/ .uphoneinput {
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
  padding-left: 0 !important;
  padding-right: 0 !important;
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
/* div /deep/ .el-table__body-wrapper .el-table__row td .cell {
  overflow: hidden !important; 
  white-space: nowrap !important;
} */
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