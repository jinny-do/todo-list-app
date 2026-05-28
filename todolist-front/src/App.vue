<script setup lang="js">
import { computed } from "vue";
import { useRoute } from "vue-router";

import DefaultLayout from "./layouts/DefaultLayout.vue";
import EmptyLayout from "./layouts/EmptyLayout.vue";

const route = useRoute();

const layout = computed(() => {
  return route.meta.layout || "default";
});
</script>

<template>
  <DefaultLayout v-if="layout === 'default'" />
  <EmptyLayout v-else />
</template>
