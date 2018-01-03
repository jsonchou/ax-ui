<template>
    <transition :name="cls+'-ani-std'">
        <div :class="[cls]">
            <div :class="[cls+'-container',cls+'-'+icon,visible?'on':'',vertical?'vertical':'',opacity,]">
                <i v-show="mapIcon" :class="['ax-icon-'+mapIcon,icon==='loading'?iconPrefix='-spin':'']"></i>
                <div v-html="content"></div>
            </div>
            <div v-show="mask" @click="axMaskClose" :class="['mask',maskOpacity]"></div>
        </div>
        <tmp-mask :opacity="maskOpacity" :visible="maskVisible" @mask-close='onMaskClose' ></tmp-mask>
    </transition>
</template>

<script>
    const prefix = __prefix__;
    import baseMixin from '../../mixins/base'
    import tmpMask from '../Mask/index.vue'

    const mapIcons = {
        info: 'info',
        warn: 'warning',
        error: 'error',
        success: 'success',
        loading: 'loading',
    }

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
                mask: true,
                maskOpacity: 'transparent',
                closeOnClickModal: false,
                asc: false,
                onClose: null,
                vertical: false, //横向，水平
                //-------------------------------------
                axTimer: null, //
            };
        },
        computed: {
            mapIcon() {
                let me = this;
                return mapIcons[me.icon] || ''
            }
        },
        methods: {
            hide() {
                let me = this;
                me.axClose();
            },
            axMaskClose() {
                let me = this;
                if (me.closeOnClickModal) {
                    me.axClose();
                }
            },
            axClose() {
                let me = this;
                me.axDestory();
                me.onClose && me.onClose(me);
                //me.$emit('close');
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
                me.mask = false;
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