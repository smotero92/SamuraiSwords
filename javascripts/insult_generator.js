var fuckyoulist = [
	'Absolutely fuck you',
	"Press that button again bitch",
	"Eat a dick",
	'Have fun living with a micropenis',
	"If brains were dynamite you wouldn't have enough to blow you nose",
	"If I wanted to kill myself I'd climb your ego and jump to your IQ.",
	"Your birth certificate is an apology letter from the condom factory",
	"Your mother is a hamster",
	"Frankenstein's Monster is based on your face",
	"Ive had poops that smell better than you"
]


function onButtonClick () {
	var bodyMessage = document.querySelector('.message');
	var button = document.querySelector('.button');
	var newTip = 0;
	var oldTip = -1;
	button.addEventListener('click', function() {

		while (newTip === oldTip) {
			newTip = Math.floor(Math.random() * fuckyoulist.length);
		}
		bodyMessage.innerHTML = fuckyoulist[newTip];
		oldTip = newTip;
	});
};
onButtonClick();
