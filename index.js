const markers = [
	{
		id: 1,
		color: 'red',
		size: 2,
		lat: 1.22825,
		lon: 32.171581,
		title: 'red',
		description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis beatae, minus, hic mollitia accusantium veritatis voluptate perferendis quis temporibus fugiat obcaecati incidunt enim accusamus, pariatur doloribus quibusdam architecto? Reiciendis, nostrum.',
		funding: '1000 Euro',
		status: 'status'
	},
    {
		id: 2,
		color: 'blue',
		size: 5,
		lat: 1.54825,
		lon: 33.71581,
		title: 'blue',
		description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis beatae, minus, hic mollitia accusantium veritatis voluptate perferendis quis temporibus fugiat obcaecati incidunt enim accusamus, pariatur doloribus quibusdam architecto? Reiciendis, nostrum.',
		funding: '1000 Euro',
		status: 'status'
	}
];

window.onload = () => {
	const map = L.map('mapid');
	map.fitBounds([
		[4.249611, 29.512469],
		[-1.456955, 34.708942]
	]);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

	markers.forEach((m) => {
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
			radius: 8,
			fillOpacity: 1,
			color: m.color,
			fillColor: m.color
		});

		cm.addTo(map);

		cm.bindPopup(`
            <h3>${m.title}</h3>
            <p>${m.description}</p>
            <p>Funding: ${m.funding}</p>
            <p>Status: ${m.status}</p>
        `);
		cm.on('mouseover', customTip);
		cm.on('click', customPop);
	});
};
