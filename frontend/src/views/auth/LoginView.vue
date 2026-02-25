<template>
  <div class="auth-page role-page">
    <h1 class="section-title">Вход</h1>
    
    <form @submit.prevent="login" class="auth-form">
      <input v-model="email" type="email" placeholder="Email" required class="form-input" />
      <input v-model="password" type="password" placeholder="Пароль" required class="form-input" />
      <button type="submit" class="btn btn--primary" style="width: 100%;">Войти</button>
    </form>
    

    <p class="auth-footer">
      Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

async function login() {
  // ... логика (как раньше)
}
</script>