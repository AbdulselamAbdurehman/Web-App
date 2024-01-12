async function fetchQuestions() {
    try {
        const endpoint = 'http://localhost:3000/questions/';
        const token = localStorage.getItem('token'); // 
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const questions = await response.json();
        return questions;
    } catch (error) {
        console.error('Error fetching questions:', error);
        window.location.href = '../home.html';
    }
}

async function renderQuiz() {
    const questions = await fetchQuestions();
    const quizContainer = document.getElementById('quiz-container');

    questions.forEach(question => {
      const questionContainer = document.createElement('div');
      questionContainer.classList.add('question-container', 'mb-8', 'p-4', 'bg-white', 'rounded-lg', 'shadow-md');

      // Display questionNumber and description
      const questionHeader = document.createElement('h3');
      questionHeader.textContent = `${question.questionNumber}. ${question.description}`;
      questionHeader.classList.add('text-xl', 'font-semibold', 'mb-4');
      questionContainer.appendChild(questionHeader);

      // Display options with radio buttons
      const optionsContainer = document.createElement('div');
      optionsContainer.classList.add('options-container');

      question.options.forEach((option, index) => {
        const radioLabel = document.createElement('label');
        radioLabel.innerHTML = `
          <input type="radio" name="question-${question.questionNumber}" value="${index}" class="mr-2 text-blue-500 focus:ring-2 focus:ring-blue-300">
          <span class="text-lg">${option}</span>`;
        radioLabel.classList.add('flex', 'items-center', 'mb-2');
        optionsContainer.appendChild(radioLabel);
      });

      questionContainer.appendChild(optionsContainer);
      questionContainer.setAttribute('data-answer', question.answer); // Add data-answer attribute
      quizContainer.appendChild(questionContainer);
    });
  }

  


    // Submit the quiz and display result
  function submitQuiz() {
    const questions = document.getElementById('quiz-container').querySelectorAll('.options-container');
    let correctAnswers = 0;
    let totalTriedQuestions = 0;
    let result = '';

    questions.forEach((question, index) => {
      const selectedOption = question.querySelector('input[type="radio"]:checked');
      
      if (selectedOption) {
        totalTriedQuestions++;
        const selectedValue = parseInt(selectedOption.value, 10);
        if (selectedValue === parseInt(question.getAttribute('data-answer'), 10) - 1) {
          correctAnswers++;
          result += `${index + 1}: Correct!\n`;
        } else {
          result += `${index + 1}: Incorrect!\n`;
        }
      }
    });

    // Display result with styling
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = `<div class="bg-blue-200 p-4 rounded-md">${result}\nResult: ${correctAnswers} out of ${totalTriedQuestions}</div>`;
  }

  // Fetch questions and render the quiz when the page loads
  window.onload = () => {
    renderQuiz();
  };
