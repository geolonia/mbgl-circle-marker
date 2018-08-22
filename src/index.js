'use strict'

class CircleMarker {
  constructor(options) {
    this.options = Object.assign({
        id: "",
        minzoom: 0,
        maxzoom: 22,
        textFont: ['Noto Sans Regular'],
        textSize: 12,
        textOffset: [0, 1],
        textMaxWidth: 12,
        markers: [],
      }, options
    )

    this.geojson = {
      type: 'FeatureCollection',
      features: []
    };

    for (let i = 0; i < options.markers.length; i++) {
      const props = Object.assign({
        color: "#555555",
        strokeColor: "#555555",
        circleStrokeWidth: 3,
        circleRadius: 3,
        icon: ""
      }, options.markers[i])

      this.geojson.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: options.markers[i].lnglat
        },
        properties: props
      })
    }
  }

  addTo(map) {
    map.on('load', () => {
      map.addSource(this.options.id, {
        type: "geojson",
        data: this.geojson,
      })

      map.addLayer({
        "id": `${this.options.id}-marker`,
        "type": "circle",
        "minzoom": this.options.minzoom,
        "maxzoom": this.options.maxzoom,
        "source": this.options.id,
        "paint": {
          "circle-radius": ["to-number", ["get", "circleRadius"]],
          "circle-color": {"type": "identity", "property": "color"},
          "circle-stroke-width": ["to-number", ["get", "circleStrokeWidth"]],
          "circle-stroke-color": {"type": "identity", "property": "strokeColor"}
        },
      });

      map.addLayer({
        "id": `${this.options.id}-label`,
        "type": "symbol",
        "minzoom": this.options.minzoom,
        "maxzoom": this.options.maxzoom,
        "source": this.options.id,
        "paint": {
          "text-color": "#000000",
          "text-halo-color": "rgba(255, 255, 255, 1)",
          "text-halo-width": 2,
        },
        "layout": {
          "icon-image": "{icon}",
          "text-field": "{label}",
          "text-font": this.options.textFont,
          "text-size": this.options.textSize,
          "text-anchor": "top",
          "text-max-width": this.options.textMaxWidth,
          "text-offset": this.options.textOffset,
          "text-allow-overlap": true,
        }
      });
    })
  }
}

export default CircleMarker
