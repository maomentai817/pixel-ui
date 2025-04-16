// pixelpanel.worklet.ts

class PixelPanel implements PaintWorklet {
  static get inputProperties(): string[] {
    return [
      '--px-border',
      '--px-border-color',
      '--px-bg-color',
      '--px-corner-size',
      '--px-bg-shadow-color',
      '--px-border-shadow'
    ]
  }

  paint(
    ctx: PaintRenderingContext2D,
    size: { width: number; height: number },
    props: StylePropertyMap
  ): void {
    const border = parseInt(props.get('--px-border')?.toString() ?? '0') || 0
    const borderColor =
      props.get('--px-border-color')?.toString().trim() ?? '#000'
    const bgColor = props.get('--px-bg-color')?.toString().trim() ?? '#fff'
    const cornerSize =
      parseInt(props.get('--px-corner-size')?.toString() ?? '') || border
    const bgShadowColor =
      props.get('--px-bg-shadow-color')?.toString().trim() ?? 'transparent'
    const borderShadow =
      parseInt(props.get('--px-border-shadow')?.toString() ?? '') || border

    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, size.width, size.height)

    if (border <= 0) return

    ctx.beginPath()
    ctx.strokeStyle = borderColor
    ctx.lineWidth = border
    ctx.lineCap = 'butt'

    const halfBorder = border / 2

    // Top
    ctx.moveTo(cornerSize + halfBorder, cornerSize + halfBorder)
    ctx.lineTo(cornerSize + halfBorder, halfBorder)
    ctx.moveTo(cornerSize, halfBorder)
    ctx.lineTo(size.width - cornerSize, halfBorder)
    ctx.moveTo(size.width - cornerSize - halfBorder, halfBorder)
    ctx.lineTo(size.width - cornerSize - halfBorder, cornerSize + halfBorder)

    // Bottom
    ctx.moveTo(cornerSize + halfBorder, size.height - cornerSize - halfBorder)
    ctx.lineTo(cornerSize + halfBorder, size.height - halfBorder)
    ctx.moveTo(cornerSize, size.height - halfBorder)
    ctx.lineTo(size.width - cornerSize, size.height - halfBorder)
    ctx.moveTo(size.width - cornerSize - halfBorder, size.height - halfBorder)
    ctx.lineTo(
      size.width - cornerSize - halfBorder,
      size.height - cornerSize - halfBorder
    )

    // Left
    ctx.moveTo(cornerSize + halfBorder, cornerSize)
    ctx.lineTo(0, cornerSize)
    ctx.moveTo(halfBorder, cornerSize)
    ctx.lineTo(halfBorder, size.height - cornerSize)
    ctx.moveTo(0, size.height - cornerSize)
    ctx.lineTo(cornerSize + halfBorder, size.height - cornerSize)

    // Right
    ctx.moveTo(size.width - cornerSize - halfBorder, cornerSize)
    ctx.lineTo(size.width, cornerSize)
    ctx.moveTo(size.width - halfBorder, cornerSize)
    ctx.lineTo(size.width - halfBorder, size.height - cornerSize)
    ctx.moveTo(size.width, size.height - cornerSize)
    ctx.lineTo(size.width - cornerSize, size.height - cornerSize)

    ctx.stroke()
    ctx.closePath()

    // Shadow
    ctx.fillStyle = bgShadowColor
    ctx.fillRect(
      size.width - border,
      cornerSize + halfBorder,
      borderShadow,
      size.height - cornerSize * 2 - border
    )
    ctx.fillRect(
      cornerSize + border,
      size.height - cornerSize - borderShadow / 2,
      size.width - cornerSize * 2 - border * 2,
      borderShadow / 2
    )

    // Clear corners
    ctx.clearRect(0, 0, cornerSize, cornerSize - halfBorder)
    ctx.clearRect(
      size.width - cornerSize,
      0,
      cornerSize,
      cornerSize - halfBorder
    )
    ctx.clearRect(
      0,
      size.height - cornerSize + halfBorder,
      cornerSize,
      cornerSize - halfBorder
    )
    ctx.clearRect(
      size.width - cornerSize,
      size.height - cornerSize + halfBorder,
      cornerSize,
      cornerSize - halfBorder
    )
  }
}

if (typeof registerPaint !== 'undefined') {
  registerPaint('pixelpanel', PixelPanel)
}
