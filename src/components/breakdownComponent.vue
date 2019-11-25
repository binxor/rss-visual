<template>
    <div>
        <div id="breakdown">
            <table>
                <tr>
                    <td>
                        <div id="drilldown"></div>
                    </td>
                    <td>
                        <div id="radarchart"></div>
                    </td>
                </tr>
            </table>

            <!-- <div v-bind:key="k" v-for="(v,k) of sentencesTone" v-if="v.tones && v.tones.length > 0">
                {{v.tones}}
            </div> -->
            <table>
                <tr v-bind:key="'td'+k" v-for="(v,k) of sentencesTone">
                    <td>
                        {{v.text}}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import loadDrilldown from 'highcharts/modules/drilldown';

highchartsMore(Highcharts);
loadDrilldown(Highcharts);

export default {
    name: 'Breakdown',
    props: {
        watsonSentimentResponse: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            sentencesTone: [],
            watsonDominantTone: []
        }
    },
    mounted() {
        this.watsonDominantTone = this.getWatsonDominantTone(this.watsonSentimentResponse);
        this.sentencesTone = this.watsonSentimentResponse.sentences_tone;

        let tonesChartDataLvl0 = [], tonesChartDataLvl1 = [], scores = {}, polarSentencesData = [], polarOverallData = [];

        const watsonTones = [
            'Analytical', 
            'Anger', 
            'Confident', 
            'Fear', 
            'Joy', 
            'Sadness',
            'Tentative'];

        for (let s=0; s<watsonTones.length; s++) {
            scores[watsonTones[s]] = {
                sentenceCount: 0,
                sentenceScores: []
            }

            tonesChartDataLvl0.push({
                name: watsonTones[s],
                y: 0,
                drilldown: null
            });

            tonesChartDataLvl1.push({
                name: watsonTones[s],
                id: watsonTones[s],
                data: []
            });

            polarSentencesData.push(0);
            polarOverallData.push(0);  //todo
        }

        Highcharts.reduce(this.sentencesTone,(a, ele) => {
            for (let t=0; t<ele.tones.length; t++) {
                scores[ele.tones[t].tone_name].sentenceCount++;
                scores[ele.tones[t].tone_name].sentenceScores.push(ele.tones[t].score*100);
                
                polarSentencesData[watsonTones.indexOf(ele.tones[t].tone_name)]++;
                tonesChartDataLvl1[watsonTones.indexOf(ele.tones[t].tone_name)].data.push([
                    ele.text.replace(/(([^\s]+\s\s*){5})(.*)/,"$1…"), 
                    ele.tones[t].score*100
                ]);   
                tonesChartDataLvl0[watsonTones.indexOf(ele.tones[t].tone_name)].y = scores[ele.tones[t].tone_name].sentenceScores.reduce((p,c,_,a) => p + c,0)/this.sentencesTone.length;
                tonesChartDataLvl0[watsonTones.indexOf(ele.tones[t].tone_name)].drilldown = ele.tones[t].tone_name;
            }
        });

        // Polar chart
        Highcharts.chart('radarchart', {
            chart: {
                polar: true,
                type: 'area',
                width: 550,
                height: 250,
            },
            title: {
                text: 'IBM Watson Dominant Tones',
            },
            pane: {
                size: '100%'
            },
            xAxis: {
                categories: watsonTones,
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0
            },
            legend: {
                // align: 'right',
                // verticalAlign: 'middle'
            },
            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
            },
            credits: {
                enabled: false,
            },
            series: [{
                name: 'Sentences',
                data: polarSentencesData, //todo
                pointPlacement: 'on'
            }, {
                name: 'Overall',
                data: polarOverallData,  //todo
                pointPlacement: 'on'
            }],
            responsive: {
                rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom'
                        },
                        pane: {
                        size: '70%'
                        }
                    }
                }]
            }
        });

        // Drilldown chart
        Highcharts.chart('drilldown', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'IBM Watson Tone Analysis Scores'
            },
            subtitle: {
                text: 'Click the bars to view sentence scores'
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Scores'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}%'
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },
            credits: {
                enabled: false,
            },
            series: [
                {
                name: "Sentiment",
                colorByPoint: true,
                data: tonesChartDataLvl0
                }
            ],
            drilldown: {
                series: tonesChartDataLvl1
            }
        });
    },
    methods: {
        getWatsonDominantTone: (tones) => {
            return tones.document_tone.tones.join(", ") || "None";
        }
    }
};
</script>

<style scoped>
#breakdown {
    width: 80%;
    margin-left: 10%;
}
table {
    width: auto;
}
td {
    /* width: 50%; */
}
</style>