const moment = require('moment-timezone')
const interval = 5
let game
let timerCountDown
let previousGames = []
var varResult


const powerball5 = {
    start: () => {
        createGame()
        showGame()
        setInterval(powerball5.main, 1000)
    },
    
    main: () => {
        const now = moment()
        const minutes = now.minutes()
        const seconds = now.seconds()

        if(minutes % interval === 0 && seconds === 35) {
            getResult()
        }
        if(minutes % interval === 0 && seconds === 50) {
            if(varResult) {
                showResult()
            }
            createGame()
            showGame()
        }
    },

    createGame: () => {
        const now = moment()
        const round = Math.floor(now.hours() * 60 + now.minutes()) / interval
        if(!previousGames.some(g => g.round === round)) {
            game = {
                round: round,
                gameDate: now.toISOString().split('T')[0],
                result: [],
                regDateTime: now.toISOString().replace('T', '').substring(0,19),
                resultDateTime: null
            }
        }
    },

    showGame: () => {
        timerCountDown = interval * 60
        console.log(game)
        console.log("Timer countdown:" + timerCountDown + "seconds")
    },
    getResult: () => {

    },

    // getResult: () => {
    //     miniGames[0].resultTime = `Time: ${tempTime}:${tempSec}`
    // },
    showResult: () => {
        const now = moment()
        game.result = varResult
        game.resultDateTime = now.toISOString().replace('T', '').substring(0, 19)
        previousGames.push(game)
        console.log(game)
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
setInterval(() => {
  console.log(generateRoundId(5))
}, 100000)

module.exports = powerball5

powerball5.start()


