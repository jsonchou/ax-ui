<template>
    <div class="template-index">

        <input class="g10 block f26 mb20" type="button" @click="onToast" value="点击onToast" />
        <input class="g10 block f26 mb20" type="button" @click="onConfirm" value="点击onConfirm" />
        <input class="g10 block f26 mb20" type="button" @click="onMask" value="点击onMask" />

        <h2 class="tc mb20">
            直营APP平台化H5接入规范
        </h2>

        <div>
            <button class="g10 block  f30 p20" @click="testBridge">DEMO：getZAToken</button>
        </div>

    </div>
</template>

<script>
    window.evtTest = function (data) {
        data = JSON.parse(data);
        if (data.status == '1') {
            alert(1)
        } else if (data.status == '0') {
            alert(0)
        }
    }

    export default {
        data() {
            return {

            }
        },
        methods: {
            testBridge() {
                let me = this;

                let paramsObj = {
                    functionName: "getZAToken",
                    parmas: {
                        "appKey": "test"
                    },
                    complete: "evtTest",
                }

                window.prompt(JSON.stringify(paramsObj))

            },
            onMask(e) {
                let me = this;
                me.$mask.show((mask) => {
                    me.$toast.info({
                        msg: 'mask show',
                        duration: 2000,
                        onClose() {
                            mask.hide();
                        }
                    })
                });
            },
            onToast(e) {
                let me = this;
                me.$toast.info({
                    asc: true,
                    closeOnClickModal: true,
                    msg: '请填写您的手机号码',
                    duration: 2000000,
                })
            },
            onConfirm(e) {
                let me = this;
                me.$confirm({
                    title: '提示2',
                    icon: 'loading',
                    confirmButtonIcon: 'warn',
                    msg: '请填写您的手机号码222',
                    onClose(comp) {
                        me.$toast('你关闭了弹窗')
                    },
                    onCancle(comp) {
                        me.$toast('你取消了操作')
                    },
                    onConfirm(comp) {
                        me.$toast('你的操作成功')
                    },
                })
            }
        },
        mounted() {
            let me = this;
            console.log('page-index:', me)
        }
    }
</script>