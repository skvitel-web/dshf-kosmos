<template>
  <header class="header">
    <div class="container header__content">
      <router-link to="/" class="header__logo">
        <h1 class="headertext">Космос</h1>
      </router-link>

      <button
        class="header__burger"
        type="button"
        :aria-expanded="isMenuOpen"
        aria-label="Меню"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span class="header__burger-line" />
        <span class="header__burger-line" />
        <span class="header__burger-line" />
      </button>

      <nav class="header__nav" :class="{ 'header__nav--open': isMenuOpen }">
        <template v-if="authStore.isAuthenticated">
          <router-link :to="authStore.dashboardRoute" class="btn btn--outline header__nav-btn" @click="closeMenu">
            Кабинет
          </router-link>
          <button type="button" class="btn btn--primary header__nav-btn" @click="handleLogout">
            Выйти
          </button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn btn--outline header__nav-btn" @click="closeMenu">
            Войти
          </router-link>
          <router-link to="/register" class="btn btn--primary header__nav-btn" @click="closeMenu">
            Создать аккаунт
          </router-link>
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const isMenuOpen = ref(false)

function closeMenu() {
  isMenuOpen.value = false
}

function handleLogout() {
  authStore.logout()
  closeMenu()
  router.push('/login')
}

watch(() => route.path, () => {
  closeMenu()
})
</script>

<style scoped>
.header {
  background-color: var(--color-space-800);
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-space-700);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header__content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
}

.header__logo {
  text-decoration: none;
  flex-shrink: 0;
}

.header__logo h1 {
  color: var(--color-field-500);
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
  text-shadow: 0 0 10px rgba(13, 183, 115, 0.2);
}

.header__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.header__nav-btn {
  min-width: 120px;
  box-sizing: border-box;
  text-align: center;
  padding: 0.6rem 1rem;
  white-space: nowrap;
}

.header__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: 8px;
  background: transparent;
  border: 1px solid var(--color-space-600);
  border-radius: 0.5rem;
  cursor: pointer;
  box-sizing: border-box;
}

.header__burger-line {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--color-field-500);
  border-radius: 1px;
}

@media (max-width: 600px) {
  .headertext {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .header__content {
    flex-wrap: nowrap;
  }

  .header__burger {
    display: flex;
    margin-left: auto;
  }

  .header__nav {
    display: none;
    flex-direction: column;
    width: 100%;
    order: 3;
    padding-top: 0.5rem;
    border-top: 1px solid var(--color-space-700);
  }

  .header__nav--open {
    display: flex;
  }

  .header__nav-btn {
    width: 100%;
    min-width: unset;
  }
}
</style>
