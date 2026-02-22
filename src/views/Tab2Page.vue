<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Add Tasks</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- ================= ADD TASK ================= -->
      <ion-item>
        <ion-input
          v-model="newTask"
          placeholder="Enter task"
        />
      </ion-item>

      <ion-item>
        <ion-label>Priority</ion-label>
        <ion-select v-model="selectedPriority" slot="end">
          <ion-select-option value="low">Low</ion-select-option>
          <ion-select-option value="medium">Medium</ion-select-option>
          <ion-select-option value="high">High</ion-select-option>
        </ion-select>
      </ion-item>

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

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonCheckbox,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonBadge,
  IonDatetime,
  IonSearchbar,
  IonModal,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonProgressBar
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
    dueDate: selectedDueDate.value
      ? new Date(selectedDueDate.value)
      : null,
    priority: selectedPriority.value
  }

  taskStore.addTask(task)
  newTask.value = ''
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

.task-item {
  transition: all 0.3s ease;
}

.dragging {
  opacity: 0.5;
}
</style>