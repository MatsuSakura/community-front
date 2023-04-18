<template>
  
  <div class="dashboard-container">
    <el-table :height="tableHeight" :data="tableList" border stripe>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="内容" prop="noticeContent"></el-table-column>
        <el-table-column label="时间" prop="createTime"></el-table-column>
  </el-table>
    <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80">
    <div class="dashboard-text">name: {{ name }}<br>
  </div><br>

  

    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from 'echarts'

import { getListApi} from "@/api/notice";
  import SysDialog from "@/components/system/SysDialog.vue";
  export default {
    components: {
      SysDialog,
    },
    data() {
      return {
        //表格高度
        tableHeight: 0,
        //表格数据
        tableList: [],
        parms: {
          currentPage: 1,
          pageSize: 10,
          title: "",
          total: 0,
        },
      };
    },
    created() {
      this.getlList();
    },
    methods: {
      //获取列表
      async getlList() {
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
    var myChart = echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
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
