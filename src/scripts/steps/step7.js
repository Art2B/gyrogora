import paper from 'paper'

import Step from './../lib/step'
import Dot from './../lib/dot'
import config from './../config'

export default class Step7 extends Step {
  constructor (view) {
    super(view)
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
    project.clear()
    this.generateElements()
  }

  onMouseDown() {
    this.dot.animateFill()
  }

  onFrame () {
    this.line.removeSegments()
    this.line.add(this.center, this.mouse)
    this.line.fitBounds(this.view.bounds)

    this.dot.update(this.center, this.mouse)
    this.dot.draw()
  }
}