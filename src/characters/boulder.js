import Obstacle from './obstacle'

class Boulder extends Obstacle {
    update ({ board, ticks }) {}
    draw ({ sketch, assets, board }) {
        let img = assets['zombie']
        let coordinates = displayCoordinates(sketch, board, this.x, this.y)

        let changeFactor = this.size * coordinates.perspective / img.width
        sketch.image(img, coordinates.x - (this.size * coordinates.perspective / 2), coordinates.y -
            (img.height * changeFactor), img.width * changeFactor, img.height * changeFactor)
    }

    static image = 'assets/zombie.png'
}

export default Boulder
