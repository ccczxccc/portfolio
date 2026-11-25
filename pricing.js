(() => {
  const options = document.querySelectorAll('input[name="price-service"]');
  const integration = document.getElementById('complex-integration');
  const title = document.getElementById('estimate-title');
  const amount = document.getElementById('estimate-amount');
  const detail = document.getElementById('estimate-detail');
  const note = document.getElementById('estimate-note');
  const contact = document.getElementById('estimate-contact');

  function updateEstimate() {
    const selected = document.querySelector('input[name="price-service"]:checked');
    if (!selected) return;
    const min = Number(selected.dataset.min) / 1000;
    const max = Number(selected.dataset.max) / 1000;
    title.textContent = selected.dataset.title;
    amount.textContent = `${min}–${max} тыс. ₽`;
    detail.textContent = selected.dataset.detail;
    note.textContent = integration.checked
      ? 'Интеграцию оценю отдельно после проверки сервиса, доступа и нужного сценария. Диапазон выше относится только к базовой задаче.'
      : 'Цену и сроки фиксируем после согласования задачи. Домен, платные тарифы и внешние сервисы обсудим отдельно, если они понадобятся.';
    const draft = [
      'Здравствуйте, Лев! Хочу обсудить проект.',
      'Тип задачи: ' + selected.dataset.title + '.',
      integration.checked ? 'Нужно обсудить внешнюю интеграцию.' : '',
      'Коротко о задаче: ',
    ].filter(Boolean).join('\n');
    contact.href = 'https://t.me/levvxff?text=' + encodeURIComponent(draft);
  }

  options.forEach((option) => option.addEventListener('change', updateEstimate));
  integration.addEventListener('change', updateEstimate);
  updateEstimate();
})();
