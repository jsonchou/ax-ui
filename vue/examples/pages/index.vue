<template>
    <div class="template-index p20">
        <input class="g10 block f26 mb20" type="button" @click="onToast" value="Toast" />
        <input class="g10 block f26 mb20" type="button" @click="onModal" value="Modal" />
        <input class="g10 block f26 mb20" type="button" @click="onMask" value="Mask" />
        <input class="g10 block f26 mb20" type="button" @click="onNotify" value="Notify" />
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

                let mask = me.$mask.show((mask) => {
                    me.$toast.info({
                        msg: 'mask show',
                        duration: 2000,
                        onHide() {
                            console.log('toast close')
                        },
                        onShow() {
                            console.log('toast show')
                        }
                    })
                });

                setTimeout(() => {
                    mask.hide();
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
            onModal(e) {
                let me = this;
                me.$modal({
                    title: '提示2',
                    icon: 'loading',
                    confirmButtonIcon: 'warn',
                    closable: true,
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
            },
            onNotify(e) {
                let me = this;
                let notify = me.$notify({
                    title: '',
                    duration: 4500000,
                    icon: 'success',
                    placement: 'right-top',
                    closable: false,
                    msg: '请填写您的手机号码222',
                    onHide(comp) {
                        me.$toast('你关闭了通知')
                    },
                    onShow(comp) {
                        //me.$toast('你打开了通知')
                    },
                });

                // setTimeout(() => {
                //     notify.hide();
                // }, 2000)
            }
        },
        mounted() {
            let me = this;
            console.log('page-index:', me)
        }
    }
</script>