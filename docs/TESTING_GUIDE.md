# Testing the Fallback System

This guide walks you through testing all AI features and their fallback mechanisms.

## Quick Start

No setup needed! All features work immediately after installing dependencies.

```bash
pnpm install
pnpm dev
# Visit http://localhost:3000
```

---

## Test Cases

### 1. Image Generation

**Feature**: Text-to-Image generation using Pollinations.ai

**Test Steps**:
1. Navigate to **Tools → Image Generator**
2. Enter a detailed prompt: `"A cyberpunk street at night with neon rain, high quality, 8k, detailed"`
3. Click "Generate Image"
4. Observe:
   - Loading spinner appears for ~2-5 seconds
   - Image loads from Pollinations.ai
   - Success toast: "Image generated with Pollinations.ai (Enhanced by Groq)"

**Verify Fallback**:
1. Open DevTools Network tab
2. Disable internet connection or mock network failure
3. Try generating again
4. Expected: SVG placeholder appears (fallback)
5. Toast: "Failed to generate image" or "Used fallback generation"

**Expected Output**:
- Real images with detailed, photorealistic content
- Dimensions: 768x768
- Takes 2-10 seconds depending on queue

---

### 2. Video Generation

**Feature**: Generate cinematic storyboard frames

**Test Steps**:
1. Navigate to **Tools → Video Generation**
2. Select "Text to Video"
3. Enter prompt: `"A spaceship entering the atmosphere with fire and smoke, cinematic, 4k"`
4. Click "Generate Video"
5. Observe:
   - Full-width video preview area
   - Cinematic 1280x720 frame generated
   - Shows `isFallback: false` if successful

**Expected Output**:
- Cinematic-quality frame (1280x720)
- Relevant to the prompt
- Photorealistic or artistic style

**Alternative: Image to Video**:
1. Select "Image to Video"
2. Upload an image (JPG/PNG, max 5MB)
3. System generates a video-ready frame based on the image
4. Result: Animated frame representation

---

### 3. Image Editing - Car Changer

**Feature**: Replace cars in photos with different models

**Test Steps**:
1. Navigate to **Tools → Car Changer**
2. Upload an image with a car (or use test image)
3. Select a car model: "Tesla Model S"
4. Click "Replace Car"
5. Observe:
   - Processing spinner with "Replacing car..."
   - New image appears with different car
   - Success message

**Test Different Cars**:
- Tesla Model S
- Porsche 911
- Lamborghini Huracán
- Mercedes-AMG GT
- BMW M4

**Expected Results**:
- Car is visually replaced
- Similar angle and lighting preserved
- Professional quality

---

### 4. Image Editing - Dress Changer

**Feature**: Change clothing in photos to different styles

**Test Steps**:
1. Navigate to **Tools → Dress Changer**
2. Upload a photo with a person in clothing
3. Click "Change Dress"
4. Observe:
   - Processing spinner
   - New fashion outfit appears
   - Toast: "Dress changed successfully!"

**Test Variations**:
- Upload different clothing styles
- Test with various lighting conditions
- Try different body positions

**Expected Results**:
- Clothing replaced with fashion style
- Natural blending with person's body
- Professional fashion photography quality

---

### 5. Image Editing - Person Replacer

**Feature**: Replace people in images with AI-generated variations

**Test Steps**:
1. Navigate to **Tools → Person Replacer**
2. Upload a photo with a person
3. Click "Replace Person"
4. Observe:
   - Processing indicator
   - New person appears
   - Success notification

**Test With**:
- Portrait photos
- Full-body shots
- Different backgrounds

**Expected Results**:
- Person replaced with cybernetic android look
- Original background preserved
- Professional quality

---

## Fallback Mechanism Tests

### Test Fallback for Image Generation

**Scenario**: Network failure during generation

```javascript
// In browser console
// Mock network failure
fetch('https://image.pollinations.ai/prompt/test', {
  method: 'HEAD'
}).catch(e => console.log('Network fails'))

// Result: SVG placeholder generated
```

**Expected Behavior**:
- ✅ SVG placeholder with gradient
- ✅ Toast: "Used fallback generation due to high demand"
- ✅ `response.isFallback === true`
- ✅ User still sees an image (not blank)

### Test Fallback for Image Editing

**Without Replicate Token**:
1. Ensure `REPLICATE_API_TOKEN` is not set
2. Upload image and edit
3. Expected: Uses Pollinations.ai (secondary fallback)
4. Result: Generated image based on edit prompt

**With Pollinations Failure**:
1. Simulate network timeout
2. Expected: SVG placeholder appears
3. Toast indicates fallback usage

---

## Response Inspection

### Check Response Properties

Open DevTools Console and run:

```typescript
// Test image generation
const result = await (await import('@/app/actions/ai')).generateImage(
  "A beautiful sunset"
)
console.log({
  url: result.url,
  isFallback: result.isFallback,
  error: result.error
})

// Expected output if successful:
// {
//   url: "https://image.pollinations.ai/prompt/...",
//   isFallback: false,
//   error: undefined
// }
```

### Health Check

```typescript
// Check API availability
const health = await (await import('@/app/actions/ai')).checkAPIHealth()
console.log(health)

// Output:
// { pollinations: true, replicate: false }
```

---

## Performance Testing

### Load Time Expectations

| Feature | Best Case | Average | Worst Case |
|---------|-----------|---------|-----------|
| Image Generation | 2s | 5s | 15s (queue) |
| Video Storyboard | 3s | 6s | 20s |
| Image Edit | 2s | 4s | 12s |
| Fallback Placeholder | <100ms | <100ms | <100ms |

### Concurrent Requests

```javascript
// Test 5 simultaneous generations
Promise.all([
  generateImage("A red car"),
  generateImage("A blue car"),
  generateImage("A green car"),
  generateImage("A yellow car"),
  generateImage("A black car")
])
```

Expected: All complete within 30 seconds

---

## Error Cases

### Empty Prompt
- Input: Empty text field
- Expected: "Prompt cannot be empty" error
- Button disabled until text entered

### Invalid File Upload
- Upload non-image file
- Expected: Toast "Please upload an image file"

### Large File
- Upload >5MB image
- Expected: Toast "File size must be less than 5MB"

### Network Timeout
- Simulate slow network
- Expected: Graceful fallback to placeholder

---

## Browser Compatibility

Test in:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

**Note**: AbortSignal.timeout() is used, requires modern browsers

---

## Monitoring & Logs

### Check Generated Logs

```typescript
// View server logs for API calls
// Terminal running 'pnpm dev'
// Look for:
// [INFO] API Call: Pollinations /prompt/...
// [WARN] API Call: Fallback used
```

### Monitor Response Types

Each component should show:

```typescript
if (response.isFallback) {
  // User knows fallback was used
  toast.info("Used alternative generation method")
}
```

---

## Troubleshooting Tests

### Test 1: API Connection
```bash
# Test Pollinations.ai connectivity
curl -I "https://image.pollinations.ai/prompt/test"
# Expected: 200 OK
```

### Test 2: Image Display
```javascript
// Verify image can be displayed
const img = new Image()
img.src = "https://image.pollinations.ai/prompt/test"
img.onload = () => console.log("Image loads OK")
img.onerror = () => console.log("Image load failed")
```

### Test 3: Base64 Encoding
```javascript
// Test image upload encoding
const input = document.querySelector('input[type=file]')
const file = input.files[0]
const reader = new FileReader()
reader.onload = (e) => {
  const base64 = e.target.result
  console.log(base64.substring(0, 50) + "...")
}
reader.readAsDataURL(file)
```

---

## Checklist Before Release

- [ ] Image generation produces real AI images
- [ ] Video generation shows cinematic storyboards
- [ ] Car changer replaces vehicles correctly
- [ ] Dress changer changes clothing appropriately
- [ ] Person replacer transforms people realistically
- [ ] All features fall back gracefully to placeholders
- [ ] Error messages are clear and helpful
- [ ] Toasts show appropriate feedback (success/fallback/error)
- [ ] Loading states display during processing
- [ ] No broken images or missing assets
- [ ] Works offline (shows fallback placeholders)
- [ ] Works with slow network (respects timeouts)

---

## Live Testing URLs

Once running locally:

- Homepage: http://localhost:3000
- Image Generator: http://localhost:3000/tools/image-generator
- Video Generation: http://localhost:3000/tools/video-generation
- Car Changer: http://localhost:3000/tools/car-changer
- Dress Changer: http://localhost:3000/tools/dress-changer
- Person Replacer: http://localhost:3000/tools/person-replacer
- Login: http://localhost:3000/auth/login
- Pricing: http://localhost:3000/pricing

---

## Test Data

### Sample Prompts

```
Image Generation:
- "A cyberpunk street at night with neon rain, professional photography, 8k detail"
- "A serene mountain landscape at sunset, oil painting style, dramatic lighting"
- "A futuristic city skyline, sci-fi architecture, bioluminescent lights"

Video Generation:
- "A spaceship entering the atmosphere with fire and smoke, cinematic, 4k"
- "An ocean wave crashing on a beach at sunset, slow motion, cinematic"
- "A drone flying through a futuristic cityscape, dynamic movement"
```

### Sample Test Images

You can use images from:
- Unsplash: https://unsplash.com
- Pexels: https://pexels.com
- Pixabay: https://pixabay.com

Look for:
- People photos for person-replacer
- Car photos for car-changer
- Portrait photos for dress-changer

---

## Success Criteria

✅ **Test Passes If**:
- Feature generates real AI content (not just placeholder)
- Response includes appropriate metadata
- Error handling works gracefully
- Fallback appears when primary service fails
- User receives clear feedback via toast
- Loading state displays during processing
- All 5 tools function as expected

✅ **All Tests Complete**: System ready for production!
