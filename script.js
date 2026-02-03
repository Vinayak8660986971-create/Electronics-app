const backendURL = "http://127.0.0.1:5000";

function loadTopics() {
    fetch(`http://127.0.0.1:5000/topics`)
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById("topics");
            list.innerHTML = "";
            data.forEach(topic => {
                const li = document.createElement("li");
                li.textContent = topic;
                list.appendChild(li);
            });
        });
}

function calculate() {
    const voltage = parseFloat(document.getElementById("voltage").value);
    const resistance = parseFloat(document.getElementById("resistance").value);

    fetch(`http://127.0.0.1:5000/ohmslaw`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            voltage: voltage,
            resistance: resistance
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById("result").textContent = data.error;
        } else {
            document.getElementById("result").textContent =
                "Current = " + data.current + " A";
        }   
    });
}

function loadQuiz() {
    fetch(`http://127.0.0.1:5000/quiz`)
    .then(res => res.json())
    .then(data => {
        let quizDiv = document.getElementById("quiz");
        quizDiv.innerHTML = "";
        data.forEach((q, i) => {
            quizDiv.innerHTML += `<p>${i+1}. ${q.question}</p>`;
            q.options.forEach(opt => {
                quizDiv.innerHTML += `<input type="radio" name="q${i}"> ${opt}<br>`;
            });
        });
    });
}
