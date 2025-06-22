<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Login</button>
    <p v-if="error" style="color: red">{{ error }}</p>
  </form>
</template>

<script>
import { loginUser } from '../api/authService';  //

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async handleLogin() {
      this.error = null;
      try {
        const userData = await loginUser({
          email: this.email,
          password: this.password,
        });
        console.log('Login successful:', userData);
        // you can now save token, user info or redirect
      } catch (err) {
        this.error = err;
      }
    },
  },
};
</script>
