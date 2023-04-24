<template>
    <div>
        <div id="main" style="width: 1000px;height:600px;"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import SysDialog from "@/components/system/SysDialog.vue";
import { getChartListApi as getComList } from "@/api/userComplaint"
export default {
    components: {
        SysDialog,
    },

    data() {
        this.myChart = null;
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
            },
        };

    },
    created() {
        this.$nextTick(() => {

        });

    },
    methods: {
        getData() {
            getComList(this.parms).then((res) => {
                var item = res.data.records;
                setTimeout(() => {
                    this.myChart.setOption({
                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            top: '5%',
                            left: 'center',
                            selectedMode: false
                        },
                        series: [
                            {
                                name: 'Access From',
                                type: 'pie',
                                radius: ['40%', '70%'],
                                center: ['50%', '70%'],
                                // adjust the start angle
                                startAngle: 180,
                                label: {
                                    show: true,
                                    formatter(param) {
                                        // correct the percentage
                                        return param.name + ' (' + param.percent * 2 + '%)';
                                    }
                                },
                                data: res.data.records.map(i => ({ value: i.offerId, name: i.complaintContent }))
                            }
                        ]
                        // title: {
                        //     text: '人文关怀事件年龄段表',
                        //     // subtext: 'Fake Data',
                        //     left: 'center'
                        // },
                        // tooltip: {
                        //     trigger: 'item'
                        // },
                        // legend: {
                        //     orient: 'vertical',
                        //     left: 'left'
                        // },
                        // toolbox: {
                        //     show: true,
                        //     feature: {
                        //         mark: { show: true },
                        //     }
                        // },
                        // series: [{
                        //     name: '',
                        //     type: 'pie',
                        //     radius: [20, 200],
                        //     center: ['50%', '50%'],
                        //     roseType: 'area',
                        //     itemStyle: {
                        //         borderRadius: 8
                        //     },
                        //     data: res.data.records.map(i => ({ value: i.offerId, name: i.complaintContent }))
                        // }]
                    })
                }, 800)
            })
        }
    },
    computed: {

    },
    mounted() {
        this.myChart = echarts.init(document.getElementById('main'));
        this.getData();
    }
}
</script>

<style lang="scss" scoped></style>