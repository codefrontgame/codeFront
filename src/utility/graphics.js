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

  let xMiddle = board.xTiles / 2
  let xFromMiddle = boardX - xMiddle
  let xWithPerspective = (xFromMiddle * boardCover + (xMiddle))
  let x = xWithPerspective * (sketch.width / board.xTiles)
  return { x, y, perspective: boardCover }
}
