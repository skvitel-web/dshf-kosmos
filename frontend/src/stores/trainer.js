import { defineStore } from 'pinia'

const mockGroups = [
  { id: 'group-1', name: 'Младшая группа (6–8 лет)' },
  { id: 'group-2', name: 'Средняя группа (9–11 лет)' }
]

const mockChildren = [
  { id: 'child-1', name: 'Иван Петров', groupId: 'group-1' },
  { id: 'child-2', name: 'Сергей Иванов', groupId: 'group-1' },
  { id: 'child-3', name: 'Анна Смирнова', groupId: 'group-1' },
  { id: 'child-4', name: 'Максим Кузнецов', groupId: 'group-2' }
]

export const useTrainerStore = defineStore('trainer', {
  state: () => ({
    // ❗ groups и children НЕ сохраняются в localStorage
    groups: mockGroups,
    children: mockChildren,
    // ✅ Только attendance — в localStorage
    attendance: JSON.parse(localStorage.getItem('kosmos-attendance') || '{}')
  }),

  actions: {
    saveAttendance() {
      localStorage.setItem('kosmos-attendance', JSON.stringify(this.attendance))
    },

    setAttendance({ childId, groupId, date, status, excellent = false }) {
      if (!this.attendance[date]) this.attendance[date] = {}
      if (!this.attendance[date][groupId]) this.attendance[date][groupId] = {}
      this.attendance[date][groupId][childId] = { status, excellent }
      this.saveAttendance()
    },

    getAttendance(childId, groupId, date) {
      const mark = this.attendance[date]?.[groupId]?.[childId]
      return {
        status: mark?.status ?? null,
        excellent: mark?.excellent === true // только true → true
      }
    }
  }
})