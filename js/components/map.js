export function initMap() {
  let map, selectedMarker;
  const markers = [];

  ymaps.ready(init);

  function init() {
    map = new ymaps.Map("map", {
      center: [35.460666, -97.540834], // Москва
      zoom: 10,
    });

    addMarker(
      [35.39325595425709, -97.70568821770293],
      "MVM Shop",
      "951 E State Hwy 152, Mustang, OK 73064, Соединенные Штаты"
    );
    addMarker(
      [35.46357250779897, -97.6225946711642],
      "MVM Shop",
      "6100 W Reno Ave, Oklahoma City, OK 73127, Соединенные Штаты"
    );
    addMarker(
      [35.44853389470475, -97.42582048955617],
      "MVM Shop",
      "5401 Tinker Diagonal St, Del City, OK 73115, Соединенные Штаты"
    );
  }

  function addMarker(coords, title, description) {
    const marker = new ymaps.Placemark(
      coords,
      {
        balloonContent: `<b>${title}</b><br>${description}`,
        hintContent: title,
      },
      {
        preset: "islands#blueDotIcon",
      }
    );

    marker.events.add("click", () => {
      if (selectedMarker) {
        selectedMarker.options.set("preset", "islands#blueDotIcon");
      }

      marker.options.set("preset", "islands#greenDotIcon");
      selectedMarker = marker;

      //   document.getElementById("selected-info").innerHTML = `
      //             <div class="selected">
      //                 <h3>Вы выбрали:</h3>
      //                 <p><strong>${title}</strong></p>
      //                 <p>Координаты: ${coords.join(", ")}</p>
      //                 <p>${description}</p>
      //                 <button onclick="processSelection()">Подтвердить выбор</button>
      //             </div>
      //         `;
    });

    markers.push(marker);
    map.geoObjects.add(marker);
  }

  function processSelection() {
    if (!selectedMarker) {
      alert("Выберите маркер на карте!");
      return;
    }

    const coords = selectedMarker.geometry.getCoordinates();
    const properties = selectedMarker.properties.getAll();

    selectedInfo = {
      title: properties.hintContent,
      description: properties.balloonContent,
      latitude: coords[0],
      longitude: coords[1],
    };
    console.log(selectedInfo);
  }
  processSelection();
}
