<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Statistics</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <div class="circle-wrapper">
        <svg viewBox="0 0 36 36" class="circular-chart">
          <path
            class="circle-bg"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            class="circle"
            :stroke-dasharray="completionRate + ', 100'"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" class="percentage">
            {{ completionRate }}%
          </text>
        </svg>
      </div>

      <ion-card>
        <ion-card-content>
          <p>Total: {{ totalTasks }}</p>
          <p>Completed: {{ completedCount }}</p>
          <p>Pending: {{ pendingCount }}</p>
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

import { useTaskStore } from '@/stores/task.store'

const taskStore = useTaskStore()

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

/*import draggable from 'vuedraggable'
import { useTaskStore } from '@/stores/task.store'
import { Task } from '@/types/task'

const taskStore = useTaskStore()

const newTask = ref('')
const selectedPriority = ref<'low' | 'medium' | 'high'>('medium')
const selectedDueDate = ref<string | null>(null)

onMounted(() => {
  taskStore.init()
})*/

/* ================= STATISTICS ================= */

/*const totalTasks = computed(() => taskStore.tasks.length)

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
)*/
</script>

<style scoped lang="scss">
//COLORS
$text-color: #fafafa;
$primary-color: #1c021eff;
$secondary: #4a0847ff;
$tertiary: #bc0c79ff;

.circle-wrapper {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}

.circular-chart {
  max-width: 200px;
  max-height: 200px;
}

.circle-bg {
  fill: none;
  stroke: #eee;
  stroke-width: 3.8;
}

.circle {
  fill: none;
  /*stroke: var(--ion-color-primary);*/
  stroke: $tertiary;
  stroke-width: 3.8;
  stroke-linecap: round;
  transition: stroke-dasharray 0.6s ease;
}

.percentage {
  fill: var(--ion-text-color);
  font-size: 0.5em;
  text-anchor: middle;
}

ion-card {
  color: $text-color;
  background: $tertiary;
}
</style>