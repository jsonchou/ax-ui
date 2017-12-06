<template>
    <div :class="[cls+'-wrapper',visible?'on':'']">
        <div :class="cls">
            <div>
                {{msg}}
            </div>
        </div>
    </div>
</template>

<script>
    import baseMixin from '../../mixins/base'
    const prefix = "ax";

    export default {
        name: 'Toast',
        mixins: Object.values(baseMixin),
        props: {
            msg: {
                type: String,
                default: ''
            },
            visible: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                cls: `${prefix}-toast`,
            };
        },
        watch: {
            visible(val, oldVal) {
                let me = this;
                if (val) {
                    console.log(2)
                    setTimeout(() => {
                        console.log('done settimeout')
                        me.show = false;
                        me.msg = '';
                    }, 3000);
                }
            }
        },
        methods: {
            init() {
                let me = this;

            },

        },
        mounted() {
            let me = this;
            console.log('compoent-toast:', me)
            me.init();
        }
    }
</script>