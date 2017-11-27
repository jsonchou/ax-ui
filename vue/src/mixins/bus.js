export default {
    methods: {
        broadDown(componentName, eventName, params) {
            //parent to child
            let parent = this.$parent || this.$root;
            let name = parent.$options.name;

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;
                if (parent) {
                    name = parent.$options.name;
                }
            }
            if (parent) {
                parent.$emit(...[eventName].concat(params));
            }
        },
        broadUp(componentName, eventName, params) {
            //child to parent
            this.$children.forEach((child) => {
                const name = child.$options.name;

                if (name === componentName) {
                    child.$emit(...[eventName].concat(params));
                } else {
                    broadcast.apply(child, [componentName, eventName].concat([params]));
                }
            });
        },
    }
}