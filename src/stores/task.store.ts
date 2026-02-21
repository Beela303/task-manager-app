import { defineStore } from 'pinia'
import { Task } from '@/types/task'
import { saveToStorage, loadFromStorage, STORAGE_KEY } from '@/services/storage.service'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],

    // Filters
    filterStatus: 'all' as 'all' | 'completed' | 'pending',
    filterPriority: 'all' as 'all' | 'low' | 'medium' | 'high'
  }),

  getters: {
    completedTasks: (state) =>
      state.tasks.filter(t => t.completed),

    pendingTasks: (state) =>
      state.tasks.filter(t => !t.completed),

    filteredTasks: (state) => {
      let filtered = state.tasks

      // Status filter
      if (state.filterStatus === 'completed') {
        filtered = filtered.filter(t => t.completed)
      }

      if (state.filterStatus === 'pending') {
        filtered = filtered.filter(t => !t.completed)
      }

      // Priority filter
      if (state.filterPriority !== 'all') {
        filtered = filtered.filter(
          t => t.priority === state.filterPriority
        )
      }

      return filtered
    }
  },

  actions: {
    init() {
    const stored = loadFromStorage<Task[]>(STORAGE_KEY)

        if (stored) {
            this.tasks = stored.map(task => ({
            ...task,
            createdAt: new Date(task.createdAt),
            dueDate: task.dueDate ? new Date(task.dueDate) : null
            }))
        }
    },

    persist() {
      saveToStorage(STORAGE_KEY, this.tasks)
    },

    addTask(task: Task) {
      this.tasks.push(task)
      this.persist()
    },

    toggleTask(id: string) {
      const task = this.tasks.find(t => t.id === id)
      if (task) {
        task.completed = !task.completed
        this.persist()
      }
    },

    deleteTask(id: string) {
      this.tasks = this.tasks.filter(t => t.id !== id)
      this.persist()
    },

    setStatusFilter(status: 'all' | 'completed' | 'pending') {
      this.filterStatus = status
    },

    setPriorityFilter(priority: 'all' | 'low' | 'medium' | 'high') {
      this.filterPriority = priority
    }
  }
})