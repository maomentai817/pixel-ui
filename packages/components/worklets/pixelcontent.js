class PixelContent {
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
    const bgColor =
      props.get('--px-bg-color').toString().trim() || 'transparent'
    const cornerSize = parseInt(props.get('--px-corner-size')) || border
    const bgShadowColor = props.get('--px-bg-shadow-color').toString().trim()
    const borderShadow = parseInt(props.get('--px-border-shadow')) || border

    ctx.fillStyle = 'transparent'
    ctx.fillRect(0, 0, size.width, size.height)

    if (border <= 0) return

    // 绘制边框
    ctx.beginPath()
    ctx.strokeStyle = borderColor
    ctx.lineWidth = border
    ctx.lineCap = 'butt'

    const halfBorder = border / 2

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
    ctx.moveTo(halfBorder, 0)
    ctx.lineTo(halfBorder, size.height - cornerSize)

    ctx.moveTo(0, size.height - cornerSize)
    ctx.lineTo(cornerSize + halfBorder, size.height - cornerSize)

    // right line
    ctx.moveTo(size.width - halfBorder, 0)
    ctx.lineTo(size.width - halfBorder, size.height - cornerSize)

    ctx.moveTo(size.width, size.height - cornerSize)
    ctx.lineTo(size.width - cornerSize, size.height - cornerSize)

    // 内层边框
    // left
    ctx.moveTo(cornerSize + halfBorder, cornerSize - halfBorder)
    ctx.lineTo(cornerSize + halfBorder, size.height - cornerSize - halfBorder)
    // right
    ctx.moveTo(size.width - cornerSize - halfBorder, cornerSize - halfBorder)
    ctx.lineTo(
      size.width - cornerSize - halfBorder,
      size.height - cornerSize - halfBorder
    )
    // bottom
    ctx.moveTo(
      cornerSize + halfBorder,
      size.height - borderShadow - halfBorder - border
    )
    ctx.lineTo(
      size.width - cornerSize - halfBorder,
      size.height - borderShadow - halfBorder - border
    )

    ctx.stroke()
    ctx.closePath()

    // 绘制阴影
    ctx.fillStyle = bgShadowColor
    // top
    ctx.fillRect(
      cornerSize + border,
      borderShadow,
      size.width - cornerSize * 2 - border * 2,
      borderShadow
    )
    // right
    ctx.fillRect(
      size.width - cornerSize - border + borderShadow,
      0,
      cornerSize + border - 2 * borderShadow,
      size.height - border * 2
    )
    // left
    ctx.fillRect(
      borderShadow,
      0,
      cornerSize + border - 2 * borderShadow,
      size.height - border * 2
    )
    // bottom
    ctx.fillRect(
      borderShadow,
      size.height - border * 2,
      size.width - 2 * borderShadow,
      borderShadow / 2
    )
    ctx.fillRect(
      cornerSize + borderShadow,
      size.height - 2 * border,
      size.width - 2 * cornerSize - 2 * borderShadow,
      2 * border - borderShadow
    )

    // content 区域填充色
    ctx.fillStyle = bgColor
    ctx.fillRect(
      cornerSize + border,
      2 * borderShadow,
      size.width - 2 * cornerSize - 2 * border,
      size.height - 2 * border - 3 * borderShadow
    )
  }
}

registerPaint('pixelcontent', PixelContent)
