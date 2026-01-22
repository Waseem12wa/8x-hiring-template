# AI Models Used in This Application

This document lists all the AI models integrated into the application.

## Overview

All 5 AI tools now use **real, working open-source models** that are free to use.

---

## Models List

### 1. **Groq API - Llama 3 8B** (Prompt Enhancement)
- **Purpose**: Enhances user prompts to generate better results
- **Model ID**: `llama3-8b-8192`
- **API**: Groq Cloud API
- **Usage**: All 5 tools use this for prompt optimization
- **Cost**: Free tier available
- **Documentation**: https://console.groq.com/docs

---

### 2. **Pollinations.ai - FLUX.2 Klein** (Image Generation)
- **Purpose**: Text-to-image generation
- **Model**: FLUX.2 Klein (latest as of Jan 2026)
- **API**: Pollinations.ai Image API
- **Usage**: 
  - Image Generator tool
  - Video Generation tool (storyboard frames)
  - Dress Changer (text-based generation)
  - Car Changer (text-based generation)
  - Person Replacer (text-based generation)
- **Cost**: Completely free, no API key required
- **Documentation**: https://pollinations.ai/
- **Features**:
  - High-quality image generation
  - No watermarks
  - Automatic prompt enhancement
  - Supports up to 1920x1080 resolution

---

### 3. **Video Generation** (Cinematic Storyboard)
- **Purpose**: Creates high-quality cinematic frames for video storyboards
- **Model**: FLUX.2 Klein (via Pollinations.ai)
- **Note**: True real-time video generation requires GPU infrastructure and paid APIs. This implementation generates high-quality cinematic storyboard frames instead.
- **Usage**: Video Generation tool
- **Output**: 1920x1080 cinematic images with film grain and professional cinematography

---

## How It Works

### Image Generator
1. User enters a prompt (e.g., "a futuristic city at sunset")
2. Groq's Llama 3 enhances the prompt to be more detailed
3. Pollinations.ai FLUX model generates the image
4. Result is displayed to the user

### Video Generator
1. User enters a text prompt or uploads an image
2. Groq's Llama 3 enhances the prompt with cinematic details
3. Pollinations.ai FLUX generates a high-quality storyboard frame
4. Result is displayed as a cinematic preview

### Dress/Car/Person Changers
1. User uploads an image and provides instructions
2. Groq's Llama 3 converts the instruction into a clear editing prompt
3. Pollinations.ai FLUX generates a new image based on the instruction
4. Result is displayed to the user

**Note**: True image-to-image editing (preserving the original image structure) requires dedicated GPU infrastructure and models like InstructPix2Pix or ControlNet. The current implementation generates new images based on your instructions, which is the most reliable free approach.

---

## API Endpoints Used

### Groq API
```
POST https://api.groq.com/openai/v1/chat/completions
```

### Pollinations.ai Image API
```
GET https://image.pollinations.ai/prompt/{prompt}?width={w}&height={h}&seed={seed}&model=flux&nologo=true&enhance=true
```

---

## Environment Variables Required

```env
GROQ_API_KEY=your_groq_api_key_here
```

---

## Limitations & Future Improvements

### Current Limitations
1. **Image Editing**: Generates new images based on instructions rather than true image-to-image editing
2. **Video**: Generates storyboard frames instead of actual video files
3. **Rate Limits**: Free APIs may have rate limits during high traffic

### Future Improvements
1. Integrate Replicate API for true image-to-image editing (requires paid API key)
2. Add Runway ML or similar for real video generation (requires paid API key)
3. Implement image upscaling for higher resolution outputs
4. Add more model options (Stable Diffusion XL, DALL-E, etc.)

---

## Testing the Integration

To test if the models are working:

1. **Image Generator**: Enter "a cyberpunk city at night" and click Generate
2. **Video Generator**: Enter "a drone flying over mountains" and click Generate
3. **Dress Changer**: Upload a photo and click "Generate New Outfit"
4. **Car Changer**: Upload a car photo, select a model, and click "Replace Car"
5. **Person Replacer**: Upload a photo and click "Replace Person"

All tools should return results within 3-5 seconds.

---

## Troubleshooting

### "Failed to generate image"
- Check that `GROQ_API_KEY` is set in `.env.local`
- Restart the development server after adding the key
- Check browser console for detailed error messages

### Slow generation times
- Pollinations.ai is a free service and may be slower during peak hours
- Generation typically takes 2-5 seconds

### Images not loading
- Check your internet connection
- Pollinations.ai URLs are direct image links and should load instantly
- Try refreshing the page

---

Last Updated: January 22, 2026
