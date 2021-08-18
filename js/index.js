window.onload = init;

const makeMarker = (icon, title, x, y) => {
	return `
		<div class="apametsa-map-marker" style="top: ${y}px; left: ${x}px">
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
	console.log(respData)
	return respData;
}

async function loadAll() {
	return await Promise.all(['shops'].map(fileName => load(fileName)));
}

async function init() {
	const data = await loadAll();
	console.log(data);
	const map = document.querySelector('.apametsa-map');

	data.flat().forEach((m) => {
		map.innerHTML += makeMarker(m.icon, m.name, m.x, m.y);
	});
}
