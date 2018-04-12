import paper from 'paper'

import Step from './../lib/step'

export default class LineCenterMouse extends Step {
  onFrame () {
    this.project.clear()
    this.renderBackground()
    const line = new paper.Path.Line({
      from: [this.center.x, this.center.y],
      to: [this.mouse.x, this.mouse.y],
      strokeColor: 'white'
    })

    // Center cross
    const centerCrossHor = new paper.Path.Line({
      from: [this.center.x - 10, this.center.y],
      to: [this.center.x + 10, this.center.y],
      strokeColor: 'indianred',
      strokeWidth: 3
    })
    const centerCrossVer = new paper.Path.Line({
      from: [this.center.x, this.center.y - 10],
      to: [this.center.x, this.center.y + 10],
      strokeColor: 'indianred',
      strokeWidth: 3
    })

    // Mouse cross
    const mouseCrossHor = new paper.Path.Line({
      from: [this.mouse.x - 10, this.mouse.y],
      to: [this.mouse.x + 10, this.mouse.y],
      strokeColor: 'indianred',
      strokeWidth: 3
    })
    const mouseCrossVer = new paper.Path.Line({
      from: [this.mouse.x, this.mouse.y - 10],
      to: [this.mouse.x, this.mouse.y + 10],
      strokeColor: 'indianred',
      strokeWidth: 3
    })
  }
}