<template>
    <div>
        <div id="main" style="width: 1000px;height:600px;"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import SysDialog from "@/components/system/SysDialog.vue";
import { getListApi, getRepairedListApi } from "@/api/repair"
export default {
    components: {
        SysDialog,
    },
    data() {
        this.myChart = null;
        return {
            parms: {
                total: 0,
                currentPage: 1,
                pageSize: 10,
                userId: "",
                remark: "",
                repairContent: "",
                status: "",
                repairedNum: "",
            },
        };

    },
    created() {
        this.$nextTick(() => {

        });

    },
    methods: {
        getChart() {
            getRepairedListApi(this.parms).then(async (res) => {
                this.parms.repairedNum = res.data.total
            })
            getListApi(this.parms).then(async (res) => {
                console.log(res);
                var tmp = parseInt(res.data.total) - parseInt(this.parms.repairedNum);
                setTimeout(() => {
                    this.myChart.setOption({
                        title: {
                            text: '报修的处理率',
                            left: 'center'
                        },
                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                        },
                        series: [
                            {
                                name: 'Access From',
                                type: 'pie',
                                radius: '50%',
                                data: [
                                    { value: this.parms.repairedNum, name: '已处理' },
                                    { value: tmp, name: '未处理' },
                                ],
                                label: {
                                    show: true,
                                    formatter(param) {
                                        return param.name + ' (' + param.percent + '%)';
                                    }
                                },
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    })
                }, 100)
            })
        }
    },
    computed: {

    },
    mounted() {
        this.myChart = echarts.init(document.getElementById('main'));
        this.getChart();
    }
}
</script>

<style lang="scss" scoped></style>