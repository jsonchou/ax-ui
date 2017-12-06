<template>
    <div class="template-index">
        <ax-toast :msg="toast.msg" :visible="toast.visible"></ax-toast>
        <input class="f26" type="button" @click="onToast" value="点击" />
    </div>
</template>

<style>
    .f26 {
        font-size: 2.6rem;
    }
</style>

<script>
    export default {
        data() {
            return {
                toast: {
                    msg: '',
                    visible: false,
                },
            }
        },
        methods: {
            onToast(e) {
                let me = this;
                me.toast = Object.assign({}, me.toast, {
                    msg: 'hehe show',
                    visible: true
                })
            }
        },
        mounted() {
            let me = this;
            console.log('page-index:', me)
        }
    }
</script>