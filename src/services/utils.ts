export function getDominantColor(img: HTMLImageElement) {
  if (!img.complete) throw new Error('Image did not load completely.')
  // Create a canvas element
  img.crossOrigin = 'Anonymous'
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  // Set canvas dimensions equal to image dimensions
  canvas.width = img.width
  canvas.height = img.height
  
  // Draw the image onto the canvas
  context?.drawImage(img, 0, 0)

  // Get the pixel array of the image data
  const imageData = context?.getImageData(0, 0, canvas.width, canvas.height).data

  // Count color frequencies
  const colorFrequencies: {[key: string]: number} = {}
  if (imageData) {
    for (let i = 0; i < imageData.length; i += 4) {
      const r = imageData[i]
      const g = imageData[i + 1]
      const b = imageData[i + 2]
      const color = r + ',' + g + ',' + b
    
      if (colorFrequencies[color]) colorFrequencies[color]++
      else colorFrequencies[color] = 1
    }
  } else throw new Error('imageData undefined')

  // Find the predominant color
  /* Object.entries(colorFrequencies).forEach((entry => {
    const [color, value] = entry
  })) */
  let predominantColor = ''
  let maxFrequency = 0
  for (const color in colorFrequencies) {
    if (colorFrequencies[color] > maxFrequency) {
      maxFrequency = colorFrequencies[color]
      predominantColor = color
    }
  }
  // Apply the predominant color as the background color
  return `rgb(${predominantColor})`
}