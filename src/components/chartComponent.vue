<template>
    <div>
        <div id="wordcloud"></div>
        <div id="barchart"></div>
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
    response: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      target: undefined,
    };
  },
  mounted() {
    // const text = 'U.S. House panel launches probe obstruction Trump Presidential hopeful Booker, Selma, U.S. failing people Democrats votes block Trump\'s border emergency U.S. Senate Trump big U.S. savings curbing joint South Korea military drills U.S. agency probing fatal Tesla crashes Florida Sunday Ostrich jacket, fake rallies, therapy dogs odd scenes Trump-Russia probe White House host CEOs workforce advisory meeting Trump slams Mueller, mocks critics fiery two-hour speech Bernie Sanders personal hits 2020 campaign trail Trump vows executive order requiring \'free speech\' colleges Explainer: Trump-Russia probe, collusion crime? House panel demands Kushner clearance details White House Washington\'s Inslee puts climate change center presidential bid Centrist Democrats stray votes, roiling House majority party Manafort seeks sentence guidelines Virginia case Warmbier parents blast \'evil\' North Korea regime Trump praises Kim Factbox: Democratic presidential contenders jump 2020 race Warmbier parents blast \'evil\' North Korea regime Trump praises Kim Factbox: Democrats Congress aim Trump multiple probes U.S. increases pressure Maduro sanctions, revokes visas associates';
    const text = this.response.words;
    const lines = text.split(/[,. ]+/g);
    const wordData = Highcharts.reduce(lines, (arr, word) => {
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
        data: wordData,
        name: 'Occurrences',
      }],
      title: {
        text: 'Most Frequently Used Words in Today\'s Headlines',
      },
    });
    let countsData = Highcharts.reduce(lines, (arr, word) => {
      let obj = Highcharts.find(arr, (o) => {
        return o.name === word;
      });
      if (obj) {
        obj.y += 1;
      } else {
        obj = {
          name: word,
          y: 1,
        };
        arr.push(obj);
      }
      return arr;
    }, []);
    countsData.sort((a, b) => (a.ly < b.y) ? 1 : ((b.y < a.y) ? -1 : 0));
    countsData = countsData.slice(0, 10);
    this.target = Highcharts.chart('barchart', {
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Top 10 Repeated Words',
      },
      subtitle: {
        text: 'How Many Times Each Shows Up',
      },
      xAxis: {
        type: 'category',
      },
      yAxis: {
        title: {
          text: 'Occurances in Headlines',
          align: 'high',
        },
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        valueSuffix: ' times',
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
          },
        },
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: 'Occurances',
          colorByPoint: true,
          data: countsData,
        },
      ],
    });
  },
};
</script>