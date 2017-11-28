<template>
    <div class="template-picker">
        <slot>
            picker component
        </slot>
    </div>
</template>

<script>
    import baseMixin from '../../mixins/base'
    import config from '../../utils/config'
    const cls = `${config.prefix}-picker`;

    export default {
        mixins: [...baseMixin],
        name: 'Picker',
        props: {
            offsetTop: {
                type: Number,
                default: 0
            },
            offsetBottom: {
                type: Number
            }
        },
        data() {
            return {
                styles: {}
            };
        },
        mounted() {
            let me = this;
            console.log('VUE', window.Vue.prototype)
            console.log('template-picker:', me)
        }
    }
</script>