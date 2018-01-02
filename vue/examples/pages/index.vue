<template>
    <div class="template-index">
        <input class="f26" type="button" @click="onToast" value="点击onToast" />
        <input class="f26" type="button" @click="onConfirm" value="点击onConfirm" />
        <input class="f26" type="button" @click="onMask" value="点击onMask" />
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            onMask(e) {
                let me = this;
                me.$mask.show((mask) => {
                    me.$toast({
                        duration: 3000,
                        msg: '3秒后mask关闭',
                        onClose(toast) {
                            mask.hide(() => {
                                toast.hide()
                            })
                        }
                    });

                });
            },
            onToast(e) {
                let me = this;
                me.$toast.info({
                    msg: '请填写您的手机号码',
                    duration: 2000,
                })
            },
            onConfirm(e) {
                let me = this;
                me.$confirm({
                    title: '提示',
                    msg: '请填写您的手机号码',
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