import { TweenMax, TimelineMax } from "gsap"
import paper from 'paper'
import randomColor from 'randomcolor'

import config from './../config'

export default class Dot {
  /**
   * [constructor create new Dot]
   * @param  {paper.Point} center center of screen
   */
  constructor (center, options = {}) {
    this.point = new paper.Point(window.innerWidth/2, window.innerHeight/2).multiply(paper.Point.random())
    this.color = options.color ? options.color : randomColor()
    this.thickness = options.thickness ? options.thickness : Math.random() * (3 - 0.1) + 0.1

    this.iPoint = new paper.Point(0, 0)

    this.followPath = new paper.Path.Ellipse({
      center: [center.x, center.y],
      radius: [(this.point.x - (window.innerWidth/2)), (this.point.y - (window.innerHeight/2))]
    })

    this.point = this.followPath.getPointAt(Math.random() * (this.followPath.length))

    // Point and circles
    this.dotToLine = new paper.Path.Line({
      from: [0, 0],
      to: [0, 0],
      strokeWidth: this.thickness,
      strokeColor: 'white'
    })

    this.fillingDotToLine = this.dotToLine.clone()
    this.fillingDotToLine.strokeColor = this.color
    this.fillingProgress = 0

    this.dotCircle = this.getDotCircle(this.point, this.thickness, this.color)
  }

  getDotCircle (center, thickness, color) {
    return new paper.Path.Circle({
      center: [center.x, center.y],
      radius: thickness,
      fillColor: color
    })
  }

  /**
   * [update position of dot and lines]
   * @param  {paper.Point} center - Center of screen
   * @param  {paper.Point} mouse - Position of the mouse
   */
  update (center, mouse) {
    const cpVector = center.subtract(this.point)
    const cmVector = center.subtract(mouse)
    const ciVector = cmVector.clone()
    ciVector.length = Math.cos((cpVector.getDirectedAngle(cmVector)*-1) * (Math.PI/180)) * cpVector.length

    this.iPoint = center.subtract(ciVector)

    let step = this.followPath.length / config.fullTurnDuration
    let offset = this.followPath.getOffsetOf(this.point)
    offset += step
    if (offset > this.followPath.length) {
      offset = 0
    }
    const newPosition = this.followPath.getPointAt(offset)
    this.point = newPosition.clone()
  }

  /**
   * [animateFill animate the line filling effect from dot to center line]
   */
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

  /**
   * [draw Draw dot with lines]
   */
  draw () {
    this.dotCircle.remove()
    this.dotCircle = this.getDotCircle(this.point, this.thickness, this.color)

    this.dotToLine.removeSegments()
    this.dotToLine.add(this.point, this.iPoint)

    this.fillingDotToLine.removeSegments()
    this.fillingDotToLine.add(this.point)

    const point = this.dotToLine.getLocationAt(this.dotToLine.length * this.fillingProgress)
    this.fillingDotToLine.add(point)
  }
} 