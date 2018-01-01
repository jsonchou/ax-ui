<template>
    <transition :name="cls+'-ani-std'">
        <div :class="[cls+'-container',visible?'on':'']">
            <div :class="[cls+'-inner']">
                <div :class="[cls+'-box',cls+'-'+icon]">
                    <button type="button" class="close" @click="axClose" v-show="showClose">
                        <i class="ax ax-close"></i>
                    </button>
                    <div class="title" v-html="title"></div>
                    <div class="content">
                        <i :class="['ax','ax-'+icon]"></i>
                        <div class="message" v-html="content"></div>
                    </div>
                </div>
                <div :class="[cls+'-control']">
                    <button type="button" class="el-button " @click="axCancle" v-show="showCancelButton">{{cancelButtonText}}</button>
                    <button type="button" class="el-button " @click="axConfirm" v-show="showConfirmButton">{{confirmButtonText}}</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    const prefix = "ax";

    export default {
        name: `${prefix}Confirm`,
        data() {
            return {
                cls: `${prefix}-confirm`,
                title: '',
                content: '',
                icon: '',
                visible: '',

                confirmButtonText: '确定',
                cancelButtonText: '取消',
                showClose: true,
                showCancelButton: false,
                showConfirmButton: true,

                showMask: true,
                closeOnClickMask: true,

                esc: true,

                onClose: null,
                onCancle: null,
                onConfirm: null,
                //-------------------------------------

            };
        },
        methods: {
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