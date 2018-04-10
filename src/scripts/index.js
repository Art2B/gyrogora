import paper from 'paper'

import Dot from './lib/dot'
import Step1 from './steps/step1'
import Step2 from './steps/step2'
import Step3 from './steps/step3'
import Step4 from './steps/step4'
import Step5 from './steps/step5'
import Step6 from './steps/step6'
import Step7 from './steps/step7'

import config from './config'

// Install paper scope in window scope
paper.install(window)
window.onload = event => {
  // Init paper in canvas with id 'canvas'
  paper.setup('canvas')

  // const step1 = new Step1(view)
  // const step2 = new Step2(view)
  // const step3 = new Step3(view)
  // const step4 = new Step4(view)
  // const step5 = new Step5(view)
  // const step6 = new Step6(view)
  const step7 = new Step7(view)

  let tool = new Tool()
  // let center = new Point(window.innerWidth/2, window.innerHeight/2)
  let mouse = new Point(0, 0)

  // Update mouse paper.Point position when moving the mouse
  tool.onMouseMove = event => {
    mouse = new Point(event.point)
  }

  view.onFrame = event => {
    project.clear()
    step7.draw(mouse)
  }

  // // Init all dots
  // let dots = []
  // for (let i=0; i < config.nbDot; i++) {
  //   dots.push(new Dot(center))
  // }

  // // Create line from center to mouse
  // let path = new Path.Line({x: 0, y: 0}, {x: 0, y: 0})
  // path.strokeColor = 'white'

  // // On each frames
  // view.onFrame = event => {
  //   // Reset line from center to mouse actual position
  //   path.removeSegments()
  //   path.add(center, mouse)
  //   path.fitBounds(view.bounds)

  //   // Update dots and draw them
  //   dots.forEach(dot => {
  //     dot.update(center, mouse)
  //     dot.draw()
  //   })
  // }

  // // On click, trigger fill animation
  // view.onMouseDown = event => {
  //   dots.forEach(dot => {
  //     dot.animateFill()
  //   })
  // }

  // // On resize, update center and update dots
  // view.onResize = event => {
  //   center = new Point(window.innerWidth/2, window.innerHeight/2)
  //   dots.forEach(dot => {
  //     dot.update(center, mouse)
  //     dot.draw()
  //   })
  // }
}