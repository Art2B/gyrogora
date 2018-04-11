import paper from 'paper'

import Step from './../lib/step'

export default class PointIntersectionLine extends Step {
  constructor (project) {
    super(project)
    this.dot = new paper.Point(200, 200)
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

    const dot = new paper.Path.Circle({
      center: [this.dot.x, this.dot.y],
      radius: 5,
      fillColor: 'indianred'
    })
    const centerCross = new paper.Path.Star({
      center: [this.center.x, this.center.y],
      points: 4,
      radius1: 15,
      radius2: 2,
      fillColor: 'indianred'
    })

    const cpVector = this.center.subtract(this.dot)
    const cmVector = this.center.subtract(this.mouse)
    const ciVector = cmVector.clone()
    ciVector.length = Math.cos((cpVector.getDirectedAngle(cmVector)*-1) * (Math.PI/180)) * cpVector.length
    const iPoint = this.center.subtract(ciVector)

    const iPointCross = new paper.Path.Star({
      center: [iPoint.x, iPoint.y],
      points: 4,
      radius1: 15,
      radius2: 2,
      fillColor: 'indianred'
    })

    const iLine = new paper.Path.Line({
      from: [this.dot.x, this.dot.y],
      to: [iPoint.x, iPoint.y],
      strokeColor: 'white'
    })
  }
}