const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const wordsList = ['potato', 'sunrise', 'tomato', 'travel', 'developer', 'laptop', 'page', 'google', 'javascript', 'water', 'planet', 'world', 'mountain'];

const randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];

let placeholder = generatePlaceholder(randomWord);

const $lettersBox = $('.letters-box');

let $livesNumber = $('.tries').text();

$('.letters-box').on('click', '.item', function() {
    if ($(this).attr('data-checked') === "true") {
        return false;
    }
    const letter = $(this).attr('data-value');

    checkLetter(letter, this);

    $(this).attr('data-checked', true);

    youWin();
});

letters.forEach(function(letter) {
    const $span = $('<span />', {
        'html': '<span>' + letter + '</span>',
        'class': 'item',
        'data-value': letter.toLowerCase()
    });

    $lettersBox.append($span);
});

function checkLetter(letter, element) {
    if (randomWord.includes(letter)) {
        $(element).css('color', 'green');
        
        const indexes = findAllIndexes(randomWord, letter);
        
        placeholder = placeholder.split('');
        
        indexes.forEach(index => {
            placeholder[index] = letter;
        });
        
        placeholder = placeholder.join('');
        
        $('.placeholder').text(placeholder);
    } else {
        $(element).css('color', 'red');
       
        livesLeft();
    }
}

function generatePlaceholder(word) {
    let placeholder = "";
    for (let i = 0; i < word.length; i++) {
        placeholder = placeholder + '_';
    }

    $('.placeholder').text(placeholder);

    return placeholder;
}

function findAllIndexes(str, letter) {
    let indexes = [];
    for(let i = 0; i < str.length; i++) {
        if (str[i] === letter) 
            indexes.push(i);
    }

    return indexes;
}

function livesLeft() {
    if ($livesNumber == 1) {
        showPopover('Game over!');
    } else {
        $livesNumber--;

        $('.tries').text($livesNumber);
        
        if ($livesNumber == 4 || $livesNumber == 3) {
            $('.tries').addClass('orange');
        } else if ($livesNumber == 2) {
            $('.tries').addClass('red');
        }
    }
}

function youWin() {
    if (placeholder === randomWord) {
        showPopover('You win!');
    }
}

function showPopover(text) {
    const $cover = $('<div />', {
        class: 'cover'
    });

    const $popoverItem = $('<div />', {
        html: '<p>' + text + '</p>',
        class: 'popover-item'
    });

    const $closeBtn = $('<div />', {
        class: 'btn btn-warning btn-sm',
        text: 'Play again'
    });

    $popoverItem.append($closeBtn);

    $cover.append($popoverItem);

    $closeBtn.click(function() {
        closePopover();
    });

    $('body').append($cover);
}

function closePopover() {
    location.reload();
}