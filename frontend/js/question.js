let submitButton = document.getElementById("submitQuestion");


submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    let description = document.getElementById('description');
    let options = [];
    for (let i = 1; i <= 4; i++){
        let option = document.getElementById(`option-${i}`).value;
        options.push(option)
    }
    let answer = document.getElementById('answer');
    let explanation = document.getElementById('explanation');
    pushQuestion({
        description,
        options,
        answer,
        explanation
    });
});


async function pushQuestion(question){
    try {
        const endpoint = 'http://localhost:3000/questions/';
        const token = localStorage.getItem('token');
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(question)
        });

        if (!response.ok) {
            throw new Error("You must be a verified instructor.");
        }

    } catch (error) {
        alert(error.message);
        window.location.href = '../home.html';
    }

}