import locale from '../locale'

export default {
    methods: {
        t: function (...args) {
            let me = this;
            return locale.t.apply(me, args)
        }
    }
}