/**
 * API Utilities and Helpers
 * Handles fallback mechanisms and retry logic for AI services
 */

export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
  isFallback?: boolean
  retryCount?: number
}

/**
 * Retry an async operation with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelayMs: number = 1000
): Promise<T> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      if (attempt < maxRetries - 1) {
        const delay = initialDelayMs * Math.pow(2, attempt)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError
}

/**
 * Fetch with timeout
 */
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = 30000
): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    return response
  } finally {
    clearTimeout(timeoutId)
  }
}

/**
 * Check if a URL is accessible
 */
export async function isUrlAccessible(url: string, timeoutMs: number = 5000): Promise<boolean> {
  try {
    const response = await fetchWithTimeout(url, { method: 'HEAD' }, timeoutMs)
    return response.ok || response.status === 200
  } catch {
    // Try GET as fallback
    try {
      const response = await fetchWithTimeout(url, { method: 'GET' }, timeoutMs)
      return response.ok
    } catch {
      return false
    }
  }
}

/**
 * Generate a deterministic random seed from text
 */
export function generateSeedFromText(text: string): number {
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

/**
 * Format prompt for better AI generation
 */
export function enhancePrompt(prompt: string, style: string = 'photorealistic'): string {
  // Remove extra whitespace
  const cleaned = prompt.trim().replace(/\s+/g, ' ')

  // Add quality enhancers
  const qualityTerms = [
    'professional',
    'high quality',
    '8k',
    'detailed',
    'sharp focus',
    'cinematic lighting'
  ]

  // Check if prompt already contains quality terms
  const hasQuality = qualityTerms.some(term =>
    cleaned.toLowerCase().includes(term.toLowerCase())
  )

  if (!hasQuality) {
    return `${cleaned}, ${qualityTerms.slice(0, 3).join(', ')}`
  }

  return cleaned
}

/**
 * Log API usage for monitoring
 */
export function logAPIUsage(
  service: string,
  endpoint: string,
  statusCode: number,
  responseTimeMs: number,
  isFallback: boolean = false
): void {
  const logLevel = isFallback ? 'warn' : 'info'

  console.log(`[${logLevel.toUpperCase()}] API Call:`, {
    service,
    endpoint,
    statusCode,
    responseTimeMs,
    isFallback,
    timestamp: new Date().toISOString()
  })
}

/**
 * Get appropriate API endpoint based on available services
 */
export function getOptimalAPIEndpoint(
  primaryEndpoint: string,
  fallbackEndpoint: string,
  hasToken: boolean
): { endpoint: string; isFallback: boolean } {
  if (hasToken) {
    return { endpoint: primaryEndpoint, isFallback: false }
  }
  return { endpoint: fallbackEndpoint, isFallback: true }
}
