import 'babel-polyfill'

import TileCloudControl from '@tilecloud/mbgl-tilecloud-control'
import ForkMeConntrol from '@tilecloud/mbgl-fork-me-control'
import ExportControl from '@tilecloud/mbgl-export-control'
import CircleMarker from '../src'

const map = new mapboxgl.Map({
  container: 'map',
  style: 'https://tilecloud.github.io/tiny-tileserver/style.json',
  attributionControl: true,
  hash: true,
  localIdeographFontFamily: "sans-serif",
  interactive: true
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.GeolocateControl());
map.addControl(new TileCloudControl());
map.addControl(new ForkMeConntrol({
  url: 'https://github.com/tilecloud/mbgl-circle-marker',
}));
map.addControl(new ExportControl({
  dpi: 300,
}))

new CircleMarker({
  id: "example-1",
  minzoom: 7,
  markers: [
    {
      lnglat: [139.741355, 35.658094],
      label: "東京都",
      color: "#cccccc",
      strokeColor: "#cccccc",
    },
    {
      lnglat: [139.642345, 35.447507],
      label: "神奈川県",
      color: "#0000ff",
    },
    {
      lnglat: [140.123306, 35.605057],
      label: "千葉県",
      color: "transparent",
      strokeColor: "#cccccc",
    }
  ]
}).addTo(map)

new CircleMarker({
  id: "example-2",
  maxzoom: 7,
  circleStrokeWidth: 100,
  circleRadius: 10,
  textSize: 30,
  markers: [
    {
      lnglat: [139.741355, 35.658094],
      label: "日本",
      color: "#ff0000",
      strokeColor: "rgba(255, 0, 0, 0.2)"
    },
  ]
}).addTo(map)


