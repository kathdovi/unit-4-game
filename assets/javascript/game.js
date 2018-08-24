let playerFighter;
let opponent;
let opponentsKilled = 0;

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

reset();


function reset() {
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
        if (playerFighter != undefined && opponent != undefined) {
            fighterText.html("<h4>OPPONENTS LEFT:</h4>");
            $('.battleTitle').html("<h4>CURRENT BATTLE:</h4>");
            playRound();
        }
    return false;
    });
}

function playRound() {
    $('.attack').html('<button type="button" class="attackbtn">Attack</button>');
    let playerAttack = fighters[playerFighter].currentFight;
    let playerFight = fighters[playerFighter].fight;
    let playerhpSpot = ".hp" + playerFighter;
    let opponentAttack = fighters[opponent].hit;
    let opponenthpSpot = ".hp" + opponent;
    let playerHP = fighters[playerFighter].hp;
    let opponentHP = fighters[opponent].hp;
    // when attack button pressed:
    $('.attackbtn').unbind('click').bind('click', function () {
        opponentHP -= playerAttack;
        $(opponenthpSpot).html(opponentHP);
        playerHP -= opponentAttack;
        $(playerhpSpot).html(playerHP);
        playerAttack += playerFight;
        console.log(playerAttack);
        if (playerHP <= 0) {
            $(".choose-fighter").html("<h4 class='win-loss'> YOU LOSE!!! </h4 >");
            $('.attack').empty();
            $('.attack').html('<button type="button" class="resetbtn" onClick="window.location.reload()">Reset</button>');
        } else if (opponentHP <= 0) {
            opponentsKilled++;
            if (opponentsKilled === 3 ) {
                $(".computer-fighter").empty();
                $(".choose-fighter").html("<h4 class='win-loss'> YOU WIN!!! </h4 >");
                $('.attack').empty();
                $('.attack').html('<button type="button" class="resetbtn" onClick="window.location.reload()">Reset</button>');
            } else {
                $(".computer-fighter").empty();
                $('.attack').empty();
                $(".choose-fighter").html("<h4>CHOOSE NEW OPPONENT:</h4>");
                fighters[playerFighter].hp = playerHP;
                fighters[playerFighter].currentFight = playerAttack;
                $(".fighter-pics").on('click', '.fighter', function (e) {
                    $(".computer-fighter").append(this);
                    opponent = $(this).attr('class').split(' ').pop();
                    console.log(opponent);
                    playRound();
                });
            }
        }
        return false;
    }); 
}
