<template>
    <transition :name="cls+'ani-std'">
        <div :class="[cls]">
            <div :class="[cls+'-container',cls+'-'+theme,visible?'on':'']">
                <i :class="['ax','ax-'+theme]">111</i>
                <div>
                    {{content}}
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    const prefix = "ax";

    const theme = {
        'info': 'fa fa-info',
        'success': 'check',
        'warn': 'warn',
        'error': 'close',
        'loading': 'spinner'
    };

    export default {
        name: 'Toast',
        data() {
            return {
                cls: `${prefix}-toast`,
                content: 'default content',
                theme: '',
                duration: 1600,
                visible: '',
                callback: null,
                axTimer: null, //
            };
        },
        methods: {
            axClose() {
                let me = this;
                me.axDestory();
                me.callback && me.callback();
            },
            axStartTimer() {
                let me = this;
                if (me.duration) {
                    me.axTimer = setTimeout(() => {
                        me.axClose();
                    }, me.duration)
                }
            },
            axClearTimer() {
                let me = this;
                me.timer && clearTimeout(me.timer)
            },
            axKeyClose(e) {
                let me = this;
                if (e.keyCode === 27) {
                    me.axClose();
                }
            },
            axDestory() {
                let me = this;
                me.$el.parentNode.removeChild(me.$el);
            },
            axInit() {
                let me = this;
                this.axStartTimer();
            },
        },
        mounted() {
            let me = this;
            me.axInit();
            document.addEventListener('keydown', me.axKeyClose)
        },
        beforeDestory() {
            let me = this;
            document.removeEventListener('keydown', me.axKeyClose)
        }
    }
</script>