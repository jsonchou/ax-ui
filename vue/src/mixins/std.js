export default {
    props: {

    },
    computed: {
        iconPrefix() {
            let me = this;
            return me.$ax.prefix + '-icon'
        }
    }
}