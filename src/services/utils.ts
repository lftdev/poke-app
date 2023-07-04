export function getDominantColor(img: HTMLImageElement, ratio: number) {
  if (!img.complete) throw new Error('Image did not load completely.')
  img.crossOrigin = 'Anonymous'
  const colorFrequencies = countColorFrequencies(img, ratio)
  // Find the dominant color
  let dominantColor = ''
  let maxFrequency = 0
  Object.entries(colorFrequencies).forEach(entry => {
    const [color, value] = entry
    if (value > maxFrequency) {
      if (color !== '0, 0, 0')
        maxFrequency = value
        dominantColor = color
    }
  })
  // Apply the dominant color as the background color
  return `rgb(${dominantColor})`
}
function countColorFrequencies(img: HTMLImageElement, ratio: number) {
  // Create a canvas element and set its dimensions equal to image dimensions
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const context = canvas.getContext('2d')
  if (!(context instanceof CanvasRenderingContext2D))
    throw new Error('Could not get canvas context.')
  // Draw the image onto the canvas
  context.drawImage(img, 0, 0)
  // Get the pixel array of the image as imageData
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data
  const freq: {[key: string]: number} = {}
  const step = ratio * 4
  for (let i = 0; i < imageData.length; i += step) {
    const color = imageData[i] + ', ' + imageData[i + 1] + ', ' + imageData[i + 2]
    if (freq[color]) freq[color]++
    else freq[color] = 1
  }
  canvas.remove()
  return freq
}
