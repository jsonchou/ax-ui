<template>
    <div :class="[cls+'-wrapper',show?'on':'']">
        <div :class="cls">
            <div>
                {{msg}}
            </div>
        </div>
    </div>
</template>

<style scoped>
    .ax-toast-wrapper {
        font-size: 2.8rem;
        position: fixed;
        left: 50%;
        top: 50%;
        color: #fff;
        background: rgba(0, 0, 0, .5);
        z-index: -1;
        transform: translate3d(-50%, -50%, 0);
        padding: 3rem 5rem;
        text-align: center;
        opacity: 0;
        border-radius: 1.5rem;
    }

    .ax-toast-wrapper.on {
        opacity: 1;
        z-index: 1000;
    }
</style>

<script>
    import baseMixin from '../../mixins/base'
    const prefix = "ax";

    export default {
        name: 'Toast',
        props: {
            msg: {
                type: String,
                default: ''
            },
            show: {
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
            show(val, oldVal) {
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
            console.log('template-toast:', me)
            me.init();
        }
    }
</script>