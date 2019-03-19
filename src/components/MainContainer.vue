<template>
  <div class="hello">
    <h1>{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import Vue, { VNode, Component } from 'vue';

const Component = Vue.extend({
  data() {
    return {
      msg: '',
      title: 'Welcome to Your Daily News Summary',
    };
  },
  methods: {
    updateFields() {
      this.msg = 'RSS Data Retrieved';
    },
  },
  render(createElement): VNode {
    return createElement('div');
  },
});

export default Component;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
