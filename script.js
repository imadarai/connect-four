console.log('Hello Beautiful');

(function() {

    var currentPlayer = 'player1';
    var slotsInRow;
    var diagDown;
    var diagUp;
    var rowID;
    var colID;

    $(".column").on("click", function(e){

        var col = $(e.currentTarget);
        var slotsInCol = col.children();

        for (var i = slotsInCol.length - 1 ; i >= 0; i--) {

            if (!slotsInCol.eq(i).hasClass('player1') && !slotsInCol.eq(i).hasClass('player2')){
                slotsInCol.eq(i).addClass(currentPlayer);
                break;
            }
        }
        //Grabbing my rows
        slotsInRow = $('.row' + (i-1));
        // console.log(i);
        // console.log("my slots in Row: ", slotsInRow);

        //Setting ALL Variables to their respective IDs
        rowID = i;
        colID = col.index();
        diagDown = col.index() - i;
        diagUp = col.index() + i;
        // console.log('rowID: ', rowID, 'colID: ', colID, 'diagDown: ', diagDown, 'diagUp', diagUp);

        //Check and Populate my Diagonal Victory Check Slots
        var diagVictoryCheck = diagonalSlotsOnEveryClick ();
        var victoryUp = diagVictoryCheck[0];
        var victoryDown = diagVictoryCheck[1];


        if (i === -1){
            return;
        }

        if (checkForVictory(slotsInCol)) {
            // console.log("the winning player COL is: ", currentPlayer);
            chip.hide();
            displayWinner(currentPlayer);
            flashSlots(slotsInCol);
            $("#world").show();

        } else if (checkForVictory(slotsInRow)){
            // console.log("the winning player ROWS is: ", currentPlayer);
            chip.hide();
            displayWinner(currentPlayer);
            flashSlots(slotsInRow);
            $("#world").show();

        } else if (checkForVictory(victoryUp)){
            // console.log("the winning player diagUp is: ", currentPlayer);
            chip.hide();
            displayWinner(currentPlayer);
            flashSlots(victoryUp);
            $("#world").show();

        }else if (checkForVictory(victoryDown)){
            // console.log("the winning player diagDown is: ", currentPlayer);
            chip.hide();
            displayWinner(currentPlayer);
            flashSlots(victoryDown);
            $("#world").show();

        }else {
            //continure the game
            switchPlayer();
        }
    });


    function checkForVictory (slots) {
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                count ++;
                if (count === 4){
                    return true;
                }
            } else {
                count = 0;
            }
        }
    }

    function diagonalSlotsOnEveryClick () {

        var $diagUp = $();
        var $diagDown = $();

        for (var  c = 0; c < $(".column").length; c++) {
            for (var r = 0; r < $(".column").eq(c).children().length; r++) {

                if (c+r === diagUp) {
                    $diagUp = $diagUp.add($(".column").eq(c).children().eq(r));
                }
                if (c-r === diagDown) {
                    $diagDown = $diagDown.add($(".column").eq(c).children().eq(r));
                }
            }
        }
        // console.log("$diagUp:", $diagUp);
        // console.log("$diagDown:", $diagDown);
        return [$diagUp, $diagDown];
    }

    function switchPlayer () {

        if (currentPlayer === 'player1'){
            currentPlayer = 'player2';
        } else {
            currentPlayer = 'player1';
        }
    }


    //WINNING MESSAGE TRIGGERS
    var $dbox = $('#myDialog');
    var $backgroundColor = $('.dialog-content');
    var $span = $(".close");
    var $reset = $("#reset");
    var $playerRedWon = $("#playerRed");
    var $playerYellowWon = $("#playerYellow");

    function displayWinner(winner){
        setTimeout (function(){
            $dbox.show();

            if (winner === 'player1'){
                $playerRedWon.show();
                $backgroundColor.css ("background-color", "#ff5959");
                $playerYellowWon.hide();
            } else{
                $playerYellowWon.show();
                $backgroundColor.css ("background-color", "#facf5a");
                $playerRedWon.hide();
            }
            $span.click(function(){
                $dbox.hide();
                $("#world").hide();

            });
            $reset.click(function(){
                location.reload();
            });
        }, 250);

    }

    function flashSlots (slots){
        for (var x = 0; x < slots.length; x++) {
            if (slots.eq(x).hasClass(currentPlayer)){
                slots.eq(x).addClass("winner");
            }
        }
    }

    //RESETTING BOARD bUTTON
    var $resetAll = $('#reset-bottom');
    $resetAll.click(function(){
        location.reload();
    });

    // SELECTOR MOUSE OVER
    var select = $(".selector");
    var column = $(".column");

    column.hover(function(e){
        if ( currentPlayer == 'player1'){
            select.eq($(e.currentTarget).index()).css( "border-top", "25px solid #ff5959");
        } else {
            select.eq($(e.currentTarget).index()).css( "border-top", "25px solid #facf5a");
        }
    }, function(e){
        select.eq($(e.currentTarget).index()).css( "border-top", "25px solid whitesmoke");
    });


    //CHIP FLYING WITH THE MOUSE:
    var chip = $('#chip');
    column.on("mousemove", function(e){
        chip.css({
            "top": e.pageY - 40 + 'px',
            "left": e.pageX + 160 + 'px'
        });
        column.on("click", function(){
            if (currentPlayer === "player1"){
                chip.css("background-color", "#ff5959");
            } else {
                chip.css("background-color", "#facf5a");
            }
        });

    });
    // document.addEventListener("mousemove", function(e) {
    //     chip.style.left = e.clientX - 50 + 'px';
    //     chip.style.top = e.clientY - 50 + 'px';
    // });
}());
