window.onload = init;

const makeMarker = (icon, title, x, y) => {
	return `
		<img data-name="${title}" src="img/icons/${icon}.svg" class="apametsa-map-marker-icon apametsa-map-marker-icon-${icon}" style="top: ${y}px; left: ${x}px"/>
	`;
};

async function load(fileName) {
	const response = await fetch(`./data/${fileName}.json`);
	const respData = await response.json();
	return respData;
}

async function loadAll() {
	const files = ['apametsa', 'shops', 'restraunts', 'resorts', 'schools'];
	return await Promise.all(files.map((fileName) => load(fileName)));
}

async function init() {
	const data = await loadAll();
	const map = document.querySelector('.apametsa-map');

	data.flat()
		.sort((a, b) => a.name.localeCompare(b.name))
		.forEach((m) => {
			map.innerHTML += makeMarker(m.icon, m.name, m.x, m.y);
		});

	tippy('.apametsa-map-marker-icon', {
		arrow: true,
		placement: 'bottom',
		content(reference) {
			const title = reference.getAttribute('data-name');
			return title;
		}
	});
}
