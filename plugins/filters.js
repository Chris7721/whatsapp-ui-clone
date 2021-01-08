import Vue from 'vue'
Vue.filter('shortenText', (text, startingPoint = 0, maxLength = 100) =>{
    return text.length > maxLength ? `${text.slice(startingPoint, maxLength)}...` : text;
})