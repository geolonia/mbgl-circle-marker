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
      color: "rgba(255, 0, 0, 0.5)",
      strokeColor: "#555555",
      circleStrokeWidth: 10,
      circleRadius: 20,
    },
    {
      lnglat: [139.642345, 35.447507],
      label: "神奈川県",
      color: "#ffffff",
      strokeColor: "#555555",
      icon: "star-11",
      circleStrokeWidth: 2,
      circleRadius: 10,
    },
    {
      lnglat: [140.123306, 35.605057],
      label: "千葉県",
      color: "transparent",
      strokeColor: "#cccccc",
      circleStrokeWidth: 20,
    },
    {
      lnglat: [139.648849, 35.856999],
      label: "埼玉県",
    },
  ]
}).addTo(map)
