<template>
    <transition :name="cls+'-ani-std'">
        <div :class="[cls]">
            <div :class="[cls+'-container',cls+'-'+icon,visible?'on':'',vertical?'vertical':'',opacity,]">
                <i v-show="icon" :class="['ax-icon-'+icon,icon==='loading'?iconPrefix='-spin':'']"></i>
                <div v-html="content"></div>
            </div>
            <tmp-mask :opacity="maskOpacity" :visible="axMaskVisible" ref="mask" @mask:close="axMaskClose"></tmp-mask>
        </div>
    </transition>
</template>

<script>
    const prefix = __prefix__;
    import baseMixin from '../../mixins/base'
    import tmpMask from '../Mask/index.vue'

    export default {
        name: `${prefix}Toast`,
        mixins: [baseMixin.std],
        components: {
            tmpMask
        },
        data() {
            return {
                cls: `${prefix}-toast`,
                content: '',
                opacity: 'transparent',
                icon: '',
                duration: 1600,
                visible: '',
                maskOpacity: 'transparent',
                closeOnClickMask: false,
                asc: false,
                onClose: null,
                vertical: false, //横向，水平
                //-------------------------------------
                axMaskVisible: false,
                axTimer: null, //
            };
        },
        computed: {
           
        },
        methods: {
            hide() {
                let me = this;
                me.axClose();
            },
            axMaskClose() {
                let me = this;
                if (me.closeOnClickMask) {
                    me.axClose();
                }
            },
            axClose() {
                let me = this;
                me.axDestory();
                me.axMaskVisible = false;
                me.onClose && me.onClose(me);
            },
            axStartTimer() {
                let me = this;
                if (me.duration) {
                    me.axTimer = setTimeout(() => {
                        me.axClose();
                    }, me.duration);
                }
            },
            axStartListener() {
                let me = this;
                document.addEventListener('keydown', me.axKeyClose);
            },
            axClearTimer() {
                let me = this;
                clearTimeout(me.axTimer);
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
                me.axClearTimer();
                me.$destroy(true);
                me.axClearListener();
                let pNode = me.$el.parentNode;
                pNode && pNode.removeChild(me.$el);
            },
            axInit() {
                let me = this;
                me.axStartTimer();
                me.axStartListener();
            },
        },
        mounted() {
            let me = this;
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