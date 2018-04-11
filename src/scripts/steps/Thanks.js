import paper from 'paper'

import Step from './../lib/step'
import config from './../config'

export default class Thanks extends Step {
  onFrame () {
    this.project.clear()
    this.renderBackground()
    const yCenterOffset = 150
    const outroTopOptions = {
      ...config.textStyle,
      fontSize: '142px',
      point: new paper.Point(this.center.x, this.center.y),
      content: 'THANK YOU'
    }
    const outroTopJokeOptions = {
      ...config.textStyle,
      fontSize: '18px',
      fontWeight: 'normal',
      point: new paper.Point(this.center.x + 450, this.center.y),
      content: '(very much)'
    }

    const outroBottomOptions = {
      ...config.textStyle,
      fontSize: '48px',
      fontWeight: 'normal',
      point: new paper.Point(this.center.x, this.center.y + yCenterOffset),
      content: 'any questions ?'
    }

    const outroTop = new paper.PointText(outroTopOptions)
    const outroTopJoke = new paper.PointText(outroTopJokeOptions)
    const outroBottom = new paper.PointText(outroBottomOptions)
  }
}