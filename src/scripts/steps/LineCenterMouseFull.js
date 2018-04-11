import paper from 'paper'

import Step from './../lib/step'

export default class LineCenterMouseFull extends Step {
  onFrame () {
    this.project.clear()
    this.renderBackground()
    const line = new paper.Path.Line({
      from: [this.center.x, this.center.y],
      to: [this.mouse.x, this.mouse.y],
      strokeColor: 'white'
    })
    line.fitBounds(this.view.bounds)

    const centerCross = new paper.Path.Star({
      center: [this.center.x, this.center.y],
      points: 4,
      radius1: 15,
      radius2: 2,
      fillColor: 'indianred'
    })
    const mouseCross = new paper.Path.Star({
      center: [this.mouse.x, this.mouse.y],
      points: 4,
      radius1: 15,
      radius2: 2,
      fillColor: 'indianred'
    })
  }
}