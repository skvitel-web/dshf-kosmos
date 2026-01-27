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
    groups: mockGroups,
    children: mockChildren,
    attendance: JSON.parse(localStorage.getItem('kosmos-attendance') || '{}')
  }),

  actions: {
    saveToStorage() {
      localStorage.setItem('kosmos-attendance', JSON.stringify(this.attendance))
    },

    setAttendance({ childId, groupId, date, status, excellent = false }) {
      if (!this.attendance[date]) this.attendance[date] = {}
      if (!this.attendance[date][groupId]) this.attendance[date][groupId] = {}
      this.attendance[date][groupId][childId] = { status, excellent }
      this.saveToStorage()
    },

    getAttendance(childId, groupId, date) {
      const groupData = this.attendance[date]?.[groupId]
      const childData = groupData?.[childId]
      return {
        status: childData?.status ?? null,
        excellent: Boolean(childData?.excellent)
      }
    },

    addDraftChild({ name, age, parentContact, groupId }) {
      const newChild = {
        id: `draft-${Date.now()}`,
        name: name.trim(),
        age: Number(age),
        parentContact: parentContact.trim(),
        groupId,
        isDraft: true
      }
      this.children.push(newChild)
      // Не сохраняем children в localStorage!
    }
  }
})