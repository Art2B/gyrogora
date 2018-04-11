import paper from 'paper'

import Dot from './lib/dot'
import Step1 from './steps/step1'
import Step2 from './steps/step2'
import Step3 from './steps/step3'
import Step4 from './steps/step4'
import Step5 from './steps/step5'
import Step6 from './steps/step6'
import Step7 from './steps/step7'
import Step8 from './steps/step8'

import config from './config'

const updateStep = (view, step) => {
  step.reset()
  view.onFrame = () => step.onFrame()
  view.onMouseDown = () => step.onMouseDown()
  view.onResize = () => step.onResize()
}

// Install paper scope in window scope
paper.install(window)
window.onload = event => {
  // Init paper in canvas with id 'canvas'
  paper.setup('canvas')

  const steps = [
    new Step1(view),
    new Step2(view),
    new Step3(view),
    new Step4(view),
    new Step5(view),
    new Step6(view),
    new Step7(view),
    new Step8(view)
  ]

  let currentStepIndex = 0
  updateStep(view, steps[currentStepIndex])

  let tool = new Tool()

  // Update mouse paper.Point position when moving the mouse
  tool.onMouseMove = event => {
    steps[currentStepIndex].updateMouse(new Point(event.point))
  }
  tool.onKeyDown = event => {
    if (event.key === 'r') {
      steps[currentStepIndex].reset()
    }
    if (event.key === 'left' && currentStepIndex > 0) {
      currentStepIndex--
      updateStep(view, steps[currentStepIndex])
    }
    if (event.key === 'right' && currentStepIndex < (steps.length - 1)) {
      currentStepIndex++
      updateStep(view, steps[currentStepIndex])
    }
    console.log(`Current step: ${currentStepIndex + 1}`)
  }
}