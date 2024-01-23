const moment = require('moment-timezone')
const game = 'powerball5'
const interval = 5
let round = 0
const powerball5 = {
  start: () => {
    setInterval(powerball5.scrapeData, 1000)
  },
  scrapeData: async () => {
    try {
      const now = moment();
      const minutes = now.minutes();
      const seconds = now.seconds();

      const nextTargetMinute = round * interval

      const setTime = now.format('HH:mm:ss')
    
      if (minutes === nextTargetMinute && seconds === 35) {
        round += 1;
        console.log(`${setTime} ${round} round`);
      }

    } catch (err) {
      console.error(`An error occurred - ${game}:`, err)
      console.log(`Trying to reconnect in 5 seconds... - ${game}`)
    }
  }

}
module.exports = powerball5

powerball5.start()

// function updateGameRound() {
//   let gameDateTime = moment()

//   round +=1

//   const localDateTime = gameDateTime.tz(moment.tz.guess()).format()


//   console.log({
//     gameName: game,
//     date:  gameDateTime.format('YYYY-MM-DD'),
//     round,
//     gameDateTime: localDateTime
//   })
// }

// updateGameRound()

// setInterval(updateGameRound, 5 * 60000)

