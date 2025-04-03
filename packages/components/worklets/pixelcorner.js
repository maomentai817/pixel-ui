class PixelCorner {
  static get inputProperties() {
    return [
      '--px-border',
      '--px-border-color',
      '--px-bg-color',
      '--px-corner-size'
    ]
  }

  paint(ctx, size, props) {
    const border = parseInt(props.get('--px-border')) || 0
    const borderColor = props.get('--px-border-color').toString().trim()
    const bgColor = props.get('--px-bg-color').toString().trim()
    const cornerSize = parseInt(props.get('--px-corner-size')) || border

    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, size.width, size.height)

    if (border <= 0) return

    // 绘制边框
    ctx.beginPath()
    ctx.strokeStyle = borderColor
    ctx.lineWidth = border
    ctx.lineCap = 'butt'

    const halfBorder = border / 2

    // top line
    ctx.moveTo(cornerSize + halfBorder, cornerSize + halfBorder)
    ctx.lineTo(cornerSize + halfBorder, halfBorder)

    ctx.moveTo(cornerSize, halfBorder)
    ctx.lineTo(size.width - cornerSize, halfBorder)

    ctx.moveTo(size.width - cornerSize - halfBorder, halfBorder)
    ctx.lineTo(size.width - cornerSize - halfBorder, cornerSize + halfBorder)

    // bottom line
    ctx.moveTo(cornerSize + halfBorder, size.height - cornerSize - halfBorder)
    ctx.lineTo(cornerSize + halfBorder, size.height - halfBorder)

    ctx.moveTo(cornerSize, size.height - halfBorder)
    ctx.lineTo(size.width - cornerSize, size.height - halfBorder)

    ctx.moveTo(size.width - cornerSize - halfBorder, size.height - halfBorder)
    ctx.lineTo(
      size.width - cornerSize - halfBorder,
      size.height - cornerSize - halfBorder
    )

    // left line
    ctx.moveTo(cornerSize + halfBorder, cornerSize)
    ctx.lineTo(0, cornerSize)

    ctx.moveTo(halfBorder, cornerSize)
    ctx.lineTo(halfBorder, size.height - cornerSize)

    ctx.moveTo(0, size.height - cornerSize)
    ctx.lineTo(cornerSize + halfBorder, size.height - cornerSize)

    // right line
    ctx.moveTo(size.width - cornerSize - halfBorder, cornerSize)
    ctx.lineTo(size.width, cornerSize)

    ctx.moveTo(size.width - halfBorder, cornerSize)
    ctx.lineTo(size.width - halfBorder, size.height - cornerSize)

    ctx.moveTo(size.width, size.height - cornerSize)
    ctx.lineTo(size.width - cornerSize, size.height - cornerSize)

    ctx.stroke()
    ctx.closePath()
  }
}

registerPaint('pixelcorner', PixelCorner)
