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
                console.log(me.$toast({
                    msg: 'hehe',
                    duration: 10000000
                }))
            }
        },
        mounted() {
            let me = this;
            console.log('page-index:', me)
        }
    }
</script>