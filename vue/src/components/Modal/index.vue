<template>
    <transition :name="cls+'-ani-std'">
        <div :class="[cls+'-container',visible?'on':'']">
            <div :class="[cls+'-inner']">
                <div :class="[cls+'-box',icon? cls+'-'+icon:cls+'-primary']">
                    <button type="button" class="close" @click="axClose" v-show="closable">
                        <i :class="[iconPrefix+ '-close']"></i>
                    </button>
                    <div class="title" v-html="title" v-show="title"></div>
                    <div class="content">
                        <i v-show="icon" :class="[iconPrefix+'-'+icon,icon=='loading'?iconPrefix+'-spin':'']"></i>
                        <div class="message" v-html="content"></div>
                    </div>
                </div>
                <div :class="[cls+'-control']">
                    <tmp-button ref="cancel" :icon="cancelButtonIcon" @click="axCancle" v-show="showCancelButton" :class="[cancelButtonClass]">{{cancelButtonText}}</tmp-button>
                    <tmp-button theme="primary" :icon="confirmButtonIcon" ref="confirm" @click="axConfirm" v-show="showConfirmButton" :class="[confirmButtonClass]">{{confirmButtonText}}</tmp-button>
                </div>
            </div>

            <tmp-mask :opacity="maskOpacity" :visible="axMaskVisible" ref="mask" @mask:close="axMaskClose"></tmp-mask>

        </div>
    </transition>
</template>

<script>
    const prefix = __prefix__;
    import validator from '../../utils/validator'
    import baseMixin from '../../mixins/base'
    import tmpButton from '../Button/index.vue'
    import tmpMask from '../Mask/index.vue'

    export default {
        name: `${prefix}Modal`,
        mixins: [baseMixin.std],
        components: {
            tmpButton,
            tmpMask
        },
        data() {
            return {
                cls: `${prefix}-modal`,
                title: '提示',
                content: '',
                icon: '',
                visible: false,

                closable: false,

                confirmButtonText: '确定',
                cancelButtonText: '取消',

                showCancelButton: true,
                showConfirmButton: true,

                cancelButtonClass: '',
                confirmButtonClass: '',

                cancelButtonIcon: '',
                confirmButtonIcon: '',

                maskOpacity: 'dark',
                closeOnClickMask: true,

                esc: true,

                onClose: null,
                onCancle: null,
                onConfirm: null,
                //-------------------------------------
                axMaskVisible: false,
            };
        },
        watch: {

        },
        computed: {

        },
        methods: {
            axMaskClose() {
                let me = this;
                if (me.closeOnClickMask) {
                    me.axClose();
                }
            },
            axClose() {
                let me = this;
                me.axDestory();
                me.onClose && me.onClose(me);
            },
            axCancle() {
                let me = this;
                me.axDestory();
                me.onCancle && me.onCancle(me);
            },
            axConfirm() {
                let me = this;
                me.axDestory();
                me.onConfirm && me.onConfirm(me);
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
                if (e.keyCode === 27 && me.visible && me.esc) {
                    me.axClose();
                }
            },
            axDestory() {
                let me = this;
                me.visible = false;
                me.axMaskVisible = false;
                me.$destroy(true);
                me.axClearListener();
                me.$el.remove();
            },
            axInit() {
                let me = this;
                me.axStartListener();
            },
        },
        mounted() {
            let me = this;
            me.axInit();
            console.log('me modal', me)
        },
        beforeDestory() {
            let me = this;
            me.axDestory();
        }
    }
</script>

<!-- ax为内部事件 -->
<!-- 非ax为外部用户事件 -->