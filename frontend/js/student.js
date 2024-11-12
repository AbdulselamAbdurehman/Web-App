let questionList;
async function loadQuestionsAndRenderQuiz() {
  try {
      questionList = await fetchQuestions(); 
      renderQuiz(questionList);
  } catch (error) {
      console.error('Error loading questions:', error);
  }
}

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
            throw new Error('Only verified Students can Access the page.');
        }
        const questionList = await response.json();
        return questionList;
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}

function renderQuiz() {
    const container = document.getElementById('quiz-container');
    let index = 0;
    try{
      const form = questionList.map(question => {
      const description = question.description;
      const options = question.options;

      const explanation = question.explanation;
      index++;

      return `
      <fieldset class="mb-4 text-left ml-6">
          <legend class="text-xl font-bold mb-4">${index}. ${description}</legend>
          <input required id="${index}1" type="radio" value="1" name="question${index}" class="mx-8">
          <label for="${index}1">${options[0]}</label><br>
          <input id="${index}2" type="radio" value="2" name="question${index}" class="mx-8">
          <label for="${index}2">${options[1]}</label><br>
          <input id="${index}3" type="radio" value="3" name="question${index}" class="mx-8">
          <label for="${index}3">${options[2]}</label><br>
          <input id="${index}4" type="radio" value="4" name="question${index}" class="mx-8">
          <label for="${index}4">${options[3]}</label><br>
          <div class="explanation hidden mt-2">
              <h3 class="text-lg font-semibold mb-1 text-gray-800">Explanation</h3>
              <p class="text-sm text-gray-700">${explanation}</p>
          </div>
      </fieldset>`;
  }).join('');

      container.innerHTML = form;
  } catch {
    console.log("undefined list");
  }
}
let submitAnswer = document.getElementById("submit")
submitAnswer.addEventListener('click', (event) => {
  event.preventDefault();

  const userAnswers = [];
  for (let i = 1; i <= questionList.length; i++) {
      const answer = document.querySelector(`input[name="question${i}"]:checked`)
      if (!answer) {
          alert(`Please answer question ${i}`);
          return;
      }
      userAnswers.push(answer.value);
  }

  let correct = 0
  let explanationField = document.getElementsByClassName('explanation');
  for (let j = 0; j < questionList.length; j++){
      explanationField[j].classList.remove('hidden');
      if (questionList[j].answer == userAnswers[j]){
      correct++;
      }
  }
  alert('Your answer has been submitted.');
  let resultContainer = document.getElementById('result-container');
  resultContainer.innerHTML =`<h3>${correct} of ${questionList.length} correct!</h3>`;
  resultContainer.classList.remove("hidden");
});
window.onload = () => {
    loadQuestionsAndRenderQuiz();
  };

let logOutButton = document.getElementById('logOut');
logOutButton.addEventListener('click', () => {
  window.localStorage.removeItem('token');
  window.location.href = '../home.html';
});