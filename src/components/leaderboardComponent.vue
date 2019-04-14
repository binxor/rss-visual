<template>
    <div>
        <div id="leaderboard">
            <div id="sentimentContainer">
                <div id="tilesContainer">AWS Sentiment: <span v-bind:style="{'color':getColor(dominantTone)}">{{dominantTone}}</span></div>
                <div id="piechartContainer">
                    <div id="piechart"></div>
                </div>
            </div>
        </div>
        <br/>
    </div>
</template>

<script>
import Highcharts from 'highcharts';
export default {
    name : 'Leaderboard',
    props : {
        awsSentimentResponse: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            dominantTone: ''
        };
    },
    mounted() {
        const sentData = [];
        const scores = this.awsSentimentResponse.SentimentScore;
        for (const s in scores) {
            sentData.push({
                name: s,
                y: Math.floor(scores[s] * 1000) / 10,
                color: this.getColor(s),
            });
        }
        this.dominantTone = this.getDominantTone(this.awsSentimentResponse);
        this.target = Highcharts.chart('piechart', {
            chart: {
                type: 'column',
                width: 550,
                height: 150
            },
            title: {
                text: 'AWS Comprehend Sentiment Scores',
            },
            xAxis: {
                type: 'category',
                title: {
                    text: 'Sentiment'
                },
            },
            yAxis: {
                title: {
                    text: 'Percentage (%)'
                },
            },
            legend: {
                enabled: false,
                itemStyle: {
                    fontSize: '16px',
                },
            },
            tooltip: {
                valueSuffix: ' %',
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                    },
                    showInLegend: true,
                },
                pie: {
                    dataLabels: {
                        style: {
                            fontSize: '14px',
                        },
                    },
                },
            },
            credits: {
                enabled: false,
            },
            exporting: {
                enabled: true,
            },
            series: [
                {
                    name: 'Percent',
                    colorByPoint: true,
                    data: sentData,
                },
            ],
        });
    },
    methods: {
        percent: (val) => {
            return Math.floor(val * 1000) / 10 + '%';
        },
        getClass: (key) => {
            return 'rating' + key;
        },
        getColor: (key) => {
            let color = '';
            switch (key.toLowerCase()) {
                case 'mixed':
                    color = 'purple';
                    break;
                case 'positive':
                    color = 'teal';
                    break;
                case 'neutral':
                    color = 'lightgrey';
                    break;
                case 'negative':
                    color = 'red';
                    break;
            }
            return color;
        },
        getDominantTone: (sr) => {
            return sr.Sentiment;
        }
    },
};
</script>

<style scoped>
#leaderboard {
  /* float: left; */
  border: 1px solid grey; 
  border-radius:10px;
}
.overallRating {
    border: solid 1px lightgrey;
    border-radius: 10px;
    width: 25%;
    padding-top: 10px;
    padding-bottom: 10px;
    display: inline-block;
    color: white;
}
.overallRatingTitle {
    font-size: 2.5vw;
}
#piechart {
    height: 150px;
}
.rating {
    border: solid 1px lightgrey;
    border-radius: 10px;
    width: 12%;
    padding-top: 5px;
    padding-bottom: 5px;
    display: inline-block;
    color: white;
}
.ratingText {
    font-size: 2.5vw;
}
.ratingMixed {
    background-color: purple;
}
.ratingPositive {
    background-color: teal;
}
.ratingNeutral {
    background-color: lightgrey;
}
.ratingNegative {
    background-color: red;
}
</style>