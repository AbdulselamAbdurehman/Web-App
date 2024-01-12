let button = document.getElementById('submit');
button.addEventListener('click', signup);

async function signup(event) {
    event.preventDefault(); // Prevent default form submission

    let roleButtons = document.getElementsByName('role');
    let role = 'STUDENT';
    for (let i = 0; i < roleButtons.length; i++) {
        if (roleButtons[i].checked) {
            role = roleButtons[i].value;
        }
    }
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    try {
        const endPoint = "http://localhost:3000/users/signup";
        const response = await fetch(endPoint, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                role,
                name
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (response.status === 201) {
            localStorage.setItem('token', data.token);
            if (role === "STUDENT") {
                window.location.href = "../student_question.html";
            } else {
                window.location.href = "../instructor_question.html";
            }
        }
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('Network request failed')) {
            alert('Network error. Please check your internet connection.');
        } else {
            const errorMessage = error.message || 'An unknown error occurred.';
            alert(`Error: ${errorMessage}`);
        }
        window.location.href = '../signup.html';
    }
}
