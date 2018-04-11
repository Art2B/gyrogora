import paper from 'paper'

import Step from './../lib/step'

export default class PointOnEllipse extends Step {
  constructor (project) {
    super(project)
    this.dot = new paper.Point(window.innerWidth/2, window.innerHeight/2).multiply(paper.Point.random())
    this.originalDot = this.dot.clone()
  }

  onFrame () {
    this.project.clear()
    this.renderBackground()
    const line = new paper.Path.Line({
      from: [this.center.x, this.center.y],
      to: [this.mouse.x, this.mouse.y],
      strokeColor: 'white'
    })
    line.fitBounds(this.view.bounds)

    this.followPath = new paper.Path.Ellipse({
      center: [this.center.x, this.center.y],
      radius: [(this.originalDot.x - (window.innerWidth/2)), (this.originalDot.y - (window.innerHeight/2))],
      strokeColor: 'pink'
    })
    this.dot = this.followPath.getPointAt(10)

    const dot = new paper.Path.Circle({
      center: [this.dot.x, this.dot.y],
      radius: 5,
      fillColor: 'indianred'
    })

    const cpVector = this.center.subtract(this.dot)
    const cmVector = this.center.subtract(this.mouse)
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