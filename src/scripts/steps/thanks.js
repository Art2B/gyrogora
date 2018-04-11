import paper from 'paper'

import Step from './../lib/step'

export default class thanks extends Step {
  onFrame () {
    this.project.clear()
    const thankText = new PointText(new Point(this.center.x, 30))
    thankText.fillColor = 'white'
    thankText.content = 'Merci !'
    thankText.justification = 'center'
    thankText.fontSize = '32px'
    thankText.fontFamily = 'Courier New'

    const questionText = new PointText(new Point(this.center.x, 130))
    questionText.fillColor = 'white'
    questionText.content = 'Des questions ?'
    questionText.justification = 'center'
  }
}