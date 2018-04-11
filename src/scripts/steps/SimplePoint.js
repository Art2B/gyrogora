import paper from 'paper'

import Step from './../lib/step'

export default class SimplePoint extends Step {
  constructor (project) {
    super(project)
    this.dot = new paper.Point(200, 200)
  }

  onFrame () {
    this.project.clear()
    const line = new paper.Path.Line({
      from: [this.center.x, this.center.y],
      to: [this.mouse.x, this.mouse.y],
      strokeColor: 'white'
    })
    line.fitBounds(this.view.bounds)

    const dot = new paper.Path.Circle({
      center: [this.dot.x, this.dot.y],
      radius: 5,
      fillColor: 'indianred'
    })
  }
}