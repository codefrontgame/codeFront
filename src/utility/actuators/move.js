/**
 * Moves a character based on the result of a move user function
 * @param me A character
 * @param board A game board defining the board boundaries
 * @param ticks How much time that has elapsed since the last update
 * @param result The result from the move user function to base movement on
 *               Currently handles north, east, west, south, rotate and stop
 * @param obstacles Obstacles to consider before moving
 */
function actuate ({ me, board, ticks, result, obstacles }) {
  // make the entity follow the border of the playing field
  let change = 1 * ticks
  let dx = 0
  let dy = 0
  switch (result) {
    case 'rotate':
      if (me.x <= 0 && me.y >= board.yTiles) {
        dx = change
      } else if (me.x <= 0) {
        dy = change
      } else if (me.y >= board.yTiles && me.x >= board.xTiles) {
        dy = -change
      } else if (me.y >= board.yTiles) {
        dx = change
      } else if (me.y <= 0 && me.x >= board.xTiles) {
        dx = -change
      } else if (me.x >= board.xTiles) {
        dy = -change
      } else if (me.y <= 0) {
        dx = -change
      }
      break
    case 'north':
      dy = change
      break
    case 'west':
      dx = -change
      break
    case 'south':
      dy = -change
      break
    case 'east':
      dx = change
      break
  }
  me.move(dx, dy, obstacles, board)
}

export default actuate
