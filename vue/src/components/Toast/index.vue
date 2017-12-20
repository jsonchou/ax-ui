<template>
    <transition :name="'ani-'+cls">
        <div :class="[cls+'-wrapper',visible?'on':'']">
            <div :class="cls">
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
        'info': 'info',
        'success': 'success',
        'warning': 'warning',
        'error': 'error',
        'loading': 'loading'
    };

    export default {
        name: 'Toast',
        data() {
            return {
                cls: `${prefix}-toast`,
                content: 'default content',
                theme: '',
                duration: 1600,
                position: 'top right',
                visible: '',
            };
        },
    }
</script>