# AI Fallback System - Quick Start Guide

Get your AI features working in **5 minutes** with zero configuration!

---

## 🚀 Installation

```bash
# 1. Install dependencies
pnpm install

# 2. Start development server
pnpm dev

# 3. Open browser
# http://localhost:3000
```

**That's it!** All AI features work immediately.

---

## ✨ Features Ready to Use

### 1. Image Generator
- **URL**: http://localhost:3000/tools/image-generator
- **Input**: Text description
- **Output**: AI-generated image from Pollinations.ai
- **Time**: 2-10 seconds

### 2. Video Generation
- **URL**: http://localhost:3000/tools/video-generation
- **Input**: Text prompt or image file
- **Output**: Cinematic storyboard frame
- **Time**: 3-20 seconds

### 3. Car Changer
- **URL**: http://localhost:3000/tools/car-changer
- **Input**: Image with car + model selection
- **Output**: Car replaced in photo
- **Time**: 2-12 seconds

### 4. Dress Changer
- **URL**: http://localhost:3000/tools/dress-changer
- **Input**: Image with person
- **Output**: Fashion outfit applied
- **Time**: 2-12 seconds

### 5. Person Replacer
- **URL**: http://localhost:3000/tools/person-replacer
- **Input**: Image with person
- **Output**: Cybernetic android variation
- **Time**: 2-12 seconds

---

## 🔧 Optional: Add Premium Features

### Replicate API (Advanced Image Editing)

Replicate provides more powerful image editing models. To enable:

1. **Get API Token**:
   - Visit https://replicate.com
   - Sign up (free)
   - Go to Settings → API Tokens
   - Copy your token

2. **Add to Environment**:
   ```bash
   # Edit .env.local
   REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxx
   ```

3. **Restart Server**:
   ```bash
   # Stop with Ctrl+C
   pnpm dev
   ```

**Now your image editing will use Replicate's models first, with Pollinations as fallback.**

---

## 🧪 Test It Out

### Test 1: Image Generation
```
1. Go to http://localhost:3000/tools/image-generator
2. Enter: "A cyberpunk street at night with neon signs"
3. Click "Generate Image"
4. Watch real AI generate an image in 2-10 seconds
```

### Test 2: Image Editing
```
1. Go to http://localhost:3000/tools/car-changer
2. Upload any car image (or find one online)
3. Select a car model
4. Click "Replace Car"
5. See the car replaced with AI-generated vehicle
```

### Test 3: Verify Fallback Works
```
1. Open DevTools Network tab
2. Throttle to "Offline"
3. Try generating an image
4. See beautiful SVG placeholder appears
5. Fallback mechanism working! ✅
```

---

## 📚 Learn More

For detailed information:
- **[Fallback System Guide](../docs/FALLBACK_SYSTEM.md)** - Complete technical details
- **[Testing Guide](../docs/TESTING_GUIDE.md)** - Comprehensive test procedures
- **[Implementation Summary](../IMPLEMENTATION_SUMMARY.md)** - What was built

---

## 🎯 Key Points

✅ **No API keys required** - Pollinations.ai is free
✅ **Works immediately** - No setup needed
✅ **Always available** - Automatic fallbacks ensure results
✅ **Real AI** - Not mocked delays, real generation
✅ **Optional upgrades** - Add Replicate for premium features

---

## 💡 Example Code

### Using Image Generation in Your Code

```typescript
// In a React component
const { generateImage } = await import("@/app/actions/ai")

const result = await generateImage("A beautiful sunset")

console.log(result)
// {
//   url: "https://image.pollinations.ai/...",
//   isFallback: false,
//   error: undefined
// }

// Display image
<img src={result.url} alt="Generated" />

// Show feedback
if (result.isFallback) {
  toast.info("Using fallback (service busy)")
}
```

---

## 🔍 Monitoring

### Check API Health

```typescript
const { checkAPIHealth } = await import("@/app/actions/ai")
const health = await checkAPIHealth()
console.log(health)
// { pollinations: true, replicate: false }
```

### View Logs

When you run `pnpm dev`, watch the terminal for API logs:

```
[INFO] API Call: Pollinations /prompt/...
       statusCode: 200
       responseTimeMs: 1250
       isFallback: false
```

---

## ❓ Troubleshooting

### "Image won't load"
- Check internet connection
- Refresh the page
- Try a different prompt

### "Fallback placeholder showing"
- Primary API is temporarily busy
- Try again in a few seconds
- Or add Replicate token for backup

### "Replicate token not working"
- Double-check token in `.env.local`
- Restart dev server (`pnpm dev`)
- Verify token has API access on Replicate website

---

## 📦 What You Get

### APIs Included
- ✅ Pollinations.ai (free, built-in)
- ✅ Replicate (optional)
- ✅ SVG fallbacks (always)

### Models Available
- ✅ Flux (fast)
- ✅ Flux-Pro (high quality)
- ✅ Stable Diffusion (reliable)
- ✅ And more...

### Features
- ✅ Image generation
- ✅ Video storyboarding
- ✅ Image editing (3 types)
- ✅ Automatic fallbacks
- ✅ Health monitoring

---

## 🎓 Best Practices

### 1. Use Descriptive Prompts
```
Good:  "A professional photograph of a red sports car, studio lighting, sharp focus, 8k detail"
Bad:   "car"
```

### 2. Handle Fallbacks Gracefully
```typescript
if (response.isFallback) {
  toast.info("Using alternative generation")
} else {
  toast.success("Generated successfully!")
}
```

### 3. Set Reasonable Timeouts
```typescript
// Your requests will timeout if they take too long
// and fall back to next tier automatically
```

### 4. Monitor Performance
```typescript
console.time("generation")
const result = await generateImage(prompt)
console.timeEnd("generation")
```

---

## 🚀 Next Steps

1. **Run the app**: `pnpm dev`
2. **Test features**: Visit the tool pages
3. **Read docs**: Check FALLBACK_SYSTEM.md for details
4. **Add Replicate** (optional): For premium editing
5. **Deploy**: To Vercel or your hosting

---

## 📞 Need Help?

1. Check the [Testing Guide](../docs/TESTING_GUIDE.md)
2. Review [Fallback System](../docs/FALLBACK_SYSTEM.md)
3. Check browser console (F12)
4. Check terminal logs from `pnpm dev`

---

## 🎉 You're All Set!

Your AI generation system is ready to:
- Generate stunning images ✨
- Create video storyboards 🎬
- Edit images with AI 🎨
- Handle failures gracefully 🛡️

**Everything works out of the box. Enjoy!**
