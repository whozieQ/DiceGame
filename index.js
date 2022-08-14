// Each player is instantiated as an object
let player1 = {
    name: "1",
    score: 0,
    turn: true,
    dice: document.getElementById("player1Dice"),
    scoreboard: document.getElementById("player1Scoreboard")
    }
let player2 = {
    name: "2",
    score: 0,
    turn: false,
    dice: document.getElementById("player2Dice"),
    scoreboard: document.getElementById("player2Scoreboard")
    }

const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const newGameBtn = document.getElementById("newGameBtn")

/* Hook up a click event listener to the Roll Dice Button. */
 rollBtn.addEventListener("click", function() {

    if (player1.turn) {
        takeTurn(player1,player2)
    } else {
        takeTurn(player2,player1)
    }
})
newGameBtn.addEventListener("click", function(){
    player1.score = 0
    player2.score = 0
    player1.scoreboard.textContent = player1.score
    player2.scoreboard.textContent = player2.score
    player1.dice.textContent = "-"
    player2.dice.textContent = "-"
    // randomly choose which player goes first
    const randomPlayer = Math.floor(Math.random() * 2) + 1
    if (randomPlayer === 1){
        showActivePlayer(player1, player2)
     } else {
         showActivePlayer(player2, player1)
     }
    rollBtn.style.display = "block"
    newGameBtn.style.display = "none"
})

function takeTurn(player,nextPlayer){
        const randomNumber = Math.floor(Math.random() * 6) + 1
        player.score += randomNumber
        player.scoreboard.textContent = player.score
        player.dice.textContent = randomNumber
        if (!gotWinner(player)){
            showActivePlayer(nextPlayer,player)
        }
}

function gotWinner(player){
    
    if (player.score >= 20) {
        message.textContent = `Player ${player.name} has won! 🥳`
        rollBtn.style.display = "none"
        newGameBtn.style.display = "block"
        return true
    } else
    return false   
}

function showActivePlayer(activePlayer, notActivePlayer){
    notActivePlayer.dice.classList.remove("active")
    activePlayer.dice.classList.add("active")
    if (activePlayer.score === 0 && notActivePlayer.score === 0){
        message.textContent = `Player ${activePlayer.name} Starts`
    } else {
        message.textContent = `Player ${activePlayer.name} Turn`
    }
    notActivePlayer.turn = false
    activePlayer.turn = true
}
 