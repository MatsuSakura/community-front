<template>
    <el-main>
      <!-- 搜索 -->
      <el-form
        :model="parms"
        ref="searchParm"
        label-width="90px"
        :inline="true"
        size="small"
      >
        <el-form-item label="报修内容">
          <el-input v-model="parms.repairContent"></el-input>
        </el-form-item>
        <el-form-item label="处理状态">
          <el-select v-model="parms.status" placeholder="请选择">
        <el-option
        v-for="item in options"
        label-width="90px"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
        </el-select>
        </el-form-item>
      
        <el-form-item>
          <el-button icon="el-icon-search" @click="searchBtn">查询</el-button>
          <el-button style="color: #ff7670" @click="resetBtn" icon="el-icon-delete"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :height="tableHeight" :data="tableList" border stripe>
        <el-table-column label="报修内容" prop="repairContent"></el-table-column>
        <el-table-column label="报修地址" prop="repairAddress"></el-table-column>
        <el-table-column label="联系电话" prop="phone"></el-table-column>
        <el-table-column label="处理状态" prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == '1'" type="success" size="small"
              >已处理</el-tag
            >
            <el-tag v-if="scope.row.status == '0'" type="danger" size="small"
              >未处理</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="报修时间" prop="commitTime"></el-table-column>
        <el-table-column label="报修小结" prop="remark"></el-table-column>
        <el-table-column align="center" width="120" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="doBtn(scope.row)"
              >处理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增弹框 -->
      <sys-dialog
        :title="addDialog.title"
        :height="addDialog.height"
        :width="addDialog.width"
        :visible="addDialog.visible"
        @onClose="onClose"
        @onConfirm="onConfirm2"
      >
        <template slot="content">
          <el-form
            :model="addModel"
            ref="addForm"
            :rules="rules"
            label-width="80px"
            :inline="false"
            size="small"
          >
          
            <el-form-item prop="remark" label="维修小结">
              <el-input type="textarea" v-model="addModel.remark"></el-input>
            </el-form-item>
          </el-form>
        </template>
      </sys-dialog>
      <!-- 分页 -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page.sync="parms.currentPage"
        :page-sizes="[10, 20, 40, 80, 100]"
        :page-size="parms.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="parms.total"
        background
      >
      </el-pagination>
    </el-main>
  </template>
  
  <script>
  import { getListApi, editApi } from "@/api/repair";
  import { getUserId } from "@/utils/auth";
  import SysDialog from "@/components/system/SysDialog.vue";
  export default {
    components: {
      SysDialog,
    },
    data() {
      return {
        options: [{
          value: '0',
          label: '未处理'
        }, {
          value: '1',
          label: '已处理'
        },
      ],
        rules: {
          remark: [
            {
              trigger: "change",
              required: true,
              message: "请填写维修小结",
            },
          ]
        },
        //表格高度
        tableHeight: 0,
        //表格数据
        tableList: [],
        parms: {
          total: 0,
          currentPage: 1,
          pageSize: 10,
          userId: "",
          remark: "",
          repairContent:"",
          status:""
        },
        //表单数据域
        addModel: {
          editType: "",
          repairId: "",
          userId: "",
          phone: "",
          repairAddress: "",
          repairContent:"",
          remark: "",
          status:""
        },
        //弹框属性定义
        addDialog: {
          title: "",
          height: 200,
          width: 650,
          visible: false,
        },
      };
    },
    created() {
      this.getMyList();
    },
    mounted() {
      this.$nextTick(() => {
        this.tableHeight = window.innerHeight - 210;
      });
    },
    methods: {
      //弹框确认事件
      onConfirm() {
        this.$refs.addForm.validate(async (valid) => {
          if (valid) {
            //设置用户id
            this.addModel.userId = getUserId();
            let res = await editApi(this.addModel);
            if (res && res.code == 200) {
              //刷新表格
              this.getMyList();
              //信息提示
              this.$message.success(res.msg);
              this.addDialog.visible = false;
              this.getMyList();
            this.$message.success('处理成功!');
            }
          }
        });
      },
      onConfirm2() {
        this.$refs.addForm.validate(async (valid) => {
          if (valid) {
            let res = await editApi(this.addModel);
            if (res && res.code == 200) {
              //刷新表格
              this.getMyList();
              //信息提示
              this.$message.success(res.msg);
              this.addDialog.visible = false;
              this.getMyList();
            this.$message.success('处理成功!');
            }
          }
        });
      },
      //弹框关闭
      onClose() {
        this.addDialog.visible = false;
      },
      //页数改变时触发
      currentChange(val) {
        this.parms.currentPage = val;
        this.getMyList();
      },
      //页容量改变时触发
      sizeChange(val) {
        this.parms.pageSize = val;
        this.getMyList();
      },
      //处理
      async doBtn(row) {
        if(row.status =='1'){
           this.$message.warning('该维修已经处理，不要重复处理!')
           return;
        }
        //清空表单
        this.$resetForm("addForm", this.addModel);
        //把当前要编辑的数据复制到表单数据域
        this.$objCoppy(row, this.addModel);
        //设置弹框属性
        this.addDialog.title = "编辑维修";
        this.addDialog.visible = true;
        this.addModel.status="1";
        this.addModel.repairId=row.repairId;
        
      },
      //重置按钮
      resetBtn() {
        this.parms.repairContent = "";
        this.parms.status="";
        this.getMyList();
      },
      //搜索按钮
      searchBtn() {
        this.getMyList();
      },
      //获取列表
      async getMyList() {
        let res = await getListApi(this.parms);
        if (res && res.code == 200) {
          //表格数据赋值
          console.log(res);
          this.tableList = res.data.records;
        }
      },
    },
  };
  </script>
  
  <style lang="scss" scoped></style>