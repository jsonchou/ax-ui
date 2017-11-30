<template>
    <div :class="cls+'-wrapper'">
        <div :class="cls">
            <div class="clearfix" :class="cls+'-title'">
                <span class="l" @click="onCancel">{{cancel}}</span>
                <span class="r" @click="onConfirm">{{confirm}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import baseMixin from '../../mixins/base'
    const prefix = "ax";

    export default {
        mixins: Object.values(baseMixin),
        name: 'Picker',
        props: {

        },
        data() {
            return {
                cancel: '',
                confirm: '',
                source: [
                    [],
                    [],
                    []
                ],
                cls: `${prefix}-picker`,
                styles: {}
            };
        },
        methods: {
            init() {
                let me = this;
                me.cancel = me.t(prefix + '.picker.cancel')
                me.confirm = me.t(prefix + '.picker.confirm')
            },
            onCancel(e) {
                e.preventDefault();
                let me = this;
                me.$emit('cancel')
            },
            onConfirm(e) {
                e.preventDefault();
                let me = this;
                me.$emit('confirm', this.source)
            },
        },
        mounted() {
            let me = this;
            console.log('template-picker:', me)
            me.init();
        }
    }
</script>