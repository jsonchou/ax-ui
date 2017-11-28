<template>
    <div class="template-picker" :class="cls">
        <slot>
            {{picker}}
        </slot>
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
                picker: '',
                cls: `${this.$ax.config.prefix}-picker`,
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