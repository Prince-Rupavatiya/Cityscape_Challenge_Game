var questions = [
    {
        num: 1,
        question: "Who wrote the Indian national anthem, Jana Gana Mana? ",
        answer: "B) Rabindranath Tagore",
        option: [

            "A) Mahatma Gandhi",
            "B) Rabindranath Tagore",
            "C) Subhas Chandra Bose",
            "D) Jawaharlal Nehru"
        ]
    },
    {
        num: 2,
        question: "Who is known as the Father of the Indian Constitution? ",
        answer: "C) B.R. Ambedkar",
        option: [
            " A) Jawaharlal Nehru",
            "B) Bhagat Singh",
            "C) B.R. Ambedkar",
            "D) Sardar Patel"

        ]
    },

    {
        num: 3,
        question: "What is the largest planet in our solar system?",
        answer: "A) Jupiter",
        option: [
            "A) Jupiter",
            "B) Mars",
            "C) Earth",
            "D) Venus"
        ]
    },

    {
        num: 4,
        question: "What is the most expensive item in the world?",
        answer: "C) Uranium",
        option: [
            "A) Gold",
            "B) Diamonds",
            "C) Uranium",
            "D) Platinum"


        ]
    },
    {
        num: 5,
        question: "Who was the first Prime Minister of India?",
        answer: "A) Jawaharlal Nehru",
        option: [
            "A) Jawaharlal Nehru",
            "B) Sardar Patel",
            "C) Dr. B.R. Ambedkar",
            "D) Maulana Abul Kalam Azad"


        ]
    },
    {
        num: 6,
        question: "How many bones are there in the adult human body?",
        answer: "D) 206",
        option: [
            "A) 106",
            "B) 406",
            "C) 306",
            "D) 206"


        ]
    },
    {
        num: 7,
        question: "Who was the first Indian woman to win an Olympic medal?",
        answer: "B) Karnam Malleswari",
        option: [
            "A) P.T. Usha",
            "B) Karnam Malleswari",
            "C) Saina Nehwal",
            "D) Mary Kom"


        ]
    },
    {
        num: 8,
        question: "What element is diamond made of?",
        answer: "A) Carbon",
        option: [
            "A) Carbon",
            "B) Oxygen",
            "C) Hydrogen",
            "D) Nitrogen"


        ]
    },
    {
        num: 9,
        question: "When is National Farmers Day celebrated in India?",
        answer: "C) 23rd December",
        option: [
            "A) 15th August",
            "B) 2nd October",
            "C) 23rd December",
            "D) 26th January"


        ]
    },

    {
        num: 10,
        question: "How many years did it take to build the Taj Mahal?",
        answer: "D) 20 years",
        option: [
            "A) 10 years",
            "B) 15 years",
            "C) 25 years",
            "D) 20 years"


        ]
    },

    {
        num: 11,
        question: "What is the capital of France?",
        answer: "C) Paris",
        option: [
            "A) London",
            "B) Berlin",
            "C) Paris",
            "D) Madrid"


        ]
    },

    {
        num: 12,
        question: "When is the “International Biodiversity Day” celebrated every year?",
        answer: "A) 22nd May",
        option: [
            "A) 22nd May",
            "B) 23rd May",
            "C) 25th May",
            "D) 20th May"


        ]
    },

    {
        num: 13,
        question: "Which country has the world's largest solar power station?",
        answer: "B) China",
        option: [
            "A) United States",
            "B) China",
            "C) India",
            "D) Germany"


        ]
    },

    {
        num: 14,
        question: "Which animal has no brain and heart?",
        answer: "D) Jellyfish",
        option: [
            "A) Octopus",
            "B) Starfish",
            "C) Seahorse",
            "D) Jellyfish"


        ]
    },

    {
        num: 15,
        question: "Which is the longest river on Earth?",
        answer: "C) Nile",
        option: [
            "A) Amazon",
            "B) Mississippi",
            "C) Nile",
            "D) Yangtze"


        ]
    }
]


const start_btn = document.querySelector(".start_btn");
const about = document.querySelector(".about");
const kbc_exit = document.querySelector(".kbc_exit");
const about_r = document.querySelector(".about-r");
const button_a = document.querySelector(".button-a");
const on = document.querySelector(".on");
const off = document.querySelector(".off");

const quiz_box = document.querySelector(" .quiz-box");
const question_text = document.querySelector(" .question-text");
const question_box = document.querySelector(".options");
const next_btn = document.querySelector(" .next_btn");
const total_ques = document.querySelector(" .total-ques");
const current_ques = document.querySelector(" .count-ques");
const result_box = document.querySelector(" .result-box ");
const total_ques_r = document.querySelector(" .total-ques-r span");
const right_ans_r = document.querySelector(".right-ans-r span");
const wrong_ans_r = document.querySelector(" .wrong-ans-r span");
const again_quiz_r = document.querySelector(" .again-quiz");
const exit_r = document.querySelector(" .exit");
const rupees_r = document.querySelector(" .rupees span");
const side_menu = document.querySelector(".side-menu");

const start_audio = document.getElementById('audioPlayer');
const correctAnswerAudio = document.getElementById('correctAnswerAudio');
const wrongAnswerAudio = document.getElementById('wrongAnswerAudio');

let mute = 0;


start_btn.onclick = () => {
    start_audio.play();

    start_btn.style.display = "none";
    kbc_exit.style.display = "none";
    quiz_box.style.display = "block";
    about.style.display = "none";
    about_r.style.display = "none";
    side_menu.style.display = "block";


    showquestion(questions_index = Math.floor(Math.random() * 15));

}
about.onclick = () => {

    about_r.style.display = "block";
    start_btn.style.display = "none";
    about.style.display = "none";
    kbc_exit.style.display = "none";

}
button_a.onclick = () => {

    about_r.style.display = "none";
    start_btn.style.display = "block";
    about.style.display = "block";
    kbc_exit.style.display = "block";

}
on.onclick = () => {

    if (mute == 0) {
        mute = 1;
        on.classList.add("inactive");
        off.classList.remove("inactive");


        start_audio.pause();
        start_audio.currentTime = 0;
        correctAnswerAudio.pause();
        correctAnswerAudio.currentTime = 0;
        start_audio.muted = true;
        correctAnswerAudio.muted = true;
    }
}

off.onclick = () => {
    if (mute == 1) {
        mute = 0;
        on.classList.remove("inactive");
        off.classList.add("inactive");
        start_audio.muted = false;
        correctAnswerAudio.muted = false;
    }
}
total_ques.innerText = questions.length;
total_ques_r.innerText = questions.length;

var questions_index = 0;
var num = 1;
var rightanswer = 0;
var wronganswer = 0;
current_ques.innerText = num;
var rupees = 0;
var arr = [15], n = 0;
var timer; // Declare a variable to store the timer reference
var timeLeft = 20; // Initial time in seconds

function startTimer() {
    timer = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay(timeLeft);

        }
        else {
            clearInterval(timer); // Clear the timer when time is up
            quiz_box.style.display = 'none';

            let temp = document.getElementById("r1");
            temp.style.display = "block";
            console.log(getComputedStyle(temp).display);
            start_btn.style.display = "none";
            about.style.display = "none";
            side_menu.style.display = 'none';
            right_ans_r.innerText = rightanswer;
            wrong_ans_r.innerText = wronganswer;
            rupees_r.innerHTML = rupees;
            return 0;
            console.log("Time's up!");

        }
    }, 1000); // Update the timer every 1 second (1000 milliseconds)
}
function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const timerDisplay = document.getElementById("timer");
    timerDisplay.innerText = `Time Left: ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function showquestion(questions_index) {

    console.log(questions_index, arr);
    if (num === 15) {
        next_btn.innerText = "Finish";

    }
    if (num === 16) {
        console.log("complete");
        quiz_box.style.display = "none";

        let temp = document.getElementById("r1");
        temp.style.display = "block";
        start_btn.style.display = "none";
        side_menu.style.display = 'none';
        right_ans_r.innerText = rightanswer;
        wrong_ans_r.innerText = wronganswer;
        rupees_r.innerHTML = rupees;
        return 0;
    }

    var option_statement = " ";

    if (arr.includes(questions_index)) {
        console.log("included");
        showquestion(questions_index = Math.floor(Math.random() * 15));
    }
    else {
        console.log(" not included");
        timeLeft = 20;
        updateTimerDisplay(timeLeft); // Update the timer display
        startTimer(); // Start the timer

        question_text.innerText = num++ + " . " + questions[questions_index].question;
        arr[n] = questions_index;
        n++;
        for (var i = 0; i < questions[questions_index].option.length; i++) {
            console.log(questions[questions_index].option[i]);
            option_statement += `<div class="option">${questions[questions_index].option[i]}</div>`;
        }
        question_box.innerHTML = option_statement;
        var alloptions = question_box.querySelectorAll(" .option");

        for (var j = 0; j < alloptions.length; j++) {
            alloptions[j].setAttribute("onclick", "userAnswer(this," + questions_index + ")");
        }
    }
    next_btn.classList.add("inactive");
}

next_btn.onclick = () => {

    console.log(questions.length);
    if (questions.length <= 15) {
        current_ques.innerText = num;
        showquestion(questions_index = Math.floor(Math.random() * 15));
    }
    else {
        console.log("complete");

        quiz_box.style.display = "none";
        side_menu.style.display='none';
        let temp = document.getElementById("r1");
        temp.style.display = "block";
        console.log(getComputedStyle(temp).display);
        start_btn.style.display = "none";
        right_ans_r.innerText = rightanswer;
        wrong_ans_r.innerText = wronganswer;
        rupees_r.innerHTML = rupees;
        about.style.display = "none";
        kbc_exit.style.display = "none";

    }
}
let consecutiveCorrectAnswers = 0; // Track consecutive correct answers
function userAnswer(answer, questions_index) {
    let userANs = answer.innerText;
    let correctAns = questions[questions_index].answer;
    var alloptions2 = question_box.querySelectorAll(" .option");
    console.log(question_text, questions_index, userANs, correctAns);

    next_btn.classList.remove("inactive");

    if (userANs == correctAns) {
        console.log(" %c right answer", "color : green");
        answer.classList.add("correct");
        answer.classList.add("disable");
        rightanswer++;
        rupees = rupees + 1000; 
        correctAnswerAudio.play();
        clearInterval(timer);
        celebration();
        updateSideMenuConsecutiveCorrectAnswers();
    } else {
        console.log(" %c wrong answer", "color : red");
        answer.classList.add("incorrect");

        wronganswer++;
        wrongAnswerAudio.play();

        for (var i = 0; i < alloptions2.length; i++) {
            if (alloptions2[i].innerText == correctAns) {
                alloptions2[i].classList.add("correct");
            }
        }
        if (wronganswer == 1) {
            quiz_box.style.display = "none";
            result_box.style.display = "block";
            side_menu.style.display = "none";

            celebration();
            right_ans_r.innerText = rightanswer;
            wrong_ans_r.innerText = wronganswer;
            rupees_r.innerText = rupees;                 

            // Reset consecutive correct answers count on wrong answer
            consecutiveCorrectAnswers = 0;
            const menuList = document.getElementById('value-menu');
            const menuItems = menuList.querySelectorAll('li');

            menuItems.forEach(item => {
                item.querySelector('a').style.color = '';
            });
            const currentItem = menuItems[14 - consecutiveCorrectAnswers];

            // Apply white font color to the current menu item
            currentItem.querySelector('a').style.color = '#ffcc00';

        }
    }

    for (var j = 0; j < alloptions2.length; j++) {
        alloptions2[j].classList.add("disable");
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const menuList = document.getElementById('value-menu');
    const startValue = 10000;
    const endValue = 10000000;
    const steps = 15;

    const stepSize = Math.pow(endValue / startValue, 1 / (steps - 1));

    let currentValue = startValue;

    for (let i = 0; i < steps; i++) {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = "#";

        const roundedValue = Math.ceil(currentValue / 1000) * 1000;

        link.textContent = formatCurrency(roundedValue);
        link.onclick = () => showQuestion(roundedValue);
        listItem.appendChild(link);

        menuList.insertBefore(listItem, menuList.firstChild);

        currentValue *= stepSize;

        
        if (currentValue > endValue) {
            currentValue = endValue; // Set it to the exact end value
        } else {
            currentValue = Math.min(currentValue, endValue);
        }
    }
});

function showQuestion(value) {
    document.getElementById('question-container').innerHTML = 'Question for ' + formatCurrency(value);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
}
function updateSideMenuConsecutiveCorrectAnswers() {
    const menuList = document.getElementById('value-menu');
    const menuItems = menuList.querySelectorAll('li');
    const currentItem = menuItems[14 - consecutiveCorrectAnswers];
    currentItem.querySelector('a').style.color = 'white';
    consecutiveCorrectAnswers++;
    rupees = currentItem.textContent; //  adjust as per your HTML structure
    
    if (consecutiveCorrectAnswers === 15) {
        consecutiveCorrectAnswers = 0;
        menuItems.forEach(item => {
            item.querySelector('a').style.color = '';
        });
    }

}

exit_r.onclick = () => {
    arr = [];
    clearInterval(timer);


    result_box.style.display = "none";
    start_btn.style.display = "block";
    about.style.display = "block";
    kbc_exit.style.display = "block";
    questions_index = Math.floor(Math.random() * 15);
    console.log(questions_index, arr);
    rightanswer = 0;
    wronganswer = 0;
    rupees = 0;
    num = 1;
    current_ques.innerText = num;
    next_btn.innerText = "next question";

}

again_quiz_r.onclick = () => {
    arr = [];
    clearInterval(timer);
    side_menu.style.display = "block";
    result_box.style.display = "none";
    quiz_box.style.display = "block";
    questions_index = Math.floor(Math.random() * 15);
    console.log(questions_index, arr);
    rightanswer = 0;
    wronganswer = 0;
    rupees = 0;
    num = 1;
    current_ques.innerText = num;
    next_btn.innerText = "next question";
    showquestion(questions_index);
}


function celebration() {
    const confettiContainer = document.getElementById("confetti-container");

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDuration = `${Math.random() * 2 + 1}s`; // Vary animation duration
        confetti.style.animationDelay = `${Math.random()}s`; // Add a delay to stagger animations
        confettiContainer.appendChild(confetti);
    }
    setTimeout(() => {
        confettiContainer.innerHTML = "";
    }, 3000);
}

