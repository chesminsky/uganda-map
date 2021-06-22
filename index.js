window.onload = init;

async function init() {
	const map = L.map('mapid', {
		zoomSnap: 0.5
	}).setView([1.4, 32.171581], 7.5);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

	const url = './markers.json';
	const response = await fetch(url);
	const data = await response.json();

	const markers = L.markerClusterGroup();

	data.forEach((m) => {
		function customTip() {
			this.unbindTooltip();
			if (!this.isPopupOpen()) {
				this.bindTooltip(m.title).openTooltip();
			}
		}

		function customPop() {
			this.unbindTooltip();
		}

		const cm = L.circleMarker([m.lat, m.lon], {
			radius: m.size * 5,
			fillOpacity: .6,
			color: m.color,
			fillColor: m.color
		});

		markers.addLayer(cm);

		cm.bindPopup(`
            <h3>${m.title}</h3>
            <p>${m.description}</p>
            <p>Funding: ${m.funding}</p>
            <p>Status: ${m.status}</p>
        `);
		cm.on('mouseover', customTip);
		cm.on('click', customPop);
	});

	map.addLayer(markers);
}
