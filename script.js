// Initialize map centered on Dewathang, Samdrup Jongkhar
const map = L.map('map').setView([26.8594, 91.464], 17);

// Add OpenStreetMap basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Reusable function to load and style GeoJSON
function loadLayer(url, color, label) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            L.geoJSON(data, {
                onEachFeature: (feature, layer) => {
                    let props = feature.properties;
                    let popup = `<b>${label} Info</b><br>`;
                    for (let key in props) {
                        popup += `<strong>${key}</strong>: ${props[key]}<br>`;
                    }
                    layer.bindPopup(popup);
                },
                style: {
                    color: color,
                    weight: 1,
                    fillOpacity: 0.5
                }
            }).addTo(map);
        })
        .catch(err => console.error(`Failed to load ${url}:`, err));
}

// Load each GeoJSON layer with a unique color
loadLayer('buildings.geojson', '#3366cc', 'Building');
loadLayer('labs.geojson', '#cc3333', 'Lab');
loadLayer('parks.geojson', '#33cc66', 'Park');
loadLayer('ground.geojson', '#cc9933', 'Ground');
