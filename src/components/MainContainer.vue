<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <h3>{{ msg }}</h3>
    <button @onClick="updateResponse">Refresh</button>
    <pre>{{ this.response }}</pre>
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from 'vue';
import axios from 'axios';

const Component = Vue.extend({
  data() {
    return {
      response: 'default response',
      msg: 'default msg',
      title: 'News Sucks',
      errors: Array(),
      rssUrl: 'http://localhost:3000/rssString',
    };
  },
  created() {
    axios.get(this.rssUrl)
    .then((res) => {
      this.response = res.data;
      this.updateFields();
    })
    .catch((e) => {
      this.errors.push(e);
    });
  },
  methods: {
    updateFields() {
      this.msg = 'RSS Data Retrieved';
    },
  },
  computed: {
    updateResponse(): string {
      // this.response = 'direct replacement: dummy response';
      // return this.response;
      return '';
    },
  },
  render(createElement): VNode {
    return createElement('div', this.response);
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
