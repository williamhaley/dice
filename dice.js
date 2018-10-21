const $results = document.querySelector('.results');
const $dice = $results.querySelector('.dice');
const $totalValue = $results.querySelector('.total .value');
const $form = document.querySelector('form');
const $numDice = $form.querySelector('input[name="num"]');
const $typeDice = $form.querySelector('input[name="type"]');

function roll(maxValue) {
    const result = Math.floor(Math.random() * maxValue) + 1;

    const $wrapper = document.createElement('span');
    $wrapper.classList.add(`d${maxValue}`);
    $wrapper.classList.add('die');

    const $img = document.createElement('img');
    $img.setAttribute('src', `/dice/d${maxValue}.svg`);
    $wrapper.appendChild($img);

    const $txt = document.createElement('span');
    $txt.innerHTML = result;
    $wrapper.appendChild($txt);

    $dice.appendChild($wrapper);

    return result;
}

function onSubmit(event) {
    event.preventDefault();

    // Clear UI
    while($dice.firstChild) {
        $dice.removeChild($dice.firstChild);
    }
    $totalValue.innerHTML = '';

    let numDice = parseInt($numDice.value, 10);
    if (isNaN(numDice) || numDice < 1) {
        numDice = 1;
    }

    let typeDice = parseInt($typeDice.value, 10);
    if (isNaN(typeDice) || typeDice < 1) {
        typeDice = 1;
    }

    let total = 0;
    for (let i = 0; i < numDice; i++) {
        total += roll(typeDice);
    }

    $totalValue.innerText = total;
}

window.addEventListener('load', function(event) {
    $form.addEventListener('submit', onSubmit);
});

