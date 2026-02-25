<template>
  <header class="header">
    <div class="container header__content">
      <router-link to="/" class="header__logo">
        <h1 class="headertext">Космос</h1>
      </router-link>
      
      <nav class="header__nav">
        <router-link to="/login" class="btn btn--outline">Войти</router-link>
        <router-link to="/register" class="btn btn--primary">Создать аккаунт</router-link>
      </nav>
    </div>
  </header>
</template>

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
  justify-content: space-between;
  align-items: center;
}

.header__logo {
  text-decoration: none;
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
  gap: 1rem;
}

@media (max-width: 600px) {
  .headertext { font-size: 1.2rem; }
  .header__nav { gap: 0.5rem; }
}
</style>