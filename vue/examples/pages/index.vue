<template>
    <div class="template-index p20">
        <input class="g10 block f26 mb20" type="button" @click="onToast" value="点击onToast" />
        <input class="g10 block f26 mb20" type="button" @click="onConfirm" value="点击onConfirm" />
        <input class="g10 block f26 mb20" type="button" @click="onMask" value="点击onMask" />
    </div>
</template>

<style>
    input {
        background: #12c287;
        color: #fff;
        font-size: 3rem;
        display: block;
        width: 100%;
        line-height: 2;
        border-radius: 1rem;
        margin-bottom: 1.5rem;
    }
</style>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            onMask(e) {
                let me = this;

                console.log('page me', me)

                me.$mask.show((mask) => {
                    me.$toast.info({
                        msg: 'mask show',
                        duration: 2000,
                        onClose() {
                            mask.hide();
                        },
                    })
                });


                setTimeout(() => {
                    me.$mask.hide((mask) => {
                        me.$toast.info({
                            msg: 'mask hide',
                            duration: 2000,
                        })
                    });
                }, 5000)

            },
            onToast(e) {
                let me = this;
                me.$toast.loading({
                    asc: true,
                    maskOpacity: 'dark',
                    msg: '载入中...',
                    duration: 2000000,
                    vertical: true,
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