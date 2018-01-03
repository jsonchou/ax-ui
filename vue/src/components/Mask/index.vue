<template>
    <transition :name="cls+'-ani-std'">
        <div :class="[cls,visible?'on':'',opacity]" :opacity="opacity" @click="axClose"></div>
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
                validator: validator(['transparent', 'dark', 'light']),
                default: 'transparent',
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
                visible: '',
                onShow: null,
                onHide: null,
                //-------------------------------------
                axTimer: null, //
            };
        },
        methods: {
            hide() {
                let me = this;
                me.axClose();
            },
            axClose() {
                let me = this;
                me.$emit('mask-close', event);
                me.axDestory();
                me.onHide && me.onHide(me);
                //me.$emit('close');
            },
            axStartListener() {
                let me = this;
                document.addEventListener('keydown', me.axKeyClose);
            },
            axClearListener() {
                let me = this;
                document.removeEventListener('keydown', me.axKeyClose);
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
                me.axClearListener();
                let pNode = me.$el.parentNode;
                pNode && pNode.removeChild(me.$el);
            },
            axInit() {
                let me = this;
                me.axStartListener();
                me.onShow && me.onShow(me);
            },
        },
        mounted() {
            let me = this;
            console.log('test config', me)
            me.axInit();
        },
        beforeDestory() {
            let me = this;
            me.axDestory();
        }
    }
</script>

<!-- ax为内部事件 -->
<!-- 非ax为外部用户事件 -->