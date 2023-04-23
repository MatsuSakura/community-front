<template>
    <div>
        <div id="main" style="width: 1000px;height:600px;"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import SysDialog from "@/components/system/SysDialog.vue";
import { getListApi } from "@/api/repair"
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
                status: ""
            },
            // option: {
            //     legend: {
            //         top: 'top'
            //     },
            //     toolbox: {
            //         show: true,
            //         feature: {
            //             mark: { show: true },
            //             // dataView: { show: true, readOnly: false },
            //             // restore: { show: true },
            //             // saveAsImage: { show: false }
            //         }
            //     },
            //     series: [
            //         {
            //             name: '人文关怀事件年龄段表',
            //             type: 'pie',
            //             radius: [20, 200],
            //             center: ['50%', '50%'],
            //             roseType: 'area',
            //             itemStyle: {
            //                 borderRadius: 5
            //             },
            //             data: [
            //                 { value: '', name: '' }
            //             ]
            //         }
            //     ]
            // }
        };

    },
    created() {
        this.$nextTick(() => {

        });

    },
    methods: {
        getData() {
            getListApi(this.parms).then((res) => {
                console.log(res);
                var item = res.data.records;
                setTimeout(() => {
                    // this.myChart.setOption({
                    //     title: {
                    //         text: '人文关怀事件年龄段表',
                    //         // subtext: 'Fake Data',
                    //         left: 'center'
                    //     },
                    //     tooltip: {
                    //         trigger: 'item'
                    //     },
                    //     legend: {
                    //         top: 'bottom'
                    //     },
                    //     toolbox: {
                    //         show: true,
                    //         feature: {
                    //             mark: { show: true },
                    //             // dataView: { show: true, readOnly: false },
                    //             // restore: { show: true },
                    //             // saveAsImage: { show: false }
                    //         }
                    //     },
                    //     series: [{
                    //         name: '',
                    //         type: 'pie',
                    //         radius: [20, 200],
                    //         center: ['50%', '50%'],
                    //         roseType: 'area',
                    //         itemStyle: {
                    //             borderRadius: 8
                    //         },
                    //         data: res.data.records.map(i => ({ value: i.offerId, name: i.complaintContent }))
                    //     }]
                    // })
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
                            left: 'left'
                        },
                        series: [
                            {
                                name: 'Access From',
                                type: 'pie',
                                radius: '50%',
                                data: res.data.records.map(i => ({
                                     value: i.status, 
                                     name: "已维修"
                                    }
                                    )),
                                // data: [
                                //     { value: 1048, name: 'Search Engine' },
                                //     { value: 735, name: 'Direct' },
                                //     { value: 580, name: 'Email' },
                                //     { value: 484, name: 'Union Ads' },
                                //     { value: 300, name: 'Video Ads' }
                                // ],
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