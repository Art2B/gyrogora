import paper from 'paper'

import Step from './../lib/step'
import config from './../config'

export default class Thanks extends Step {
  onFrame () {
    this.project.clear()
    const yCenterOffset = 100
    const outroTopOptions = {
      ...config.textStyle,
      point: new paper.Point(this.center.x, this.center.y - yCenterOffset),
      content: 'THANK YOU'
    }
    const outroBottomOptions = {
      ...config.textStyle,
      point: new paper.Point(this.center.x, this.center.y + yCenterOffset),
      content: 'QUESTIONS ?'
    }

    const outroTop = new paper.PointText(outroTopOptions)
    const outroBottom = new paper.PointText(outroBottomOptions)
  }
}