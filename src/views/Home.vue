<template>
  <div class="home">
    <MainContainer msg=""/>
    <VisualContainer/>
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
