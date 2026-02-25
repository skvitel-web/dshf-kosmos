import { defineStore } from 'pinia'

export const useTrainerStore = defineStore('trainer', {
  state: () => ({
    // Список детей с расширенными данными
    children: JSON.parse(localStorage.getItem('cosmos_children')) || [
      { id: '1', name: 'Артем Иванов', groupId: 'A', qualities: [], metrics: [], campScores: [] },
      { id: '2', name: 'Михаил Петров', groupId: 'A', qualities: [], metrics: [], campScores: [] }
    ],
    // Список качеств (статичный)
    qualitiesList: [
      'Лидерские качества', 'Командный игрок', 'Обладает потенциалом',
      'Дисциплинированный', 'Хорошая техника', 'Ответственный',
      'Позитивный настрой', 'Креативное мышление', 'Хороший удар'
    ]
  }),
  actions: {

    // Отметка посещаемости
    setAttendance(childId, status, isExcellent = false) {
    const today = new Date().toISOString().split('T')[0];
    const child = this.children.find(c => c.id === childId);
    if (child) {
      if (!child.attendance) child.attendance = {};
      child.attendance[today] = { status, isExcellent };
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
    addChildFast(name, info) {
      this.children.push({
        id: Date.now().toString(),
        name,
        contact: info,
        groupId: 'A',
        qualities: [],
        metrics: [],
        campScores: []
      })
      this.save()
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