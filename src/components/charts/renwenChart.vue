<template>
    <div>
        <div id="main" style="width: 1000px;height:400px;"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import SysDialog from "@/components/system/SysDialog.vue";
import { getListApi as getComList } from "@/api/userComplaint"
export default {
    components: {
        SysDialog,
    },

    data() {
        this.myChart = null
        return {
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
            option: {
                title: {
                    text: '人文关怀事件的年龄段分析'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['年龄']
                },
                xAxis: {
                    data: []
                },
                yAxis: [{
                    type: 'value',
                    name: '年龄段',
                }],
                series: [
                    {
                        name: '年龄段',
                        type: 'line',
                        data: []
                    }
                ]
            },
        };

    },
    created() {
        this.$nextTick(() => {
            // this.getData()
        });

    },
    methods: {
        getData() {
            getComList(this.parms).then((res) => {
                for (var i = 0; i < res.data.records.length; i++) {
                    console.log(res.data.records);
                    var item = res.data.records[i];
                    console.log(item.complaintContent);
                    if (item.complaintContent != null && item.offerId != null) {
                        this.option.xAxis.data.push(item.complaintContent);
                        this.option.series[0].data.push(item.offerId);
                    }
                }
            })
        }
    },
    computed: {

    },
    mounted() {
        this.myChart = echarts.init(document.getElementById('main'));
        this.getData();
        setTimeout(() => {
            this.myChart.setOption(this.option);
        }, 500)
    }
}
</script>

<style lang="scss" scoped></style>