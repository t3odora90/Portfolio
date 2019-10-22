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