<template>
    <el-main>
      <!-- 新增按钮 -->
      <el-form size="small">
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="addRelative"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
      <el-table
        :height="tableHeight"
        :data="tableList"
        row-key="sysRelId"
        :tree-props="{ children: 'children' }"
        border
        stripe
      >
        <el-table-column prop="menuLabel" label="业主名称"></el-table-column>
        <el-table-column prop="type" label="亲属类型">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type == '0'">业主</el-tag>
            <el-tag type="success" v-if="scope.row.type == '1'">学童</el-tag>
            <el-tag  v-if="scope.row.type == '2'">中青年</el-tag>
            <el-tag type="danger" v-if="scope.row.type == '3'">老年人</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="icon" label="菜单图标">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="relName" label="亲属名称"> </el-table-column>
        <el-table-column prop="name" label="楼栋"></el-table-column>
        <el-table-column prop="unitName" label="单元"></el-table-column>
        <el-table-column prop="houseNum" label="房屋编号"></el-table-column>
        <el-table-column align="center" width="200" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="editRelative(scope.row)"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="deleteRelative(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <!-- 新增或编辑弹框 -->
      <sys-dialog
        :title="dialog.title"
        :width="dialog.width"
        :height="dialog.height"
        :visible="dialog.visible"
        @onClose="onClose"
        @onConfirm="onConfirm"
      >
        <div slot="content">
          <el-form
            style="margin-left: 40px"
            :model="addModel"
            ref="addForm"
            :rules="rules"
            label-width="80px"
            :inline="true"
            size="normal"
          >
            <el-row>
              <el-col :span="24">
                <el-form-item prop="type" label="亲属类型">
                  <el-radio-group v-model="addModel.type">
                    <el-radio :label="'0'">业主</el-radio>
                    <el-radio :label="'1'">学童</el-radio>
                    <el-radio :label="'2'">中青年</el-radio>
                    <el-radio :label="'3'">老年人</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item prop="parentName" label="上级菜单">
              <el-input
                @click.native="selectParent"
                v-model="addModel.parentName"
                placeholder="请选择上级菜单"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item prop="menuLabel" label="菜单名称">
              <el-input
                v-model="addModel.menuLabel"
                placeholder="请填写菜单名称"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="菜单图标">
              <el-input
                v-model="addModel.icon"
                placeholder="请填写菜单图标"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="relName"
              label="亲属名称"
            >
              <el-input
                v-model="addModel.relName"
                placeholder="请填写亲属名称"
                size="small"
              ></el-input>
            </el-form-item>
          
            <el-form-item label="备注">
              <el-input
                v-model="addModel.remark"
                placeholder="请填写备注"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="序号">
              <el-input
                v-model="addModel.orderNum"
                placeholder="请填写序号"
                size="small"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </sys-dialog>
      <!-- 选择上级部门弹框 -->
      <sys-dialog
        :title="parentDialog.title"
        :width="parentDialog.width"
        :height="parentDialog.height"
        :visible="parentDialog.visible"
        @onClose="onParentClose"
        @onConfirm="onParentConfirm"
      >
        <div slot="content">
          <el-tree
            ref="parentTree"
            :data="parentList"
            node-key="sysRelId"
            :props="defaultProps"
            empty-text="暂无数据"
            :show-checkbox="false"
            :highlight-current="true"
            default-expand-all
            :expand-on-click-node="false"
            @node-click="nodeSelect"
          >
            <div slot-scope="{ node, data }">
              <!-- 如果没有下级，显示文档图标 -->
              <span v-if="data.children.length == 0">
                <i style="margin-left: 3px" class="el-icon-document"></i>
              </span>
              <!-- 有下级，判断是否展开 -->
              <span v-else @click.stop="openBtn(data)">
                <i
                  v-if="data.open"
                  style="margin-left: 3px"
                  class="el-icon-circle-plus-outline"
                ></i>
                <i v-else style="margin-left: 3px" class="el-icon-remove-outline"></i>
              </span>
              <span style="margin-left: 3px">{{ node.label }}</span>
            </div>
          </el-tree>
        </div>
      </sys-dialog>
    </el-main>
  </template>
  
  <script>
  import { getRelativeListApi, addRelativeApi, getParentApi,editRelativeApi,deleteRelativeApi,getListApi } from "@/api/relative";
  import SysDialog from "@/components/system/SysDialog";
  export default {
    //注册组件
    components: {
      SysDialog,
    },
    data() {
      return {
        //表格高度
        tableHeight: 0,
        //上级菜单树属性配置
        defaultProps: {
          children: "children",
          label: "menuLabel",
        },
        //上级部门树数据
        parentList: [],
        //上级部门弹框属性
        parentDialog: {
          title: "选择上级部门",
          width: 300,
          height: 450,
          visible: false,
        },
        //表单验证规则
        rules: {
          type: [
            {
              required: true,
              trigger: "change",
              message: "请选择菜单类型",
            },
          ],
          parentName: [
            {
              required: true,
              trigger: "change",
              message: "请选择上级菜单",
            },
          ],
          menuLabel: [
            {
              required: true,
              trigger: "change",
              message: "请填写菜单名称",
            },
          ],
          phone: [
            {
              required: true,
              trigger: "change",
              message: "请填写手机号",
            },
          ],
          relName: [
            {
              required: true,
              trigger: "change",
              message: "请填写亲属名称",
            },
          ]
        },
        //新增或编辑绑定的数据
        addModel: {
          editType: "", //标识  0：新增 1：编辑
          sysRelId: "",
          parentId: "",
          menuLabel: "",
          relName: "",
          phone:"",
          type: "",
          icon: "",
          remark: "",
          parentName: "",
          orderNum: "",
        },
        //新增或编辑弹框属性
        dialog: {
          title: "",
          width: 700,
          height: 380,
          visible: false,
        },
        //表格数据   
        tableList: [],
        selectNode: {
          sysRelId: "",
          menuLabel: "",
        },
      };
    },
    created() {
      this.getRelativeList();
    },
    mounted() {
      this.$nextTick(() => {
        this.tableHeight = window.innerHeight - 180;
      });
    },
    methods: {
      //编辑按钮
      editRelative(row) {
        //清空表单
        this.$resetForm("addForm", this.addModel);
        //把当前编辑的数据复制到表单数据域
        this.$objCoppy(row, this.addModel);
        //设置编辑的标识
        this.addModel.editType = "1";
        //设置弹框属性
        this.dialog.title = "编辑菜单";
        this.dialog.visible = true;
      },
      async deleteRelative(row) {
        console.log(row);
        let confirm = await this.$myconfirm("确定删除该数据吗?");
        if (confirm) {
          let res = await deleteRelativeApi({ sysRelId: row.sysRelId });
          if(res && res.code == 200){
            //刷新表格
            this.getRelativeList();
            this.$message.success(res.msg);
          }
        }
      },
      //上级部门节点加号和减号点击事件
      openBtn(data) {
        data.open = !data.open;
        this.$refs.parentTree.store.nodesMap[data.sysRelId].expanded = !data.open;
      },
      //上级树节点点击事件
      nodeSelect(node) {
        console.log(node);
        this.selectNode.sysRelId = node.sysRelId;
        this.selectNode.menuLabel = node.menuLabel;
      },
      //选择上级部门点击事件
      async selectParent() {
        //获取上班部门树数据
        let res = await getParentApi();
        if (res && res.code == 200) {
          console.log(res);
          this.parentList = res.data;
        }
        this.parentDialog.visible = true;
      },
      //上级部门弹框确认事件
      onParentConfirm() {
        this.addModel.parentId = this.selectNode.sysRelId;
        this.addModel.parentName = this.selectNode.menuLabel;
        console.log(this.addModel);
        this.parentDialog.visible = false;
      },
      //上级部门弹框关闭事件
      onParentClose() {
        this.parentDialog.visible = false;
      },
      //新增或编辑确认事件
      onConfirm() {
        this.$refs.addForm.validate(async (valid) => {
          if (valid) {
            let res = null;
            if (this.addModel.editType == "0") {
              res = await addRelativeApi(this.addModel);
            }else {
              res = await editRelativeApi(this.addModel);
            }
            if (res && res.code == 200) {
              //刷新列表
              this.getRelativeList();
              this.dialog.visible = false;
              this.$message.success(res.msg);
            }
          }
        });
      },
      //弹框新增或编辑关闭事件
      onClose() {
        this.dialog.visible = false;
      },
      //新增按钮
      addRelative() {
        //清空表单数据
        this.$resetForm("addForm", this.addModel);
        this.dialog.title = "新增菜单";
        this.addModel.editType = "0";
        this.dialog.visible = true;
      },
      //获取列表
      async getRelativeList() {
        let res = await getRelativeListApi();
        if (res && res.code == 200) {
          this.tableList = res.data;
        }
        console.log(res);
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  ::v-deep .el-tree {
    // 将每一行的设置为相对定位 方便后面before after 使用绝对定位来固定位置
    .el-tree-node {
      position: relative;
      padding-left: 10px;
    }
    // 子集像右偏移 给数线留出距离
    .el-tree-node__children {
      padding-left: 20px;
    }
    //这是竖线
    .el-tree-node :last-child:before {
      height: 40px;
    }
    .el-tree > .el-tree-node:before {
      border-left: none;
    }
    .el-tree > .el-tree-node:after {
      border-top: none;
    }
    //这自定义的线 的公共部分
    .el-tree-node:before,
    .el-tree-node:after {
      content: "";
      left: -4px;
      position: absolute;
      right: auto;
      border-width: 2px;
    }
    .tree :first-child .el-tree-node:before {
      border-left: none;
    }
    // 竖线
    .el-tree-node:before {
      border-left: 2px dotted #d9d9d9;
      bottom: 0px;
      height: 100%;
      top: -25px;
      width: 1px;
    }
    //横线
    .el-tree-node:after {
      border-top: 2px dotted #d9d9d9;
      height: 20px;
      top: 14px;
      width: 24px;
    }
    .el-tree-node__expand-icon.is-leaf {
      width: 8px;
    }
    //去掉elementui自带的展开按钮  一个向下的按钮,打开时向右
    .el-tree-node__content > .el-tree-node__expand-icon {
      display: none;
    }
    //每一行的高度
    .el-tree-node__content {
      line-height: 30px;
      height: 30px;
      padding-left: 10px !important;
    }
  }
  //去掉最上级的before  after 即是去电最上层的连接线
  ::v-deep .el-tree > div {
    &::before {
      display: none;
    }
    &::after {
      display: none;
    }
  }
  </style>