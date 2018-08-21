'use strict'

class CircleMarker {
  constructor(options) {
    this.options = Object.assign({
        id: "",
        minzoom: 0,
        maxzoom: 22,
        textSize: 14,
        textFont: ['Noto Sans Regular'],
        circleRadius: 6,
        circleStrokeWidth: 6,
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
          "circle-radius": this.options.circleRadius,
          "circle-color": {"type": "identity", "property": "color"},
          "circle-stroke-width": this.options.circleStrokeWidth,
          "circle-stroke-color": {"type": "identity", "property": "strokeColor"}
        },
      });

      // map.addLayer({
      //   "id": `${this.options.id}-label`,
      //   "type": "symbol",
      //   "minzoom": this.options.minzoom,
      //   "maxzoom": this.options.maxzoom,
      //   "source": this.options.id,
      //   "paint": {
      //     "text-color": "#000000",
      //     "text-halo-color": "rgba(255, 255, 255, 1)",
      //     "text-halo-width": 2,
      //   },
      //   "layout": {
      //     "text-field": String.fromCharCode(59651),
      //     "text-font": ["maki"],
      //     "text-size": this.options.textSize,
      //     "text-anchor": "top",
      //     "text-max-width": 12,
      //     "text-offset": [0, 1],
      //     "text-allow-overlap": false,
      //   }
      // });

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
          "icon-image": "{icon}-15",
          "text-field": "{label}",
          "text-font": this.options.textFont,
          "text-size": this.options.textSize,
          "text-anchor": "top",
          "text-max-width": 12,
          "text-offset": [0, 1],
          "text-allow-overlap": false,
        }
      });
    })
  }
}

export default CircleMarker
