class PixelPanel {
  static get inputProperties() {
    return [
      '--px-border',
      '--px-border-color',
      '--px-bg-color',
      '--px-corner-size',
      '--px-bg-shadow-color',
      '--px-border-shadow'
    ]
  }

  paint(ctx, size, props) {
    const border = parseInt(props.get('--px-border')) || 0
    const borderColor = props.get('--px-border-color').toString().trim()
    const bgColor = props.get('--px-bg-color').toString().trim()
    const cornerSize = parseInt(props.get('--px-corner-size')) || border
    const bgShadowColor = props.get('--px-bg-shadow-color').toString().trim()
    const borderShadow = parseInt(props.get('--px-border-shadow')) || border

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

    // 绘制阴影
    ctx.fillStyle = bgShadowColor
    // right
    ctx.fillRect(
      size.width - border,
      cornerSize + halfBorder,
      borderShadow,
      size.height - cornerSize * 2 - border
    )
    // bottom
    ctx.fillRect(
      cornerSize + border,
      size.height - cornerSize - borderShadow / 2,
      size.width - cornerSize * 2 - border * 2,
      borderShadow / 2
    )

    // 清理边角块
    // top-left
    ctx.clearRect(0, 0, cornerSize, cornerSize - halfBorder)
    // top-right
    ctx.clearRect(
      size.width - cornerSize,
      0,
      cornerSize,
      cornerSize - halfBorder
    )
    // bottom-left
    ctx.clearRect(
      0,
      size.height - cornerSize + halfBorder,
      cornerSize,
      cornerSize - halfBorder
    )
    // bottom-right
    ctx.clearRect(
      size.width - cornerSize,
      size.height - cornerSize + halfBorder,
      cornerSize,
      cornerSize - halfBorder
    )
  }
}

registerPaint('pixelpanel', PixelPanel)
