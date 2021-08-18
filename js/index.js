window.onload = init;

async function init() {
	const url = './data/markers.json';
	const response = await fetch(url);
	const data = await response.json();

	const map = document.querySelector('.apametsa-map');

	data.forEach((m) => {
		
	});

}
