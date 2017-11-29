<template>
    <div :class="cls+'-wrapper'">
        <div :class="cls">
            {{picker}}
        </div>
    </div>
</template>

<script>
    import baseMixin from '../../mixins/base'

    export default {
        mixins: Object.values(baseMixin),
        name: 'Picker',
        props: {

        },
        data() {
            return {
                cls: `${this.$ax.config.prefix}-picker`,
                picker: '',
                styles: {}
            };
        },
        mounted() {
            let me = this;
            console.log('template-picker:', me)
            this.picker = me.t('picker.test')
        }
    }
</script>