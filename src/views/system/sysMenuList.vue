<template>
    <el-main>
      <!-- 顶部新增按钮 -->
      <el-form size="small">
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="addMenu"
            >新增</el-button
          >
        </el-form-item>
        <!-- <i class="el-icon-circle-plus-outline"></i> -->
      </el-form>
      <!-- 新增或编辑弹框 -->
      <sys-dialog
        :title="dialog.title"
        :height="dialog.height"
        :width="dialog.width"
        :visible="dialog.visible"
        @onConfirm="onConfirm"
        @onClose="onClose"
      >
        <div slot="content">
          <el-form
            style="margin-left: 30px"
            :model="addModule"
            ref="addForm"
            :rules="rules"
            label-width="80px"
            :inline="true"
            size="small"
          >
            <el-row>
              <el-col :span="24">
                <el-form-item prop="type" label="菜单类型">
                  <el-radio-group v-model="addModule.type" size="small">
                    <el-radio :label="'0'">目录</el-radio>
                    <el-radio :label="'1'">菜单</el-radio>
                    <el-radio :label="'2'">按钮</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item prop="parentName" label="上级菜单">
              <el-input
              @click.native="selectParent"
              v-model="addModule.parentName"></el-input>
            </el-form-item>
            <el-form-item prop="menuLabel" label="菜单名称">
              <el-input v-model="addModule.menuLabel"></el-input>
            </el-form-item>
            <el-form-item
              v-if="addModule.type != '2'"
              prop="icon"
              label="菜单图标"
            >
              <el-input v-model="addModule.icon"></el-input>
            </el-form-item>
            <el-form-item
              v-if="addModule.type == '1'"
              prop="name"
              label="路由名称"
            >
              <el-input v-model="addModule.name"></el-input>
            </el-form-item>
            <el-form-item
              v-if="addModule.type == '1'"
              prop="path"
              label="路由地址"
            >
              <el-input v-model="addModule.path"></el-input>
            </el-form-item>
            <el-form-item
              v-if="addModule.type == '1'"
              prop="url"
              label="组件路径"
            >
              <el-input v-model="addModule.url"></el-input>
            </el-form-item>
            <el-form-item prop="menuCode" label="权限字段">
              <el-input v-model="addModule.menuCode"></el-input>
            </el-form-item>
            <el-form-item label="权限备注">
              <el-input v-model="addModule.remark"></el-input>
            </el-form-item>
            <el-form-item label="权限序号">
              <el-input type="number" v-model="addModule.orderNum"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </sys-dialog>
      <!-- 上级菜单弹框 -->
    <sys-dialog
      :title="parentDialog.title"
      :height="parentDialog.height"
      :width="parentDialog.width"
      :visible="parentDialog.visible"
      @onClose="parentClose"
      @onConfirm="parentConfirm"
    >
      <div slot="content">
        <el-tree
          ref="parentTree"
          :data="parentList"
          node-key="menuId"
          :props="parentProps"
          empty-text="暂无数据"
          :show-checkbox="false"
          :highlight-current="true"
          @node-click="treeClick"
        >
          <div slot-scope="{ node, data }">
            <!-- 如果没有下级，就是最好一层 -->
            <span v-if="data.children.length == 0">
              <i style="margin-right: 3px" class="el-icon-document"></i>
            </span>
            <!-- 有下级，需要判断是展开还是关闭 -->
            <span v-else @click.stop="openBtn(data)">
              <i 
              v-if="data.open"
                style="margin-right: 3px" class="el-icon-circle-plus-outline"></i>
              <i v-else style="margin-right: 3px" class="el-icon-circle-plus-outline"></i>
            </span>
            <!-- 树节点的名称 -->
            <span>{{ node.label }}</span>
          </div>
        </el-tree>
      </div>
    </sys-dialog>
    </el-main>
  </template>
  
  <script>
  import { getMenuListApi, addMenuApi,getParentApi } from "@/api/menu";
  import SysDialog from "@/components/system/SysDialog";
  export default {
    //注册组件
    components: {
      SysDialog,
    },
    data() {
      return {
        selectNode:{
        menuId:'',
        menuName:''
      },
      //上级菜单树属性配置
      parentProps: {
        children: "children",
        label: "menuLabel",
      },
      //上级菜单数据
      parentList: [],
      //上级菜单弹框属性
      parentDialog: {
        title: "选择上级菜单",
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
          icon: [
            {
              required: true,
              trigger: "change",
              message: "请填写图标",
            },
          ],
          name: [
            {
              required: true,
              trigger: "change",
              message: "请填写路由名称",
            },
          ],
          path: [
            {
              required: true,
              trigger: "change",
              message: "请填写路由地址",
            },
          ],
          url: [
            {
              required: true,
              trigger: "change",
              message: "请填写组件路径",
            },
          ],
          menuCode: [
            {
              required: true,
              trigger: "change",
              message: "请填写权限字段",
            },
          ],
        },
        //新增或编辑数据绑定
        addModule: {
          editType: "",
          menuId: "",
          parentId: "",
          menuLabel: "",
          menuCode: "",
          name: "",
          path: "",
          url: "",
          type: "",
          icon: "",
          remark: "",
          parentName: "",
          orderNum: "",
        },
        //弹框属性
        dialog: {
          title: "",
          height: 310,
          width: 660,
          visible: false,
        },
      };
    },
    created() {
      this.getMenuList();
    },
    methods: {
      //树节点加号和减号的点击事件
    openBtn(data) {
      data.open = !data.open;
      this.$refs.parentTree.store.nodesMap[data.menuId].expanded = !data.open;
    },
    //上级菜单节点点击事件
    treeClick(node) {
      console.log(node);
      this.selectNode.menuId = node.menuId;
      this.selectNode.menuName = node.menuLabel;
    },
    //上级弹框确认
    parentConfirm() {
      this.addModule.parentId = this.selectNode.menuId;
      this.addModule.parentName = this.selectNode.menuName;
      this.parentDialog.visible = false;
    },
    //上级弹框关闭
    parentClose() {
      this.parentDialog.visible = false;
    },
    //选择上级菜单
    async selectParent() {
      //获取上级菜单数据
      let res = await getParentApi();
      if (res && res.code == 200) {
        // console.log(res)
        this.parentList = res.data;
        console.log(this.parentList);
      }
      this.parentDialog.visible = true;
    },
    //新增或编辑弹框确认事件
    onConfirm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.dialog.visible = false;
        }
      });
    },
      //新增或编辑弹框取消事件
      onClose() {
        this.dialog.visible = false;
      },
      //新增按钮
      addMenu() {
        this.dialog.title = "新增菜单";
        this.dialog.visible = true;
      },
      async getMenuList() {
        let res = await getMenuListApi();
        console.log(res);
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  </style>