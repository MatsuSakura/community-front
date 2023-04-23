<template>
  <el-main>
    <div class="dashboard-container">
      <el-table :height="tableHeight" :data="tableList" border stripe>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="内容" prop="noticeContent"></el-table-column>
        <el-table-column label="时间" prop="createTime"></el-table-column>
      </el-table>
      <!-- <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"> -->
      <div class="dashboard-text">name: {{ name }}<br></div>
      <!-- <el-button @click="rwBtn" type="success" plain>人文关怀事件的年龄段分析</el-button> -->
      <el-button @click="pieRwBtn" type="success" plain>人文关怀事件的年龄段分析</el-button>
      <el-button @click="piePersonNumBtn" type="success" plain>报修的处理率</el-button>
    </div>
    <!-- <rw-chart v-if="parms.rwvisible != false"/> -->
    <pie-chart v-if="parms.pievisible != false"/>
    <pie-chart v-if="parms.pnvisible != false"/>
  </el-main>
</template>

<script>
import { mapGetters } from 'vuex'
import { getListApi } from "@/api/notice";
import SysDialog from "@/components/system/SysDialog.vue";
import rwChart from "@/components/charts/renwenChart.vue";
import pieChart from '@/components/charts/pieChart.vue'
export default {
  components: {
    SysDialog,
    rwChart,
    pieChart
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
        total: 0,
        status: "",
        pnvisible:false,
        pievisible:false,
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
    pieRwBtn(){
      this.parms.pievisible = !this.parms.pievisible
    },
    piePersonNumBtn(){
      console.log("确定");
      this.parms.pnvisible = !this.parms.pnvisible
    },
    async getList() {
      let res = await getListApi(this.parms);
      if (res && res.code == 200) {
        //给表格赋值
        console.log(res);
        this.tableList = res.data.records;
        this.parms.total = res.data.total;
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
      this.tableHeight = 100;
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
