import { TweenMax, TimelineMax } from "gsap"
import paper from 'paper'
import randomColor from 'randomcolor'

export default class Dot {
  constructor (center) {
    this.point = new paper.Point(window.innerWidth/2, window.innerHeight/2).multiply(Point.random())
    this.color = randomColor()
    this.thickness = Math.random() * (3 - 0.1) + 0.1

    this.iPoint = new paper.Point(0, 0)

    this.followPath = new paper.Path.Ellipse({
      center: center,
      radius: [(this.point.x - (window.innerWidth/2)), (this.point.y - (window.innerHeight/2))]
    })

    this.point = this.followPath.getPointAt(Math.random() * (this.followPath.length))

    // Point and circles
    this.dotToLine = new paper.Path.Line({x: 0, y: 0}, {x: 0, y: 0})
    this.dotToLine.strokeWidth = this.thickness
    this.dotToLine.strokeColor = 'white'

    this.fillingDotToLine = this.dotToLine.clone()
    this.fillingDotToLine.strokeWidth = this.thickness
    this.fillingDotToLine.strokeColor = this.color

    this.fillingProgress = 0

    this.dotCircle = new paper.Path.Circle(this.point, this.thickness)
    this.dotCircle.fillColor = this.color
  }
  update (center, mouse) {
    const cpVector = center.subtract(this.point)
    const cmVector = center.subtract(mouse)
    const ciVector = cmVector.clone()
    ciVector.length = Math.cos((cpVector.getDirectedAngle(cmVector)*-1) * (Math.PI/180)) * cpVector.length

    this.iPoint = center.subtract(ciVector)

    let step = this.followPath.length / (3600 * 2)
    let offset = this.followPath.getOffsetOf(this.point)
    offset += step
    if (offset > this.followPath.length) {
      offset = 0
    }
    const newPosition = this.followPath.getPointAt(offset)
    this.point = newPosition.clone()
  }

  drawLine () {
    this.dotCircle.remove()
    this.dotCircle = new paper.Path.Circle(this.point, this.thickness)
    this.dotCircle.fillColor = this.color

    this.dotToLine.removeSegments()
    this.dotToLine.add(this.point, this.iPoint)

    this.fillingDotToLine.removeSegments()
    this.fillingDotToLine.add(this.point)

    const point = this.dotToLine.getLocationAt(this.dotToLine.length * this.fillingProgress)
    this.fillingDotToLine.add(point)
  }

  animateFill () {
    TweenMax.to(this, 1, {
      fillingProgress: 1,
      onComplete: event => {
        const tl = new TimelineMax({ delay: 2 })
        tl.to(this.fillingDotToLine, 1, { strokeWidth: 0 })
        tl.set(this, { fillingProgress: 0 })
        tl.set(this.fillingDotToLine, { strokeWidth: this.thickness })
      }
    })
  }

  draw () {
    this.drawLine()
  }
} 