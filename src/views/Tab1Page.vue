<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tasks</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <!-- Add Task Input -->
      <ion-item>
        <ion-input
          v-model="newTask"
          placeholder="Enter task"
        />
      </ion-item>

      <!-- Priority Selector -->
      <ion-item>
        <ion-label>Priority</ion-label>
        <ion-select v-model="selectedPriority">
          <ion-select-option value="low">Low</ion-select-option>
          <ion-select-option value="medium">Medium</ion-select-option>
          <ion-select-option value="high">High</ion-select-option>
        </ion-select>
      </ion-item>

      <!-- Due Date Picker -->
      <ion-item>
        <ion-label>Due Date</ion-label>
        <ion-datetime
          presentation="date"
          v-model="selectedDueDate"
        />
      </ion-item>

      <ion-button expand="block" @click="createTask">
        Add Task
      </ion-button>

      <!-- Search Bar -->
      <ion-searchbar
        placeholder="Search tasks"
        @ionInput="taskStore.setSearchQuery($event.detail.value)"
      />
        
      <!-- Dropdown -->
      <ion-item>
        <ion-label>Sort By</ion-label>
        <ion-select
          :value="taskStore.sortBy"
          @ionChange="taskStore.setSortBy($event.detail.value)"
        >
          <ion-select-option value="createdAt">Created</ion-select-option>
          <ion-select-option value="dueDate">Due Date</ion-select-option>
          <ion-select-option value="priority">Priority</ion-select-option>
        </ion-select>
      </ion-item>

      <!-- Status Filter -->
      <ion-segment
        :value="taskStore.filterStatus"
        @ionChange="onStatusChange"
      >
        <ion-segment-button value="all">
          <ion-label>All</ion-label>
        </ion-segment-button>

        <ion-segment-button value="pending">
          <ion-label>Pending</ion-label>
        </ion-segment-button>

        <ion-segment-button value="completed">
          <ion-label>Completed</ion-label>
        </ion-segment-button>
      </ion-segment>

      <!-- Priority Filter -->
      <ion-item>
        <ion-label>Filter Priority</ion-label>
        <ion-select
          :value="taskStore.filterPriority"
          @ionChange="onPriorityChange"
        >
          <ion-select-option value="all">All</ion-select-option>
          <ion-select-option value="low">Low</ion-select-option>
          <ion-select-option value="medium">Medium</ion-select-option>
          <ion-select-option value="high">High</ion-select-option>
        </ion-select>
      </ion-item>

      <!-- Task List -->
      <ion-list>
        <ion-item
          v-for="task in taskStore.filteredTasks"
          :key="task.id"
        >
          <ion-checkbox
            slot="start"
            :checked="task.completed"
            @ionChange="taskStore.toggleTask(task.id)"
          />

          <ion-label
            :class="{
              completed: task.completed,
              overdue: isOverdue(task)
            }"
          >
            {{ task.title }}

            <div v-if="task.dueDate">
              <small>
                Due:
                {{ new Date(task.dueDate).toLocaleDateString() }}
              </small>
            </div>
          </ion-label>

          <ion-badge
            :color="priorityColor(task.priority)"
          >
            {{ task.priority }}
          </ion-badge>

          <ion-button
            fill="clear"
            color="danger"
            @click="taskStore.deleteTask(task.id)"
          >
            Delete
          </ion-button>

        </ion-item>
      </ion-list>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonList,
  IonCheckbox,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonSegment,
  IonSegmentButton,
  IonBadge,
  IonDatetime,
  IonSearchbar
} from '@ionic/vue'

import { useTaskStore } from '@/stores/task.store'
import { Task } from '@/types/task'

const taskStore = useTaskStore()

const newTask = ref('')
const selectedPriority = ref<'low' | 'medium' | 'high'>('medium')

const selectedDueDate = ref<string | null>(null)

onMounted(() => {
  taskStore.init()
})

function createTask() {
  if (!newTask.value.trim()) return

  const task: Task = {
    id: crypto.randomUUID(),
    title: newTask.value,
    completed: false,
    createdAt: new Date(),
    dueDate: selectedDueDate.value ? new Date(selectedDueDate.value) : null,
    priority: selectedPriority.value
  }

  taskStore.addTask(task)
  newTask.value = ''
}

function isOverdue(task: Task) {
  if (!task.dueDate || task.completed) return false

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const due = new Date(task.dueDate)
  due.setHours(0, 0, 0, 0)

  return due < today
}

function onStatusChange(event: CustomEvent) {
  taskStore.setStatusFilter(event.detail.value)
}

function onPriorityChange(event: CustomEvent) {
  taskStore.setPriorityFilter(event.detail.value)
}

function priorityColor(priority: 'low' | 'medium' | 'high') {
  const map = {
    low: 'success',
    medium: 'warning',
    high: 'danger'
  }

  return map[priority]
}


</script>

<style scoped>
.completed {
  text-decoration: line-through;
  opacity: 0.6;
}

.overdue {
  color: var(--ion-color-danger);
  font-weight: bold;
}
</style>