<template>
    <transition :name="cls+'-ani-std'">
        <div :class="[cls,visible?'on':'',opacity]">
        </div>
    </transition>
</template>

<script>
    const prefix = "ax";

    export default {
        name: `${prefix}Mask`,
        data() {
            return {
                cls: `${prefix}-mask`,
                visible: '',
                opacity: 'dark',//dark,light,transparent
                onClose: null,
                //-------------------------------------
                axTimer: null, //
            };
        },
        methods: {
            axClose() {
                let me = this;
                me.axDestory();
                me.onClose && me.onClose(me);
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
                if (e.keyCode === 27 && me.visible) {
                    me.axClose();
                }
            },
            axDestory() {
                let me = this;
                let pNode = me.$el.parentNode;
                me.$destroy(true);
                me.axClearListener();
                pNode && pNode.removeChild(me.$el);
            },
            axInit() {
                let me = this;
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