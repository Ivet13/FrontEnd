<template>
    <div class="login">
        <h1>Login</h1>
        <form class="form" @submit.prevent="login">
            <label for="email">Email</label>
            <input v-model="email" name="email" type="text" class="input" required placeholder="email">
            <label for="password">Password</label>
            <input v-model="password" name="password" type="text" class="input" required placeholder="password">
            <p v-if="error" class="error">Invalid username or password.</p>
            <button class="btn">Submit</button>
        </form>
    </div>

</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            error: false
        }
    },
    methods: {
        login() {
            console.log(this.email);
            console.log(this.password);
            // Auth user against the API -> TODO
            // POST request using fetch with error handling
            const requestOptions = {
                method: 'POST',
                //  headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'username': 'ivetka', 'password': 'macicka' })
            };
            fetch('http://localhost:8080/users/login', requestOptions)
                .then(async response => {
                    const data = await response.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    console.log('user found, returning token')
                    console.log(data)
                    console.log(data.token)
                    localStorage.setItem('token', data.token)


                    window.user = this.email

                    //redirect to pictures view             
                    const redirectPath = this.$route.query.redirect || '/pictures'
                    this.$router.push(redirectPath)
                })
                .catch(error => {
                    this.errorMessage = error;
                    console.error('There was an error!', error);
                });
        }
    }
}
</script>