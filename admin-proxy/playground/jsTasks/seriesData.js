//@ts-nocheck
import { seriesData } from "./data"


const newYorkSeries = series.filter(function(show){
    return show.location === 'New York'
})

const thrillers = series.filter(function(show){
    return show.genres.includes('thriller')
})

console.log(thrillers)

/*
Challenge:
1. Use the .filter() method to create an array
   of all of the thrillers.
   .includes('romance')
*/

