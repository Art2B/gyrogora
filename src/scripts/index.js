import paper from 'paper'

import Dot from './lib/dot'
import Steps from './steps'

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

  const steps = []
  Steps.forEach(step => {
    steps.push(new step(project))
  })

  let tool = new Tool()
  let currentStepIndex = 0
  updateStep(view, steps[currentStepIndex])

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