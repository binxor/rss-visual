<template>
  <div class>
    <div v-if="this.errors.length > 0">
      <h3 id="errorMessage">{{errorMsg}}</h3>
    </div>

    <button :key=b.key v-for='b of buttons' 
      v-on:click="updateResponse(b.key)">{{b.display}}</button>
    <br/><br/>
  
    <div v-if="this.awsSentimentResolved">
      <br/>
      <leaderboardComponent :key="leaderKey" v-bind:awsSentimentResponse="this.awsSentimentResponse">Leaderboard will replace this text</leaderboardComponent>
    </div>

    <div v-if="this.watsonSentimentResolved">
      <br/>
      <breakdownComponent :key="breakdownkey" v-bind:watsonSentimentResponse="this.watsonSentimentResponse">Breakdown will replace this text</breakdownComponent>
    </div>

    <div v-if="this.resolved">
      <br/>
      <chartComponent :key="chartKey" :series="this.initSeries" v-bind:response="this.response">Chart component will replace this text</chartComponent>
    </div>
    
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
import breakdownComponent from '@/components/breakdownComponent.vue';

const Component = Vue.extend({
    data: () => {
        return {
            awsSentimentResolved: false,
            awsSentimentResponse: {
              SentimentScore: {
                Mixed: 0,
                Positive: 0,
                Neutral: 0,
                Negative: 0,
              },
              Sentiment: 'UNKNOWN',
            },
            breakdownkey: 0,
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
            sentimentUrl: {
              aws: 'http://localhost:3000/sentimentAWS',
              watson: 'http://localhost:3000/sentimentWatson'
            },
            src: '',
            watsonSentimentResolved: false, 
            watsonSentimentResponse: {
                  "document_tone": {
                    "tones": []
                  },
                  "sentences_tone": [
                    {
                      "sentence_id": 0,
                      "text": "Pete Buttigieg, the millennial-aged mayor of South Bend, Indiana, who has enjoyed a surge in opinion polls and a torrent of media coverage, formally launched a bid on Sunday for the 2020 Democratic presidential nomination.,President",
                      "tones": [
                        {
                          "score": 0.57175,
                          "tone_id": "joy",
                          "tone_name": "Joy"
                        }
                      ]
                    },
                    {
                      "sentence_id": 1,
                      "text": "Donald Trump did not wish any harm in his Twitter post criticizing Democratic congresswoman Ilhan Omar's comments on the 9/11 attacks, White House spokeswoman Sarah Sanders said on Sunday.,As recently as February, Special Counsel Robert Mueller's team dropped hints that the inquiry into Russia's role in the 2016 U.S. election might unearth evidence of active cooperation between Moscow and President Donald Trump's campaign.,President",
                      "tones": []
                    },
                    {
                      "sentence_id": 2,
                      "text": "Donald Trump may have threatened to transport illegal immigrants to so-called sanctuary cities to \"make everybody crazy\" and generate media attention, Republican U.S. Senator Rick Scott said on Sunday.,Democratic",
                      "tones": []
                    },
                    {
                      "sentence_id": 3,
                      "text": "U.S. Senator Kamala Harris released on Sunday 15 years of tax returns through 2018, offering the most complete look to date at a presidential candidate's finances.,U.S.",
                      "tones": []
                    },
                    {
                      "sentence_id": 4,
                      "text": "Senator Cory Booker held the first major rally of his presidential campaign on Saturday in the city that launched his political career, saying America \"can't wait\" any longer to address the country's deep divisions and urgent problems.,U.S. House of Representatives Speaker Nancy Pelosi criticized President Donald Trump on Saturday for a Twitter post that used 9/11 imagery while suggesting Democratic Congresswoman Ilhan Omar, a Muslim, was dismissive of the New York attacks.,U.S. congressional Democrats on Saturday headed for a showdown with the Internal Revenue Service over President Donald Trump's tax returns, setting a new hard deadline of April 23 for the federal tax agency to hand the documents over to lawmakers.,U.S. Treasury Secretary Steven Mnuchin said on Saturday he could not commit to meeting Democrats' new April 23 deadline for turning over President Donald Trump's tax returns to them, adding that he wanted to keep the Internal Revenue Service from being \"weaponized\" for political gain.,Two",
                      "tones": [
                        {
                          "score": 0.557848,
                          "tone_id": "joy",
                          "tone_name": "Joy"
                        }
                      ]
                    },
                    {
                      "sentence_id": 5,
                      "text": "U.S. senators introduced a bill on Tuesday to ban online social media companies like Facebook Inc and Twitter Inc from tricking consumers into giving up their personal data.,U.S. Secretary of State Mike Pompeo on Friday defended sanctions on Venezuela and said the United States would not \"quit the fight\" in the socialist-run Latin American nation which is spiraling into deepening economic and political crisis.,Potential",
                      "tones": []
                    },
                    {
                      "sentence_id": 6,
                      "text": "Federal Reserve board nominee Stephen Moore, picked by U.S. President Donald Trump, faced new criticism on Friday, with Democratic Senator Elizabeth Warren accusing him of lacking competencies to serve in that role.,President",
                      "tones": []
                    },
                    {
                      "sentence_id": 7,
                      "text": "Donald Trump said on Friday he was considering sending illegal immigrants in the country to so-called sanctuary cities, prompting U.S. mayors to accept such an offer as the battle over border security raged.,The",
                      "tones": [
                        {
                          "score": 0.559958,
                          "tone_id": "anger",
                          "tone_name": "Anger"
                        }
                      ]
                    },
                    {
                      "sentence_id": 8,
                      "text": "U.S. government can continue at least temporarily to send asylum seekers back to Mexico after President Donald Trump scored a rare ruling in his favor on Friday from the U.S. 9th Circuit Court of Appeals.,Democratic",
                      "tones": []
                    },
                    {
                      "sentence_id": 9,
                      "text": "U.S. mayors said on Friday their cities would welcome illegal immigrants, dismissing President Donald Trump's threats to transport people detained at the border to \"sanctuary cities\" as illustrating the White House's callous approach to the issue.,U.S.",
                      "tones": []
                    },
                    {
                      "sentence_id": 10,
                      "text": "Senator Mark Warner, who co-sponsored legislation this week to ban deceptive practices by social media companies, said on Thursday he was eyeing additional bills aimed at limiting hate speech and allowing users to move their data across platforms.,Special",
                      "tones": [
                        {
                          "score": 0.534848,
                          "tone_id": "anger",
                          "tone_name": "Anger"
                        }
                      ]
                    },
                    {
                      "sentence_id": 11,
                      "text": "Counsel Robert Mueller's probe of Russian interference in U.S. politics is over, but prosecutors are investigating two prominent Washington lobbyists for their work for the former pro-Russian government of Ukraine, according to three sources close to the probe.,U.S.",
                      "tones": [
                        {
                          "score": 0.585079,
                          "tone_id": "fear",
                          "tone_name": "Fear"
                        }
                      ]
                    },
                    {
                      "sentence_id": 12,
                      "text": "Senator Kamala Harris held just one public event this week during her third trip to Iowa since joining the contest for the 2020 Democratic presidential nomination, a town hall at the University of Iowa where she talked about her plan to raise teacher pay.,U.S.",
                      "tones": []
                    },
                    {
                      "sentence_id": 13,
                      "text": "President Donald Trump said on Friday that he does not want government to lead the effort to deploy next-generation 5G wireless networks.,A",
                      "tones": []
                    },
                    {
                      "sentence_id": 14,
                      "text": "U.S. judge on Friday sentenced Republican political consultant Samuel Patten to 36 months of probation, 500 hours of community service and a $5,000 fine in a case spun out of U.S. Special Counsel Robert Mueller's Russia probe.",
                      "tones": []
                    }
                  ]
                }
        };
    },
    created() {
        axios.get(this.rssUrl)
        .then((res) => {
            this.response = res.data;
            this.resolved = true;

            // AWS COMPREHEND SENTIMENT API CALL
            axios.post(this.sentimentUrl.aws, {
              text: res.data["snippets"].join(), 
            })
            .then((res) => {
              this.awsSentimentResponse = res.data;
              this.awsSentimentResolved = true;
            })
            .catch((e) => {
              this.errors.push(e);
            });

            // WATSON TONE ANALYZER API CALL
            axios.post(this.sentimentUrl.watson, {
              text: res.data["snippets"].join(), 
            })
            .then((res) => {
              this.watsonSentimentResponse = res.data;
              this.watsonSentimentResolved = true;
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
      breakdownComponent,
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
    awsSentimentResponse: {
      handler(val) {
        this.awsSentimentResolved = false;
        this.awsSentimentResolved = true;
        this.$forceUpdate();
      },
      deep: true,
    },
    watsonSentimentResponse: {
      handler(val) {
        this.watsonSentimentResolved = false;
        this.watsonSentimentResolved = true;
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