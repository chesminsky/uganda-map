window.onload = init;

const makeMarker = (icon, title, x, y) => {
	return `
		<div data-name="${title}" class="apametsa-map-marker" style="top: ${y}px; left: ${x}px">
			<img src="img/icons/${icon}.svg" class="apametsa-map-marker-icon-${icon}" />
			<div class="apametsa-map-marker-title">
				<span>${title}</span>
			</div>
		</div>
	`;
};

async function load(fileName) {
	const response = await fetch(`./data/${fileName}.json`);
	const respData = await response.json();
	return respData;
}

async function loadAll() {
	const files = [
		'apametsa',
		'shops',
		'restraunts',
		'resorts',
		'schools'
	]
	return await Promise.all(files.map(fileName => load(fileName)));
}

async function init() {
	const data = await loadAll();
	const map = document.querySelector('.apametsa-map');

	data.flat().sort((a, b) => a.name.localeCompare(b.name)).forEach((m) => {
		map.innerHTML += makeMarker(m.icon, m.name, m.x, m.y);
	});
}
