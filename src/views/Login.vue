<template>
    <div class="container is-fluid">
        <h1 class="title">Login</h1>
        <form class="box" @submit.prevent="login">
            <div class="field">
                <label class="label" for="email">Email</label>
                <div class="control">
                    <!-- v-model binds these values to data -->
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
            <p v-if="error" class="error">Invalid username or password.</p>
            <button class="button is-primary">Submit</button>
            <button class="button" @click="logout">Dummy Logout</button>
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

                    // this.$router.push({name: 'protected'})            

                    //redirect to pictures view after succesfull login
                    //the path is defined by the URL in the button?=query parameter || protected route
                    const redirectPath = this.$route.query.redirect || '/pictures'
                    this.$router.push(redirectPath)
                })
                .catch(error => {
                    this.errorMessage = error;
                    console.error('There was an error!', error);
                });
        },
        logout(){
            window.user = null;
            this.$router.push({name: 'home'})
        }
    }
}
</script>