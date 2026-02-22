<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>

<style lang="scss">
//COLORS
$text-color: #fafafa;
$primary-color: #1c021eff;
$secondary: #4a0847ff;
$tertiary: #bc0c79ff;

* {
  font-family: "Lobster Two", sans-serif;
  font-weight: 400;
  font-style: normal;
}

ion-content {
  //--background: #fafafa;
}

ion-toolbar {
  --background: #4a0847ff;
}

ion-title {
  text-align: center;
  font-size: 2rem;
}

ion-icon {
  color: $text-color;
  background-color: $primary-color;

  border-radius: 50%;

  transform: scale(1.2);
  transition: transform 0.2s;

  &:hover {
    color: $primary-color;
    background-color: $text-color;
  }
}

ion-searchbar {
  --background: #bc0c79ff !important;
  --icon-color: #fafafa !important;
  --border-color: #fafafa !important;
  --border-radius: 30px !important;
}

ion-button {
  --background: #1c021eff;
  --background-hover: #930d9bff;
  --background-activated: #8f0be7ff;
  --background-focused: #bc0c79ff;

  --color: #fafafa;

  --border-radius: 30px;

  --ripple-color: deeppink;
}

ion-checkbox {
  --checkmark-color: #fafafa;
  --checkbox-background-checked: #bc0c79ff;
  --border-color-checked: #bc0c79ff;
}

ion-datetime {
  --color: #fafafa !important;
  --background: #bc0c79ff;
}
</style>