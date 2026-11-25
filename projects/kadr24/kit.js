const form = document.querySelector('#kit-form');
const quoteLines = document.querySelector('#quote-lines');
const total = document.querySelector('#total');
const jumpTotal = document.querySelector('#jump-total');
const copyStatus = document.querySelector('#copy-status');
const money = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 });
const rubles = (value) => `${money.format(value)} ₽`;

function getQuote() {
  const kit = form.querySelector('input[name="kit"]:checked');
  const extras = [...form.querySelectorAll('input[name="extra"]:checked')];
  const shifts = Number(form.elements.shifts.value);
  const items = [kit, ...extras].map((input) => ({
    name: input.dataset.title,
    price: Number(input.value) * shifts,
  }));
  return { items, shifts, fullPrice: items.reduce((sum, item) => sum + item.price, 0) };
}

function renderQuote() {
  const { items, fullPrice } = getQuote();
  quoteLines.replaceChildren(...items.map(({ name, price }) => {
    const line = document.createElement('li');
    const title = document.createElement('span');
    const amount = document.createElement('span');
    title.textContent = name;
    amount.textContent = rubles(price);
    line.append(title, amount);
    return line;
  }));
  total.value = rubles(fullPrice);
  jumpTotal.textContent = total.value;
  copyStatus.textContent = '';
  copyStatus.parentElement.querySelector('textarea')?.remove();
}

form.addEventListener('change', renderQuote);
form.addEventListener('submit', (event) => event.preventDefault());
document.querySelector('#copy-kit').addEventListener('click', async () => {
  const { items, shifts, fullPrice } = getQuote();
  const text = [
    'КАДР 24 · демонстрационная смета',
    `Число смен: ${shifts}`,
    ...items.map(({ name, price }) => `${name}: ${rubles(price)}`),
    `Итого: ${rubles(fullPrice)}`,
  ].join('\n');

  try {
    await navigator.clipboard.writeText(text);
    copyStatus.textContent = 'Смета скопирована.';
  } catch {
    copyStatus.parentElement.querySelector('textarea')?.remove();
    const field = document.createElement('textarea');
    field.value = text;
    field.readOnly = true;
    field.setAttribute('aria-label', 'Текст сметы');
    copyStatus.after(field);
    field.focus();
    field.select();
    copyStatus.textContent = 'Скопируйте выделенный текст.';
  }
});

renderQuote();
