const moment = require('moment')
const now = moment("2024-05-07 10:30:25", "YYYY-MM-DD HH:mm:ss")


console.log(moment().format()) // 2021-10-09T00:15:13+09:00
console.log(moment().fromNow()) // a few seconds ago
console.log(moment().startOf("day").fromNow()) // 15 minutes ago
console.log(moment().endOf("day").fromNow()) // in a day
console.log(moment("2021-10-08").fromNow()) // a day ago
console.log(moment("2021-10-01").fromNow()) // 8 days ago
console.log(moment("2021-10-25").fromNow()) // in 16 days
console.log(moment("2021-08-09").fromNow()) // 2 months ago
console.log(moment("2021-12-25").fromNow()) // in 3 months
console.log(moment("2020-10-09").fromNow()) // a year ago
console.log(moment("2023-10-09").fromNow()) // in 2 years

console.log(moment().from(moment("2023-10-09")))
console.log(moment().from(moment("2021-12-25")))