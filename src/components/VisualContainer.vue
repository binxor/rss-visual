<template>
  <div class>
    <h1>Visual Container rendered correctly</h1>
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from 'vue';

const Component = Vue.extend({
    data: () => {
        return {};
    },
    render(createElement): VNode {
        return createElement('div');
    },
});

export default Component;
</script>

<style scoped>
</style>