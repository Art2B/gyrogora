import paper from 'paper'
import { TweenMax, Back } from 'gsap'

import Dot from './lib/dot'
import Steps from './steps'

import config from './config'

const updateStep = (view, step) => {
  step.reset()
  view.onFrame = () => step.onFrame()
  view.onMouseDown = () => step.onMouseDown()
  view.onResize = () => step.onResize()
}

window.onload = event => {
  const project = new paper.Project('canvas')
  let displayHelp = true

  const steps = []
  Steps.forEach(step => {
    steps.push(new step(project))
  })

  let tool = new paper.Tool()
  let currentStepIndex = 0
  updateStep(project.view, steps[currentStepIndex])

  // Update mouse paper.Point position when moving the mouse
  tool.onMouseMove = event => {
    steps[currentStepIndex].onMouseMove(event.point)
  }
  tool.onKeyDown = event => {
    if (event.key === 'r') {
      steps[currentStepIndex].reset()
    }
    if (event.key === 'left' && currentStepIndex > 0) {
      currentStepIndex--
      updateStep(project.view, steps[currentStepIndex])
    }
    if (event.key === 'right' && currentStepIndex < (steps.length - 1)) {
      currentStepIndex++
      updateStep(project.view, steps[currentStepIndex])
    }
    if (event.key === 'h') {
      if (displayHelp) {
        TweenMax.to('#tooltip-help', 0.4, { opacity: 0, scale: 0.9, ease: Back.easeOut.config(1.4)})
        displayHelp = false
      } else {
        TweenMax.to('#tooltip-help', 0.4, { opacity: 1, scale: 1, ease: Back.easeOut.config(1.4)})
        displayHelp = true
      }
    }
  }
}