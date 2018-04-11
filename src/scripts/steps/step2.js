import paper from 'paper'

import Step from './../lib/step'

export default class Step2 extends Step {
  onFrame () {
    this.project.clear()
    const line = new paper.Path.Line({
      from: [this.center.x, this.center.y],
      to: [this.mouse.x, this.mouse.y],
      strokeColor: 'white'
    })
    line.fitBounds(this.view.bounds)
  }
}