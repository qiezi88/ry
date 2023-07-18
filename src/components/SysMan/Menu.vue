<template>
  <div>
    <div class="menucontainer">
      <div class="el-col el-col-20 el-col-xs-24">
        <el-form :inline="true"
                 :model="menuinput"
                 :size="'small'"
                 class="demo-form-inline">
          <el-form-item label="菜单名称">
            <el-input v-model="menuinput.menuname"
                      class="unameinput"
                      placeholder="请输入角色名称"></el-input>
          </el-form-item><!--
        --><el-form-item label="状态"
                        class="status">
            <el-select v-model="menuinput.status"
                       placeholder="菜单状态">
              <el-option label="正常"
                         value="normal"></el-option>
              <el-option label="停用"
                         value="unnormal"></el-option>
            </el-select>
          </el-form-item><!--
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
            <el-button type="info"
                       size="mini"
                       icon="el-icon-sort"
                       disabled
                       plain>展开/折叠</el-button>
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
        <!-- <div class="el-table">
          <el-table ref="menuTable"
                    :data="menuinfo"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"> -->
        <!-- 尝试-->
        <!-- table表单区域 -->
        <div class="el-table">
          <!-- 尝试2 -->
          <el-table :data="menuinfo"
                    style="width: 100%;"
                    row-key="id"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="menuname"
                             label="菜单名称"
                             width="200">
            </el-table-column>
            <el-table-column label="图标"
                             width="80">
              <template slot-scope="scope">
                <i :class="scope.row.menuicon"></i>
              </template>
            </el-table-column>
            <el-table-column prop="menuorder"
                             label="排序"
                             width="80">
            </el-table-column>
            <el-table-column prop="menumark"
                             label="权限标识"
                             width="300">
            </el-table-column>
            <el-table-column prop="menuload"
                             label="组件路径">
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
                             icon="el-icon-edit">
                    修改
                  </el-button>
                  <el-button @click.native.prevent="addRow(scope.$index, tableData)"
                             type="text"
                             size="small"
                             icon="el-icon-plus">
                    新增
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
            <!-- 结束 -->
            <!-- <el-table-column prop="menuname"
                             label="菜单名称"
                             width="150">
            </el-table-column>
            <el-table-column label="图标"
                             width="80">
              <template slot-scope="scope">
                <i :class="scope.row.menuicon"></i>
              </template>
            </el-table-column>
            <el-table-column prop="menuorder"
                             label="排序"
                             width="80">
            </el-table-column>
            <el-table-column prop="menumark"
                             label="权限标识"
                             width="100">
            </el-table-column>
            <el-table-column prop="menuload"
                             label="组件路径"
                             width="600">
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
                             icon="el-icon-edit">
                    修改
                  </el-button>
                  <el-button @click.native.prevent="addRow(scope.$index, tableData)"
                             type="text"
                             size="small"
                             icon="el-icon-plus">
                    新增
                  </el-button>
                  <el-button @click.native.prevent="deleteRow(scope.$index, tableData)"
                             type="text"
                             size="small"
                             icon="el-icon-delete">
                    删除
                  </el-button>
                </span>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
        <!-- 结束div -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Menu',
  data () {
    return {
      menuinput: {
        menuname: '',
        status: ''
      },
      value1: '',
      menuinfo: [{
        id: 1,
        menuname: '系统管理',
        menuicon: 'el-icon-s-tools',
        menuorder: '1',
        menumark: '',
        menuload: '',
        status: '正常',
        create_time: '2023-04-23 18:11:40',
        orderhide: true,
        children: [{
          id: 11,
          menuname: '用户管理',
          menuicon: 'el-icon-s-tools',
          menuorder: '1',
          menumark: 'system:user:list',
          menuload: 'systen.user/index',
          status: '正常',
          create_time: '2023-04-23 18:11:40',
          orderhide: true,
          children: [{
            id: 111,
            menuname: '用户查询',
            menuicon: '',
            menuorder: '1',
            menumark: 'system:user:list',
            menuload: 'systen.user/index',
            status: '正常',
            create_time: '2023-04-23 18:11:40',
            orderhide: true,
          }, {
            id: 112,
            menuname: '用户新增',
            menuicon: '',
            menuorder: '2',
            menumark: 'system:user:list',
            menuload: 'systen.user/index',
            status: '正常',
            create_time: '2023-04-23 18:11:40',
            orderhide: true,
          }]
        }, {
          id: 12,
          menuname: '角色管理',
          menuicon: 'el-icon-s-tools',
          menuorder: '2',
          menumark: 'system:user:list',
          menuload: 'systen.user/index',
          status: '正常',
          create_time: '2023-04-23 18:11:40',
          orderhide: true,
          children: [
            {
              id: 121,
              menuname: '角色管理孩子',
              menuicon: '',
              menuorder: '1',
              menumark: 'system:user:list',
              menuload: 'systen.user/index',
              status: '正常',
              create_time: '2023-04-23 18:11:40',
              orderhide: true,
            }
          ]
        }, {
          id: 13,
          menuname: '菜单管理',
          menuicon: 'el-icon-s-tools',
          menuorder: '3',
          menumark: 'system:user:list',
          menuload: 'systen.user/index',
          status: '正常',
          create_time: '2023-04-23 18:11:40',
          orderhide: true,
          children: [{
            id: 131,
            menuname: '菜单管理孩子',
            menuicon: '',
            menuorder: '1',
            menumark: 'system:user:list',
            menuload: 'systen.user/index',
            status: '正常',
            create_time: '2023-04-23 18:11:40',
            orderhide: true,
          }]
        }]
      }, {
        id: 2,
        menuname: '系统监控',
        menuicon: 'el-icon-s-tools',
        menuorder: '2',
        menumark: '',
        menuload: '',
        status: '正常',
        create_time: '2023-04-23 18:11:40',
        orderhide: true,
        children: [{
          id: 21,
          menuname: '在线用户',
          menuicon: 'el-icon-s-tools',
          menuorder: '2',
          menumark: 'system:user:list',
          menuload: 'systen.user/index',
          status: '正常',
          create_time: '2023-04-23 18:11:40',
          orderhide: true
        }, {
          id: 22,
          menuname: '定时任务',
          menuicon: 'el-icon-s-tools',
          menuorder: '2',
          menumark: 'system:user:list',
          menuload: 'systen.user/index',
          status: '正常',
          create_time: '2023-04-23 18:11:40',
          orderhide: true
        }]
      },
      {
        id: 3,
        menuname: '系统工具',
        menuicon: 'el-icon-s-tools',
        menuorder: '3',
        menumark: '',
        menuload: '',
        status: '正常',
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      }, {
        menuname: '若依官网',
        menuicon: 'el-icon-s-tools',
        menuorder: '4',
        menumark: '',
        menuload: '',
        status: '正常',
        create_time: '2023-04-23 18:11:40',
        orderhide: true
      }
      ],


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
      console.log("菜单管理修改功能未完善...")
    },
    deleteRow (index, rows) {
      rows.splice(index, 1);
    }, moreRow (index, rows) {
      console.log("角菜单管理更多功能未完善...")
    }
  }
}
</script>
<style scoped>
.menucontainer {
  padding: 20px;
}
div /deep/ .el-col-20 {
  width: 100% !important;
}
div /deep/ .el-col.el-col-20.el-col-xs-24[data-v-01935881] {
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
div /deep/ .el-table__header-wrapper .has-gutter .el-table_1_column_5 > .cell,
div /deep/ .el-table__header-wrapper .has-gutter .el-table_1_column_7 > .cell,
div /deep/ .el-table__header-wrapper .has-gutter .el-table_1_column_8 > .cell {
  text-align: center !important;
}
div /deep/ .el-table__row .el-table_1_column_7 > .cell,
div /deep/ .el-table__row .el-table_1_column_8 > .cell {
  text-align: center !important;
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
</style>