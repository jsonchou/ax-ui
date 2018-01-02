<template>
    <button class="el-button" @click="axClick" :disabled="disabled" :autofocus="autofocus" :theme="theme" :class="[
        theme ? iconPrefix+'-button-' + theme : '',
        size ? iconPrefix+'-button-' + size : '',
        {
          'is-disabled': disabled,
          'is-loading': loading,
          'is-plain': plain,
          'is-round': round
        }
      ]">
        <i :class="[icon,loading?iconPrefix+'-spin':'']" v-if="icon && !loading"></i>
        <span v-if="$slots.default">
            <slot></slot>
        </span>
    </button>
</template>

<script>
    const prefix = "ax";
    import baseMixin from '../../mixins/base'
    import validator from '../../utils/validator'

    export default {
        name: `${prefix}Button`,
        mixins: [baseMixin.std],
        props: {
            icon: {
                type: String,
                default: ''
            },
            theme: {
                type: String,
                validator: validator(['default', 'primary', 'info', 'success', 'warning', 'error']),
                default: 'default',
            },
            size: {
                type: String,
                validator: validator(['xl', 'lg', 'sm', 'xs']),
                default: null,
            },
            shape: {
                type: String,
                validator: validator(['radius', 'round', 'circle']),
                default: null,
            },
            plain: {
                type: Boolean,
                default: false,
            },
            round: {
                type: Boolean,
                default: false,
            },
            autofocus: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            loading: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {

            };
        },
        methods: {
            axClick(e) {
                let me = this;
                me.$emit('click', e)
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
            console.log('me', me)
        },
        beforeDestory() {
            let me = this;
            me.axDestory();
        }
    }
</script>

<!-- ax为内部事件 -->
<!-- 非ax为外部用户事件 -->