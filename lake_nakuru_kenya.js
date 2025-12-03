// Correct AOI for Lake Nakuru
var lat = -0.37;
var lng = 36.08;

// Get the point to create a buffer
var point = ee.Geometry.Point(lng, lat);
var aoi = point.buffer(1000);

Map.setCenter(lng, lat, 12);

// Download the Sentinel-2 imagery collection
var s2 = ee.ImageCollection('COPERNICUS/S2_HARMONIZED');

// filter to get the BEFORE image: 2017 and sort lowest cloud cover image first
var s2_nakuru_before = s2.filterBounds(aoi)
  .filterDate('2016-01-01', '2016-12-31')
  .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 10)
  .sort('CLOUDY_PIXEL_PERCENTAGE');

var nakuru_image_before = ee.Image(s2_nakuru_before.first());

// filter to get the AFTER image: 2024 and sort lowest cloud cover image first
var s2_nakuru_after = s2.filterBounds(aoi)
  .filterDate('2024-01-01', '2024-12-31')
  .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 10)
  .sort('CLOUDY_PIXEL_PERCENTAGE');

var nakuru_image_after = ee.Image(s2_nakuru_after.first());

// Define the visualisation parameters to display the image (change bands for different visualisations)
var vizParams = {
  bands: ['B11', 'B8', 'B3'],
  min: 0,
  max: 3000,
  gamma: [1.1, 1.1, 1]
};

// Add the before image to the default Map.
Map.addLayer(nakuru_image_before, vizParams, "Lake Nakuru in 2017 (Before)");

// Add the after event image to the linked map
var linkedMap = ui.Map();
linkedMap.addLayer(nakuru_image_after, vizParams, "Lake Nakuru in 2024 (After)");

// Link the default Map to the other map.
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);

// Create a SplitPanel which holds the linked maps side
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});

// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);

// Create the gif
var gifCollection = ee.ImageCollection([
  nakuru_image_before.visualize(vizParams),
  nakuru_image_after.visualize(vizParams)
]);

// set the region so as to see the whole lake
var bigRegion = point.buffer(10000); 

// GIF export parameters
var gifParams = {
  region: bigRegion,
  dimensions: 600,
  framesPerSecond: 1,
  crs: 'EPSG:4326'
};

// Print a working GIF link
print('Lake Nakuru Water Increase 2017-2024: ' + gifCollection.getVideoThumbURL(gifParams));
