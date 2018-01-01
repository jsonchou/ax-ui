<template>
    <transition :name="cls+'-ani-std'">
        <div :class="[cls]">
            <div :class="[cls+'-container',cls+'-'+icon,visible?'on':'']">
                <i :class="['ax','ax-'+icon]"></i>
                <div v-html="content"></div>
            </div>
        </div>
    </transition>
</template>

<script>
    const prefix = "ax";

    export default {
        name: `${prefix}Toast`,
        data() {
            return {
                cls: `${prefix}-toast`,
                content: '',
                icon: 'info',
                duration: 1600,
                visible: '',
                onClose: null,
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
                if (e.keyCode === 27 && me.visible) {
                    me.axClose();
                }
            },
            axDestory() {
                let me = this;
                let pNode = me.$el.parentNode;
                me.axClearTimer();
                me.$destroy(true);
                me.axClearListener();
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