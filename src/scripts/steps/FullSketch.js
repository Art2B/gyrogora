import paper from 'paper'

import Step from './../lib/step'
import Dot from './../lib/dot'
import config from './../config'

export default class FullSketch extends Step {
  constructor (project) {
    super(project)
    this.generateElements()
  }

  generateElements () {
    this.line = new paper.Path.Line({
      from: [this.center.x, this.center.y],
      to: [0, 0],
      strokeColor: 'white'
    })

    this.dots = []
    for (let i=0; i < config.nbDot; i++) {
      this.dots.push(new Dot(this.center))
    }
  }

  reset () {
    project.clear()
    this.generateElements()
  }

  onMouseDown() {
    this.dots.forEach(dot => {
      dot.animateFill()
    })
  }

  onFrame () {
    this.line.removeSegments()
    this.line.add(this.center, this.mouse)
    this.line.fitBounds(this.view.bounds)

    this.dots.forEach(dot => {
      dot.update(this.center, this.mouse)
      dot.draw()
    })
  }
}