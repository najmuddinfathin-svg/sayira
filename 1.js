const questions = document.querySelectorAll('.question');

let currentQuestion = 0;
let score = 0;


// Ambil semua question
questions.forEach((question, index) => {

    const answers = question.querySelectorAll('input[type="radio"]');
    const nextButton = question.querySelector('.next');

    const wrongMessage = question.querySelector('.wrong');
    const correctMessage = question.querySelector('.correct-message');

    const scoreText = question.querySelector('.quiz-header span:last-child');


    // Sembunyikan feedback terlebih dahulu
    wrongMessage.style.display = 'none';
    correctMessage.style.display = 'none';


    answers.forEach(answer => {

        answer.addEventListener('change', function () {

            // Setelah memilih, semua jawaban dikunci
            answers.forEach(input => {
                input.disabled = true;
            });


            // Cari label dari input yang dipilih
            const selectedLabel = question.querySelector(
                `label[for="${this.id}"]`
            );


            // Cari jawaban yang benar
            const correctLabel = question.querySelector('label.correct');


            // Cek jawaban
            if (selectedLabel === correctLabel) {

                score++;

                correctMessage.style.display = 'block';

            } else {

                wrongMessage.style.display = 'block';

                // Tampilkan jawaban yang benar
                correctLabel.style.border = '2px solid green';
            }


            // Update score
            scoreText.textContent = `Score: ${score}`;


            // Ubah teks button pada soal terakhir
            if (index === questions.length - 1) {
                nextButton.textContent = 'Finish Quiz →';
            }
        });
    });
});


// RESULT
const resultSection = document.querySelector('#result');
const resultScore = resultSection.querySelector('strong');


// Ketika klik Finish Quiz
const finishButton = document.querySelector('.question-4 .next');

finishButton.addEventListener('click', function () {

    resultScore.textContent = `${score} / ${questions.length}`;

});


// RESTART
const restartButton = document.querySelector('.restart');

restartButton.addEventListener('click', function (event) {

    event.preventDefault();

    // Reset score
    score = 0;
    currentQuestion = 0;


    // Reset semua question
    questions.forEach(question => {

        const answers = question.querySelectorAll(
            'input[type="radio"]'
        );

        const wrongMessage = question.querySelector('.wrong');
        const correctMessage = question.querySelector('.correct-message');

        const correctLabel = question.querySelector('label.correct');

        answers.forEach(answer => {
            answer.checked = false;
            answer.disabled = false;
        });

        wrongMessage.style.display = 'none';
        correctMessage.style.display = 'none';

        correctLabel.style.border = '';

        const scoreText = question.querySelector(
            '.quiz-header span:last-child'
        );

        scoreText.textContent = 'Score: 0';
    });


    // Kembali ke question pertama
    window.location.hash = '';

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
