window.onload = () => {
	const map = L.map('mapid');
	map.fitBounds([
		[4.249611, 29.512469],
		[-1.456955, 34.708942]
	]);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
};
