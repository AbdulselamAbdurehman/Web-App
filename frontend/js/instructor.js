let questionList;
async function loadQuestionsAndRenderQuiz() {
  try {
      questionList = await fetchQuestions(); 
      renderQuiz(questionList);

    } catch (error) {
      alert(error.message);
      console.error('Error loading questions:', error);
      window.location.href = "../home.html";
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
            throw new Error('Only verified Instructors can Access the page.');
        }
        const questionList = await response.json();
        return questionList;
    } catch (error) {
        alert(error.message);
        console.error('Error fetching questions:', error);
        window.location.href = "../home.html";
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
          <fieldset class="mb-4 text-left ml-6" id="question-num-${index}">
            <legend class="text-xl font-bold flex flex-row relative w-full">${index}. ${description}
                <span class="actions absolute top-0 right-0 flex items-center mr-2">
                    <button class="edit-btn" id="edit-btn-${index}">
                        <i class="fas fa-pencil-alt ml-2 mr-3"></i> <!-- Pen icon -->
                    </button>
                    <button class="delete-btn" id="delete-btn-${index}">
                        <i class="fas fa-trash-alt ml-2 mr-6"></i> <!-- Bin icon -->
                    </button>
                </span>
          </legend>
          <input required id="${index}1" type="radio" value="0" name="question${index}" class="mx-8">
          <label for="${index}1">${options[0]}</label><br>
          <input id="${index}2" type="radio" value="1" name="question${index}" class="mx-8">
          <label for="${index}2">${options[1]}</label><br>
          <input id="${index}3" type="radio" value="2" name="question${index}" class="mx-8">
          <label for="${index}3">${options[2]}</label><br>
          <input id="${index}4" type="radio" value="3" name="question${index}" class="mx-8">
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
  for (let i = 1; i <= questionList.length; i++){
        const deleteButton = document.querySelector(`#delete-btn-${i}`);
        const editButton = document.querySelector(`#edit-btn-${i}`);

        deleteButton.addEventListener('click', () =>{
            deleteQuestion(questionList[i-1]);
        });

        editButton.addEventListener('click', () =>{
            editQuestion(questionList[i-1]);
        });
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
  document.getElementById('result-container').innerHTML =`<h3>${correct} of ${questionList.length} correct!</h3>`;
});
window.onload = () => {
    loadQuestionsAndRenderQuiz();
  };

let logOutButton = document.getElementById('logOut');
logOutButton.addEventListener('click', () => {
  window.localStorage.removeItem('token');
  window.location.href = '../home.html';
});


async function deleteQuestion(question) {
    alert("deletion ongoing.");
    if (confirm("Do you want to delete this question?")){
        try {
            let questionNum = question.questionNumber;
            const endpoint = `http://localhost:3000/questions/${questionNum}`;
            const token = localStorage.getItem('token'); 
            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok){
                alert("Question successfully deleted.");
                window.location.href = "../instructor.html";
            } else {
                throw new Error('Failed to delete question.');
            }
        } catch (error) {
            if (response && response.status === 401) {
                alert('Only Instructors can delete a question.');
            } else {
                alert('An error occurred while deleting the question.');
            }
        }
    }
}



function editQuestion(question){
    console.log("editQuestion called!");
    alert("edition ongoing.");
}


let addQuestion = document.getElementById('addQuestion');
addQuestion.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '../question.html';
})