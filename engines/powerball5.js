const moment = require('moment-timezone')
const game = 'powerball5'
const interval = 5
let tempTime = 4
let tempSec = 30
let miniGames = []
let gameInfo = {}
let adjustedSec = 35

const powerball5 = {
    start: () => {
        powerball5.initGame()
        setInterval(powerball5.main, 1000)
    },
    
    main: () => {
        // console.log(`Time: ${tempTime}:${tempSec}`)
        tempSec++
        if(tempSec === 60){
            tempTime++
            tempSec = 0
        }

        if ((tempTime + 1) % interval === 0 && tempSec === adjustedSec) {
            powerball5.createGame()
            powerball5.getResult()
            console.log('miniGames', miniGames)
        }

        // powerball5.createGame()
    },
    initGame: () => {
        var regTime = `Time: ${tempTime}:${tempSec}`
        var gameTime = `Time: ${powerball5.getAheadTimeBaseOnInterval(tempTime)}:00`
        gameInfo = {
            round: powerball5.getAheadTimeBaseOnInterval(tempTime) / 5,
            gameTime,
            regTime,
            resultTime: null,
        }
        miniGames.push(gameInfo)
        console.log('miniGames', miniGames)
    },

    createGame: () => {
        var regTime = `Time: ${tempTime}:${tempSec}`
        var gameTime = `Time: ${powerball5.getAheadTimeBaseOnInterval(tempTime + 1)}:00`
        gameInfo = {
            round: powerball5.getAheadTimeBaseOnInterval(tempTime + 1) / 5,
            gameTime,
            regTime,
            resultTime: null,
        }
        miniGames.push(gameInfo)
    },

    getResult: () => {
        miniGames[0].resultTime = `Time: ${tempTime}:${tempSec}`
    },
    showResult: () => {
        const currentTimeString = `Time: ${tempTime}:${tempSec}`;
        miniGames.forEach(game => {
            if (!game.resultTime) {
                const gameTimeMoment = moment(game.gameTime, 'Time: HH:mm');
                const currentTimeMoment = moment(currentTimeString, 'Time: HH:mm');
    
                if (currentTimeMoment.isSameOrAfter(gameTimeMoment)) {
                    game.resultTime = currentTimeString;
                    console.log(`Result Time Updated for Round ${game.round}: ${game.resultTime}`);
                }
            }
        });
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
  

  generateRoundId: (minute) => {
    var now = new Date()
    var referenceTime = new Date(now)
    referenceTime.setHours(0,0,0,0)
    var intervalsElapsed = Math.floor((now - referenceTime) / (minute * 60 * 1000))
    return intervalsElapsed + 1
  },
  getAheadTimeBaseOnInterval: (currentMin) => {
    let timeIncrement = currentMin
    while (true) {
        timeIncrement++
        if (timeIncrement % interval === 0) {
            return timeIncrement
        }
    }
}
}
// function generateRoundId(minute) {
//   var now = new Date()

//   var referenceTime = new Date(now)
//   referenceTime.setHours(0,0,0,0)

//   var intervalsElapsed = Math.floor((now - referenceTime) / (minute * 60 * 1000))

//   var roundId = intervalsElapsed + 1

//   return roundId
// }
// setInterval(() => {
//   console.log(generateRoundId(5))
// }, 100000)

module.exports = powerball5

powerball5.start()


