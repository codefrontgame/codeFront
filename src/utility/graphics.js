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

/**
 * Draws a circle on the board that is centered around the given x and y coordinates.
 * The circle can vary in size and in resolution.
 * @param sketch p5.js sketch object
 * @param board A representation of the game board, holding its dimensions and
 *                position on the sketch
 * @param centerBoardX The logical center x-position of the circle
 * @param centerBoardY The logical center y-position of the circle
 * @param radius The radius of the circle
 * @param resolution The resolution of the circle (the number of points that will
 *                     describe the circumference)
 */
export function drawCircle (sketch, board, centerBoardX, centerBoardY, radius, resolution) {
  // The number to increase the angle with to get the next point
  let angleStep = Math.PI * 2 / resolution

  let angle = 0
  let points = [{ x: radius, y: 0 }]

  // Generate points for the circumference of the circle
  // with a center in (0,0) and the given radius.
  for (let i = 0; i < resolution - 1; i++) {
    angle += angleStep
    points.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    })
  }

  // Map the points to real positions on the screen
  points = points.map(({ x, y }) => {
    let display = displayCoordinates(
      sketch,
      board,
      x + centerBoardX,
      y + centerBoardY
    )
    return {
      x: display.x,
      y: display.y,
    }
  })

  // Draw lines between the points to for the circle
  sketch.line(
    points[resolution - 1].x,
    points[resolution - 1].y,
    points[0].x,
    points[0].y
  )
  for (let i = 0; i < resolution - 1; i++) {
    sketch.line(
      points[i].x,
      points[i].y,
      points[i + 1].x,
      points[i + 1].y
    )
  }
}
