const moment = require('moment-timezone')
const interval = 5
let game
let timerCountDown
let previousGames = []
var varResult
let now = moment()
let hours = now.hours()
let minutes = now.minutes()
let seconds = now.seconds()


const powerball5 = {
    start: async() => {
        powerball5.createGame(minutes)
        powerball5.showGame()
        setInterval(powerball5.main, 1000)
    },
    
    main: () => {
        now = moment()
        hours = now.hours()
        minutes = now.minutes()
        seconds = now.seconds()

        if((minutes + 1) % interval === 0 && seconds === 35) {
            powerball5.getResult()
        }
        if((minutes + 1) % interval === 0 && seconds === 55) {
            powerball5.showResult()
            powerball5.createGame(minutes + 1)
            powerball5.showGame()
        }
     },

    createGame: (min) => {
        const round = powerball5.getRound((hours * 3600) + (min * 60) + seconds) / (interval * 60)
        if(!previousGames.some(g => g.round === round)) {
            const gameDateTime = now.clone().add(5, 'minutes').seconds(0)
            game = {
                round: round,
                result: null,
                gameDate: now.format('YYYY-MM-DD'),
                regDateTime: now.format('YYYY-MM-DD HH:mm:ss'), 
                gameDateTime: gameDateTime.format('YYYY-MM-DD HH:mm:ss'),
                resultDateTime: null
            }
        }
    },

    showGame: () => {
        timerCountDown = interval * 60
        console.log("NEW GAME: ", game)
        // console.log("Timer countdown:" + timerCountDown + "seconds")
    },
    getResult: () => {
        var min = 1
        var max = 28
        var result = [ 
            Math.floor(Math.random() * (max - min) + min),
            Math.floor(Math.random() * (max - min) + min),
            Math.floor(Math.random() * (max - min) + min),
            Math.floor(Math.random() * (max - min) + min),
            Math.floor(Math.random() * (max - min) + min),
        ]
        let gameDateTimeMoment = moment(game.gameDateTime, 'YYYY-MM-DD HH:mm:ss')
        let resultDateTime = gameDateTimeMoment.add(5, 'seconds').format('YYYY-MM-DD HH:mm:ss')

        game.result = result
        game.resultDateTime = resultDateTime
        previousGames.push({...game})
    },
    getRound: (v) => {
        var sec = v
        while (sec % (interval * 60) != 0){
            sec++
        }
        return sec
    },
    // getResult: () => {
    //     miniGames[0].resultTime = `Time: ${tempTime}:${tempSec}`
    // },
    delay: (duration) => {
        return new Promise(resolve => setTimeout(resolve, duration))
    },
    showResult: async() => {
        // const now = moment()
        // game.result = varResult
        // game.resultDateTime = now.toISOString().replace('T', '').substring(0, 19)
        // previousGames.push(game)
        // console.log(game)
        console.log("RESULTS: ", previousGames)
        await powerball5.delay(10000)
    },


//   scrapeData: () => {
//     tempTime++
//     try {
//       const now = moment()
//       const minutes = now.minutes()
//       const seconds = now.seconds()
//       const roundId = powerball5.generateRoundId(interval)

//       if ((minutes + 1) % interval === 0 && seconds === 35) {
//         const result = {
//           gameName: game,
//           date: now.format('YYYY-MM-DD'),
//           round: roundId,
//           gameDateTime: now.format('YYYY-MM-DDTHH:mm:ss.SSS') 
//         };

//         console.log(result)
//       }

//     } catch (err) {
//       console.error(`An error occurred - ${game}:`, err)
//     }
//   },
  

//   generateRoundId: (minute) => {
//     var now = new Date()
//     var referenceTime = new Date(now)
//     referenceTime.setHours(0,0,0,0)
//     var intervalsElapsed = Math.floor((now - referenceTime) / (minute * 60 * 1000))
//     return intervalsElapsed + 1
//   },
//   getAheadTimeBaseOnInterval: (currentMin) => {
//     let timeIncrement = currentMin
//     while (true) {
//         timeIncrement++
//         if (timeIncrement % interval === 0) {
//             return timeIncrement
//         }
//     }
// }
// }
// function generateRoundId(minute) {
//   var now = new Date()

//   var referenceTime = new Date(now)
//   referenceTime.setHours(0,0,0,0)

//   var intervalsElapsed = Math.floor((now - referenceTime) / (minute * 60 * 1000))

//   var roundId = intervalsElapsed + 1

//   return roundId
}
// setInterval(() => {
//   console.log(generateRoundId(5))
// }, 100000)

module.exports = powerball5

powerball5.start()


