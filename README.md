# Region: Lake Nakuru, Kenya

## Introduction
The great lakes of the Rift valley located in Kenya have been experiencing an increase in water levels in the past few years. My area of interest is one of the lakes, Lake Nakuru, as it is close to my hometown. Some fun facts about Lake Nakuru include:
- It is located in the county of Nakuru, Kenya
- It is located inside Lake Nakuru National Park
- It was previously the home to 1000s of flamingoes hence gained the name ‘Pink Lake’ from the locals
- It is a salt water lake

Over the years, we have seen the migration of flamingoes away from the lake. This is because the lake has had fresh water flow into it and this has led to the death of the algae, which flamingoes feed on. The previous game park entrance has been closed and shifted to another part of the national park as the increased water has already obstructed the gate entrance preventing tourists from accessing the national park from that entrance.
1. **Lake Nakuru as of 2017 (Before Image)**  
   <img width="580" height="438" alt="Lake Nakuru 2017" src="https://github.com/user-attachments/assets/b10f40e9-9ef1-495b-88a5-f9ae20e474df" />

2. **Lake Nakuru as of 2024 (After Image)**  
   <img width="580" height="438" alt="Lake Nakuru 2024" src="https://github.com/user-attachments/assets/c0104d48-c06c-40f6-97f1-a1161bff6a47" />

3. **Lake Nakuru GIF showing increase in water levels between 2017 and 2024**  
   <img width="580" alt="Lake Nakuru Water Increase 2017-2024" src="https://github.com/user-attachments/assets/9dff3e9a-96fa-421e-92fb-632d5631a834" />

## About the code:
- I used the Sentinel-2 imagery collection: 
```
var s2 = ee.ImageCollection('COPERNICUS/S2_HARMONIZED');
```
- Filter the images based on dates:

```
//Before
var s2_nakuru_before = s2.filterBounds(aoi)
  .filterDate('2016-01-01', '2016-12-31')
  .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 10)
  .sort('CLOUDY_PIXEL_PERCENTAGE');

// After
var s2_nakuru_after = s2.filterBounds(aoi)
  .filterDate('2024-01-01', '2024-12-31')
  .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 10)
  .sort('CLOUDY_PIXEL_PERCENTAGE');
```
- Bands used are
1. B11 which has a wavelength:	1.610–1.670	SWIR (Shortwave Infrared 1). It is sensitive to moisture content, soil and water detection
2. B8 which has a wavelength:	0.785–0.900	NIR (Near Infrared). It is useful for vegetation indices and water/land discrimination.
3. B3 which has a wavelength:	0.560–0.590	Green – visible green band.

- Added a slider
- Added a gif to show the increase in water levels

## Credits
Digital Earth Class Winter Semester 2025
  conducted by: Prof. Martin Sudmanns, Prof. T. Dieke, Dr. Karima
