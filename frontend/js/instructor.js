async function fetchQuestions() {
    try {
        const endpoint = 'http://localhost:3000/questions/';
        const token = localStorage.getItem('token'); //
        let email = 'placeholder'; 
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({email})
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

  // Render the quiz UI
  async function renderQuiz() {
    const questions = await fetchQuestions();
    const quizContainer = document.getElementById('quiz-container');

    questions.forEach(question => {
      const questionContainer = createQuestionCard(question);
      quizContainer.appendChild(questionContainer);
    });
  }

    // Function to create a question card with edit and delete buttons
function createQuestionCard(question) {
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question-container', 'mb-8', 'p-4', 'bg-white', 'rounded-lg', 'shadow-md', 'relative'); // Add 'relative' class for positioning

    const questionHeader = document.createElement('h3');
    questionHeader.textContent = `${question.questionNumber}. ${question.description}`;
    questionHeader.classList.add('text-xl', 'font-semibold', 'mb-4');
    questionContainer.appendChild(questionHeader);

    // Edit and delete buttons
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('absolute', 'top-2', 'right-2'); // Position the buttons at the top right

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('bg-yellow-500', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded-full', 'mr-2', 'hover:bg-yellow-700', 'focus:outline-none', 'focus:shadow-outline-yellow', 'active:bg-yellow-800', 'transition', 'duration-150', 'ease-in-out');
    editButton.onclick = () => showEditQuestion(question);
    buttonsContainer.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('bg-red-500', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded-full', 'hover:bg-red-700', 'focus:outline-none', 'focus:shadow-outline-red', 'active:bg-red-800', 'transition', 'duration-150', 'ease-in-out');
    deleteButton.onclick = () => deleteQuestion(question.questionNumber);
    buttonsContainer.appendChild(deleteButton);

    questionContainer.appendChild(buttonsContainer);

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');

    question.options.forEach((option, index) => {
    const radioLabel = document.createElement('label');
    radioLabel.innerHTML = `
        <input type="radio" name="question-${question.questionNumber}" value="${index}" class="mr-2 text-blue-500 focus:ring-2 focus:ring-blue-300">
        <span class="text-lg">${option}</span>
    `;
    radioLabel.classList.add('flex', 'items-center', 'mb-2');
    optionsContainer.appendChild(radioLabel);
    });

    questionContainer.appendChild(optionsContainer);
    questionContainer.setAttribute('data-answer', question.answer);

    return questionContainer;
}


  // Function to delete a question
async function deleteQuestion(questionNumber) {
    const quizContainer = document.getElementById('quiz-container');
    const questionToRemove = document.querySelector(`[data-answer="${questionNumber}"]`);
    quizContainer.removeChild(questionToRemove);

    try {
        const endpoint = `http://localhost:3000/questions/${questionNumber}`;
        const token = localStorage.getItem('token'); // 
        const response = await fetch(endpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // const questions = await response.json();
        // return questions;
    } catch (error) {
        alert('Only Instructors can delete a question.', error);
        window.location.href = '../home.html';
    }

  }

  // Function to show the edit form for a question
  function showEditQuestion(question) {
    // Hide the quiz container, submit button, add question button, and result container
    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.querySelector('.bg-blue-500');
    const addQuestionButton = document.querySelector('.bg-green-500');
    const resultContainer = document.getElementById('result-container');

    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    addQuestionButton.style.display = 'none';
    resultContainer.style.display = 'none';

    // Create an edit form with the current question details
    const editForm = document.createElement('div');
    editForm.classList.add('question-container', 'mb-8', 'p-4', 'bg-white', 'rounded-lg', 'shadow-md');

    editForm.innerHTML = `
      <form id="editQuestionForm${question.questionNumber}">
        <h3 class="text-xl font-semibold mb-4">Edit Question ${question.questionNumber}</h3>
        
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description:</label>
        <textarea id="description" name="description" rows="2" class="w-full p-2 border rounded-md mb-2" placeholder="Enter question description">${question.description}</textarea>

        <label for="answer" class="block text-sm font-medium text-gray-700 mb-1">Answer (1-4):</label>
        <input type="number" id="answer" name="answer" class="w-full p-2 border rounded-md mb-2" placeholder="Enter the correct answer index (1-4)" min="1" max="4" value="${question.answer}">

        <label for="explanation" class="block text-sm font-medium text-gray-700 mb-1">Explanation:</label>
        <textarea id="explanation" name="explanation" rows="2" class="w-full p-2 border rounded-md mb-2" placeholder="Enter explanation">${question.explanation}</textarea>

        <label class="block text-sm font-medium text-gray-700 mb-1">Options:</label>
        <input type="text" id="option1" name="option1" class="w-full p-2 border rounded-md mb-2" placeholder="Option 1" value="${question.options[0]}">
        <input type="text" id="option2" name="option2" class="w-full p-2 border rounded-md mb-2" placeholder="Option 2" value="${question.options[1]}">
        <input type="text" id="option3" name="option3" class="w-full p-2 border rounded-md mb-2" placeholder="Option 3" value="${question.options[2]}">
        <input type="text" id="option4" name="option4" class="w-full p-2 border rounded-md mb-2" placeholder="Option 4" value="${question.options[3]}">

        <button type="button" onclick="confirmEditQuestion(${question.questionNumber})" class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-150 ease-in-out">Confirm Edit</button>
      </form>
    `;

    // Append the edit form to the body
    document.body.appendChild(editForm);
  }

  // Function to confirm and save the edits for a question
async  function confirmEditQuestion(questionNumber) {
    const form = document.getElementById(`editQuestionForm${questionNumber}`);
    const description = form.elements['description'].value;
    const answer = form.elements['answer'].value;
    const explanation = form.elements['explanation'].value;
    const option1 = form.elements['option1'].value;
    const option2 = form.elements['option2'].value;
    const option3 = form.elements['option3'].value;
    const option4 = form.elements['option4'].value;

    const editedQuestion = {
      questionNumber: questionNumber,
      description: description,
      options: [option1, option2, option3, option4],
      answer: parseInt(answer),
      explanation: explanation
    };
    try {
        const endpoint = 'http://localhost:3000/questions/';
        const token = localStorage.getItem('token'); //
        let email = 'placeholder'; 
        const response = await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(editedQuestion)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const questions = await response.json();
        return questions;
    } catch (error) {
        console.error('Only Instructor can edit questions.', error);
        window.location.href = '../home.html';
    }

    // Update the question card with the edited question details
    const quizContainer = document.getElementById('quiz-container');
    const editedQuestionCard = createQuestionCard(editedQuestion);
    const currentQuestionCard = document.querySelector(`[data-answer="${questionNumber}"]`);
    quizContainer.replaceChild(editedQuestionCard, currentQuestionCard);

    // Show the hidden elements again
    const elementsToShow = [quizContainer, submitButton, addQuestionButton, resultContainer];
    elementsToShow.forEach(element => (element.style.display = 'block'));

    // Remove the edit form
    document.body.removeChild(form);
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
 // Add a new question form dynamically
function addQuestionForm() {
// Hide the quiz container, submit button, add question button, and result container
const quizContainer = document.getElementById('quiz-container');
const submitButton = document.querySelector('.bg-blue-500');
const addQuestionButton = document.querySelector('.bg-green-500');
const resultContainer = document.getElementById('result-container');

quizContainer.style.display = 'none';
submitButton.style.display = 'none';
addQuestionButton.style.display = 'none';
resultContainer.style.display = 'none';

const newQuestionNumber = quizContainer.children.length + 1;

const questionForm = document.createElement('div');
questionForm.classList.add('question-container', 'mb-8', 'p-4', 'bg-white', 'rounded-lg', 'shadow-md');

questionForm.innerHTML = `
  <form id="newQuestionForm${newQuestionNumber}">
    <h3 class="text-xl font-semibold mb-4">New Question ${newQuestionNumber}</h3>
    
    <label for="description${newQuestionNumber}" class="block text-sm font-medium text-gray-700 mb-1">Description:</label>
    <textarea id="description${newQuestionNumber}" name="description${newQuestionNumber}" rows="2" class="w-full p-2 border rounded-md mb-2" placeholder="Enter question description"></textarea>

    <label for="answer${newQuestionNumber}" class="block text-sm font-medium text-gray-700 mb-1">Answer (1-4):</label>
    <input type="number" id="answer${newQuestionNumber}" name="answer${newQuestionNumber}" class="w-full p-2 border rounded-md mb-2" placeholder="Enter the correct answer index (1-4)" min="1" max="4">

    <label for="explanation${newQuestionNumber}" class="block text-sm font-medium text-gray-700 mb-1">Explanation:</label>
    <textarea id="explanation${newQuestionNumber}" name="explanation${newQuestionNumber}" rows="2" class="w-full p-2 border rounded-md mb-2" placeholder="Enter explanation"></textarea>

    <label class="block text-sm font-medium text-gray-700 mb-1">Options:</label>
    <input type="text" id="option1${newQuestionNumber}" name="option1${newQuestionNumber}" class="w-full p-2 border rounded-md mb-2" placeholder="Option 1">
    <input type="text" id="option2${newQuestionNumber}" name="option2${newQuestionNumber}" class="w-full p-2 border rounded-md mb-2" placeholder="Option 2">
    <input type="text" id="option3${newQuestionNumber}" name="option3${newQuestionNumber}" class="w-full p-2 border rounded-md mb-2" placeholder="Option 3">
    <input type="text" id="option4${newQuestionNumber}" name="option4${newQuestionNumber}" class="w-full p-2 border rounded-md mb-2" placeholder="Option 4">

    <button type="button" onclick="addNewQuestion(${newQuestionNumber})" class="bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline-green active:bg-green-800 transition duration-150 ease-in-out">Add</button>
  </form>
`;

// Append the new question form to the body
document.body.appendChild(questionForm);
}


  // Add a new question dynamically
async function addNewQuestion(newQuestionNumber) {
    const form = document.getElementById(`newQuestionForm${newQuestionNumber}`);
    const description = form.elements[`description${newQuestionNumber}`].value;
    const answer = form.elements[`answer${newQuestionNumber}`].value;
    const explanation = form.elements[`explanation${newQuestionNumber}`].value;
    const option1 = form.elements[`option1${newQuestionNumber}`].value;
    const option2 = form.elements[`option2${newQuestionNumber}`].value;
    const option3 = form.elements[`option3${newQuestionNumber}`].value;
    const option4 = form.elements[`option4${newQuestionNumber}`].value;

    const newQuestion = {
      // questionNumber: newQuestionNumber,
      description: description,
      options: [option1, option2, option3, option4],
      answer: parseInt(answer),
      explanation: explanation
    };

    const quizContainer = document.getElementById('quiz-container');
    const questionContainer = createQuestionCard(newQuestion);
    quizContainer.replaceChild(questionContainer, form.parentElement);
    try {
        const endpoint = 'http://localhost:3000/questions/';
        const token = localStorage.getItem('token'); // 
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                newQuestion,
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

    } catch (error) {
        console.error('Only Instructors can Post.', error);
        window.location.href = '../home.html';
    }

    // Optionally, you can send the new question data to your server for storage.
    // Example: sendNewQuestionToServer(newQuestion);
  }

  // Fetch questions and render the quiz when the page loads
  window.onload = () => {
    renderQuiz();
  };
