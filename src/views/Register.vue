<template>
    <div class="container is-fluid">
        <h1 class="title">Create account</h1>
        <form class="box" @submit.prevent="register">
            <div class="field">
                <label class="label" for="email">Email</label>
                <div class="control">
                    <input v-model="email" name="email" type="text" class="input" required placeholder="email">
                </div>
            </div>
            <div class="field">
                <label class="label" for="password">Password</label>
                <div class="control">
                    <input v-model="password" name="password" type="password" class="input" required
                        placeholder="password">
                </div>
            </div>
            <div class="field">
            <label class="label" for="passwordRepeat">Repeat password</label>
            <div class="control">
            <input v-model="passwordRepeat" name="passwordRepeat" type="password" class="input" required
                        placeholder="repeat password"> 
                    </div>
            </div>
            <p v-if="error" class="error">Passwords do not match.</p>
            <button class="button is-primary">Submit</button>
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