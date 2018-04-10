import paper from 'paper'

import Step from './../lib/step'
import config from './../config'

export default class Step6 extends Step {
  constructor (view) {
    super(view)
    this.originalDot = new paper.Point(window.innerWidth/2, window.innerHeight/2).multiply(paper.Point.random())
    const followPath = new paper.Path.Ellipse({
      center: [this.center.x, this.center.y],
      radius: [(this.originalDot.x - (window.innerWidth/2)), (this.originalDot.y - (window.innerHeight/2))]
    })
    this.dot = followPath.getPointAt(Math.random() * (followPath.length))
  }

  draw (mouse) {
    const line = new paper.Path.Line({
      from: [this.center.x, this.center.y],
      to: [mouse.x, mouse.y],
      strokeColor: 'white'
    })
    line.fitBounds(this.view.bounds)

    const followPath = new paper.Path.Ellipse({
      center: [this.center.x, this.center.y],
      radius: [(this.originalDot.x - (window.innerWidth/2)), (this.originalDot.y - (window.innerHeight/2))],
      strokeColor: 'pink'
    })

    let step = followPath.length / config.fullTurnDuration
    let offset = followPath.getOffsetOf(this.dot)
    offset += step
    if (offset > followPath.length) {
      offset = 0
    }
    this.dot = followPath.getPointAt(offset)

    const dot = new paper.Path.Circle({
      center: [this.dot.x, this.dot.y],
      radius: 5,
      fillColor: 'indianred'
    })

    const cpVector = this.center.subtract(this.dot)
    const cmVector = this.center.subtract(mouse)
    const ciVector = cmVector.clone()
    ciVector.length = Math.cos((cpVector.getDirectedAngle(cmVector)*-1) * (Math.PI/180)) * cpVector.length
    const iPoint = this.center.subtract(ciVector)

    const iLine = new paper.Path.Line({
      from: [this.dot.x, this.dot.y],
      to: [iPoint.x, iPoint.y],
      strokeColor: 'white'
    })
  }
}