<template>
        <!-- EXTERNAL LINKS -->
        <a v-if="isExternal" 
        target="_blank"
        rel="noopener"
        class="external-link"
        :href="to"><slot/></a>
        <!-- INTERNAL LINKS -->
        <RouterLink v-else v-bind="$props" class="internal-link"><slot/></RouterLink>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
    props: {
        //allowing the AppLink component that it will have all the props that RouterLink has
        ...RouterLink.props
    },
    computed:{
        isExternal(){
            return typeof this.to === 'string' && this.to.startsWith('http')
        }
    }

}

</script>