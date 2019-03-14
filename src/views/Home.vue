<template>
  <div class="home">
    <VisualContainer/>
    <MainContainer msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainContainer from '@/components/MainContainer.vue'; // @ is an alias to /src
import VisualContainer from '@/components/VisualContainer.vue';

@Component({
  components: {
    MainContainer,
    VisualContainer,
  },
})
export default class Home extends Vue {}
</script>
