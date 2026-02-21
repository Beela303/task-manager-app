export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: Date
  dueDate: Date | null
  priority: 'low' | 'medium' | 'high'
}