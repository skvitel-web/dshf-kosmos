<template>
  <div class="auth-page role-page"> 
    <h1 class="section-title">Регистрация (родитель)</h1>
    
    <form @submit.prevent="register" class="auth-form">
      <div class="form-grid">
        <input v-model="email" type="email" placeholder="Email" required class="form-input" />
        <input v-model="password" type="password" placeholder="Пароль" required class="form-input" />
        
        <input v-model="surname" type="text" placeholder="Фамилия" required class="form-input" />
        <input v-model="name" type="text" placeholder="Имя" required class="form-input" />
        
        <input v-model="patronymic" type="text" placeholder="Отчество (не обязательно)" class="form-input full-width" />
      </div>
      
      <button type="submit" class="btn btn--primary submit-btn">
        Зарегистрироваться
      </button>
    </form>

    <p class="auth-footer">
      Уже есть аккаунт? <router-link to="/login">Войти</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const surname = ref('')
const name = ref('')
const patronymic = ref('') // необязательное
const router = useRouter()

async function register() {
  // Валидация на фронтенде
  if (!email.value || !password.value || !surname.value || !name.value) {
    alert('Пожалуйста, заполните все обязательные поля.')
    return
  }

  try {
    const response = await fetch('http://localhost:8080/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }, // ← обязательно!
  body: JSON.stringify({
    email: email.value.trim(),
    password: password.value,
    surname: surname.value.trim(), // ← не пустые!
    name: name.value.trim(),
    patronymic: patronymic.value?.trim() || null,
    role: 'PARENT'
  })
})

    if (response.ok) {
      router.push('/login')
    } else {
      const error = await response.text()
      alert('Ошибка регистрации: ' + error)
    }
  } catch (error) {
    console.error(error)
    alert('Сервер недоступен. Проверьте, запущен ли бэкенд.')
  }
}
</script>