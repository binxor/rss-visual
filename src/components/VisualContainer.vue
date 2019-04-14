<template>
  <div class>
    <div v-if="this.errors.length > 0">
      <h3 id="errorMessage">{{errorMsg}}</h3>
    </div>
    <button :key=b.key v-for='b of buttons' 
      v-on:click="updateResponse(b.key)">{{b.display}}</button>
    <br/><br/>
    <span v-if="this.sentimentResolved">
      <leaderboardComponent :key="leaderKey" v-bind:sentimentResponse="this.sentimentResponse">Leaderboard will replace this text</leaderboardComponent>
    </span>
    <span v-if="this.resolved">
      <chartComponent :key="chartKey" :series="this.initSeries" v-bind:response="this.response">Chart component will replace this text</chartComponent>
    </span>
    <div v-if="this.errors.length > 0">
      <div style="border: 1px solid grey; border-radius:10px;">
        ERRORS: <pre>{{ this.errors }}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from 'vue';
import axios from 'axios';
import chartComponent from '@/components/chartComponent.vue';
import leaderboardComponent from '@/components/leaderboardComponent.vue';

const Component = Vue.extend({
    data: () => {
        return {
            buttons: [
              {key: 'business', display: 'Business'},
              {key: 'company', display: 'Company'},
              {key: 'health', display: 'Health'},
              {key: 'lifestyle', display: 'Lifestyle'},
              {key: 'odd', display: 'Odd'},
              {key: 'politics', display: 'Politics'},
              {key: 'science', display: 'Science'},
              {key: 'security', display: 'Security'},
              {key: 'technology', display: 'Technology'},
              {key: 'top', display: 'Top'},
              {key: 'world', display: 'World'},
            ],
            chartKey: 0,
            errorMsg: '',
            errors: Array(),
            leaderKey: 0,
            response: {words: 'default default default response response'},
            resolved: false,
            rssUrl: 'http://localhost:3000/rssString',
            sentimentResolved: false,
            sentimentResponse: {
              SentimentScore: {
                Mixed: 0,
                Positive: 0,
                Neutral: 0,
                Negative: 0,
              },
              Sentiment: 'UNKNOWN',
            },
            sentimentAnalysis: {
            sentimentUrl: 'http://localhost:3000/sentiment',
            src: '',
        };
    },
    created() {
        axios.get(this.rssUrl)
        .then((res) => {
            this.response = res.data;
            this.resolved = true;

            axios.post(this.sentimentUrl, {
              text: res.data["snippets"].join(),
            })
            .then((res) => {
              this.sentimentResponse = res.data;
          this.sentimentResolved = true;
        })
            .catch((e) => {
              this.errors.push(e);
            });
        
        })
        .catch((e) => {
            this.errorMsg = 'We haven\'t heard back from our REST API, so here\'s a preview...';
            this.errors.push(e);
            this.response = {words: 'U.S. House panel launches probe obstruction Trump Presidential hopeful Booker, Selma, U.S. failing people Democrats votes block Trump\'s border emergency U.S. Senate Trump big U.S. savings curbing joint South Korea military drills U.S. agency probing fatal Tesla crashes Florida Sunday Ostrich jacket, fake rallies, therapy dogs odd scenes Trump-Russia probe White House host CEOs workforce advisory meeting Trump slams Mueller, mocks critics fiery two-hour speech Bernie Sanders personal hits 2020 campaign trail Trump vows executive order requiring \'free speech\' colleges Explainer: Trump-Russia probe, collusion crime? House panel demands Kushner clearance details White House Washington\'s Inslee puts climate change center presidential bid Centrist Democrats stray votes, roiling House majority party Manafort seeks sentence guidelines Virginia case Warmbier parents blast \'evil\' North Korea regime Trump praises Kim Factbox: Democratic presidential contenders jump 2020 race Warmbier parents blast \'evil\' North Korea regime Trump praises Kim Factbox: Democrats Congress aim Trump multiple probes U.S. increases pressure Maduro sanctions, revokes visas associates'};
            this.resolved = true;
        });

        
    },
    methods: {
      updateResponse(src: string) {
        axios.get(this.rssUrl + '/' + src)
        .then((res) => {
            this.response = res.data;
            this.resolved = true;
            this.chartKey += 1;
            this.errors = [];
        })
        .catch((e) => {
            this.errorMsg = 'This source isn\'t responding.';
            this.errors.push(e);
        });
      },
    },
    components: {
        chartComponent,
        leaderboardComponent,
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
   watch: {
    response: {
      handler(val) {
        this.resolved = false;
        this.resolved = true;
        this.$forceUpdate();
      },
      deep: true,
    },
    sentimentResponse: {
      handler(val) {
        this.sentimentResolved = false;
        this.sentimentResolved = true;
        this.$forceUpdate();
      },
      deep: true,
    },
  },
});

export default Component;
</script>

<style scoped>
#errorMessage {
  border: 1px solid grey; 
  border-radius:10px;
  background:#ddd
}
</style>