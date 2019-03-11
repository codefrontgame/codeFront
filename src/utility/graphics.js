/**
 * Takes a board coordinate and gives a coordinate on the sketch
 * @param sketch p5.js sketch object
 * @param board A representation of the gameboard, holding its dimensions and position on the sketch
 * @param boardX x coordinate
 * @param boardY y coordinate
 * @return {{x: number, y: number, perspective: number}}
 */
export function displayCoordinates (sketch, board, boardX, boardY) {
  // the size of the board in y direction (in percentage of screen)
  let yBoardSize = board.end - board.start
  // y coordinates progression on the board (in percentage of the board)
  let yBoardPercentage = boardY / board.yTiles
  // y coordinates progression on the board (in percentage of the screen)
  let yPercentage = board.start + (yBoardPercentage * yBoardSize)
  // y in pixels on the screen (reversed coordninate system)
  let y = sketch.height - (sketch.height * yPercentage)

  // How much of the screen the board covers at this y
  let boardCover = board.closeHCover + ((board.farHCover - board.closeHCover) * yBoardPercentage)

  // Fix perspective form the middle by first moving origo to middle of sketch
  let xMiddle = board.xTiles / 2
  let xFromMiddle = boardX - xMiddle
  let xWithPerspective = (xFromMiddle * boardCover + (xMiddle))
  let x = xWithPerspective * (sketch.width / board.xTiles)

  // Also return the perspective as its needed to resize sprites proportionally
  return { x, y, perspective: boardCover }
}
