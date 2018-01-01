<template>
    <div class="template-index">
        <input class="f26" type="button" @click="onToast" value="点击" />
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
            }
        },
        mounted() {
            let me = this;
            console.log('page-index:', me)
        }
    }
</script>