<template>
    <div class="template-index">
        <ax-toast :msg="toast.msg" :show="toast.show"></ax-toast>
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
                    show: false,
                },
                visible: false
            }
        },
        methods: {
            onToast(e) {
                let me = this;
                me.toast = Object.assign(me.toast, {
                    msg: 'hehe show',
                    show: true
                })
            }
        },
        mounted() {
            let me = this;
        }
    }
</script>