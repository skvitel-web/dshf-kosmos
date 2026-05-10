import { defineStore } from 'pinia'

export const useTrainerStore = defineStore('trainer', {
  state: () => ({
    groups: [
      { id: 'A', name: 'Младшая группа (A)' },
      { id: 'B', name: 'Старшая группа (B)' }
    ],
    children: JSON.parse(localStorage.getItem('cosmos_children')) || [
      { 
        id: '1', 
        lastName: 'Иванов', 
        firstName: 'Артем', 
        middleName: '', 
        groupId: 'A', 
        contact: '89001234567',
        qualities: [], 
        metrics: [], 
        campScores: [],
        attendance: {} 
      }
    ],  
  schedule: JSON.parse(localStorage.getItem('cosmos_schedule')) || [],
  }),
  
  getters: {
    getAttendance: (state) => (childId, groupId, date) => {
      const child = state.children.find(c => c.id === childId)
      return child?.attendance?.[date] || null
    }
  },

  actions: {
    addScheduleEntry(entry) {
      this.schedule.push({
        id: Date.now().toString(),
        ...entry
      });
      this.saveSchedule();
    },

    updateChildPayment(childId, paymentData) {
      const child = this.children.find(c => c.id === childId)
        if (child) {
          child.lessonsLeft = paymentData.lessonsLeft
          child.paymentValidUntil = paymentData.paymentValidUntil
            this.save() // Сохраняем в localStorage
      }
    },
    saveSchedule() {
      localStorage.setItem('cosmos_schedule', JSON.stringify(this.schedule));
    },
    setAttendance(payload) {
  const { childId, date, status, excellent } = payload;
  const child = this.children.find(c => c.id === childId);

  if (child) {
    if (!child.attendance) child.attendance = {};

    // ЛОГИКА: если ставим "отсутствует", отличная оценка всегда сбрасывается в false
    const finalExcellent = status === 'absent' ? false : excellent;

    child.attendance[date] = { 
      status: status, 
      excellent: finalExcellent 
    };

    this.save();
  }
},
    addMetric(childId, metricName, value) {
    const child = this.children.find(c => c.id === childId);
    if (child) {
      if (!child.metrics) child.metrics = [];
      child.metrics.push({
        name: metricName,
        value: value,
        date: new Date().toISOString()
      });
      this.save();
    }
  },

    // 1. Быстрое добавление ребенка
    addChildFast({ lastName, firstName, middleName, contact, groupId }) {
      this.children.push({
        id: Date.now().toString(),
        lastName,
        firstName,
        middleName,
        contact,
        groupId,
        qualities: [],
        metrics: [],
        campScores: [],
        attendance: {}
      })
      this.save()
    },

    save() {
      localStorage.setItem('cosmos_children', JSON.stringify(this.children))
    },
    
    // 2. Добавление качества
    addQuality(childId, quality) {
      const child = this.children.find(c => c.id === childId)
      if (child && !child.qualities.includes(quality)) {
        child.qualities.push(quality)
        this.save()
      }
    },
    // 3. Запись норматива
    addMetric(childId, type, result) {
      const child = this.children.find(c => c.id === childId)
      if (child) {
        child.metrics.push({ type, result, date: new Date().toISOString() })
        this.save()
      }
    },
    // 4. Оценки на сборах (зарядка, день, вечер)
    addCampScore(childId, coachId, type, score) {
      const child = this.children.find(c => c.id === childId)
      if (child) {
        child.campScores.push({ date: new Date().toLocaleDateString(), coachId, type, score })
        this.save()
      }
    },
    save() {
      localStorage.setItem('cosmos_children', JSON.stringify(this.children))
    },
    saveMatch(matchData) {
      if (!this.matches) this.matches = [];
     this.matches.push({
     ...matchData,
      id: Date.now(),
      date: new Date().toISOString()
  });
  
  // Начисляем голы игрокам в их общую статистику
  matchData.events.forEach(event => {
    const player = this.children.find(c => c.id === event.scorer);
    if (player) {
      if (!player.goals) player.goals = 0;
      player.goals++;
    }
    });
  
      this.save();
      }
  }
})