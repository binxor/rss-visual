<template>
    <div>
        <div id="leaderboard">
            <h2>Sentiment Analysis</h2>
            <div class="overallRating ratingNeutral">
                <div class="overallRatingTitle">{{sentimentResponse.Sentiment}}</div>
                <div class="ratingText">OVERALL RATING</div>
            </div>
            <div :key=key v-for='(val,key) of sentimentResponse.SentimentScore'
              class="rating" v-bind:class="getClass(key)">
                <div class="overallRatingTitle">{{key}}</div> 
                <div class="ratingText">{{percent(val)}}</div>
            </div>
        </div>
        <br/>
    </div>
</template>

<script>
export default {
    name : 'Leaderboard',
    props : {
        sentimentResponse: {
            type: Object
        },
    },
    data() {
        return {};
    },
    mounted() {
    },
    methods: {
        percent: (val) => {
            return Math.floor(val*1000)/10 + '%';
        },
        getClass: (key) => {
            return 'rating' + key;
        }
    },
}
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
    font-size: 3.5vw;
}
.rating {
    border: solid 1px lightgrey;
    border-radius: 10px;
    width: 15%;
    padding-top: 10px;
    padding-bottom: 10px;
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
    background-color: orange;
}
</style>