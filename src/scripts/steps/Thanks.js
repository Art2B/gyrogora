import paper from 'paper'

import Step from './../lib/step'
import Dot from './../lib/dot'
import config from './../config'

export default class Thanks extends Step {
  generateElements () {
    this.line = new paper.Path.Line({
      from: [this.center.x, this.center.y],
      to: [0, 0],
      strokeColor: 'white'
    })

    this.dots = []
    for (let i=0; i < config.nbDot; i++) {
      this.dots.push(new Dot(this.center))
    }

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

  reset () {
    this.project.clear()
    this.generateElements()
  }

  onMouseDown() {
    this.dots.forEach(dot => {
      dot.animateFill()
    })
  }

  onFrame () {
    this.renderBackground()
    this.line.removeSegments()
    this.line.add(this.center, this.mouse)
    this.line.fitBounds(this.view.bounds)

    this.dots.forEach(dot => {
      dot.update(this.center, this.mouse)
      dot.draw()
    })
  }
}