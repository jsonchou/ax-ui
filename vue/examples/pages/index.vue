<template>
    <div class="template-index">
        <ax-picker></ax-picker>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                visible: false
            }
        },
        mounted() {
            let me = this;
            console.log('page index:', me)
        }
    }
</script>