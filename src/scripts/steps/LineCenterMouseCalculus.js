import paper from 'paper'

import Step from './../lib/step'
import config from './../config'

function getFormulas (a, b, c) {
  const max = Math.max(a, b, c)
  let formulas

  if (max === a) {
    formulas = {
      angle: 'CAM',
      topFormula: 'AM² + CM²- AC²',
      topResult: `${Math.pow(b, 2)} + ${Math.pow(c, 2)} - ${Math.pow(a, 2)}`,
      bottomFormula: '2 * AM * CM',
      bottomResult: `2 * ${b} * ${c}`
    }
    formulas.result = (Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c)
  } else if (max === b) {
    formulas = {
      angle: 'ACM',
      topFormula: 'AM² + AC²- CM²',
      topResult: `${Math.pow(a, 2)} + ${Math.pow(c, 2)} - ${Math.pow(b, 2)}`,
      bottomFormula: '2 * AC * AM',
      bottomResult: `2 * ${a} * ${c}`
    }
    formulas.result = (Math.pow(a, 2) + Math.pow(c, 2) - Math.pow(b, 2)) / (2 * a * c)
  } else if (max === c) {
    formulas = {
      angle: 'AMC',
      topFormula: 'AC² + CM²- AM²',
      topResult: `${Math.pow(a, 2)} + ${Math.pow(b, 2)} - ${Math.pow(c, 2)}`,
      bottomFormula: '2 * AC * CM',
      bottomResult: `2 * ${a} * ${b}`
    }
    formulas.result = (Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b)
  }

  if (formulas.result > 1) {
    formulas.result = 1
  } else if (formulas.result < -1) {
    formulas.result = -1
  }
  formulas.result = Math.acos(formulas.result) * 180 / Math.PI

  return formulas
}

export default class LineCenterMouseCalculus extends Step {
  onFrame () {
    this.project.clear()
    this.renderBackground()
    const line = new paper.Path.Line({
      from: [this.center.x, this.center.y],
      to: [this.mouse.x, this.mouse.y],
      strokeColor: 'white'
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

    // Mouse cross
    const mouseCrossHor = new paper.Path.Line({
      from: [this.mouse.x - 10, this.mouse.y],
      to: [this.mouse.x + 10, this.mouse.y],
      strokeColor: 'indianred',
      strokeWidth: 3
    })
    const mouseCrossVer = new paper.Path.Line({
      from: [this.mouse.x, this.mouse.y - 10],
      to: [this.mouse.x, this.mouse.y + 10],
      strokeColor: 'indianred',
      strokeWidth: 3
    })

    const xPosText = config.xPositionText
    const AC = this.center.x
    const CM = Math.floor(Math.sqrt(Math.pow(this.center.x - this.mouse.x, 2) + Math.pow(this.center.y - this.mouse.y, 2)))
    const AM = Math.floor(Math.sqrt(Math.pow(0 - this.mouse.x, 2) + Math.pow(this.center.y - this.mouse.y, 2)))
    const formulas = getFormulas(AC, CM, AM)

    // calculus about angles
    const aText = new paper.PointText({
      ...config.textStyle,
      justification: 'left',
      fontSize: '24px',
      content: `A (0, ${this.center.y})`,
      point: new paper.Point(xPosText, 100)
    })
    const centerText = new paper.PointText({
      ...config.textStyle,
      justification: 'left',
      fontSize: '24px',
      content: `Center (${this.center.x}, ${this.center.y})`,
      point: new paper.Point(xPosText, 130)
    })
    const mouseText = new paper.PointText({
      ...config.textStyle,
      justification: 'left',
      fontSize: '24px',
      content: `Mouse (${this.mouse.x}, ${this.mouse.y})`,
      point: new paper.Point(xPosText, 160)
    })

    // First step formula
    const formulaY = 240
    const formulaX = 250
    const formulaEgual = new paper.PointText({
      ...config.textStyle,
      justification: 'left',
      fontSize: '24px',
      content: `${formulas.angle} = arcos`,
      point: new paper.Point(xPosText, formulaY)
    })
    const formulaTop = new paper.PointText({
      ...config.textStyle,
      fontSize: '24px',
      content: formulas.topFormula,
      point: new paper.Point(xPosText + formulaX, formulaY - 20)
    })
    const formulaDivide = new paper.PointText({
      ...config.textStyle,
      fontSize: '24px',
      content: `____________`,
      point: new paper.Point(xPosText + formulaX, formulaY -10)
    })
    const formulaBottom = new paper.PointText({
      ...config.textStyle,
      fontSize: '24px',
      content: formulas.bottomFormula,
      point: new paper.Point(xPosText + formulaX, formulaY + 20)
    })

    // Second step formula
    const secondFormulaY = formulaY + 100
    const secondFormulaX = 330
    const formulaEgualReplaced = new paper.PointText({
      ...config.textStyle,
      justification: 'left',
      fontSize: '24px',
      content: `${formulas.angle} = arcos`,
      point: new paper.Point(xPosText, secondFormulaY)
    })
    const formulaTopReplaced = new paper.PointText({
      ...config.textStyle,
      fontSize: '24px',
      content: formulas.topResult,
      point: new paper.Point(xPosText + secondFormulaX, secondFormulaY-20)
    })
    const formulaDivideReplaced = new paper.PointText({
      ...config.textStyle,
      fontSize: '24px',
      content: `____________`,
      point: new paper.Point(xPosText + secondFormulaX, secondFormulaY-10)
    })
    const formulaBottomReplaced = new paper.PointText({
      ...config.textStyle,
      fontSize: '24px',
      content: formulas.bottomResult,
      point: new paper.Point(xPosText + secondFormulaX, secondFormulaY+20)
    })

    // Formula resolved
    const thirdFormulaY = secondFormulaY + 70
    const formulaEgualResolved = new paper.PointText({
      ...config.textStyle,
      justification: 'left',
      fontSize: '24px',
      content: `${formulas.angle} = ${formulas.result.toFixed(2)}°`,
      point: new paper.Point(xPosText, thirdFormulaY)
    })
  }
}