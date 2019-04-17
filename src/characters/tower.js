import Entity from './entity'
import { drawCircle } from '../utility/graphics'

export default class Tower extends Entity {
  isAttacker = false

  update ({ ticks, board, level, obstacles, entities }) {
    let dist = (x1, y1, x2, y2) => {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    }
    entities.filter((e) => e.isAttacker).forEach((e) => {
      if (e === this) return
      if (dist(e.x, e.y, this.x, this.y) <= this.damageRange) {
        e.takeDamage({ dmg: this.attackDamage * ticks })
      }
    })
  }

  groundDraw ({ sketch, assets, board }) {
    super.draw({ sketch, assets, board })

    if (this.isMouseOver({ sketch, assets, board })) {
      sketch.strokeWeight(6)
      sketch.stroke(220, 0, 0, 50)
      drawCircle(sketch, board, this.x, this.y, this.damageRange, 1000)
    }
  }
}
