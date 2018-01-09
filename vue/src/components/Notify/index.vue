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
            </div>
        </div>
    </transition>
</template>

<script>
    const prefix = __prefix__;
    import validator from '../../utils/validator'
    import baseMixin from '../../mixins/base'

    export default {
        name: `${prefix}Notify`,
        mixins: [baseMixin.std],
        components: {

        },
        data() {
            return {
                cls: `${prefix}-notify`,
                title: '',
                content: '',
                icon: '',
                visible: false,
                duration: 4500,

                closable: false,
                placement: 'right-top', //right-top,top-center

                esc: true,

                onHide: null,
                onShow: null,
                //-------------------------------------
                axTimer: null,

            };
        },
        watch: {
            visible(nv, ov) {
                console.log('watch visible', nv);
                let me = this;
                if (nv) {
                    me.axOpen();
                } else {
                    me.axClose();
                }
            }
        },
        computed: {

        },
        methods: {
            hide() {
                //after show
                let me = this;
                me.axClose();
            },
            axClose() {
                let me = this;
                me.axDestory();
                me.$emit('notify:close', 'emit:notify:close');
                me.onHide && me.onHide(me);
            },
            axOpen() {
                let me = this;
                me.$emit('notify:open', 'emit:notify:open');
                me.onShow && me.onShow(me);
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
                if (e.keyCode === 27 && me.visible && me.esc) {
                    me.axClose();
                }
            },
            axDestory() {
                let me = this;
                me.axClearTimer();
                me.$destroy();
                me.axClearListener();
                me.$el.remove();
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
            console.log('me nofity', me)
        },
        beforeDestory() {
            let me = this;
            me.axDestory();
        }
    }
</script>

<!-- ax为内部事件 -->
<!-- 非ax为外部用户事件 -->