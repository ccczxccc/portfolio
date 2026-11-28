(() => {
  document.querySelectorAll('.price-item').forEach((item) => {
    const service = item.querySelector('.price-title').textContent.trim();
    const contact = item.querySelector('.button-price');
    const extra = item.querySelector('.price-extra');
    const integration = extra?.querySelector('input');

    function updateDraft() {
      const draft = [
        `Здравствуйте, Лев! Интересует услуга «${service}».`,
        integration?.checked ? 'Ещё хочу обсудить подключение внешнего сервиса.' : '',
        'Коротко о задаче: ',
      ].filter(Boolean).join('\n');
      contact.href = `https://t.me/levvxff?text=${encodeURIComponent(draft)}`;
    }

    updateDraft();
    if (extra) {
      integration.addEventListener('change', updateDraft);
      extra.hidden = false;
    }
  });

  function openLinkedPrice() {
    const item = document.getElementById(location.hash.slice(1));
    if (item?.classList.contains('price-item')) {
      item.open = true;
      item.scrollIntoView({ block: 'start' });
    }
  }

  openLinkedPrice();
  window.addEventListener('hashchange', openLinkedPrice);
})();
