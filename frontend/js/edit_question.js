let submitButton = document.getElementById("submitQuestion");
const token = localStorage.getItem('token');
const endpoint = 'http://localhost:3000/questions/';
let questionNumber = localStorage.getItem('questionNumber');

async function patchQuestion(question){
    try {
        alert("from push");
        console.log(token);
        const response = await fetch(endpoint+questionNumber, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(question)
        });

        if (!response.ok) {
            throw new Error("Only Instuctors.");
        }

    } catch (error) {

        alert(error.message);
        return 'error';
    }
    alert("Question successfully Updated.");
    window.location.href = '../instructor.html';
}


async function getQuestion(){
    try {
        const response = await fetch(`${endpoint}${questionNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(question)
        });

        if (response.ok) {
            alert("has got");

        } else {
            throw new Error("Only Instuctors can pick questions");
        }
        return response.json();
    } catch (error) {
    
        alert(error.message);
        window.location.href = '../instructor.html';
    }

}


async function initializeQuestion() {
    try {
        let question = await getQuestion();
        if (question) {

            let description = document.getElementById('description');
            description.value = question.description;

            let explanation = document.getElementById('explanation');
            explanation.value = question.explanation; 

            let answerInput = document.getElementById('answer');
            answerInput.value = question.answer;

            for (let i = 1; i <= 4; i++){
                let option = document.getElementById(`option-${i}`);
                option.value = question.options[i - 1];
            }
        }
    } catch (error) {
        console.error('Error initializing question:', error);
    }
}

initializeQuestion();
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    let description = document.getElementById('description').value;
    let explanation = document.getElementById('explanation').value;
    let answerInput = document.getElementById('answer').value;
    let options = [];
    for (let i = 1; i <= 4; i++){
        let option = document.getElementById(`option-${i}`).value;
        if (!option){
            alert(`option-${i} missing.`);
            return "Error";
        }
        options.push(option)
    }
    if (!answerInput || !explanation || !description){
        alert("Required fields missing!");
        return "Error";
    }

    let answer = +answerInput;
    if (!answer){
        alert("Answer should be 1-4");
        return "Error";
    }
    const question = {
        description,
        options,
        answer,
        explanation
    };
    console.log(question);
    pushQuestion(question);
});
