import paper from 'paper'

import Step from './../lib/step'
import Dot from './../lib/dot'
import config from './../config'

export default class Step6 extends Step {
  constructor (project) {
    super(project)
    this.generateElements()
  }

  generateElements () {
    this.dot = new Dot(this.center)

    this.line = new paper.Path.Line({
      from: [this.center.x, this.center.y],
      to: [0, 0],
      strokeColor: 'white'
    })

    this.followPath = this.dot.followPath.clone()
    this.followPath.strokeColor = this.dot.color
  }

  reset () {
    this.project.clear()
    this.generateElements()
  }

  onFrame () {
    this.line.removeSegments()
    this.line.add(this.center, this.mouse)
    this.line.fitBounds(this.view.bounds)

    this.dot.update(this.center, this.mouse)
    this.dot.draw()
  }
}