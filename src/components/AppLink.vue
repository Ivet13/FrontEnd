<template>
        <a v-if="isExternal" :href="to"><slot/></a>
        <RouterLink v-else v-bind="$props"><slot/></RouterLink>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
    props: {
        ...RouterLink.props
    },
    computed:{
        isExternal(){
            return typeof this.to === 'string' && this.to.startsWith('http')
        }
    }

}

</script>