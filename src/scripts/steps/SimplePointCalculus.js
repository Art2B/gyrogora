import paper from 'paper'

import Step from './../lib/step'
import config from './../config'

export default class SimplePointCalculus extends Step {
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

    // Display calculus
    const xPosText = 1000
    const cpVector = this.center.subtract(this.dot)
    const cmVector = this.center.subtract(this.mouse)
    const ciVector = cmVector.clone()

    // Formula
    const formulaY = 240
    const formulaEgual = new paper.PointText({
      ...config.textStyle,
      justification: 'left',
      fontSize: '24px',
      content: `cos(A) = `,
      point: new paper.Point(xPosText, formulaY)
    })
    const formulaTop = new paper.PointText({
      ...config.textStyle,
      fontSize: '24px',
      content: 'adjacent',
      point: new paper.Point(xPosText + 190, formulaY - 20)
    })
    const formulaDivide = new paper.PointText({
      ...config.textStyle,
      fontSize: '24px',
      content: `__________`,
      point: new paper.Point(xPosText + 190, formulaY -10)
    })
    const formulaBottom = new paper.PointText({
      ...config.textStyle,
      fontSize: '24px',
      content: 'hypotenuse',
      point: new paper.Point(xPosText + 190, formulaY + 20)
    })

    // Formula with case value
    const formulaCaseY = 320
    const formulaCaseXoffset = 200
    const formulaCaseEgual = new paper.PointText({
      ...config.textStyle,
      justification: 'left',
      fontSize: '24px',
      content: `cos(PCI) = `,
      point: new paper.Point(xPosText, formulaCaseY)
    })
    const formulaCaseTop = new paper.PointText({
      ...config.textStyle,
      fontSize: '24px',
      content: 'CI',
      point: new paper.Point(xPosText + formulaCaseXoffset, formulaCaseY - 20)
    })
    const formulaCaseDivide = new paper.PointText({
      ...config.textStyle,
      fontSize: '24px',
      content: `__________`,
      point: new paper.Point(xPosText + formulaCaseXoffset, formulaCaseY -10)
    })
    const formulaCaseBottom = new paper.PointText({
      ...config.textStyle,
      fontSize: '24px',
      content: 'CP',
      point: new paper.Point(xPosText + formulaCaseXoffset, formulaCaseY + 20)
    })

    // Formula with case value
    const formulaCaseAdjY = 400
    const formulaCaseAdjEgual = new paper.PointText({
      ...config.textStyle,
      justification: 'left',
      fontSize: '24px',
      content: `CI = cos(PCI) * CP`,
      point: new paper.Point(xPosText, formulaCaseAdjY)
    })

    const formulaCaseAdjWithValuesY = 440
    const formulaCaseAdjWithValuesEgual = new paper.PointText({
      ...config.textStyle,
      justification: 'left',
      fontSize: '24px',
      content: `CI = ${Math.cos((cpVector.getDirectedAngle(cmVector)*-1))} * ${cpVector.length}`,
      point: new paper.Point(xPosText, formulaCaseAdjWithValuesY)
    })

    const CIValueYoffset = 480
    const CILengthValue = new paper.PointText({
      ...config.textStyle,
      justification: 'left',
      fontSize: '24px',
      content: `CI = ${Math.cos((cpVector.getDirectedAngle(cmVector)*-1)) * cpVector.length}`,
      point: new paper.Point(xPosText, CIValueYoffset)
    })
  }
}