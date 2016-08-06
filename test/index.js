const expect = require('expect')
const path = require('path')
const lib = require('../lib/')
const ImageProcessor = new lib()

const inputPath = path.join(__dirname, '/../images/02 - UeRFpoD.jpg')
const outputPath = path.join(__dirname, '/../output/02 - UeRFpoD.jpg')

describe('pixel processing', function () {

  this.timeout(30000)

  it('should process file that exists', (done) => {
    ImageProcessor.processImage(inputPath, outputPath, () => {
      done()
    })
  })

})
