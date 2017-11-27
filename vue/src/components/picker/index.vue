<template>
    <div class="template-picker">
        <slot>
            picker component
        </slot>
    </div>
</template>

<script>
    const cls = 'ax-picker';
    import std from '../../mixins/std'
    import uuid from '../../mixins/uuid'
    export default {
        mixins: [std, uuid],
        name: 'Picker',
        props: {
            offsetTop: {
                type: Number,
                default: 0
            },
            offsetBottom: {
                type: Number
            }
        },
        data() {
            return {
                styles: {}
            };
        },
        mounted() {
            let me = this;
            console.log('template-picker:', me)
        }
    }
</script>