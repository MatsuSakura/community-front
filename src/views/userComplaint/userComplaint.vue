<template>
  <el-main>
    <!-- 搜索框 -->
    <el-form :model="parms" ref="searchForm" label-width="80px" :inline="true" size="small">
      <el-form-item label="标题">
        <el-input v-model="parms.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="parms.complaintContent"></el-input>
      </el-form-item><br>
      <el-form-item label="处理状态">
        <el-select v-model="parms.status" placeholder="请选择">
          <el-option v-for="item in options1" label-width="80px" :key="item.value" :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="人文关怀">
        <el-select v-model="parms.isHelp" placeholder="请选择">
          <el-option v-for="item in options2" label-width="80px" :key="item.value" :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button icon="el-icon-search" @click="searchBtn">查询</el-button>
        <el-button style="color: #ff7670" @click="resetBtn" icon="el-icon-delete">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :height="tableHeight" :data="tableList" border stripe>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="内容" prop="complaintContent"></el-table-column>
      <el-table-column label="处理状态" prop="status">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == '1'" type="success" size="small">已处理</el-tag>
          <el-tag v-if="scope.row.status == '0'" type="danger" size="small">未处理</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="处理小结" prop="remark"></el-table-column>
      <el-table-column prop="isHelp" label="是否为人文关怀事件">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isHelp == '0'" type="danger" size="small">是</el-tag>
          <el-tag v-if="scope.row.isHelp == '1'" type="success" size="small">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="关怀群体" prop="offerId">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.offerId >= '60'" type="danger" size="small">老年人</el-tag>
          <el-tag v-else-if="scope.row.offerId <= 10" type="warning" size="small">儿童</el-tag>
          <el-tag v-else="scope.row.offerId >= '20'" type="success" size="small">中青年</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120" label="操作">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-delete" size="small" @click="doBtn(scope.row)">处理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="parms.currentPage"
      :page-sizes="[10, 20, 40, 80, 100]" :page-size="parms.pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="parms.total" background>
    </el-pagination>
    <!-- 新增弹框 -->
    <sys-dialog :title="addDialog.title" :height="addDialog.height" :width="addDialog.width" :visible="addDialog.visible"
      @onClose="onClose" @onConfirm="onConfirm">
      <template slot="content">
        <el-form :model="addModel" ref="addForm" :rules="rules" label-width="80px" :inline="false" size="small">
          <el-form-item prop="remark" label="处理小结">
            <el-input type="textarea" v-model="addModel.remark"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </sys-dialog>
  </el-main>
</template>

<script>
import { getListApi, addApi, editComApi, deleteApi } from "@/api/userComplaint";
import { getUserId } from "@/utils/auth";
import SysDialog from "@/components/system/SysDialog.vue";
export default {
  components: {
    SysDialog,
  },
  data() {
    return {
     
      options1: [{
        value: '0',
        label: '未处理'
      }, {
        value: '1',
        label: '已处理'
      },
      ],
      options2: [{
        value: '0',
        label: '是'
      }, {
        value: '1',
        label: '否'
      },
      ], 
      //表单验证规则
      rules: {
        remark: [
          {
            trigger: "change",
            required: true,
            message: "请填写建议小结",
          },
        ]

      },
      //新增投诉绑定对象
      addModel: {
        complaintId: "",
        userId: "",
        editType: "",
        title: "",
        complaintContent: "",
        isHelp: ""
      },
      //定义弹框属性
      addDialog: {
        title: "",
        height: 180,
        width: 650,
        visible: false,
      },
      //表格高度
      tableHeight: 0,
      //表格数据
      tableList: [],
      //列表查询参数
      parms: {
        currentPage: 1,
        pageSize: 10,
        title: "",
        complaintContent: "",
        total: 0,
        status: "",
        isHelp: "",
        offerId: "",
        offerGroup: ""
      },
    };
  },
  created() {
    this.getList();
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
          let res = await editComApi(this.addModel);
          if (res && res.code == 200) {
            //刷新表格
            this.getList();
            //信息提示
            this.$message.success(res.msg);
            this.addDialog.visible = false;
            this.getList();
            this.$message.success('处理成功!');
          }
        }
      });
    },
    //弹框关闭
    onClose() {
      this.addDialog.visible = false;
    },
    //处理按钮
    async doBtn(row) {
      if (row.status == '1') {
        this.$message.warning('该建议已经处理，不要重复处理!')
        return;
      }
      //清空表单
      this.$resetForm("addForm", this.addModel);
      //把当前要编辑的数据复制到表单数据域
      this.$objCoppy(row, this.addModel);
      //设置弹框属性
      this.addDialog.title = "编辑建议";
      this.addDialog.visible = true;
      this.addModel.status = row.status;
      this.addModel.status = "1";
      this.addModel.repairId = row.repairId;
    },

    //重置按钮
    resetBtn() {
      this.parms.title = "";
      this.parms.complaintContent = "";
      this.parms.status = "";
      this.parms.isHelp = "";
      this.getList();
    },
    //搜索按钮
    searchBtn() {
      this.getList();
    },
    //页数改变时触发
    currentChange(val) {
      this.parms.currentPage = val;
      this.getList();
    },
    //页容量改变时触发
    sizeChange(val) {
      this.parms.pageSize = val;
      this.getList();
    },

    //获取列表
    async getList() {
      let res = await getListApi(this.parms);
      if (res && res.code == 200) {
        console.log(res);
        //把返回的数据放到表格
        this.tableList = res.data.records;
        this.parms.total = res.data.total;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>