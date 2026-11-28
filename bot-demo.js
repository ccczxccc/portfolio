const log = document.querySelector('#bot-log');
const choices = document.querySelector('#bot-choices');
const reset = document.querySelector('#bot-reset');
choices.hidden = false;
const greeting = log.firstElementChild.textContent;
const startText = choices.firstElementChild.textContent;

function addMessage(text, fromUser = false) {
  const message = document.createElement('p');
  message.className = fromUser ? 'bot-message user-message' : 'bot-message';
  message.textContent = text;
  log.append(message);
  log.scrollTop = log.scrollHeight;
}

function showChoices(labels, onChoose) {
  const buttons = labels.map((label) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.addEventListener('click', () => onChoose(label));
    return button;
  });
  choices.replaceChildren(...buttons);
  buttons[0].focus();
}

function chooseService() {
  reset.hidden = false;
  addMessage(startText, true);
  addMessage('Какая услуга нужна?');
  showChoices(['Уход за кузовом', 'Химчистка салона'], (service) => {
    addMessage(service, true);
    addMessage('Когда вам удобнее приехать?');
    showChoices(['В будни', 'В выходные'], (time) => {
      addMessage(time, true);
      addMessage(`Заявка готова: ${service.toLowerCase()}, ${time.toLowerCase()}. В рабочем боте её получил бы администратор.`);
      choices.replaceChildren();
      log.focus();
    });
  });
}

choices.firstElementChild.addEventListener('click', chooseService);
reset.addEventListener('click', () => {
  log.replaceChildren();
  addMessage(greeting);
  reset.hidden = true;
  showChoices([startText], chooseService);
});
