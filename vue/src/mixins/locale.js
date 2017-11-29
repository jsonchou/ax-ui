import locale from '../locale'

export default {
    methods: {
        t: function (...args) {
            return locale.t.apply(this, args)
        }
    }
}