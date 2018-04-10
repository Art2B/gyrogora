import paper from 'paper'

import Step from './../lib/step'

export default class Step2 extends Step {
  draw (mouse) {
    const line = new paper.Path.Line({
      from: [this.center.x, this.center.y],
      to: [mouse.x, mouse.y],
      strokeColor: 'white'
    })
  }
}