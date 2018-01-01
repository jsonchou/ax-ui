<template>
    <transition :name="cls+'-ani-std'">
        <div :class="[cls+'-container',visible?'on':'']">
            <div :class="[cls+'-inner']">
                <div :class="[cls+'-box',cls+'-'+icon]">
                    <button type="button" class="close" @click="axClose">
                        <i class="ax ax-close"></i>
                    </button>
                    <div class="title">
                        <span>提示</span>
                    </div>
                    <div class="content">
                        <i :class="['ax','ax-'+icon]"></i>
                        <div class="message">
                            <p>此操作将永久删除该文件, 是否继续?</p>
                        </div>
                    </div>
                </div>
                <div :class="[cls+'-control']">
                    <button type="button" class="el-button " @click="axClose">取消</button>
                    <button type="button" class="el-button " @click="axClose">确定</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    const prefix = "ax";

    export default {
        name: 'Confirm',
        data() {
            return {
                cls: `${prefix}-confirm`,
                content: '',
                icon: '',
                duration: 1600,
                visible: '',
                onClose: null,
                onCancle: null,
                onConfirm: null,
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