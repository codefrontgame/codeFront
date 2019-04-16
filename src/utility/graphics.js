/**
 * Takes a board coordinate and gives a coordinate on the sketch
 *
 * @param sketch p5.js sketch object
 * @param board A representation of the game board, holding its dimensions and
 *                position on the sketch
 * @param boardX x coordinate
 * @param boardY y coordinate
 * @return {{x: number, y: number, perspective: number}}
 */
export function displayCoordinates (sketch, board, boardX, boardY) {
  // y coordinates progression on the board (in percentage of the board)
  let yBoardPercentage = boardY / board.yTiles

  // How much of the screen the board covers at this y
  let boardCover = board.closeHCover + ((board.farHCover - board.closeHCover) * yBoardPercentage)

  // Transpose x-coordinate
  let sketchX = xWithPerspective(sketch, board, boardX, boardCover)

  // Transpose y-coordinate
  let sketchY = yWithPerspective(sketch, board, boardX, boardY, boardCover, sketchX)

  // Also return the perspective as its needed to resize sprites proportionally
  return { x: sketchX, y: sketchY, perspective: boardCover }
}

/**
 * Transposes the x-coordinate from the board coordinate system to the sketch
 * coordinate system that is tilted and therefore imposes perspective. It does
 * this by knowing the space the board takes up at it's end and beginning and
 * the y-coordinate on the board coordinate system.
 *
 * @param sketch p5.js sketch object
 * @param board A representation of the game board, holding its dimensions and
 *                position on the sketch
 * @param boardX x coordinate
 * @param boardCover the percentage the board covers the sketch at boardY
 * @return {number} the transposed x-coordinate from the board to the sketch
 */
function xWithPerspective (sketch, board, boardX, boardCover) {
  // Fix perspective form the middle by first moving origo to middle of sketch
  let xMiddle = board.xTiles / 2
  let xFromMiddle = boardX - xMiddle
  let xWithPerspective = (xFromMiddle * boardCover + (xMiddle))
  return xWithPerspective * (sketch.width / board.xTiles)
}

/**
 * Transposes the y coordinate from the board coordinate system to the sketch
 * coordinate system that is tilted and therefore imposes perspective. It does this
 * by transposing lines from the board to the sketch and using them to place the
 * points at the correct position. This works because we know how to transpose the
 * x-coordinate at y=0 and y=max from the board system.
 *
 * @param sketch p5.js sketch object
 * @param board A representation of the game board, holding its dimensions and
 *                position on the sketch
 * @param boardX x coordinate
 * @param boardY y coordinate
 * @param boardCover the percentage the board covers the sketch at boardY
 * @param sketchX the transposed x-coordinate from the board to the sketch
 * @return {number} the transposed y-coordinate from the board to the sketch
 */
function yWithPerspective (sketch, board, boardX, boardY, boardCover, sketchX) {
  // Top right point of board
  let boardB = {
    x: board.xTiles,
    y: board.yTiles,
  }

  // Bottom left point of the board transposed on the sketch
  let sketchA = {
    x: sketch.width * (1 - board.closeHCover) / 2,
    y: sketch.height * (1 - board.start),
  }

  // Top right point of the board transposed on the sketch
  let sketchB = {
    x: sketch.width * (1 - (1 - board.farHCover) / 2),
    y: sketch.height * (1 - board.end),
  }

  // The function that should describe the line on which the y-coordinate can be
  // calculated from. It either goes from sketchA or sketchB and through the
  // transposed point. With a transposed x-coordinate a transposed y-coordinate
  // can be calculated.
  let sketchf = (xPos) => {
  }

  if (boardY <= boardX * board.yTiles / board.xTiles) {
    // Side A
    // 1. Draw line from (0,0) to boardXY
    let boardf = (yPos) => yPos * boardX / boardY
    // 2. Transpose point that intersects top line to sketch coordinate system
    let boardTopX = boardf(board.yTiles)
    let sketchTopX = xWithPerspective(sketch, board, boardTopX, board.farHCover)
    // 3. Draw line from sketchA to transposed point
    sketchf = (xPos) => {
      let k = ((sketch.height * (1 - board.end)) - sketchA.y) / (sketchTopX - sketchA.x)
      let m = sketchA.y - sketchA.x * k
      return xPos * k + m
    }
  } else {
    // Side B
    // 1. Draw a line from boardB to boardXY
    let boardf = (yPos) => {
      let k = (board.xTiles - boardX) / (board.yTiles - boardY)
      let m = boardB.x - boardB.y * k
      return yPos * k + m
    }
    // 2. Transpose point that intersects bottom line to sketch coordinate system
    let boardBottomX = boardf(0)
    let sketchBottomX = xWithPerspective(sketch, board, boardBottomX, board.closeHCover)
    // 3. Draw line from sketchB to transposed point
    sketchf = (xPos) => {
      let k = (sketchB.y - (sketch.height * (1 - board.start))) / (sketchB.x - sketchBottomX)
      let m = sketchB.y - sketchB.x * k
      return xPos * k + m
    }
  }
  // 4. Plug in transposed xValue into line function to get transposed yValue
  return sketchf(sketchX)
}

/**
 * Draws a circle on the board that is centered around the given x and y coordinates.
 * The circle can vary in size and in resolution.
 *
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

export function drawLine (sketch, board, p1, p2) {
  let display = displayCoordinates(
    sketch,
    board,
    p1.x,
    p1.y,
  )
  let display2 = displayCoordinates(
    sketch,
    board,
    p2.x,
    p2.y,
  )
  sketch.line(display.x, display.y, display2.x, display2.y)
}

export function drawHitbox (sketch, board, hitbox) {

  sketch.strokeWeight(6)
  sketch.stroke(220, 0, 0, 50)

  drawLine(sketch, board, { x: hitbox.x1, y: hitbox.y1 }, { x: hitbox.x1, y: hitbox.y2 })
  drawLine(sketch, board, { x: hitbox.x1, y: hitbox.y2 }, { x: hitbox.x2, y: hitbox.y2 })
  drawLine(sketch, board, { x: hitbox.x2, y: hitbox.y2 }, { x: hitbox.x2, y: hitbox.y1 })
  drawLine(sketch, board, { x: hitbox.x2, y: hitbox.y1 }, { x: hitbox.x1, y: hitbox.y1 })
}
