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
          <el-button icon="el-icon-search">查询</el-button>
          <el-button @click="addUser" type="primary" icon="el-icon-plus">新增</el-button>
        </el-form-item>
      </el-form>
      <!-- 员工表格 -->
      <el-table :height="tableHeight" :data="tableList" empty-text="暂无数据" border stripe>
        <el-table-column prop="userName" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="idCard" label="身份证"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="status" label="是否在职"></el-table-column>
        <el-table-column prop="isUsed" label="账户状态"></el-table-column>
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
        :current-page.sync="parms.curentPage"
        :page-sizes="[10, 20, 40, 80, 100]"
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

      </SysDialog>

    </el-main>
  </template>
  
  <script>
  import { getUserListApi } from "@/api/user";
  import SysDialog from "@/components/system/SysDialog"


  export default {
    //所有需要在页面上展示的数据，都需要显示的在data里面进行定义
    components:{
        //注册组件
        SysDialog
    },
    data() {
      return {
          dialog:{
              title:"",
              visible:false,
              height:300,
              width:710
          },
        //表格的高度
        tableHeight: 0,
        //搜索框数据绑定
        parms: {
          phone: "",
          userName: "",
          pageSize: 10,
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
        //对话框关闭
        onClose(){
            this.dialog.title="新增员工"
            this.dialog.visible=false
        },
        //新增员工按钮
        addUser(){
            this.dialog.title="新增员工"
            this.dialog.visible=true
        },
        onConfirm(){
            this.dialog.visible=false
        },
      //获取用户列表
      async getUserList() {
        let res = await getUserListApi(this.parms);
        if (res.code == 200) {
          this.tableList = res.data.records;
        }
        console.log(res);
      },
      //页容量改变的时候触发
      sizeChange(val) {
        console.log(val);
      },
      //页数改变的时候触发
      currentChange(val) {
        console.log(val);
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  </style>