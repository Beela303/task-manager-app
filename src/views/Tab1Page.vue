<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tasks</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <!-- Search Bar -->
      <ion-searchbar
        placeholder="Search tasks"
        @ionInput="taskStore.setSearchQuery($event.detail.value)"
      />

      <!--@ionInput="taskStore.setSearchQuery($event.detail.value || '')"-->
        
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
      <!--<ion-segment
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
      </ion-segment>-->

      <!-- Priority Filter -->
      <!--<ion-item>
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
      </ion-item>-->

      <!-- ================= TASK LIST ================= -->

      <draggable
        :list="taskStore.filteredTasks"
        item-key="id"
        tag="div"
        ghost-class="dragging"
        :disabled="isFiltering"
        @end="onDragEnd"
      >
        <template #item="{ element: task }">
          <ion-item class="task-item">

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
              @click="openEdit(task)"
            >
              {{ task.title }}

              <div v-if="task.dueDate">
                <small>
                  Due:
                  {{ new Date(task.dueDate).toLocaleDateString() }}
                </small>
              </div>
            </ion-label>

            <ion-badge :color="priorityColor(task.priority)">
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
        </template>
      </draggable>

      <!-- ================= EDIT MODAL ================= -->

      <ion-modal :is-open="isEditOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title>Edit Task</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding" v-if="editingTask">

          <ion-item>
            <ion-input v-model="editingTask.title" />
          </ion-item>

          <ion-item>
            <ion-label>Priority</ion-label>
            <ion-select v-model="editingTask.priority">
              <ion-select-option value="low">Low</ion-select-option>
              <ion-select-option value="medium">Medium</ion-select-option>
              <ion-select-option value="high">High</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-button expand="block" @click="saveEdit">
            Save
          </ion-button>

          <ion-button
            expand="block"
            fill="outline"
            @click="isEditOpen = false"
          >
            Cancel
          </ion-button>

        </ion-content>
      </ion-modal>

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

const isFiltering = computed(() =>
  taskStore.filterStatus !== 'all' ||
  taskStore.filterPriority !== 'all' ||
  taskStore.searchQuery.trim() !== ''
)

const isEditOpen = ref(false)
const editingTask = ref<Task | null>(null)

onMounted(() => {
  taskStore.init()
})

function onDragEnd(event: any) {
  const { oldIndex, newIndex } = event
  if (oldIndex === newIndex) return

  const movedTask = taskStore.filteredTasks[oldIndex]

  const realOldIndex = taskStore.tasks.findIndex(
    t => t.id === movedTask.id
  )

  const [removed] = taskStore.tasks.splice(realOldIndex, 1)
  taskStore.tasks.splice(newIndex, 0, removed)

  taskStore.persist()
}

function openEdit(task: Task) {
  editingTask.value = { ...task }
  isEditOpen.value = true
}

function saveEdit() {
  if (!editingTask.value) return

  const index = taskStore.tasks.findIndex(
    t => t.id === editingTask.value!.id
  )

  if (index !== -1) {
    taskStore.tasks[index] = { ...editingTask.value }
    taskStore.persist()
  }

  isEditOpen.value = false
}

function isOverdue(task: Task) {
  if (!task.dueDate || task.completed) return false
  return new Date(task.dueDate) < new Date()
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

.task-item {
  transition: all 0.3s ease;
}

.dragging {
  opacity: 0.5;
}
</style>