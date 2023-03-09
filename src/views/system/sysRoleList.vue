<template>
    <el-main>
      <!-- 搜索表单 -->
      <el-form
        :model="parms"
        ref="searchForm"
        label-width="80px"
        :inline="true"
        size="small"
      >
        <el-form-item label="角色名称">
          <el-input v-model="parms.roleName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" @click="searchBtn">查询</el-button>
          <el-button
            icon="el-icon-delete"
            style="color: #ff7670"
            @click="resetBtn"
            >重置</el-button
          >
          <el-button type="primary" icon="el-icon-plus" @click="addBtn"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 角色列表 -->
      <el-table :height="tableHeight" size="medium" :data="roleList" border stripe>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column align="center" width="200" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="small" @click="editRole(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteRole(scope.row)">删除</el-button>
            
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page.sync="parms.currentPage"
        :page-sizes="[5,10,15,20]"
        :page-size="parms.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="parms.total"
        background
      >
      </el-pagination>
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
            :model="addModule"
            ref="addForm"
            :rules="rules"
            label-width="80px"
            :inline="true"
            size="normal"
          >
            <el-form-item prop="roleName" label="角色名称">
              <el-input v-model="addModule.roleName"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="addModule.remark"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </sys-dialog>
    </el-main>
  </template>
  
  <script>
  import { getRoleListApi,addRoleApi,editRoleApi,deleteRoleApi } from "@/api/role";
  import SysDialog from "@/components/system/SysDialog";
  export default {
    //注册组件
    components: {
      SysDialog,
    },
    //所有需要在页面展示的数据，都要显示的在data里面进行定义
    data() {
      return {
        //表单验证规则
        rules:{
          roleName:[{
            required:true,
            trigger:'change',
            message:'请填写角色名称'
          }]
        },
        //新增或编辑数据绑定
        addModule:{
          roleId:'',
          roleName:'',
          remark:'',
          type:''
        },
        //弹框属性
        dialog: {
          title: "",
          height: 120,
          width: 610,
          visible: false,
        },
        //表格数据
        roleList: [],
        //表格的高度
        tableHeight: 0,
        //查询参数
        parms: {
          pageSize: 5, //每页显示几条数据
          currentPage: 1, //当前第几页
          roleName: "",
          total: 0, //总条数
        },
      };
    },
    created() {
      this.getRoleList();
    },
    mounted() {
      this.$nextTick(() => {
        this.tableHeight = window.innerHeight - 190;
      });
    },
    methods: {
      //删除按钮
      async deleteRole(row) {
      let confrim = await this.$myconfirm("确定删除该数据吗？");
      if (confrim) {
        let res = await deleteRoleApi({ roleId: row.roleId });
        if (res && res.code == 200) {
          //刷新列表
          this.getRoleList();
          this.$message.success(res.msg);
        }
      }
    },
      //编辑按钮
      editRole(row){
      //清空表单
      this.$resetForm("addForm", this.addModule);
      //设置为编辑
      this.addModule.type = "1";
      //设置弹框属性
      this.dialog.title = "编辑角色";
      this.$objCoppy(row, this.addModule);
      this.dialog.visible = true;
      },
      //新增或编辑取消事件
      onClose() {
        this.dialog.visible = false;
      },
      //新增或编辑确认事件
      onConfirm() {
        this.$refs.addForm.validate(async valid=>{
          if(valid){
            let res = null;
            if(this.addModule.type == '0'){
              res = await addRoleApi(this.addModule);
            }else {
            res = await editRoleApi(this.addModule);
          }
            if(res && res.code == 200){
              //刷新列表
              this.getRoleList();
              this.dialog.visible = false;
              this.$message.success(res.msg);
            }
          }
        })
      },
      //页数改变时触发
    currentChange(val) {
      this.parms.currentPage = val;
      this.getRoleList();
    },
    //页容量改变时触发
    sizeChange(val) {
      this.parms.pageSize = val;
      this.getRoleList();
    },
      //新增按钮
      addBtn() {
        //清空表单数据
        this.$resetForm('addForm',this.addModule);
        this.addModule.type = '0';
        this.dialog.title = "新增角色";
        this.dialog.visible = true;
      },
      //重置按钮
      resetBtn() {
        this.parms.roleName = '';
        this.getRoleList();
      },
      //搜索按钮
      searchBtn() {
        this.getRoleList();
      },
      //获取角色列表
      async getRoleList() {
        let res = await getRoleListApi(this.parms);
        console.log(res);
        if (res && res.code == 200) {
          this.roleList = res.data.records;
          this.parms.total = res.data.total;
        }
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  </style>