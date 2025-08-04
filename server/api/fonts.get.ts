import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    // Read the fonts.json file from the public directory
    const fontsPath = path.join(process.cwd(), 'public', 'fonts.json')
    
    // Check if file exists
    if (!fs.existsSync(fontsPath)) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Fonts data not found'
      })
    }
    
    // Read and parse the JSON file
    const fontsData = fs.readFileSync(fontsPath, 'utf-8')
    const fonts = JSON.parse(fontsData)
    
    // Validate that it's an array
    if (!Array.isArray(fonts)) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Invalid fonts data format'
      })
    }
    
    // Set proper headers
    setHeader(event, 'Content-Type', 'application/json')
    setHeader(event, 'Cache-Control', 'max-age=3600') // Cache for 1 hour
    
    return fonts
  } catch (error) {
    console.error('Error reading fonts data:', error)
    
    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
      throw error as { statusCode: number }
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load fonts data'
    })
  }
})
