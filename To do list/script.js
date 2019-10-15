$('.new-item').keypress(function(event) {
    if (event.keyCode === 13) {
        const value = $(this).val();
        $(this).val("");
        
        generateLi(value);
        saveToLocalStorage(value);
    }
});

$('.todo-items').on('click', '.delete-item', function() {
    const listItemsString = localStorage.getItem('listItems');
    const listItems = JSON.parse(listItemsString);
    const index = $(this).closest('.list-item').index();

    listItems.splice(index, 1);

    localStorage.setItem('listItems', JSON.stringify(listItems));

    $(this).closest('.list-item').remove();
});

$('.todo-items').on('click', 'input', function() {
    const $parent = $(this).closest('.list-item');
    $parent.toggleClass('completed');

    const index = $parent.index();

    if ($parent.hasClass('completed')) {
        markAsCompleted(index);
    } else {
        removeCompleted(index);
    }
});

function markAsCompleted(index) {
    const listItemsString = localStorage.getItem('listItems');
    const listItems = JSON.parse(listItemsString);

    listItems[index].completed = true;

    localStorage.setItem('listItems', JSON.stringify(listItems));
}

function removeCompleted(index) {
    const listItemsString = localStorage.getItem('listItems');
    const listItems = JSON.parse(listItemsString);

    listItems[index].completed = false;

    localStorage.setItem('listItems', JSON.stringify(listItems));
}

function generateLi(value) {
    const checkbox = '<input type="checkbox" class="checkBox"/>';
    const deleteBtn = '<button class="delete-item">x</button>';
    const spanValue = '<span>' + value + '</span>';

    const newLi = $('<li />', {
        class: 'list-item',
        html: checkbox + spanValue + deleteBtn
    })

    $('.todo-items').append(newLi);
}

function saveToLocalStorage(value) {
    const listItemsString = localStorage.getItem('listItems');
    let listItems;

    if (listItemsString === null) {
        listItems = [];
    } else {
        listItems = JSON.parse(listItemsString);
    }

    const obj = {
        completed: false,
        text: value,
    }

    listItems.push(obj);
    localStorage.setItem('listItems', JSON.stringify(listItems));
}

function checkExistingItems() {
    const listItemsString = localStorage.getItem('listItems');

    if (listItemsString !== null) {
        const listItems = JSON.parse(listItemsString);

        listItems.forEach(item => {
            generateLi(item.text);
        });
    }
}

function checkCompletedItems() {
    const listItemsString = localStorage.getItem('listItems');
    
    if (listItemsString === null) {
        return;
    }
    
    const listItems = JSON.parse(listItemsString);

    listItems.forEach((item, index) => {
        if (item.completed) {
            $($('.list-item')[index]).addClass('completed');
            $($('.list-item')[index]).find('input').attr('checked', true);
        }
    });
}

checkExistingItems();
checkCompletedItems();