document.addEventListener('DOMContentLoaded', function() {
    createHomePage();
});

function createHomePage() {
    const content = document.getElementById('content');
    content.innerHTML = '';``

    const container = document.createElement('div');
    container.className = 'container';

    const title = document.createElement('h1');
    title.innerText = 'DAIKIN - SUGGESTIONS BOX';
    container.appendChild(title);

    const instruction = document.createElement('p');
    instruction.innerText = 'Make a suggestion on the topics below:';
    container.appendChild(instruction);

    const topics = ['AI', 'DATABASE', 'SECURITY', 'MANUFACTURING','AUTOMATION'];
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    topics.forEach(topic => {
        const button = document.createElement('button');
        button.innerText = topic;
        button.onclick = () => redirectToForm(topic);
        buttonContainer.appendChild(button);
    });

    const otherButton = document.createElement('button');
    otherButton.className = 'full-width';
    otherButton.innerText = 'OTHER TOPICS';
    otherButton.onclick = () => redirectToForm('Other Topics');
    buttonContainer.appendChild(otherButton);

    container.appendChild(buttonContainer);
    content.appendChild(container);
}

function createFormPage(topic) {
    const content = document.getElementById('content');
    content.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'form-container';

    const title = document.createElement('h1');
    title.innerText = 'Submit Your Suggestion';
    container.appendChild(title);

    const form = document.createElement('form');
    form.id = 'suggestionForm';
    form.onsubmit = async function(event) {
        event.preventDefault();

        const suggestionData = {
            topic: document.getElementById('topic').value,
            subject: document.getElementById('subject').value,
            suggestion: document.getElementById('suggestion').value,
            rating1: document.getElementById('rating1').value,
            rating2: document.getElementById('rating2').value,
        };

        try {
            const response = await fetch('/api/suggestions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(suggestionData)
            });

            if (response.ok) {
                alert('Suggestion submitted successfully!');
                createHomePage();
            } else {
                alert('Failed to submit suggestion');
            }
        } catch (error) {
            alert('Failed to submit suggestion');
        }
    };

    const topicLabel = document.createElement('label');
    topicLabel.setAttribute('for', 'topic');
    topicLabel.innerText = 'TOPIC:';
    form.appendChild(topicLabel);

    const topicInput = document.createElement('input');
    topicInput.type = 'text';
    topicInput.id = 'topic';
    topicInput.name = 'topic';
    topicInput.value = topic;
    topicInput.readOnly = true;
    form.appendChild(topicInput);

    const subjectLabel = document.createElement('label');
    subjectLabel.setAttribute('for', 'subject');
    subjectLabel.innerText = 'SUBJECT:';
    form.appendChild(subjectLabel);

    const subjectInput = document.createElement('input');
    subjectInput.type = 'text';
    subjectInput.id = 'subject';
    subjectInput.name = 'subject';
    subjectInput.required = true;
    form.appendChild(subjectInput);

    const suggestionLabel = document.createElement('label');
    suggestionLabel.setAttribute('for', 'suggestion');
    suggestionLabel.innerText = 'WRITE YOUR INPUT:';
    form.appendChild(suggestionLabel);

    const suggestionInput = document.createElement('textarea');
    suggestionInput.id = 'suggestion';
    suggestionInput.name = 'suggestion';
    suggestionInput.rows = 6;
    suggestionInput.required = true;
    form.appendChild(suggestionInput);

    const rating1Label = document.createElement('label');
    rating1Label.setAttribute('for', 'rating1');
    rating1Label.innerText = 'Impact on a Scale of 1-10:';
    form.appendChild(rating1Label);

    const rating1Select = document.createElement('select');
    rating1Select.id = 'rating1';
    rating1Select.name = 'rating1';
    for (let i = 1; i <= 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.innerText = i;
        rating1Select.appendChild(option);
    }
    form.appendChild(rating1Select);

    const rating2Label = document.createElement('label');
    rating2Label.setAttribute('for', 'rating2');
    rating2Label.innerText = 'Importance on a Scale of 1-10:';
    form.appendChild(rating2Label);

    const rating2Select = document.createElement('select');
    rating2Select.id = 'rating2';
    rating2Select.name = 'rating2';
    for (let i = 1; i <= 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.innerText = i;
        rating2Select.appendChild(option);
    }
    form.appendChild(rating2Select);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container-form';

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'submit-button';
    submitButton.innerText = 'Submit';
    buttonContainer.appendChild(submitButton);

    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'back-button';
    backButton.innerText = 'Back';
    backButton.onclick = createHomePage;
    buttonContainer.appendChild(backButton);

    form.appendChild(buttonContainer);
    container.appendChild(form);
    content.appendChild(container);
}

function redirectToForm(topic) {
    createFormPage(topic);
}
