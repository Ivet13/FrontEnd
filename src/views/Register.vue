<template>
    <div class="register">
        <h1>Create account</h1>
        <form class="form" @submit.prevent="register">
            <label for="email">Email</label>
            <input v-model="email" name="email" type="text" class="input">
            <label for="password">Password</label>
            <input v-model="password" name="password" type="text" class="input">
            <label for="password">Repeat password</label>
            <input v-model="passwordRepeat" name="passwordRepeat" type="text" class="input">
            <button class="btn">Submit</button>
        </form>
    </div>

</template>

<script>

import auth from "@/logic/auth";

export default {
    data() {
        return {
            email: '',
            password: '',
            passwordRepeat: '',
            error: false
        }
    },
    methods: {
        async register() {
            // API -> TODO

            console.log(this.email);
            console.log(this.password);
            console.log(this.passwordRepeat);
            try {
                const repsonse = await auth.register(this.email, this.password).then(response => {
                    console.log(response);
                    this.$router.push("/");
                })
            } catch (error) {
                console.log(error);
            }
        }
    }
    /*
    window.user = this.username

    const redirectPath = this.$route.query.redirect || '/pictures'
    this.$router.push(redirectPath)
    */
}

</script>