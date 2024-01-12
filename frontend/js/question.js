let submitButton = document.getElementById("submitQuestion");

async function pushQuestion(question){
    try {
        const endpoint = 'http://localhost:3000/questions/';
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await fetch(endpoint, {
            method: 'POST',
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
    alert("Question successfully added.");
    window.location.href = '../instructor.html';
    }


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
