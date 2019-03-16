<template>
  <div class>
    <span v-if="this.resolved">
      <chartComponent :series="this.initSeries" v-bind:response="this.response">Chart component will replace this text</chartComponent>
    </span>
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
            response: {'words':'default response'},
            resolved: false,
            errors: Array(),
            rssUrl: 'http://localhost:3000/rssString',
        };
    },
    created() {
        axios.get(this.rssUrl)
        .then((res) => {
            this.response = res.data;
            this.resolved = true;
        })
        .catch((e) => {
            this.errors.push(e);
        });
    },
    components: {
        chartComponent,
    },
    computed: {
      initSeries: () => {
        return [
          {
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
          }, {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5],
          }, {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0],
          }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
          }];
        },
    },
});

export default Component;
</script>

<style scoped>
</style>