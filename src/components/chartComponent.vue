<template>
    <div>
        <h1>Chart Component rendered correctly</h1>
    </div>
</template>

<script lang="ts">
import Vue, { VNode } from 'vue';

const chartComponent = Vue.extend({
    data: () => {
        return {};
    },
    render(createElement): VNode {
        return createElement('div');
    },
});

export default chartComponent;
</script>