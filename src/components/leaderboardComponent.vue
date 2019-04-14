<template>
    <div>
        <div id="leaderboard">
            <div id="sentimentContainer">
                <div id="tilesContainer">
                    <div :key=key v-for='(val,key) of awsSentimentResponse.SentimentScore'
                    class="rating" v-bind:class="getClass(key)">
                        <div class="overallRatingTitle">{{key}}</div> 
                        <div class="ratingText">{{percent(val)}}</div>
                    </div>
                </div>
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
        },
    },
    data() {
        return {};
    },
    mounted() {
        const sentData = [];
        const scores = this.awsSentimentResponse.SentimentScore;
        for (const s in scores) {
            sentData.push({
                name: s,
                y: scores[s],
                color: this.getColor(s),
            });
        }
        this.target = Highcharts.chart('piechart', {
            chart: {
                type: 'pie',
            },
            title: {
                text: ' ',
            },
            xAxis: {
                type: 'category',
            },
            legend: {
                enabled: false,
                itemStyle: {
                    fontSize: '16px',
                },
            },
            tooltip: {
                valueSuffix: ' ',
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br/>',
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
                        format: '{point.percentage:.1f} %',
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
                    name: 'Points',
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
            switch (key) {
                case 'Mixed':
                    color = 'purple';
                    break;
                case 'Positive':
                    color = 'teal';
                    break;
                case 'Neutral':
                    color = 'lightgrey';
                    break;
                case 'Negative':
                    color = 'red';
                    break;
            }
            return color;
        },
    },
};
</script>

<style scoped>
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