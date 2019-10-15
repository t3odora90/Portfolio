// Code for the first example with the animals

$('.animals-box').find('img').click(function() {
	if ($(this).hasClass('maximize')) {
		resetElements($(this));
	} else {
		$(this).addClass('maximize');
		const $animal = $(this).attr('data-animal');
		const $name = $(this).attr('data-name');
		const $age = $(this).attr('data-age');
		$('input[name="animal"]').val($animal);
		$('input[name="name"]').val($name);
		$('input[name="age"]').val($age);
	}
});

function resetElements(element) {
	element.removeClass('maximize');
	$('.inputs-box').find('input').val('');
}

$('.btn').click(function() {
	resetElements($('.animals-box').find('img'));
});



// Code for slider

let currentPhoto = 0;
const photosLength = $('.beaches-box').find('img').length;

$('.next').click(function() {
	if (currentPhoto === photosLength - 1) {
		currentPhoto = 0;
	} else {
		currentPhoto++;
	}
	moveThePhoto(currentPhoto);
});

$('.previous').click(function() {
	if (currentPhoto === 0) {
		currentPhoto = photosLength - 1;
	} else {
		currentPhoto--;
	}
	moveThePhoto(currentPhoto);
});


function moveThePhoto(currentPhoto) {
	const newPosition = (currentPhoto * -100) + '%';
	$('.beaches-box').css('transform', 'translateX(' + newPosition + ')');
}