<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tasks" href="/tabs/tasks">
          <ion-icon :icon="list" />
          <!--<ion-label>Tasks</ion-label>-->
        </ion-tab-button>

        <ion-tab-button tab="add" href="/tabs/add">
          <ion-icon :icon="add" />
          <!--<ion-label>Add</ion-label>-->
        </ion-tab-button>

        <ion-tab-button tab="statistics" href="/tabs/statistics">
          <ion-icon :icon="statsChart" />
          <!--<ion-label>Stats</ion-label>-->
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle, list, add, statsChart } from 'ionicons/icons';
</script>
