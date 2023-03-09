<template>
    <el-main>
      <!-- 搜索框 -->
      <el-form
        :model="parms"
        ref="searchform"
        label-width="80px"
        :inline="true"
        size="small"
      >
        <el-form-item label="姓名">
          <el-input v-model="parms.userName"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="parms.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchBtn" icon="el-icon-search">查询</el-button>
          <el-button @click="resetBtn" style="color:#FF7670;" icon="el-icon-delete">重置</el-button>
          <el-button @click="addUser" type="primary" icon="el-icon-plus">新增</el-button>
        </el-form-item>
      </el-form>
      <!-- 员工表格 -->
      <el-table :height="tableHeight" :data="tableList" empty-text="暂无数据" border stripe>
        <el-table-column prop="userName" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="idCard" label="身份证"></el-table-column>
        <el-table-column align="center" prop="sex" label="性别">
            <template slot-scope="scope">
                <el-tag v-if="scope.row.sex == '1'" size="normal">男</el-tag>
                <el-tag v-if="scope.row.sex == '0'" type="success" size="normal">女</el-tag>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="status" label="是否在职">
            <template slot-scope="scope">
          <el-switch
            :active-value="'0'"
            active-text="在职"
            inactive-text="离职"
            :inactive-value="'1'"
            v-model="scope.row.status"
            @change="changeStatus(scope.row)"
          ></el-switch>
        </template>
        </el-table-column>
        <el-table-column align="center" prop="isUsed" label="账户状态">
            <template slot-scope="scope">
            <el-switch
            :active-value="'0'"
            active-text="启用"
            inactive-text="禁用"
            :inactive-value="'1'"
            v-model="scope.row.isUsed"
            @change="changeUsed(scope.row)"
          ></el-switch>
        </template>
        </el-table-column>

        <el-table-column align="center" width="200" label="操作">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            type="primary"
            size="small"
            @click="editUser(scope.row)"
            >编辑</el-button
          >
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="small"
            @click="deleteUser(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>

      </el-table>
      <!-- 分页
        size-change 页容量改变时触发事件
        current-change 页数改变时触发
        :current-page.sync 当前页数
        :page-size 每页几条数据
        :total 总条数
    -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page.sync="parms.currentPage"
        :page-sizes="[5,10,15,20]"
        :page-size="parms.pageSize"
        layout="total,sizes,prev,pager,next,jumper"
        :total="parms.total"
        background
      >
      </el-pagination>
      <!-- 新增或编辑弹框 -->
      <SysDialog :title="dialog.title"
      :visible="dialog.visible"
      :height="dialog.height"
      :width="dialog.width"
      @onClose="onClose"
      @onConfirm="onConfirm"
      >
      <div slot="content">
        <el-form
          :model="addModel"
          ref="addForm"
          :rules="rules"
          label-width="80px"
          :inline="true"
          size="small"
        >
          <el-form-item prop="userName" label="姓名:">
            <el-input v-model="addModel.userName"></el-input>
          </el-form-item>
          <el-form-item style="width:280px;" prop="sex" label="性别:">
            <el-radio-group  v-model="addModel.sex">
              <el-radio :label="'1'">男</el-radio>
              <el-radio :label="'0'">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="phone" label="电话:">
            <el-input v-model="addModel.phone"></el-input>
          </el-form-item>
          <el-form-item prop="idCard"  label="身份证:">
            <el-input v-model="addModel.idCard"></el-input>
          </el-form-item>
          <el-form-item prop="loginName" label="登录名:">
            <el-input v-model="addModel.loginName"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码:">
            <el-input v-model="addModel.password"></el-input>
          </el-form-item>
          <el-form-item style="width:280px;" prop="status" label="离职:">
            <el-radio-group v-model="addModel.status">
              <el-radio :label="'1'">是</el-radio>
              <el-radio :label="'0'">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item style="width:280px;" prop="isUsed" label="启用:">
            <el-radio-group  v-model="addModel.isUsed">
              <el-radio :label="'0'">是</el-radio>
              <el-radio :label="'1'">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      </SysDialog>

    </el-main>
  </template>
  
  <script>
  import { getUserListApi,addUserApi,editUserApi,deleteUserApi } from "@/api/user";
  import SysDialog from "@/components/system/SysDialog"


  export default {
    //所有需要在页面上展示的数据，都需要显示的在data里面进行定义
    components:{
        //注册组件
        SysDialog
    },
    data() {
      return {
      //表单验证规则
      rules: {
        userName: [
          {
            required: true,
            trigger: "change",
            message: "请填写姓名",
          },
        ],
        phone: [
          {
            required: true,
            trigger: "change",
            message: "请填写电话号码",
          },
        ],
        idCard: [
          {
            required: true,
            trigger: "change",
            message: "请填写身份证号码",
          },
        ],
        status: [
          {
            required: true,
            trigger: "change",
            message: "请选择是否离职",
          },
        ],
        isUsed: [
          {
            required: true,
            trigger: "change",
            message: "请选择是否启用",
          },
        ],
            sex: [
          {
            required: true,
            trigger: "change",
            message: "请选择性别",
          },
        ]
      },
      //新增或编辑表单数据域
      addModel: {
        userId:'',
        type:'', //0： 新增 1： 编辑
        userName:'',
        sex:'',
        phone:'',
        idCard:'',
        loginName:'',
        password:'',
        status:'',
        isUsed:''
      },
          dialog:{
              title:"",
              visible:false,
              height:230,
              width:600
          },
        //表格的高度
        tableHeight: 0,
        //搜索框数据绑定
        parms: {
          phone: "",
          userName: "",
          pageSize: 5,
          currentPage: 1,
          total: 0,
        },
        //表格数据
        tableList: [],
      };
    },
    created() {
      this.getUserList();
    },
    mounted() {
      this.$nextTick(() => {
        this.tableHeight = window.innerHeight - 210;
      });
    },
    methods: {
      //重置按钮
    resetBtn(){
      this.parms.phone = '';
      this.parms.userName = '';
      this.getUserList();
    },
    //搜索按钮
    searchBtn(){
      this.getUserList();
    },
      //删除按钮
    async deleteUser(row) {
      let comfirm=await this.$myconfirm('确定删除该员工吗');
      console.log(comfirm);
      if(comfirm=true){
        let res=await deleteUserApi({userId:row.userId});
        if(res && res.code == 200){
          this.getUserList();
        }
      }
    },
    //编辑按钮
    editUser(row) {
      this.dialog.title="编辑员工"
      //清空表单数据
      this.$resetForm('addForm',this.addModel)
      //设为编辑
      this.addModel.type = '1';
      //编辑回显
      this.$objCoppy(row,this.addModel);
      //显示新增或编辑弹框
      this.dialog.visible = true;
      console.log(row);
    },
        //表格是否启用点击事件
    async changeUsed(row) {
      console.log(row);
      let parm = {
        userId: row.userId,
        isUsed: row.isUsed,
      };
      let res = await editUserApi(parm);
      if (res && res.code == 200) {
        //刷新列表
        this.getUserList();
        this.$message.success(res.msg);
      }
    },
    //表格是否离职点击事件
    async changeStatus(row) {
      console.log(row);
      let parm = {
        userId: row.userId,
        status: row.status,
      };
      let res = await editUserApi(parm);
      if (res && res.code == 200) {
        //刷新列表
        this.getUserList();
        this.$message.success(res.msg);
      }
    },
        //对话框关闭
        onClose(){
            this.dialog.title="新增员工"
            this.dialog.visible=false
        },
        //新增员工按钮
        addUser(){
          //清空表单数据
          this.$resetForm('addForm',this.addModel)
            this.addModel.type='0'
            this.dialog.title="新增员工"
            this.dialog.visible=true
        },
        onConfirm(){
            this.$refs.addForm.validate(async(valid)=>{
                if(valid){
                    let res=null;
                    if(this.addModel.type=='0'){
                        res=await addUserApi(this.addModel)
                    }else{
                        res = await editUserApi(this.addModel)
                    }
                    //成功，刷新数据列表
                    if (res && res.code == 200) {
                        this.getUserList();
                        this.dialog.visible = false;
                    }
                    console.log(res);
                    // this.dialog.visible=false
                }
            })
        },
      //获取用户列表
      async getUserList() {
        let res = await getUserListApi(this.parms);
        if (res.code == 200) {
          this.tableList = res.data.records;
          this.parms.total = res.data.total;
        }
        console.log(res);
      },
      //页容量改变触发
    sizeChange(val) {
      console.log(val)
      this.parms.pageSize = val;
      this.getUserList();
    },
    //页数改变时触发
    currentChange(val) {
      console.log(val)
      this.parms.curentPage = val;
      this.getUserList();
    },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  </style>