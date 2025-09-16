# Pikari Image Grid Block - Demo Setup Guide

When the WordPress Playground loads, it will automatically open to create a new page. Follow these quick steps to set up the demo:

## Quick Start (Copy & Paste)

1. **Title the page**: "Image Grid Demo"

2. **Switch to Code Editor** (Ctrl/Cmd + Shift + Alt + M)

3. **Copy ALL of the demo content below** and paste it into the editor:

```html
<!-- wp:heading -->
<h2 class="wp-block-heading">Welcome to Pikari Image Grid Block!</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>This demo showcases all the different layouts and options available in the Pikari Image Grid Block. Each example below demonstrates a different configuration.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">1. Empty Block (Default State)</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>This is how the block appears when first added - ready for your images!</p>
<!-- /wp:paragraph -->

<!-- wp:pikari/image-grid {"gridLayout":"asymmetric"} /-->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">2. Asymmetric Layout (Default)</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Two columns with varied image sizes - perfect for highlighting a main image.</p>
<!-- /wp:paragraph -->

<!-- wp:pikari/image-grid {"gridLayout":"asymmetric","image1Id":5,"image1Url":"/wp-content/uploads/demo-1.jpg","image1Alt":"Mountain landscape","image2Id":6,"image2Url":"/wp-content/uploads/demo-2.jpg","image2Alt":"Golden Gate Bridge at sunset","image3Id":7,"image3Url":"/wp-content/uploads/demo-3.jpg","image3Alt":"Forest path with sunlight","image4Id":8,"image4Url":"/wp-content/uploads/demo-4.jpg","image4Alt":"Foggy mountain range"} /-->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">3. Equal Grid Layout</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Four equal-sized images in a clean 2x2 grid.</p>
<!-- /wp:paragraph -->

<!-- wp:pikari/image-grid {"gridLayout":"equal","image1Id":5,"image1Url":"/wp-content/uploads/demo-1.jpg","image1Alt":"Mountain landscape","image2Id":6,"image2Url":"/wp-content/uploads/demo-2.jpg","image2Alt":"Golden Gate Bridge at sunset","image3Id":7,"image3Url":"/wp-content/uploads/demo-3.jpg","image3Alt":"Forest path with sunlight","image4Id":8,"image4Url":"/wp-content/uploads/demo-4.jpg","image4Alt":"Foggy mountain range"} /-->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">4. Masonry Layout</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Pinterest-style masonry layout that adapts to image heights.</p>
<!-- /wp:paragraph -->

<!-- wp:pikari/image-grid {"gridLayout":"masonry","image1Id":5,"image1Url":"/wp-content/uploads/demo-1.jpg","image1Alt":"Mountain landscape","image2Id":6,"image2Url":"/wp-content/uploads/demo-2.jpg","image2Alt":"Golden Gate Bridge at sunset","image3Id":7,"image3Url":"/wp-content/uploads/demo-3.jpg","image3Alt":"Forest path with sunlight","image4Id":8,"image4Url":"/wp-content/uploads/demo-4.jpg","image4Alt":"Foggy mountain range"} /-->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">5. Custom Settings Example</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Asymmetric layout with custom gap (24px) and border radius (16px).</p>
<!-- /wp:paragraph -->

<!-- wp:pikari/image-grid {"gridLayout":"asymmetric","gap":24,"imageBorderRadius":16,"image1Id":5,"image1Url":"/wp-content/uploads/demo-1.jpg","image1Alt":"Mountain landscape","image2Id":6,"image2Url":"/wp-content/uploads/demo-2.jpg","image2Alt":"Golden Gate Bridge at sunset","image3Id":7,"image3Url":"/wp-content/uploads/demo-3.jpg","image3Alt":"Forest path with sunlight","image4Id":8,"image4Url":"/wp-content/uploads/demo-4.jpg","image4Alt":"Foggy mountain range"} /-->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Try It Yourself!</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Click on any block above to edit it, or add a new Image Grid block to experiment with your own images and settings.</p>
<!-- /wp:paragraph -->
```

4. **Switch back to Visual Editor** and upload images:
   - Go to Media Library → Add New
   - Upload the 4 demo images from `_playground/images/` 
   - Or upload any 4 images of your choice

5. **Add images to the blocks**:
   - Click on block #2 (Asymmetric Layout)
   - Click each image placeholder and select an image from the Media Library
   - Repeat for blocks #3, #4, and #5

6. **Publish the page** and view it!

## Demo Images

The demo images (800x600, 4:3 aspect ratio) are available in `_playground/images/`:

- `demo-1.jpg` - Mountain landscape  
- `demo-2.jpg` - Golden Gate Bridge at sunset
- `demo-3.jpg` - Forest path with sunlight
- `demo-4.jpg` - Foggy mountain range

## Alternative: Manual Demo Setup

If you prefer to build the demo manually:

1. Create a new page
2. Add the Image Grid block from the block inserter (search for "image grid")
3. Try each layout variation using the block toolbar
4. Adjust settings in the block sidebar:
   - Gap: 0-100px
   - Border Radius: 0-50px
   - Enable Captions: On/Off
   - Dimensions: Custom width/height

## Tips

- The first block shows the empty state - leave it without images
- Blocks 2-5 should have all 4 images to showcase the layouts
- Try the Wide and Full alignment options
- Test responsive behavior using the preview modes
- Experiment with different image aspect ratios in the Masonry layout
