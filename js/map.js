// Inizializza la mappa nella sezione Zone Coperte
const map = L.map('map-container', {
    center: [45.6669, 12.2428], // Centro su Treviso
    zoom: 13,
    zoomControl: true,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    dragging: true,
    attributionControl: true
});

// Aggiungi tile layer (mappa base)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
}).addTo(map);

// Definisci un'icona personalizzata per AB Pulizie
const abIcon = L.divIcon({
    className: 'custom-marker',
    html: '<div style="background-color: #0066cc; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">AB</div>',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
});

// Funzione per creare icone con label per le zone
function createZoneIconWithLabel(name) {
    return L.divIcon({
        className: 'zone-marker-with-label',
        html: `
            <div style="display: flex; flex-direction: column; align-items: center; width: max-content;">
                <div style="background-color: #00cc66; width: 18px; height: 18px; border-radius: 50%; border: 2px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.4);"></div>
                <span style="
                    margin-top: 2px;
                    background: rgba(255, 255, 255, 0.95);
                    color: #333;
                    padding: 2px 6px;
                    border-radius: 3px;
                    font-size: 10px;
                    font-weight: 600;
                    font-family: 'Montserrat', sans-serif;
                    white-space: nowrap;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                    border: 1px solid #00cc66;
                ">${name}</span>
            </div>
        `,
        iconSize: [80, 40],
        iconAnchor: [40, 9],
    });
}

// Località servite con coordinate approssimative (entro 5km dal centro di Treviso)
const locations = [
    { name: 'Treviso Centro', lat: 45.6669, lng: 12.2428, isMain: true },
    { name: 'Fiera', lat: 45.6456, lng: 12.2167, isMain: false },
    { name: 'San Lazzaro', lat: 45.6547, lng: 12.2211, isMain: false },
    { name: 'Quinto di Treviso', lat: 45.6531, lng: 12.1856, isMain: false },
    { name: 'Santa Bona', lat: 45.6458, lng: 12.2589, isMain: false },
    { name: 'Monigo', lat: 45.6397, lng: 12.2175, isMain: false },
];

// Aggiungi marker per ogni località
locations.forEach(location => {
    const icon = location.isMain ? abIcon : createZoneIconWithLabel(location.name);

    const marker = L.marker([location.lat, location.lng], {
        icon: icon
    }).addTo(map);

    // Popup solo per il marker principale
    if (location.isMain) {
        const popupContent = `<div style="text-align: center; font-family: 'Montserrat', sans-serif;"><strong style="color: #0066cc; font-size: 16px;">AB Pulizie</strong><br><span style="color: #666;">Sede principale - Treviso</span></div>`;
        marker.bindPopup(popupContent);
    }
});

// Aggiungi un cerchio per mostrare l'area di copertura
L.circle([45.6669, 12.2428], {
    color: '#0066cc',
    fillColor: '#0066cc',
    fillOpacity: 0.1,
    radius: 5000, // 5km di raggio
    weight: 2,
    dashArray: '5, 5'
}).addTo(map);

// Aspetta che la mappa sia caricata prima di invalidare le dimensioni
setTimeout(() => {
    map.invalidateSize();
}, 100);

// Aggiungi un po' di stile alle popup
const style = document.createElement('style');
style.textContent = `
    .leaflet-popup-content-wrapper {
        border-radius: 10px;
        box-shadow: 0 3px 14px rgba(0,0,0,0.2);
    }
    .leaflet-popup-tip {
        box-shadow: 0 3px 14px rgba(0,0,0,0.2);
    }
    .custom-marker, .zone-marker-with-label {
        transition: transform 0.3s;
    }
    .custom-marker:hover {
        transform: scale(1.2);
    }
    .zone-marker-with-label:hover {
        transform: scale(1.1);
        z-index: 1000 !important;
    }
`;
document.head.appendChild(style);
