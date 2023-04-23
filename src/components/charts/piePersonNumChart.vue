<template>
    <div>
        <div id="main" style="width: 1000px;height:600px;"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import SysDialog from "@/components/system/SysDialog.vue";
import { getListApi, getElderListApi, getChildrenListApi, getWorkerListApi } from "@/api/liveUser"
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
                ElderNum: "",
                WorkerNum: "",
                ChildNum: "",
                userNum: "",
            },
        };

    },
    created() {
        this.$nextTick(() => {
        });

    },
    methods: {
        getData() {
            getListApi(this.parms).then(async (res) => {
                this.userNum = res.data.total
                console.log("userNum:" + this.userNum);
            })
            getElderListApi(this.parms).then(async (res) => {
                this.parms.ElderNum = res.data.total
            })
            getChildrenListApi(this.parms).then(async (res) => {
                this.parms.ChildNum = res.data.total
            })
            getWorkerListApi(this.parms).then(async (res) => {
                this.parms.WorkerNum = res.data.total
            });
            setTimeout(() => {
                this.myChart.setOption({
                    title: {
                        text: '人员年龄分布',
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
                            // data: res.data.records.map(i => ({
                            //     value: i.status,
                            //     name: "已维修"
                            // }
                            // )),
                            data: [
                                { value: this.parms.ElderNum, name: '老年人数量' },
                                { value: this.parms.WorkerNum, name: '中青年数量' },
                                { value: this.parms.ChildNum, name: '学童数量' },
                            ],
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