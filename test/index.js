const expect = require('expect')
const path = require('path')
const lib = require('../lib/')
const ImageProcessor = new lib()

console.log('[Notice] These can take upwards of 10 seconds. Please be patient.')

describe('Process images', function () {

  this.timeout(30000)

  it.skip('should process a.jpg', (done) => {
    const inputPath = path.join(__dirname, '/../images/a.jpg')
    const outputPath = path.join(__dirname, '/../output/a.jpg')
    ImageProcessor.processImage(inputPath, outputPath, () => {
      done()
    })
  })

  it.skip('should process b.jpg', (done) => {
    const inputPath = path.join(__dirname, '/../images/b.jpg')
    const outputPath = path.join(__dirname, '/../output/b.jpg')
    ImageProcessor.processImage(inputPath, outputPath, () => {
      done()
    })
  })

  it.skip('should process c.jpg', (done) => {
    const inputPath = path.join(__dirname, '/../images/c.jpg')
    const outputPath = path.join(__dirname, '/../output/c.jpg')
    ImageProcessor.processImage(inputPath, outputPath, () => {
      done()
    })
  })

  it.skip('should process winter.jpg', (done) => {
    const inputPath = path.join(__dirname, '/../images/winter.jpg')
    const outputPath = path.join(__dirname, '/../output/winter.jpg')
    ImageProcessor.processImage(inputPath, outputPath, () => {
      done()
    })
  })

  it('should process rain.jpg', (done) => {
    const inputPath = path.join(__dirname, '/../images/rain.jpg')
    const outputPath = path.join(__dirname, '/../output/rain.jpg')
    ImageProcessor.processImage(inputPath, outputPath, () => {
      done()
    })
  })

})
