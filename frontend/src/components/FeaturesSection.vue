<script setup>
import FeatureCard from './FeatureCard.vue'

const features = [
  { icon: '⚽', title: 'От 6 до 17 лет', desc: 'Группы по возрасту и уровню подготовки.' },
  { icon: '👨‍🏫', title: 'Тренеры', desc: 'Сертифицированные специалисты с опытом.' },
  { icon: '🛡️', title: 'Безопасность', desc: 'Медконтроль на каждой тренировке.' },
  { icon: '🧠', title: 'Игра + развитие', desc: 'Командная работа и уверенность в себе.' }
]
</script>

<template>
  <section class="features">
    <div class="container">
      <h2 class="section-title">Почему выбирают «Космос»?</h2>
      <div class="features__grid">
        <FeatureCard 
          v-for="item in features" 
          :key="item.title"
          :icon="item.icon"
          :title="item.title" 
          :description="item.desc" 
        />
      </div>
    </div>
  </section>
</template>