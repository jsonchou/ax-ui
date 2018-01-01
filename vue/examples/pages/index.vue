<template>
    <div class="template-index">
        <input class="f26" type="button" @click="onToast" value="点击onToast" />
        <input class="f26" type="button" @click="onConfirm" value="点击onConfirm" />
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            onToast(e) {
                let me = this;
                me.$toast.success({
                    msg: '请填写您的手机号码',
                    onClose(comp) {
                        // console.log(comp)
                    },
                })
            },
            onConfirm(e) {
                let me = this;
                me.$confirm({
                    msg: '请填写您的手机号码',
                    duration: 1000000,
                    onClose(comp) {
                        // console.log(comp)
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