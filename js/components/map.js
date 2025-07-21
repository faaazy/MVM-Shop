export function initStoresMap() {
  let selectedMapData = null;
  let map, selectedMarker;
  const markers = [];

  ymaps.ready(init);

  function init() {
    map = new ymaps.Map("map", {
      center: [35.460666, -97.540834],
      zoom: 10,
      controls: ["zoomControl", "fullscreenControl"],
    });

    map.options.set("suppressMapOpenBlock", true);

    addMarker(
      [35.39325595425709, -97.70568821770293],
      "MVM Shop",
      "951 E State Hwy 152, Mustang, OK 73064, USA"
    );
    addMarker(
      [35.46357250779897, -97.6225946711642],
      "MVM Shop",
      "6100 W Reno Ave, Oklahoma City, OK 73127, USA"
    );
    addMarker(
      [35.44853389470475, -97.42582048955617],
      "MVM Shop",
      "5401 Tinker Diagonal St, Del City, OK 73115, USA"
    );

    const confirmBtn = document.querySelector(".map__confirm");
    confirmBtn.classList.remove("active");
  }

  function addMarker(coords, title, description) {
    const marker = new ymaps.Placemark(
      coords,
      {
        balloonContent: description,
        hintContent: title,
      },
      {
        preset: "islands#blueDotIcon",
      }
    );

    marker.events.add("click", () => {
      const confirmBtn = document.querySelector(".map__confirm");
      confirmBtn.classList.remove("active");

      if (selectedMarker) {
        selectedMarker.options.set("preset", "islands#blueDotIcon");
      }

      marker.options.set("preset", "islands#greenDotIcon");
      selectedMarker = marker;
    });

    markers.push(marker);
    map.geoObjects.add(marker);
  }

  function processSelection() {
    if (!selectedMarker) {
      alert("Click the marker on the map!");
      return;
    }

    const coords = selectedMarker.geometry.getCoordinates();
    const properties = selectedMarker.properties.getAll();

    const selectedInfo = {
      title: properties.hintContent,
      description: properties.balloonContent,
      latitude: coords[0],
      longitude: coords[1],
    };

    document.dispatchEvent(
      new CustomEvent("mapData", {
        detail: { selectedInfo },
      })
    );
  }

  const mapConfirmBtn = document.querySelector(".map__confirm");
  mapConfirmBtn.addEventListener("click", (event) => {
    processSelection();

    console.log(selectedMarker);

    if (selectedMarker == undefined) return;
    event.target.classList.add("active");
  });
}

export function initDeliveryMap() {
  let selectedMapData = null;

  let map, selectedPlacemark;
  let selectedCoords = null;
  let selectedAddress = "";

  ymaps.ready(init);

  function init() {
    map = new ymaps.Map("map", {
      center: [35.469495, -97.55137],
      zoom: 12,
      controls: ["zoomControl", "fullscreenControl"],
    });
    map.options.set("suppressMapOpenBlock", true);

    map.events.add("click", function (e) {
      const confirmBtn = document.querySelector(".map__confirm");
      confirmBtn.classList.remove("active");
      const coords = e.get("coords");

      if (selectedPlacemark) {
        map.geoObjects.remove(selectedPlacemark);
      }

      selectedPlacemark = new ymaps.Placemark(
        coords,
        { iconContent: "Delivery Place" },
        {
          preset: "islands#blueDeliveryIcon",
          draggable: true,
        }
      );

      map.geoObjects.add(selectedPlacemark);
      map.panTo(coords, { flying: true });

      getLocationInfo(coords);

      selectedPlacemark.events.add("dragend", function () {
        const newCoords = selectedPlacemark.geometry.getCoordinates();
        getLocationInfo(newCoords);
      });
    });
  }

  function getLocationInfo(coords) {
    selectedCoords = coords;

    ymaps.geocode(coords).then(function (res) {
      const firstGeoObject = res.geoObjects.get(0);

      if (firstGeoObject) {
        selectedAddress = firstGeoObject.getAddressLine();
      }
    });
  }

  function confirmLocation() {
    if (!selectedCoords) {
      alert("Select a location on the map!");
      return;
    }

    const selectedInfo = {
      address: selectedAddress,
      latitude: selectedCoords[0],
      longitude: selectedCoords[1],
      timestamp: new Date().toISOString(),
    };

    document.dispatchEvent(
      new CustomEvent("mapData", {
        detail: { selectedInfo },
      })
    );
  }

  const mapConfirmBtn = document.querySelector(".map__confirm");
  mapConfirmBtn.addEventListener("click", (event) => {
    confirmLocation();

    if (selectedCoords == undefined) return;
    event.target.classList.add("active");
  });
}
