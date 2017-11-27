<template>
    <div class="template-wrap">
        <div id="app">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        vuex: {

        },
        components: {

        },
        computed: {
            
        },
        methods: {

        },
        created() {
            let me = this;
        },
        mounted() {
            let me = this;
        },
        updated() {
            let me = this;
        },
        beforeDestory() {
            let me = this;
        }
    };
</script>