/**
 * A GameObject is the basic building block of all things that will be drawn on the Game Board.
 */
import { displayCoordinates } from '../utility/graphics'

export default class GameObject {
  /**
   * Width of drawn object when closest to the screen
   * @type {number}
   */
  size = 70

  /**
   * X-position of the GameObject
   * @type {number}
   */
  x

  /**
   * Y-position of the GameObject
   * @type {number}
   */
  y

  /**
   * The pixel of the image that should be drawn at the exact
   * position that the GameObject is at. These pixels should
   * be percentages from the top left corner of the image.
   * @type {{x: number, y: number}}
   */
  imageAnchor = {
    x: 0,
    y: 0,
  }

  constructor (x, y) {
    this.x = x
    this.y = y
  }

  /**
   * Draws the GameObject on the screen.
   * @param sketch p5js sketch object
   * @param assets the list of assets loaded into the canvas
   * @param board the game board definition
   */
  draw ({ sketch, assets, board }) {
    let img = this.getAsset(assets)
    let coordinates = displayCoordinates(sketch, board, this.x, this.y)

    // Scaling for the image
    let changeFactor = this.size * coordinates.perspective / img.width

    sketch.image(
      img,
      coordinates.x - (img.width * changeFactor * this.imageAnchor.x), // make sure the feet of the character touches the coordinate
      coordinates.y - (img.height * changeFactor * this.imageAnchor.y), // make sure the feet of the character touches the coordinate
      img.width * changeFactor,
      img.height * changeFactor
    )
  }

  /**
   * Used to draw the things that the object places on the ground and therefore
   * should appear under all the other entities' pictures.
   * @param sketch p5js sketch object
   * @param assets the list of assets loaded into the canvas
   * @param board the game board definition
   */
  groundDraw ({ sketch, assets, board }) { }

  /**
   * Used to draw the things that the object places in the air and therefore
   * should appear above all the other entities' pictures.
   * @param sketch p5js sketch object
   * @param assets the list of assets loaded into the canvas
   * @param board the game board definition
   */
  airDraw ({ sketch, assets, board }) { }

  /**
   * Gets the asset to use given the current state of this object.
   */
  getAsset (assets) {
    throw new Error('You have to implement the method: getAsset')
  }

  /**
   * Determines whether the mouse is currently over the Game Object.
   * @param sketch p5js sketch object
   * @param assets the list of assets loaded into the canvas
   * @param board the game board definition
   * @returns {boolean}
   */
  isMouseOver ({ sketch, assets, board }) {
    let img = this.getAsset(assets)
    let coordinates = displayCoordinates(sketch, board, this.x, this.y)

    // Scaling for the image
    let changeFactor = this.size * coordinates.perspective / img.width

    return sketch.mouseX >= coordinates.x - img.width * changeFactor / 2 &&
      sketch.mouseX <= coordinates.x + img.width * changeFactor / 2 &&
      sketch.mouseY >= coordinates.y - (img.height * changeFactor * this.imageAnchor.y) &&
      sketch.mouseY <= coordinates.y + img.height * changeFactor / 2
  }

  /**
   * The paths to the assetPaths for this game object.
   * Should be static.
   * @type {string[]}
   */
  assetPaths
}
