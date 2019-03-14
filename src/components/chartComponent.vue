<template>
    <div>
        <div id="wordcloud"></div>
        <!-- <div id="linechart"></div> -->
    </div>
</template>

<script>
import Highcharts from 'highcharts';
import loadWordcloud from 'highcharts/modules/wordcloud';

loadWordcloud(Highcharts);

export default {
  name : 'Chart',
  props : {
    series : {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      target: undefined,
    };
  },
  mounted() {
    const text = 'U.S. House panel launches probe obstruction Trump Presidential hopeful Booker, Selma, U.S. failing people Democrats votes block Trump\'s border emergency U.S. Senate Trump big U.S. savings curbing joint South Korea military drills U.S. agency probing fatal Tesla crashes Florida Sunday Ostrich jacket, fake rallies, therapy dogs odd scenes Trump-Russia probe White House host CEOs workforce advisory meeting Trump slams Mueller, mocks critics fiery two-hour speech Bernie Sanders personal hits 2020 campaign trail Trump vows executive order requiring \'free speech\' colleges Explainer: Trump-Russia probe, collusion crime? House panel demands Kushner clearance details White House Washington\'s Inslee puts climate change center presidential bid Centrist Democrats stray votes, roiling House majority party Manafort seeks sentence guidelines Virginia case Warmbier parents blast \'evil\' North Korea regime Trump praises Kim Factbox: Democratic presidential contenders jump 2020 race Warmbier parents blast \'evil\' North Korea regime Trump praises Kim Factbox: Democrats Congress aim Trump multiple probes U.S. increases pressure Maduro sanctions, revokes visas associates';
    const lines = text.split(/[,. ]+/g);
    const data = Highcharts.reduce(lines, (arr, word) => {
        let obj = Highcharts.find(arr, (o) => {
          return o.name === word;
        });
        if (obj) {
          obj.weight += 1;
        } else {
          obj = {
            name: word,
            weight: 1,
          };
          arr.push(obj);
        }
        return arr;
      }, []);

    this.target = Highcharts.chart('wordcloud', {
      series: [{
        type: 'wordcloud',
        data: data,
        name: 'Occurrences',
      }],
      title: {
        text: 'In the News',
      },
    });
    // this.target = Highcharts.chart('linechart', {
    //   title: {
    //     text: 'Monthly Average Temperature',
    //     x: -20, // center
    //   },
    //   subtitle: {
    //     text: 'Source: WorldClimate.com',
    //     x: -20,
    //   },
    //   xAxis: {
    //     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    //     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    //   },
    //   yAxis: {
    //     title: {
    //     text: 'Temperature (°C)',
    //   },
    //   plotLines: [{
    //     value: 0,
    //     width: 1,
    //     color: '#808080',
    //   }],
    // },
    // tooltip: {
    //   valueSuffix: '°C',
    // },
    // legend: {
    //   layout: 'vertical',
    //   align: 'right',
    //   verticalAlign: 'middle',
    //   borderWidth: 0,
    // },
    // series: this.series,
    // });
  },
  beforeDestroy() {
    this.target.destroy();
  },
};
</script>