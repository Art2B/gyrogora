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
    // Center cross
    const centerCrossHor = new paper.Path.Line({
      from: [this.center.x - 10, this.center.y],
      to: [this.center.x + 10, this.center.y],
      strokeColor: 'indianred',
      strokeWidth: 3
    })
    const centerCrossVer = new paper.Path.Line({
      from: [this.center.x, this.center.y - 10],
      to: [this.center.x, this.center.y + 10],
      strokeColor: 'indianred',
      strokeWidth: 3
    })

    const cpVector = this.center.subtract(this.dot)
    const cmVector = this.center.subtract(this.mouse)
    const ciVector = cmVector.clone()
    ciVector.length = Math.cos((cpVector.getDirectedAngle(cmVector)*-1) * (Math.PI/180)) * cpVector.length
    const iPoint = this.center.subtract(ciVector)

    // iPoint cross
    const iPointCrossHor = new paper.Path.Line({
      from: [iPoint.x - 10, iPoint.y],
      to: [iPoint.x + 10, iPoint.y],
      strokeColor: 'indianred',
      strokeWidth: 3
    })
    const iPointCrossVer = new paper.Path.Line({
      from: [iPoint.x, iPoint.y - 10],
      to: [iPoint.x, iPoint.y + 10],
      strokeColor: 'indianred',
      strokeWidth: 3
    })

    const iLine = new paper.Path.Line({
      from: [this.dot.x, this.dot.y],
      to: [iPoint.x, iPoint.y],
      strokeColor: 'white'
    })
  }
}