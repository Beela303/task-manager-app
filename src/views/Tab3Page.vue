<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Statistics</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <!-- ================= STATISTICS ================= -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Statistics</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <p>Total: {{ totalTasks }}</p>
          <p>Completed: {{ completedCount }}</p>
          <p>Pending: {{ pendingCount }}</p>
          <p>Completion: {{ completionRate }}%</p>

          <ion-progress-bar
            :value="completionRate / 100"
          />
        </ion-card-content>
      </ion-card>

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

import draggable from 'vuedraggable'
import { useTaskStore } from '@/stores/task.store'
import { Task } from '@/types/task'

const taskStore = useTaskStore()

const newTask = ref('')
const selectedPriority = ref<'low' | 'medium' | 'high'>('medium')
const selectedDueDate = ref<string | null>(null)

onMounted(() => {
  taskStore.init()
})

/* ================= STATISTICS ================= */

const totalTasks = computed(() => taskStore.tasks.length)

const completedCount = computed(() =>
  taskStore.tasks.filter(t => t.completed).length
)

const pendingCount = computed(() =>
  taskStore.tasks.filter(t => !t.completed).length
)

const completionRate = computed(() =>
  totalTasks.value
    ? Math.round((completedCount.value / totalTasks.value) * 100)
    : 0
)
</script>

<style scoped>

</style>