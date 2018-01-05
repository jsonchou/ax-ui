<template>
    <transition :name="cls+'-ani-std'">
        <div :class="[cls,visible?'on':'',axVisible?'on':'',opacity]" :asc="asc" :visible="visible" :opacity="opacity" @click="axClick"></div>
    </transition>
</template>

<script>
    const prefix = __prefix__;
    import baseMixin from '../../mixins/base'
    import validator from '../../utils/validator'

    export default {
        name: `${prefix}Mask`,
        props: {
            opacity: {
                type: String,
                validator: validator(['normal', 'transparent', 'dark', 'light']),
                default: 'normal',
            },
            asc: {
                type: Boolean,
                default: false,
            },
            visible: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                cls: `${prefix}-mask`,
                onShow: '',
                onHide: '',
                //-------------------------------------
                axVisible: false,
            };
        },
        watch: {
            axVisible(nv, ov) {
                let me = this;
                if (!nv) {
                    me.axClose();
                }
            },
        },
        methods: {
            hide() {
                //after show
                let me = this;
                me.axClose();
            },
            axClick(e) {
                let me = this;
                me.$emit('mask:close', e);
            },
            axClose(e) {
                let me = this;
                me.axDestory();
                me.onHide && me.onHide(me);
            },
            axOpen() {
                let me = this;
                me.$emit('mask:open', me.$data);
                me.onShow && me.onShow(me);
            },
            axKeyClose(e) {
                let me = this;
                if (e.keyCode === 27 && me.visible && me.asc) {
                    me.axClose();
                }
            },
            axDestory() {
                let me = this;
                me.$destroy(true);
                let pNode = me.$el.parentNode;
                pNode && pNode.removeChild(me.$el);
            },
            axInit() {
                let me = this;
                if (me.axVisible) {
                    me.axOpen();
                }
            },
        },
        mounted() {
            let me = this;
            me.axInit();
        },
        beforeDestory() {
            let me = this;
            console.log('mask destory log')
        },
        destroyed() {
            console.log("mask destroyed") //prints destroyed
        }
    }
</script>

<!-- ax为内部事件 -->
<!-- 非ax为外部用户事件 -->