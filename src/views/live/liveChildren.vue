<template>
    <el-main>
      <!-- 搜索框 -->
      <el-form
        :model="parms"
        ref="searchForm"
        label-width="80px"
        :inline="true"
        size="small"
      >
        <el-form-item label="姓名">
          <el-input v-model="parms.loginName"></el-input>
        </el-form-item>
        <el-form-item label="家长电话">
          <el-input v-model="parms.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" @click="searchBtn">查询</el-button>
          <el-button style="color: #ff7670" icon="el-icon-delete" @click="resetBtn">重置</el-button>
          <el-button icon="el-icon-plus" type="primary" @click="addBtn">新增</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :height="tableHeight" :data="tableList" border stripe>
        <el-table-column prop="loginName" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <el-tag type="success" size="normal" v-if="scope.row.sex == '0'">男</el-tag>
            <el-tag type="danger" size="normal" v-if="scope.row.sex == '1'">女</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="birthday" label="出生年月"></el-table-column>
        <el-table-column prop="phone" label="家长电话"></el-table-column>
        <el-table-column prop="school" label="就读学校"></el-table-column>
        <el-table-column prop="healthProblem" label="身体情况"></el-table-column>
        <el-table-column align="center" width="500" label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="editBtn(scope.row)"
              >编辑</el-button
            >
            <el-button  size="small" @click="assignHelp(scope.row)"
              >人文关怀</el-button
            >
            <el-button type="danger" size="small" @click="deleteBtn(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page.sync="parms.currentPage"
        :page-sizes="[5,10,15,20,30]"
        :page-size="parms.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="parms.total"
        background
      >
      </el-pagination>
  
      <!-- 弹框 -->
      <sys-dialog
        :title="addDialog.title"
        :height="addDialog.height"
        :width="addDialog.width"
        :visible="addDialog.visible"
        @onClose="onClose"
        @onConfirm="onConfirm"
      >
        <template slot="content">
          <el-form
            :model="addModel"
            ref="addForm"
            :rules="rules"
            label-width="80px"
            :inline="true"
            size="small"
          >
            <el-form-item prop="loginName" label="姓名">
              <el-input v-model="addModel.loginName"></el-input>
            </el-form-item>
            <el-form-item prop="sex" label="性别">
              <el-radio-group v-model="addModel.sex">
                <el-radio :label="'0'">男</el-radio>
                <el-radio :label="'1'">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="birthday" label="出生年月">
              <el-date-picker
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="addModel.birthday"
                type="date"
                placeholder="选择月份"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="phone" label="家长电话">
            <el-input v-model="addModel.phone"></el-input>
          </el-form-item><br>
          <el-form-item prop="phone" label="就读学校">
            <el-input v-model="addModel.school"></el-input>
          </el-form-item>
            <el-form-item prop="username" label="账户">
            <el-input v-model="addModel.username"></el-input>
          </el-form-item>
          <el-form-item v-if="addModel.editType != '1'" prop="password" label="密码">
            <el-input v-model="addModel.password"></el-input>
          </el-form-item>
            <el-form-item prop="status" label="状态">
              <el-radio-group v-model="addModel.status">
                <el-radio :label="'0'">启用</el-radio>
                <el-radio :label="'1'">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="ChildrenHealth" label="身体情况">
            <el-input v-model="addModel.healthProblem"></el-input>
          </el-form-item>
          </el-form>
        </template>
      </sys-dialog>
      <!-- 分配房屋 -->
      <sys-dialog
        :title="assignHouseDialog.title"
        :height="assignHouseDialog.height"
        :width="assignHouseDialog.width"
        :visible="assignHouseDialog.visible"
        @onClose="assignHoseClose"
        @onConfirm="assignHoseConfirm"
      >
        <template slot="content">
          <el-main style="padding: 0px">
            <!-- 搜索框 -->
            <el-form
              :model="houseParms"
              ref="assignHoseForm"
              label-width="70px"
              :inline="true"
              size="small"
            >
              <el-form-item label="楼栋名称">
                <el-input
                  placeholder="请输入楼栋名称"
                  v-model="houseParms.buildNme"
                ></el-input>
              </el-form-item>
              <el-form-item label="单元名称">
                <el-input
                  placeholder="请输入单元名称"
                  v-model="houseParms.unitName"
                ></el-input>
              </el-form-item>
              <el-form-item label="房屋编号">
                <el-input
                  placeholder="请输入房屋编号"
                  v-model="houseParms.houseNum"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-search" @click="assignHouseSearchBtn"
                  >查询</el-button
                >
                <el-button icon="el-icon-delete" @click="assignHouseResetBtn"
                  >重置</el-button
                >
              </el-form-item>
            </el-form>
            <!-- 表格 -->
            <el-table :height="assignTableHeight" :data="houseList" border stripe>
              <el-table-column width="50" align="center" label="选择">
                <template slot-scope="scope">
                  <el-radio
                    v-model="assignHoseParm.houseId"
                    :label="scope.row.houseId"
                    @change="getCurrentRow(scope.row)"
                  >
                    {{ "" }}
                  </el-radio>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="name"
                label="楼栋名称"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="unitName"
                label="单元名称"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="houseNum"
                label="房屋编号"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="houseArea"
                label="使用面积"
              ></el-table-column>
              <el-table-column align="center" prop="status" label="分配状态">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.status == '0'" type="danger" size="small"
                    >未分配</el-tag
                  >
                  <el-tag v-if="scope.row.status == '1'" type="success" size="small"
                    >已分配</el-tag
                  >
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
              @size-change="assignHouseSize"
              @current-change="assignHouseChange"
              :current-page.sync="houseParms.currentPage"
              :page-sizes="[5,10,15,20,30]"
              :page-size="houseParms.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="houseParms.total"
              background
            >
            </el-pagination>
          </el-main>
        </template>
      </sys-dialog>
      <!-- 新增弹框 -->
      <sys-dialog
        :title="HelpDialog.title"
        :height="HelpDialog.height"
        :width="HelpDialog.width"
        :visible="HelpDialog.visible"
        @onClose="HelpClose"
        @onConfirm="HelpConfirm"
      >
        <template slot="content">
          <el-form
            :model="addModel"
            ref="addForm"
            :rules="rules"
            label-width="100px"
            :inline="false"
            size="small"
          >
            <el-form-item prop="title" label="标题">
              <el-input v-model="addModel.title"></el-input>
            </el-form-item>
            <el-form-item prop="complaintContent" label="建议内容">
              <el-input type="textarea" v-model="addModel.complaintContent"></el-input>
            </el-form-item>
            <!-- <el-form-item prop="isHelp" label="是否为人文关怀事件">
              <el-radio-group v-model="addModel.isHelp">
                <el-radio>是</el-radio>
                <el-radio :disabled ="addModel.editType == 0">否</el-radio>
              </el-radio-group>
            </el-form-item> -->
          </el-form>
        </template>
      </sys-dialog>
      
    </el-main>
  </template>
  
  <script>
  import { editComApi, addHelpApi } from "@/api/userComplaint";
  import { getUserId } from "@/utils/auth";
  import SysDialog from "@/components/system/SysDialog.vue";
  import {
    getRoleListApi,
    addApi,
    getChildrenListApi,
    getUserByIdApi,
    editApi,
    getHouseListApi,
    assignSaveApi,
    returnHouseApi,
    deleteUserApi,
  } from "@/api/liveUser";
  export default {
    components: { SysDialog },
    data() {
      return {
        //分配房屋列表高度
        assignTableHeight: 0,
        //分配房屋提交的数据
        assignHoseParm: {
          houseId: "",
          userId: "",
        },
        //分配房屋弹框属性
        assignHouseDialog: {
          title: "",
          height: 400,
          width: 1050,
          visible: false,
        },
        HelpDialog: {
          title: "",
          height: 250,
          width: 650,
          visible: false,
        },
        //房屋数据域
        houseList: [],
        //获取房屋列表的参数
        houseParms: {
          buildNme: "",
          status: "0",
          unitName: "",
          houseNum: "",
          currentPage: 1,
          pageSize: 10,
          total: 0,
        },
        offerId:"",
        //表格的高度
        tableHeight: 0,
        //业主列表
        tableList: [],
        //角色列表
        roleList: [],
        //表单绑定数据源
        addModel: {
          birthday:"",
          editType: "",
          userId: "",
          username: "",
          school:"",
          phone: "",
          sex: "",
          status: "",
          roleId: "",
          loginName: "",
          password: "",
          healthProblem:"",
          healthStatus:"",
          offerId:""
        },
        //表单验证规则
        rules: {
          title: [
            {
              trigger: "change",
              required: true,
              message: "请填写标题",
            },
          ],
          complaintContent: [
            {
              trigger: "change",
              required: true,
              message: "请填写建议内容",
            },
          ],
          username: [
          {
            trigger: "change",
            required: true,
            message: "请填写登录名",
          },
        ],
        birthday: [
          {
            trigger: "change",
            required: true,
            message: "请填写出生年月",
          },
        ],
        password: [
          {
            trigger: "change",
            required: true,
            message: "请填写登录密码",
          },
        ],
          loginName: [
            {
              trigger: "change",
              required: true,
              message: "请填写姓名",
            },
          ],
          phone: [
            {
              trigger: "change",
              required: true,
              message: "请填写电话",
            },
          ],
          sex: [
            {
              trigger: "change",
              required: true,
              message: "请选择性别",
            },
          ],
          status: [
            {
              trigger: "change",
              required: true,
              message: "请选择用户状态",
            },
          ],
          healthStatus:[
          {
              trigger: "change",
              required: true,
              message: "请选择陪护状态",
            },
          ],
          roleId: [
            {
              trigger: "change",
              required: true,
              message: "请选择用户角色",
            },
          ],
        },
        //弹框属性
        addDialog: {
          title: "",
          height: 300,
          width: 640,
          visible: false,
          
        },
        //参数
        parms: {
          loginName: "",
          phone: "",
          currentPage: 1,
          pageSize: 10,
          total: 0,
        },
      };
    },
    created() {
      this.getRoleList();
      this.getList();
    },
    mounted() {
      this.$nextTick(() => {
        this.tableHeight = window.innerHeight - 210;
        this.assignTableHeight = window.innerHeight - 440;
      });
    },
    methods: {
      HelpConfirm(){
        this.$refs.addForm.validate(async (valid) => {
          if (valid) {
            this.addModel.userId = getUserId();
            var date=new Date(this.offerId)
            var date2=new Date()
            var year=date.getFullYear()
            var today=date2.getFullYear()
            var age=today-year
            this.addModel.offerId=age
            let res = null;
            res = await addHelpApi(this.addModel);
            if (res && res.code == 200) {
              //刷新列表
              this.getList();
              this.$message.success(res.msg);
              this.HelpDialog.visible = false;
            }
          }
        });
      },
      HelpClose(){
        this.HelpDialog.visible=false
      },
        async assignHelp(row){
          //清空表单
          this.$resetForm("addForm", this.addModel);
          this.HelpDialog.visible=true
          this.HelpDialog.title="添加人文事件"
          this.addModel.editType="0"
          this.addModel.status="0"
          let res = await getUserByIdApi({ userId: row.userId });
          console.log(res.data.birthday);
          this.offerId=res.data.birthday

        },
      //重置按钮
      resetBtn() {
        this.parms.loginName = "";
        this.parms.phone = "";
        this.getList();
      },
      //查询按钮
      searchBtn() {
        this.getList();
      },
      //分配房屋列表页数改变
      assignHouseChange(val) {
        this.houseParms.currentPage = val;
        this.getAssignHoseList();
      },
      //分配房屋列表页容量改变事件
      assignHouseSize(val) {
        this.houseParms.pageSize = val;
        this.getAssignHoseList();
      },
      //分配房屋列表搜索事件
      assignHouseSearchBtn() {
        this.getAssignHoseList();
      },
      //分配房屋列表重置事件
      assignHouseResetBtn() {
        //清空搜索框数据
        this.houseParms.buildNme = "";
        this.houseParms.unitName = "";
        this.houseParms.houseNum = "";
        this.getAssignHoseList();
      },
      //房屋选择事件
      getCurrentRow(row) {
        console.log(row);
        this.assignHoseParm.houseId = row.houseId;
        console.log(this.assignHoseParm);
      },
      // 分配房屋关闭事件
      assignHoseClose() {
        this.assignHouseDialog.visible = false;
      },
      //分配房屋确认事件
      async assignHoseConfirm() {
        if (!this.assignHoseParm.houseId) {
          this.$message.warning("请选择要分配的房屋!");
          return;
        }
        //数据提交
        let res = await assignSaveApi(this.assignHoseParm);
        if (res && res.code == 200) {
          //刷新列表
          this.getList();
          this.assignHouseDialog.visible = false;
          this.$message.success(res.msg);
        }
      },
      //编辑业主
      async editBtn(row) {
        //清空表单
        this.$resetForm("addForm", this.addModel);
        this.addModel.editType = "1";
        //获取编辑的数据
        let res = await getUserByIdApi({ userId: row.userId });
        if (res && res.code == 200) {
          console.log(res);
          if (res.data) {
            this.$objCoppy(res.data, this.addModel);
            this.$objCoppy(res.data, this.addModel2);
          }
        }
        //设置编辑属性
        this.addModel.editType = "1";

        //设置弹框属性
        this.addDialog.title = "编辑信息";
        this.addDialog.visible = true;
        console.log(this.addModel);
      },
      //删除业主
    async deleteBtn(row) {
      console.log(row);
      let confrim = await this.$myconfirm("确定删除该数据吗?");
      if (confrim) {
        let res = await deleteUserApi({
          userId: row.userId,
          houseId: row.houseId,
        });
        if (res && res.code == 200) {
          //刷新列表
          this.getList();
          //信息提示
          this.$message.success(res.msg);
        }
      }
    },
      //退房
      async leaveHose(row) {
        console.log(row);
        // if (!row.useStatus) {
        //   this.$message.warning("该租户暂时无可退的房屋!");
        //   return;
        // }
        let confirm = await this.$myconfirm("确定退房吗？");
        if (confirm) {
          let res = await returnHouseApi({
            userId: row.userId,
            houseId: row.houseId,
          });
          if (res && res.code == 200) {
            //刷新列表
            this.getList();
            //信息提示
            this.$message.success(res.msg);
          }
        }
      },
      //分配房屋
      async assignHose(row) {
        console.log(row);
        if (row.houseNum) {
          this.$message.warning("已经分配房屋，不能重复分配!");
          return;
        }
        //清空搜索框数据
        this.houseParms.buildNme = "";
        this.houseParms.unitName = "";
        this.houseParms.houseNum = "";
        this.assignHoseParm.houseId = "";
        this.assignHoseParm.userId = "";
        //获取未分配的房屋列表
        this.getAssignHoseList();
        //弹框属性设置
        this.assignHouseDialog.title = "为【" + row.userName + "】分配房屋";
        this.assignHouseDialog.visible = true;
        //设置分配人
        this.assignHoseParm.userId = row.userId;
      },
      async getAssignHoseList() {
        let res = await getHouseListApi(this.houseParms);
        if (res && res.code == 200) {
          //把返回的数据放到接收房屋的数据域里面
          console.log(res);
          this.houseList = res.data.records;
          this.houseParms.total = res.data.total;
        }
      },
      //页数改变时触发
      currentChange(val) {
        this.parms.currentPage = val;
        this.getList();
      },
      //页容量改变触发
      sizeChange(val) {
        this.parms.pageSize = val;
        this.getList();
      },
      //获取角色列表
      async getRoleList() {
        let res = await getRoleListApi();
        if (res && res.code == 200) {
          console.log("角色列表");
          console.log(res);
          this.roleList = res.data;
        }
      },
      //弹框关闭
      onClose() {
        this.addDialog.visible = false;
      },
      //弹框确认
      onConfirm() {
        this.$refs.addForm.validate(async (valid) => {
          if (valid) {
            let res = null;
            if (this.addModel.editType == "0") {
              res = await addApi(this.addModel);
            } else {
              res = await editApi(this.addModel);
            }
            if (res && res.code == 200) {
              //刷新列表
              this.getList();
              this.addDialog.visible = false;
              this.$message.success(res.msg);
            }
          }
        });
      },
      //获取业主列表
      async getList() {
        let res = await getChildrenListApi(this.parms);
        if (res && res.code == 200) {
          console.log(res);
          this.tableList = res.data.records;
          this.parms.total = res.data.total;
        }
        console.log("学童列表");
        console.log(res);
      },
      //新增按钮
      addBtn() {
        //清空表单
        this.$resetForm("addForm", this.addModel);
        //设置编辑属性
        this.addModel.editType = "0";
        //设置弹框属性
        this.addDialog.title = "新增学童";
        this.addDialog.visible = true;
      },
    },
  };
  </script>
  
  <style lang="scss" scoped></style>