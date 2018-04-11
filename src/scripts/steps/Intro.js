import paper from 'paper'

import Step from './../lib/step'

export default class Intro extends Step {
  onFrame () {
    this.project.clear()
    const thankText = new paper.PointText(new paper.Point(this.center.x, 30))
    thankText.fillColor = 'white'
    thankText.justification = 'center'
    thankText.fontSize = '32px'
    thankText.fontFamily = 'Junction'
    thankText.content = 'INTRODUCTION !'
  }
}