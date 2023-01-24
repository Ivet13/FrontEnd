<template>
    <div>Pictures
        <p>Greetings, {{ username }}</p>
        <button @click="logout">Logout</button>
        <RouterLink to="/pictures"><button>Pictures</button></RouterLink>
        <RouterLink :to="{name: 'pictures'}"><button>Pictures</button></RouterLink>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: window.user
        }
    },
    methods:{
    logout(){
        window.user = null
        //redirect to homepage
        this.$router.push({name:'home'})
    }}
}
</script>