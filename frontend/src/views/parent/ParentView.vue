<template>
  <div class="client-dashboard container">
    <header class="hero" style="padding: 2rem 0;">
      <div class="stat-label">Личный кабинет родителя</div>
      <h1 class="hero__title">Иван Иванов</h1>
      <p class="hero__subtitle">Группа: Младшая (А) | Тренер: Александр Космос</p>
    </header>

    <section class="statistics-grid features__grid" style="margin-bottom: 3rem;">
      <div class="feature-card">
        <div class="stat-value" style="color: var(--color-field-500); font-size: 2.2rem; font-weight: 800;">12</div>
        <div class="stat-label">Посещено</div>
      </div>

      <div class="feature-card">
        <div class="stat-value" style="color: #fbbf24; font-size: 2.2rem; font-weight: 800;">5</div>
        <div class="stat-label">«Пятерки» ★</div>
      </div>

      <div class="feature-card">
        <div class="stat-value" style="color: #ef4444; font-size: 2.2rem; font-weight: 800;">2</div>
        <div class="stat-label">Пропуски</div>
      </div>

      <div class="feature-card">
        <div class="stat-value" style="color: #60a5fa; font-size: 2.2rem; font-weight: 800;">0</div>
        <div class="stat-label">Опоздания</div>
      </div>
    </section>

    <section class="finance-section" style="margin-bottom: 3rem;">
      <h2 class="sub-section-title">Ваш абонемент</h2>
      <div class="modern-card" style="padding: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
        <div class="card-accent" style="background: var(--color-field-500);"></div>
        <div>
          <div style="font-weight: 700; font-size: 1.2rem;">Стандарт: 12 занятий</div>
          <div class="auth-footer" style="margin: 0; text-align: left;">Оплачено до: 15.06.2026</div>
        </div>
        <div style="text-align: right;">
          <div class="stat-value">Осталось: 4</div>
          <span class="status-badge status-success">Активен</span>
        </div>
      </div>
    </section>

    <section class="attendance-history">
      <h2 class="sub-section-title">Последние занятия</h2>
      
      <div class="history-list">
        <div class="modern-card" style="margin-bottom: 1rem;">
          <div class="card-accent" style="background: var(--color-field-500);"></div>
          <div class="card-content" style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 600;">12 Мая, Вторник</div>
              <div class="auth-footer" style="margin: 0; text-align: left;">⚽ Футбольная игра</div>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
              <span class="mark-btn excellent active" style="width: 30px; height: 30px; font-size: 0.7rem;">5★</span>
              <span class="status-badge status-success">Был</span>
            </div>
          </div>
        </div>

        <div class="modern-card" style="margin-bottom: 1rem;">
          <div class="card-accent" style="background: #ef4444;"></div>
          <div class="card-content" style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 600;">10 Мая, Воскресенье</div>
              <div class="auth-footer" style="margin: 0; text-align: left;">🏃 Физ. подготовка</div>
            </div>
            <span class="status-badge status-danger">Пропуск</span>
          </div>
        </div>
      </div>
    </section>

    <footer style="margin: 4rem 0; text-align: center;">
      <router-link to="/" class="btn btn--outline">← На главную</router-link>
    </footer>
  </div>
</template>

<script setup>
// В будущем сюда добавим логику получения данных из Pinia/API
</script>