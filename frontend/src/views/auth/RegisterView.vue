<template>
  <div class="auth-page role-page">
    <h1 class="section-title">Регистрация (родитель)</h1>

    <form @submit.prevent="register" class="auth-form">
      <div class="form-grid">
        <input v-model="email" type="email" placeholder="Email" required class="form-input" />
        <input v-model="password" type="password" placeholder="Пароль" required class="form-input" />

        <input v-model="surname" type="text" placeholder="Фамилия" required class="form-input" />
        <input v-model="name" type="text" placeholder="Имя" required class="form-input" />

        <input
          v-model="patronymic"
          type="text"
          placeholder="Отчество (не обязательно)"
          class="form-input full-width"
        />
      </div>

      <p class="auth-footer auth-consent">
        Нажимая кнопку «Зарегистрироваться», вы даете согласие на
        <a href="#" @click.prevent="">обработку персональных данных</a>
        (ФИО, контактные данные и дата рождения) для обеспечения учебного и тренировочного процесса.
      </p>

      <p v-if="errorMessage" class="auth-error">{{ errorMessage }}</p>

      <button type="submit" class="btn btn--primary submit-btn" :disabled="isLoading">
        {{ isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}
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
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const surname = ref('')
const name = ref('')
const patronymic = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const router = useRouter()
const authStore = useAuthStore()

async function register() {
  if (!email.value || !password.value || !surname.value || !name.value) {
    errorMessage.value = 'Пожалуйста, заполните все обязательные поля.'
    return
  }

  errorMessage.value = ''
  isLoading.value = true

  try {
    await authStore.register({
      email: email.value.trim(),
      password: password.value,
      surname: surname.value.trim(),
      name: name.value.trim(),
      patronymic: patronymic.value?.trim() || null,
      role: 'PARENT',
    })
    router.push('/login')
  } catch (error) {
    errorMessage.value =
      error.response?.data || 'Ошибка регистрации. Попробуйте другой email.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.auth-consent {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  text-align: left;
  line-height: 1.4;
}

.auth-consent a {
  text-decoration: underline;
}

.auth-error {
  color: #ef4444;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  text-align: center;
}
</style>
