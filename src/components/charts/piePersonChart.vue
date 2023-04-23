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
            option: {
                legend: {
                    top: 'top'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        // dataView: { show: true, readOnly: false },
                        // restore: { show: true },
                        // saveAsImage: { show: false }
                    }
                },
                series: [
                    {
                        name: '人文关怀事件年龄段表',
                        type: 'pie',
                        radius: [20, 200],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 5
                        },
                        data: [
                            { value: '', name: '' }
                        ]
                    }
                ]
            }
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
                            title: {
                                text: '人文关怀事件年龄段表',
                                // subtext: 'Fake Data',
                                left: 'center'
                            },
                            tooltip: {
                                trigger: 'item'
                            },
                            legend: {
                                top: 'bottom'
                            },
                            toolbox: {
                                show: true,
                                feature: {
                                    mark: { show: true },
                                    // dataView: { show: true, readOnly: false },
                                    // restore: { show: true },
                                    // saveAsImage: { show: false }
                                }
                            },
                            series: [{
                                name: '',
                                type: 'pie',
                                radius: [20, 200],
                                center: ['50%', '50%'],
                                roseType: 'area',
                                itemStyle: {
                                    borderRadius: 8
                                },
                                data: res.data.records.map(i => ({ value: i.offerId, name: i.complaintContent }))
                            }]
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
        // setTimeout(() => {
        //     this.myChart.setOption(this.option);
        // }, 800)
    }
}
</script>

<style lang="scss" scoped></style>