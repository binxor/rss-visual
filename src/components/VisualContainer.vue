<template>
  <div class>
    <h1>Visual Container rendered correctly</h1>
    <chartComponent>Chart component will replace this text</chartComponent>
    <pre>ERRORS: {{ this.errors }}</pre>
    <pre>{{ this.response }}</pre>
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from 'vue';
import axios from 'axios';
import chartComponent from '@/components/chartComponent.vue';

const Component = Vue.extend({
    data: () => {
        return {
            response: 'default response',
            errors: Array(),
            rssUrl: 'http://localhost:3000/rssString',
        };
    },
    created() {
        axios.get(this.rssUrl)
        .then((res) => {
            this.response = res.data;
            // this.updateFields();
        })
        .catch((e) => {
            this.errors.push(e);
        });
    },
    render(createElement): VNode {
        return createElement('div', this.response);
    },
    components: {
        chartComponent,
    },
});

export default Component;
</script>

<style scoped>
</style>