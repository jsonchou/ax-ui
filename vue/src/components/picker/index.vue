<template>
    <div :class="cls+'-wrapper'">
        <div :class="cls">
            <div class="clearfix" :class="cls+'-tit'">
                <span class="l" @click="onCancel">{{cancel}}</span>
                <span class="r" @click="onConfirm">{{confirm}}</span>
            </div>
            <div class="clearfix" :class="cls+'-cnt'">
                <div :class="cls+'-cnt-box'">
                    <div class="item">
                        <div class="ul">
                            <li v-for="(item,index) in source">{{item}}</li>
                        </div>
                    </div>
                </div>
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
                source: ['北京', '上海', '深圳'],
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