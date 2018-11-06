const $results = document.querySelector('.results');
const $dice = $results.querySelector('.dice');
const $totalValue = $results.querySelector('.total .value');
const $form = document.querySelector('form');
const $numDice = $form.querySelector('input[name="num"]');

function roll(maxValue) {
    const result = Math.floor(Math.random() * maxValue) + 1;

    const $wrapper = document.createElement('span');
    $wrapper.classList.add(`d${maxValue}`);
    $wrapper.classList.add('die');

    const $img = document.createElement('img');
    let suffix = '';
    if (maxValue === 6 || maxValue === 4) {
        suffix = `-${result}`;
    } else {
        const $txt = document.createElement('span');
        $txt.innerHTML = result;
        $wrapper.appendChild($txt);
    }
    $img.setAttribute('src', `/static/d${maxValue}${suffix}.svg`);
    $wrapper.appendChild($img);

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

    const $typeDice = $form.querySelector('input[name="type"]:checked');
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

