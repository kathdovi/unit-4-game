// Global vars
let playerFighter;
let opponent;
let opponentsKilled = 0;

// Array of Fighters
var fighters = [
    {
        name: 'Janeway',
        hp: 150,
        hpSpot: 'hp0',
        fight: 8,
        currentFight: 8,
        hit: 20,
        pic: 'assets/images/janeway.jpg'
    },
    {
        name: 'Borg Queen',
        hp: 180,
        hpSpot: 'hp1',
        fight: 6,
        currentFight: 6,
        hit: 20,
        pic: 'assets/images/borgqueen.jpg'
    },
    {
        name: 'Q',
        hp: 120,
        hpSpot: 'hp2',
        fight: 8,
        currentFight: 8,
        hit: 15,
        pic: 'assets/images/q.jpg'
    },
    {
        name: 'Seven of Nine',
        hp: 100,
        hpSpot: 'hp3',
        fight: 14,
        currentFight: 14,
        hit: 5,
        pic: 'assets/images/janeway.jpg'
    }
];

// Call reset to start the game & display the initial player cards
reset();

// Set-up function
function reset() {
    // Render initial cards with given HP
    let fighterText = $(".choose-fighter");
    fighterText.append("<h4>CHOOSE YOUR FIGHTER</h4>");
    for (let i = 0; i < fighters.length; i++) {
        currentHPSpot = fighters[i].hpSpot;
        console.log(fighters[i].hp);
        $("." + currentHPSpot).html(fighters[i].hp);
    }
    // Select Player Character
    $(".fighter-pics").on('click', '.fighter', function (e) {
        if (playerFighter === undefined) {
            $(".player-fighter").append(this);
            playerFighter = $(this).attr('class').split(' ').pop();
            console.log(playerFighter);
            fighterText.html("<h4>CHOOSE YOUR OPPONENT</h4>");
            // Select opponent
        } else if (opponent === undefined) {
            $(".computer-fighter").append(this);
            opponent = $(this).attr('class').split(' ').pop();
            console.log(opponent);
        }
        // Player & Opponent selected: set up battle stage & call playRound
        if (playerFighter != undefined && opponent != undefined) {
            fighterText.html("<h4>OPPONENTS LEFT:</h4>");
            $('.battleTitle').html("<h4>CURRENT BATTLE:</h4>");
            playRound();
        }  
    return false;
    });
}

// Play a round of the game
function playRound() {
    // set up the attack button & the variables
    $('.attack').html('<button type="button" class="attackbtn rounded btn-lg">Attack</button>');
    // currentFight stores the last value from the last fight
    let playerAttack = fighters[playerFighter].currentFight;
    // amount attack should be incremented by each time
    let playerFight = fighters[playerFighter].fight;
    // where to modify the player HP on the HTML card element
    let playerhpSpot = ".hp" + playerFighter;
    // current player HP
    let playerHP = fighters[playerFighter].hp;
    // amount this opponent hits player's character
    let opponentAttack = fighters[opponent].hit;
    // where to modify the opponent HP on the HTML card element
    let opponenthpSpot = ".hp" + opponent;
    // current opponent HP
    let opponentHP = fighters[opponent].hp;
    // when attack button pressed:
    $('.attackbtn').unbind('click').bind('click', function () {
        // opponent gets hit by player attack
        opponentHP -= playerAttack;
        $(opponenthpSpot).html(opponentHP);
        // player gets hit by opponent attack
        playerHP -= opponentAttack;
        $(playerhpSpot).html(playerHP);
        // player attack gets stronger
        playerAttack += playerFight;
        // if the player is dead:
        // note: if the player and opponent end with 0 or below HP, I consider the player to lose.
        // Player must end with HP > 0 to win. No wimps allowed to win.
        if (playerHP <= 0) {
            $(".choose-fighter").html("<h4 class='win-loss'> YOU LOSE!!! </h4 >");
            $('.fighter-pics').empty();
            $('.attack').empty();
            $('.attack').html('<button type="button" class="resetbtn rounded btn-lg" onClick="window.location.reload()">Reset</button>');
        // if opponent is dead...
        } else if (opponentHP <= 0) {
            opponentsKilled++;
            // ...and all other opponents have been defeated:
            if (opponentsKilled === 3 ) {
                $(".computer-fighter").empty();
                $(".choose-fighter").html("<h4 class='win-loss'> YOU WIN!!! </h4 >");
                $('.attack').empty();
                $('.attack').html('<button type="button" class="resetbtn rounded btn-lg" onClick="window.location.reload()">Reset</button>');
            // ...and there are still opponents left to fight:
            } else {
                $(".computer-fighter").empty();
                $('.attack').empty();
                $(".choose-fighter").html("<h4>CHOOSE NEW OPPONENT:</h4>");
                // store HP and current attack points from the last battle
                fighters[playerFighter].hp = playerHP;
                fighters[playerFighter].currentFight = playerAttack;
                // choose another opponent
                $(".fighter-pics").on('click', '.fighter', function (e) {
                    $(".computer-fighter").append(this);
                    opponent = $(this).attr('class').split(' ').pop();
                    console.log(opponent);
                    playRound();
                });
            }
        }
        // The button goes twice without this  
        return false;
    }); 
}

// TODO: 
// Provide feedback to player
// Make the interface cleaner
