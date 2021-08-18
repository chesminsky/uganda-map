window.onload = init;

const makeMarker = (icon, title, x, y) => {
	return `
		<div class="apametsa-map-marker" style="top: ${y}px; left: ${x}px">
			<img src="img/icons/${icon}.svg" class="apametsa-map-marker-icon-${icon}" />
			<div class="apametsa-map-marker-title">
				${title}
			</div>
		</div>
	`;
};

async function init() {
	const url = './data/markers.json';
	const response = await fetch(url);
	const data = await response.json();

	const map = document.querySelector('.apametsa-map');

	data.forEach((m) => {
		map.innerHTML += makeMarker(m.icon, m.name, m.x, m.y);
	});

	if (navigator.userAgentData.mobile) {
		Array.from(document.querySelectorAll('.apametsa-map-marker')).forEach((el) =>
			el.addEventListener('click', (event) => {
				event.stopPropagation();
				el.classList.toggle('is-active');
			})
		);
	}
}
