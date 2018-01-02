<template>
    <button class="el-button" @click="handleClick" :disabled="disabled" :autofocus="autofocus" :type="nativeType" :class="[
        type ? 'el-button--' + type : '',
        buttonSize ? 'el-button--' + buttonSize : '',
        {
          'is-disabled': disabled,
          'is-loading': loading,
          'is-plain': plain,
          'is-round': round
        }
      ]">
        <i class="el-icon-loading" v-if="loading" @click="handleInnerClick"></i>
        <i :class="icon" v-if="icon && !loading" @click="handleInnerClick"></i>
        <span v-if="$slots.default" @click="handleInnerClick">
            <slot></slot>
        </span>
    </button>
</template>

<script>
    const prefix = "ax";

    export default {
        name: `${prefix}Button`,
        data() {
            return {
                cls: `${prefix}-button`,
                visible: '',
                opacity: 'dark', //dark,light,transparent
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
                me.onShow && me.onShow(me);
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