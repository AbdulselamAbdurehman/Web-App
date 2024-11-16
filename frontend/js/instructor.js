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
            throw new Error('Only verified Instructors can Access the page.');
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
        const questionNum = question.questionNumber;
      const explanation = question.explanation;
      index++;

      return `
          <fieldset class="mb-4 text-left ml-6" id="question-num-${questionNum}">
            <legend class="text-xl font-bold flex flex-row relative w-full">${index}. ${description}
                <span class="actions top-0 right-0 flex items-center mr-2">
                    <button class="edit-btn" id="edit-btn-${questionNum}">
                        <i class="fas fa-pencil-alt ml-2 mr-3"></i> <!-- Pen icon -->
                    </button>
                    <button class="delete-btn" id="delete-btn-${questionNum}">
                        <i class="fas fa-trash-alt ml-2 mr-6"></i> <!-- Bin icon -->
                    </button>
                </span>
          </legend>
          <input required id="${questionNum}1" type="radio" value="1" name="question${questionNum}" class="mx-8">
          <label for="${questionNum}1">${options[0]}</label><br>
          <input id="${questionNum}2" type="radio" value="2" name="question${questionNum}" class="mx-8">
          <label for="${questionNum}2">${options[1]}</label><br>
          <input id="${questionNum}3" type="radio" value="3" name="question${questionNum}" class="mx-8">
          <label for="${questionNum}3">${options[2]}</label><br>
          <input id="${questionNum}4" type="radio" value="4" name="question${questionNum}" class="mx-8">
          <label for="${questionNum}4">${options[3]}</label><br>
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
        const deleteButton = document.querySelector(`#delete-btn-${questionList[i-1].questionNumber}`);
        const editButton = document.querySelector(`#edit-btn-${questionList[i-1].questionNumber}`);

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
          console.log(`Please answer question ${i}`);
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
  console.log('your answers have been submitted');
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


async function deleteQuestion(question) {
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
                console.log("Question successfully deleted.");
                window.location.href = "../instructor.html";
            } else {
                throw new Error('Failed to delete question.');
            }
        } catch (error) {
            if (response && response.status === 401) {
                console.log('Only Instructors can delete a question.');
            } else {
                console.log('An error occurred while deleting the question.');
            }
        }
}



function editQuestion(question) {
    console.log(question);
    console.log("editQuestion called!");
    // Get the question container where the question content is displayed
    const questionContainer = document.getElementById(`question-num-${question.questionNumber}`);
    console.log(questionContainer);
    // return null;
    // Create input fields with the current values for the question details
    const editableForm = `
      <input type="text" id="edit-description" value="${question.description}" class="w-full mb-2 p-2 border rounded"/>
      <input type="text" id="edit-option1" value="${question.options[0]}" class="w-full mb-2 p-2 border rounded"/>
      <input type="text" id="edit-option2" value="${question.options[1]}" class="w-full mb-2 p-2 border rounded"/>
      <input type="text" id="edit-option3" value="${question.options[2]}" class="w-full mb-2 p-2 border rounded"/>
      <input type="text" id="edit-option4" value="${question.options[3]}" class="w-full mb-2 p-2 border rounded"/>
      <input type="number" id="edit-answer" value="${question.answer}" class="w-full mb-2 p-2 border rounded"/>
      <textarea id="edit-explanation" class="w-full mb-2 p-2 border rounded">${question.explanation}</textarea>
      <button id="save-edit" class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Save</button>
      <button id="cancel-edit" class="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Cancel</button>
    `;

    // Replace the question container content with the editable form
    questionContainer.innerHTML = editableForm;

    // Add event listener for the Save button
    document.getElementById("save-edit").addEventListener("click", () => {
        saveQuestionEdits(question.questionNumber);
    });

    // Add event listener for the Cancel button to reload the page and show original content
    document.getElementById("cancel-edit").addEventListener("click", () => {
        window.location.reload();
    });
}

async function saveQuestionEdits(questionNum) {
    // Retrieve updated values from input fields
    const updatedQuestion = {
        description: document.getElementById("edit-description").value,
        options: [
            document.getElementById("edit-option1").value,
            document.getElementById("edit-option2").value,
            document.getElementById("edit-option3").value,
            document.getElementById("edit-option4").value,
        ],
        answer: parseInt(document.getElementById("edit-answer").value),
        explanation: document.getElementById("edit-explanation").value
    };

    // Send the PATCH request to update the question on the server
    try {
        const endpoint = `http://localhost:3000/questions/${questionNum}`;
        const token = localStorage.getItem('token');
        const response = await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedQuestion)
        });

        if (response.ok) {
            console.log('Question updated successfully.');
            window.location.reload();
        } else {
            throw new Error('Failed to update question.');
        }
    } catch (error) {
        console.error("Error updating question:", error);
        console.log('An error occurred while updating the question.');
    }
}

let addQuestion = document.getElementById('addQuestion');
addQuestion.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '../question.html';
})