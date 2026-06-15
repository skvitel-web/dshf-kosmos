<template>
  <div class="auth-page role-page">
    <h1 class="section-title">Вход</h1>

    <form @submit.prevent="handleLogin" class="auth-form">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
        class="form-input"
        autocomplete="email"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Пароль"
        required
        class="form-input"
        autocomplete="current-password"
      />
      <p v-if="errorMessage" class="auth-error">{{ errorMessage }}</p>
      <button type="submit" class="btn btn--primary auth-submit-btn" :disabled="isLoading">
        {{ isLoading ? 'Вход...' : 'Войти' }}
      </button>
    </form>

    <div class="auth-footer auth-footer--links">
      <p>
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
      <p>
        <button type="button" class="auth-link-btn" @click="showForgotModal = true">
          Забыли пароль?
        </button>
      </p>
    </div>

    <div v-if="showForgotModal" class="modal-overlay" @click.self="closeForgotModal">
      <div class="modal forgot-modal">
        <h2 class="forgot-modal__title">Восстановление пароля</h2>
        <p class="forgot-modal__hint">
          Введите email, указанный при регистрации. Мы отправим инструкцию по сбросу пароля.
        </p>

        <form v-if="!forgotSuccess" @submit.prevent="handleForgotPassword">
          <input
            v-model="forgotEmail"
            type="email"
            placeholder="Email"
            required
            class="form-input"
            autocomplete="email"
          />
          <p v-if="forgotError" class="auth-error">{{ forgotError }}</p>
          <div class="forgot-modal__actions">
            <button type="button" class="btn btn--outline" @click="closeForgotModal">
              Отмена
            </button>
            <button type="submit" class="btn btn--primary" :disabled="isForgotLoading">
              {{ isForgotLoading ? 'Отправка...' : 'Отправить' }}
            </button>
          </div>
        </form>

        <div v-else class="forgot-modal__success">
          <p>Инструкция по восстановлению пароля отправлена на <strong>{{ forgotEmail }}</strong>.</p>
          <button type="button" class="btn btn--primary" @click="closeForgotModal">Понятно</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, ROLE_ROUTES } from '@/stores/auth'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const showForgotModal = ref(false)
const forgotEmail = ref('')
const forgotError = ref('')
const forgotSuccess = ref(false)
const isForgotLoading = ref(false)

const router = useRouter()
const authStore = useAuthStore()

async function handleLogin() {
  errorMessage.value = ''
  isLoading.value = true

  try {
    const data = await authStore.login(email.value.trim(), password.value)
    const redirect = router.currentRoute.value.query.redirect
    const route = redirect || ROLE_ROUTES[data.role] || '/'
    router.push(route)
  } catch (error) {
    errorMessage.value =
      error.response?.data || 'Неверный email или пароль. Проверьте данные и попробуйте снова.'
  } finally {
    isLoading.value = false
  }
}

async function handleForgotPassword() {
  forgotError.value = ''
  isForgotLoading.value = true

  try {
    await authStore.forgotPassword(forgotEmail.value.trim())
    forgotSuccess.value = true
  } catch (error) {
    forgotError.value =
      error.response?.data || 'Не удалось отправить запрос. Попробуйте позже.'
  } finally {
    isForgotLoading.value = false
  }
}

function closeForgotModal() {
  showForgotModal.value = false
  forgotEmail.value = ''
  forgotError.value = ''
  forgotSuccess.value = false
}
</script>

<style scoped>
.auth-submit-btn {
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  padding: 0.75rem 1.25rem;
}

.auth-error {
  color: #ef4444;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  text-align: center;
}

.auth-footer--links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.auth-link-btn {
  background: none;
  border: none;
  color: var(--color-field-500);
  font-weight: 600;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
  padding: 0;
  text-decoration: underline;
}

.auth-link-btn:hover {
  opacity: 0.85;
}

.forgot-modal__title {
  font-size: 1.25rem;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
  text-align: center;
}

.forgot-modal__hint {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1.25rem;
  line-height: 1.5;
}

.forgot-modal__actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.25rem;
  flex-wrap: wrap;
}

.forgot-modal__actions .btn {
  flex: 1;
  min-width: 120px;
  box-sizing: border-box;
  text-align: center;
}

.forgot-modal__success {
  text-align: center;
}

.forgot-modal__success p {
  color: var(--color-text-secondary);
  margin-bottom: 1.25rem;
  line-height: 1.5;
}

.forgot-modal__success strong {
  color: var(--color-text-primary);
}
</style>
