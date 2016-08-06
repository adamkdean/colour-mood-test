'use strict'

const _ = require('lodash')
const lwip = require('lwip')
const path = require('path')
const color = require('onecolor')

const ImageProcessor = function ImageProcessor() {}

ImageProcessor.prototype.processImage = function processImage(inputPath, outputPath, done) {
  const image = lwip.open(inputPath, (openError, image) => {
    if (openError) throw openError

    const pixelMap = this.getPixelMap(image)
    const pixelArray = this.convertMapToArray(pixelMap)
    const sortedPixelArray = this.sortPixelArray(pixelArray)

    this.rewriteImage(image, sortedPixelArray, (newImage) => {
      console.log('done rewriting image')

      newImage.writeFile(outputPath, (writeErr) => {
        if (writeErr) throw writeErr
        done()
      })
    })
  })
}

ImageProcessor.prototype.processPixels = function processPixels(image, done) {

}

ImageProcessor.prototype.getPixelMap = function getPixelMap(image) {
  const pixelMap = {}
  const width = image.width()
  const height = image.height()

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const pixel = image.getPixel(x, y)
      const hex = color(`rgba(${pixel.r},${pixel.g},${pixel.b}, 1)`).hex()
      if (pixelMap[hex]) pixelMap[hex].value++
      else pixelMap[hex] = { pixel, value: 1 }
    }
  }

  return pixelMap
}

ImageProcessor.prototype.convertMapToArray = function convertMapToArray(pixelMap) {
  const pixelArray = []
  const objectKeys = Object.keys(pixelMap)
  const colorCount = objectKeys.length

  for (let i = 0; i < colorCount; i++) {
    const pixel = objectKeys[i]
    pixelArray.push(pixelMap[pixel])
  }

  return pixelArray
}

ImageProcessor.prototype.sortPixelArray = function sortPixelArray(pixelArray) {
  return _.sortBy(pixelArray, 'value').reverse()
}

ImageProcessor.prototype.rewriteImage = function rewriteImage(image, sortedPixelArray, done) {
  const width = image.width()
  const height = image.height()
  let x = 0
  let y = 0

  const setNextPixel = function(err, thisImage) {
    if (sortedPixelArray.length === 0) {
      return done(thisImage)
    }

    if (sortedPixelArray[0].value <= 0) sortedPixelArray.shift()
    else sortedPixelArray[0].value--

    if (x >= thisImage.width()) {
      x = 0
      y += 1
    }

    if (y >= thisImage.height()) {
      return done(thisImage)
    }

    thisImage.setPixel(x++, y, sortedPixelArray[0].pixel, setNextPixel)
  }

  setNextPixel(null, image)
}

module.exports = ImageProcessor
