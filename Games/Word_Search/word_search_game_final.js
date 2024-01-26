let Words_1 = ["BREAD", "MILK", "TEA", "COFFEE", "BUTTER", "FRUITS", "JAM", "OATS", "TOAST", "SUGAR"];

let Words_2 = ["RED", "PINK", "BLUE", "PURPLE", "GREEN", "ORANGE", "YELLOW", "BROWN", "BLACK", "WHITE"];

let Words_3 = ["PEN", "PENCIL", "ERASER", "RULER", "FILE", "BAG", "BOOK", "SHARPNER", "BRUSH", "PAINT"];

let Words_4 = ["JANUARY", "FEBRUARY", "SEPTEMBER", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "DECEMBER", "NOVEMBER"];

let Words_5 = ["TIGER", "LION", "ELEPHANT", "MONKEY", "DEER", "PANTHER", "SNAKE", "ZEBRA", "DOG", "CAT"];

let Words_6 = ["SPARROW", "KIWI", "PARROT", "KITE", "DOVE", "OWL", "HEN", "SWAN", "PEACOCK", "CROW"];

let Words_7 = ["INDIA", "CANADA", "USA", "CHINA", "NEPAL", "BHUTAN", "SRILANKA", "RUSSIA", "IRAQ", "IRAN"];

let Words_8 = ["ROSE", "LILY", "ORCHID", "DAISY", "TULIP", "LOTUS", "JASMINE", "HIBISCUS", "SUNFLOWER", "MARIGOLD"];

let Words_9 = ["MANGO", "APPLE", "WATERMELON", "GUAVA", "CHERRY", "BANANA", "KIWI", "LYCHEE", "ORANGE", "GRAPE"];

let Words_10 = ["LENOVO", "PHILIPS", "JIO", "APPLE", "MICROSOFT", "GOOGLE", "DELL", "INTEL", "SAMSUNG", "HONOR"];

let tempWords = [];
let a = 1;
let Words_score = 0;
let Words_search_highScore;



let score = document.getElementById("score");
let highScore = document.getElementById("highscore");

let Words_highScore = localStorage.getItem("words_search_highScore");
if (Words_highScore === null) {
    Words_search_highScore = 0;
    localStorage.setItem("words_search_highScore", JSON.stringify(Words_search_highScore));
    highScore.innerHTML = "High Score : " + Words_search_highScore;
}
else {
    Words_search_highScore = JSON.parse(Words_highScore);
    highScore.innerHTML = "High Score : " + Words_search_highScore;
}



$(document).ready(function () {

    $("#word_search_game_start").click(function startGame() {
        $("#word_search_first_page").css("display", "none");
        $(".container").css("display", "block");
        arrangeGame(Words_1);
        GameWorkings();
    });

    tempWords = [];

    let level = 1;

    $("#nextLevel").click(function chooseLevel() {

        level = level + 1;

        switch (level) {
            case 2:
                $("#hint").text("");
                $("#letters").text("");
                tempWords = [];
                arrangeGame(Words_2);
                GameWorkings();
                $("#nextLevel").css("display", "none");
                break;

            case 3:
                $("#hint").empty();
                $("#letters").empty();
                tempWords = [];
                arrangeGame(Words_3);
                GameWorkings();
                $("#nextLevel").css("display", "none");
                break;

            case 4:
                $("#hint").empty();
                $("#letters").empty();
                tempWords = [];
                arrangeGame(Words_4);
                GameWorkings();
                $("#nextLevel").css("display", "none");
                break;

            case 5:
                $("#hint").empty();
                $("#letters").empty();
                tempWords = [];
                arrangeGame(Words_5);
                GameWorkings();
                $("#nextLevel").css("display", "none");
                break;

            case 6:
                $("#hint").empty();
                $("#letters").empty();
                tempWords = [];
                arrangeGame(Words_6);
                GameWorkings();
                $("#nextLevel").css("display", "none");
                break;

            case 7:
                $("#hint").empty();
                $("#letters").empty();
                tempWords = [];
                arrangeGame(Words_7);
                GameWorkings();
                $("#nextLevel").css("display", "none");
                break;

            case 8:
                $("#hint").empty();
                $("#letters").empty();
                tempWords = [];
                arrangeGame(Words_8);
                GameWorkings();
                $("#nextLevel").css("display", "none");
                break;

            case 9:
                $("#hint").empty();
                $("#letters").empty();
                tempWords = [];
                arrangeGame(Words_9);
                GameWorkings();
                $("#nextLevel").css("display", "none");
                break;

            case 10:
                $("#hint").empty();
                $("#letters").empty();
                tempWords = [];
                arrangeGame(Words_10);
                GameWorkings();
                $("#nextLevel").css("display", "none");
                break;
        }

    });

    function arrangeGame(Words) {

        $.each(Words, function (_key, item) {
            $("#hint").append("<p>" + item + "</p>");
        });

        for (let i = 1; i <= 12; i++) {
            for (let j = 1; j <= 12; j++) {
                $("#letters").append("<div class='individual' data-row='" + i + "' data-column='" + j + "'></div>");
            }
        }
        placeCorrectLetters(Words);
        placeCorrectLetters(tempWords);

        $.each($(".individual"), function (_key, item) {
            if ($(item).attr("data-word") == undefined)
                $(this).html(randomLetter());
        });
    }

    function randomLetter() {
        let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return alphabets.charAt(Math.floor(Math.random() * 26));
    }
// Checking and giving the orientation
    function checkOccupied(Word, starting, orientation) {
        let status = " ";
        let incrementBy = 0;

        if (orientation == "row") {
            incrementBy = 1;
        }
        else if (orientation == "column") {
            incrementBy = 12;
        }
        else if (orientation == "diagonal") {
            incrementBy = 13;
        }

        for (let p = starting, q = 0; q < Word.length; q++) {
            if ($(".individual:eq(" + p + ")").attr("data-word") == undefined)
                status = "empty";

            else {
                status = "occupied";
                break;
            }

            p += incrementBy;
        }
        return status;
    }

    function placeCorrectLetters(Words) {

        let positions = ["row", "column", "diagonal"];

        let nextLetter = 0;

        let newStart = 0;

        for (let i = 0; i < Words.length; i++) {

            let orientation = positions[Math.floor(Math.random() * positions.length)];

            let start = Math.floor(Math.random() * $(".individual").length);

            let myRow = $(".individual:eq(" + start + ")").data("row");

            let myColumn = $(".individual:eq(" + start + ")").attr("data-column");

            if (orientation == "row") {
                nextLetter = 1;
                if ((myColumn * 1) + Words[i].length <= 12) {
                    newStart = start;
                }

                else {
                    let newColumn = 12 - Words[i].length;
                    newStart = $(".individual[data-row=" + myRow + "][data-column=" + newColumn + "]").index();
                }
            }

            else if (orientation == "column") {
                nextLetter = 12;
                if ((myRow * 1) + Words[i].length <= 12) {
                    newStart = start;
                }
                else {

                    let newRow = 12 - Words[i].length;
                    newStart = $(".individual[data-row=" + newRow + "][data-column=" + myColumn + "]").index();
                }
            }

            else if (orientation == "diagonal") {
                nextLetter = 13;
                if (((myColumn * 1) + Words[i].length <= 12) && (myRow * 1) + Words[i].length <= 12) {
                    newStart = start;
                }

                if ((myColumn * 1) + Words[i].length > 12) {
                    let newColumn = 12 - Words[i].length;
                    newStart = $(".individual[data-row=" + myRow + "][data-column=" + newColumn + "]").index();
                }

                if ((myRow * 1) + Words[i].length > 12) {
                    let newRow = 12 - Words[i].length;
                    newStart = $(".individual[data-row=" + newRow + "][data-column=" + myColumn + "]").index();
                }

                if (((myColumn * 1) + Words[i].length > 12) && (myRow * 1) + Words[i].length > 12) {
                    let newColumn = 12 - Words[i].length;
                    let newRow = 12 - Words[i].length;

                    newStart = $(".individual[data-row=" + newRow + "][data-column=" + newColumn + "]").index();
                }
            }

            let characters = Words[i].split("");
            let nextPosition = 0;
            let occupied = checkOccupied(Words[i], newStart, orientation);

            if (occupied == "empty") {
                $.each(characters, function (key, item) {

                    $(".individual:eq(" + (newStart + nextPosition) + ")").html(item);

                    $(".individual:eq(" + (newStart + nextPosition) + ")").attr("data-word", Words[i]);

                    nextPosition += nextLetter;
                })
            }

            else {
                tempWords.push(Words[i]);
            }
        }
    }
    let p1 = 1;
    let selectedWord = "";
    function GameWorkings() {

        $(".individual").click(function () {
            $(this).addClass("colorPurple");
            selectedWord += $(this).text();
            p1 = 1;
        });

        $("#ctrlKey").click(function () {
            if (level == 1) {
                Words = Words_1;
            }
            else if (level == 2) {
                Words = Words_2;
            }
            else if (level == 3) {
                Words = Words_3;
            }
            else if (level == 4) {
                Words = Words_4;
            }
            else if (level == 5) {
                Words = Words_5;
            }
            else if (level == 6) {
                Words = Words_6;
            }
            else if (level == 7) {
                Words = Words_7;
            }
            else if (level == 8) {
                Words = Words_8;
            }
            else if (level == 9) {
                Words = Words_9;
            }
            else if (level == 10) {
                Words = Words_10;
            }

            var flag = 0;
            var aa1 = 0;
            $(".individual").each(function() {
                var dataWordValue = $(this).data("word");
                if (dataWordValue !== undefined && selectedWord.indexOf(dataWordValue) !== -1) {
                    $(this).css("border-color","green"); 
                    $(this).addClass("RightWord");
                    aa1++;
                }
            });

            if (p1 == 1) {
                {
                    for (let i = 0; i < Words.length; i++) {

                        if (selectedWord === Words[i]) {

                            Words_score += 1000;
                            score.innerHTML = "Score : " + Words_score;
                            if(Words_search_highScore < Words_score)
                            {
                                Words_search_highScore = Words_score;
                                localStorage.setItem("words_search_highScore", JSON.stringify(Words_search_highScore));
                                highScore.innerHTML = "High Score : " + Words_search_highScore;
                            }

                            var flag = 0;
                            for(var j=0; j<aa1; j++)
                            {
                                if($(".colorPurple").hasClass("RightWord")){
                                    flag = 0;
                                }
                                else{
                                    flag = 1;
                                    j = aa1;
                                    aa1 = 0;
                                }
                            }

                            if(flag == 0)
                            {
                                $(".colorPurple").addClass("correctlySelected");
                                $("#hint p").each(function (_key, item) {
                                    if (selectedWord == $(item).text()) {
                                        $(this).addClass("done");
                                    }
                                    if ($(".done").length == Words.length) {
                                        $("#hint").empty();
                                        $("#hint").append("<p id= message> Won the Game </p>");
                                        $("#nextLevel").css("display", "block");
                                        if(level==10)
                                        {
                                            $("#nextLevel").css("display", "none");
                                        }
                                    }
                                });
                            }
                        }
                    }

                          

                    selectedWord = "";
                    $(".individual").removeClass("colorPurple");
                }
                p1 = 0;
            }
        
        });


let Words = "";
        $(document).keyup(function (event) {

            if (level == 1) {
                Words = Words_1;
            }
            else if (level == 2) {
                Words = Words_2;
            }
            else if (level == 3) {
                Words = Words_3;
            }
            else if (level == 4) {
                Words = Words_4;
            }
            else if (level == 5) {
                Words = Words_5;
            }
            else if (level == 6) {
                Words = Words_6;
            }
            else if (level == 7) {
                Words = Words_7;
            }
            else if (level == 8) {
                Words = Words_8;
            }
            else if (level == 9) {
                Words = Words_9;
            }
            else if (level == 10) {
                Words = Words_10;
            }

            var flag = 0;
            var aa1 = 0;
            $(".individual").each(function() {
                var dataWordValue = $(this).data("word");
                if (dataWordValue !== undefined && selectedWord.indexOf(dataWordValue) !== -1) {
                    $(this).css("border-color","green"); 
                    $(this).addClass("RightWord");
                    aa1++;
                }
            });

            if (p1 == 1) {
                if (event.which === 17)  {
                    for (let i = 0; i < Words.length; i++) {

                        if (selectedWord === Words[i]) {

                            Words_score += 1000;
                            score.innerHTML = "Score : " + Words_score;
                            if(Words_search_highScore < Words_score)
                            {
                                Words_search_highScore = Words_score;
                                highScore.innerHTML = "High Score : " + Words_search_highScore;
                                localStorage.setItem("words_search_highScore", JSON.stringify(Words_search_highScore));
                            }

                            var flag = 0;
                            for(var j=0; j<aa1; j++)
                            {
                                if($(".colorPurple").hasClass("RightWord")){
                                    flag = 0;
                                }
                                else{
                                    flag = 1;
                                    j = aa1;
                                    aa1 = 0;
                                }
                            }

                            if(flag == 0)
                            {
                                $(".colorPurple").addClass("correctlySelected");
                                $("#hint p").each(function (_key, item) {
                                    if (selectedWord == $(item).text()) {
                                        $(this).addClass("done");
                                    }
                                    if ($(".done").length == Words.length) {
                                        $("#hint").empty();
                                        $("#hint").append("<p id= message> Won the Game </p>");
                                        $("#nextLevel").css("display", "block");
                                        if(level==10)
                                        {
                                            $("#nextLevel").css("display", "none");
                                        }
                                    }
                                });
                            }
                        }
                    }

                    //         $(".colorPurple").addClass("correctlySelected");

                    //         $("#hint p").each(function (_key, item) {
                    //             if (selectedWord == $(item).text()) {
                    //                 $(this).addClass("done");
                    //             }
                    //             if ($(".done").length == Words.length) {
                    //                 $("#hint").empty();
                    //                 $("#hint").append("<p id= message> Won the Game </p>");
                    //                 $("#nextLevel").css("display", "block");
                    //                 if(level==10)
                    //                 {
                    //                     $("#nextLevel").css("display", "none");
                    //                 }
                    //             }
                    //         });
                    //     }
                    // }

                    selectedWord = "";
                    $(".individual").removeClass("colorPurple");
                }
                p1 = 0;
            }
        });
    }
    
});
