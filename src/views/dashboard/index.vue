<template>
  <el-main>
    <div class="dashboard-container">
      <el-table :height="tableHeight" :data="tableList" border stripe>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="内容" prop="noticeContent"></el-table-column>
        <el-table-column label="时间" prop="createTime"></el-table-column>
      </el-table>
      <div class="dashboard-text">当前登录账号: {{ name }}<br></div>
      <el-button @click="RwBtn" type="success" plain>人文关怀事件的年龄段分析</el-button>
      <el-button @click="pieRepairBtn" type="success" plain>报修的处理率</el-button>
      <el-button @click="piePersonNumBtn" type="success" plain>人员年龄分布</el-button>
    </div>
    <!-- <pie-chart v-if="parms.pievisible != false"/> -->
    <rw-chart v-if="parms.rwvisible != false"/>
    <repair-chart v-if="parms.repairVisible != false"/>
    <person-num-chart v-if="parms.pnvisible != false"/>
  
  </el-main>
</template>

<script>
import { mapGetters } from 'vuex'
import { getLatestApi as getListApi } from "@/api/notice";
import SysDialog from "@/components/system/SysDialog.vue";
import rwChart from "@/components/charts/renwenChart.vue";
import pieChart from '@/components/charts/pieChart.vue'
import repairChart from '@/components/charts/pieRepairChart.vue'
import personNumChart from '@/components/charts/piePersonNumChart.vue'
export default {
  components: {
    SysDialog,
    rwChart,
    pieChart,
    repairChart,
    personNumChart
  },
  data() {
    return {
      count: [],
      //表格高度
      tableHeight: 0,
      //表格数据
      tableList: [],
      parms: {
        currentPage: 1,
        pageSize: 10,
        title: "",
        complaintContent: "",
        status: "",
        pnvisible:false,
        rwvisible:false,
        repairVisible:false,
        isHelp: "",
        offerId: "",
        offerGroup: ""
      },
    };
  },
  created() {
    this.$nextTick(() => {
      this.getList();
    });
  },
  methods: {
    RwBtn(){
      this.parms.rwvisible = !this.parms.rwvisible
    },
    pieRepairBtn(){
      this.parms.repairVisible = !this.parms.repairVisible
    },
    piePersonNumBtn(){
      this.parms.pnvisible = !this.parms.pnvisible
    },
    async getList() {
      let res = await getListApi(this.parms);
      if (res && res.code == 200) {
        //给表格赋值
        console.log(res);
        this.tableList = res.data;
      }
    },
  },

  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = 200;
    });
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
