document.addEventListener('DOMContentLoaded', () => {

    // 1. БАЗА ДАНИХ
    const questions = [
        {
            question: "столица Люксембурга?",
            answers: ["Люксембург", "Львів", "Берлин", "москва"],
            correct: 0
        },
        {
            question: "столица Польщі?",
            answers: ["Київ", "Варшава", "Львів", "Бухарест"],
            correct: 1
        },
        {
            question: "столица Румунії?",
            answers: ["Минск", "Варшава", "Чернівці", "Бухарест"],
            correct: 3
        },
        {
            question: "столица України?",
            answers: ["Минск", "Варшава", "Київ", "Бухарест"],
            correct: 2
        },
        {
            question: "скільки витратила грошей Німеччина на 2 світовій війні?",
            answers: ["2,4 мільярда дол.", "3 мільярда дол.", "1 мільярд дол.", "1,8 мільярда дол."],
            correct: 0
        },
        {
            question: "правда що без Німеччини не почалась 2 світові війні?",
            answers: ["так", "ні", "було", "я не знаю"],
            correct: 0
        },
        {
            question: "скільки на землі країн?",
            answers: ["150", "143", "195", "230"],
            correct: 2
        },
        {
            question: "яка найбільша країна?",
            answers: ["Ватикан", "США", "Україна", "росія"],
            correct: 3
        },
        {
            question: "яка найменша країна?",
            answers: ["Ватикан", "США", "Україна", "Кипр"],
            correct: 0
        },
        {
            question: "яка найбільша країна на 10 місці?",
            answers: ["Алжир", "США", "ЦАР", "росія"],
            correct: 0
        },
    ];

    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const resultText = document.querySelector('#result-text');
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const timerDisplay = document.querySelector('#timer');

    let questionIndex = 0;
    let score = 0;
    let timer = 15;
    let interval;

    function showQuestion(question) {
        clearInterval(interval);
        startTimer();

        answersContainer.innerHTML = '';
        questionText.innerText = question.question;

        question.answers.forEach((answer, i) => {
            const button = document.createElement('button');
            button.innerText = answer;
            button.classList.add('answer-btn');
            button.addEventListener('click', () => checkAnswer(button, i));
            answersContainer.appendChild(button);
        });
    }

    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }

    function checkAnswer(button, i) {
        if (i === questions[questionIndex].correct) {
            score++;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }

        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
        });

        setTimeout(nextQuestion, 1000);
    }

    function showResult() {
        const accuracy = Math.round((score / questions.length) * 100);
        resultText.innerText = `Твій результат: ${score}/${questions.length} (${accuracy}%)`;

        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');

        const finalScore = document.querySelector('#final-score');
        finalScore.innerText = score;
    }

    function startGame() {
        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');

        questionIndex = 0;
        score = 0;

        showQuestion(questions[questionIndex]);
    }

    function startTimer() {
        timer = 15;
        timerDisplay.innerText = `Час: ${timer}`;

        interval = setInterval(() => {
            timer--;
            timerDisplay.innerText = `Час: ${timer}`;

            if (timer <= 0) {
                clearInterval(interval);
                nextQuestion();
            }
        }, 1000);
    }

    startBtn.addEventListener('click', startGame);

    restartBtn.addEventListener('click', () => {
        startGame();
        resultScreen.classList.add('hide');
    });

});
