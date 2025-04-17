export class PixelBox {
  static get inputProperties(): string[] {
    return [
      `--px-border`,
      `--px-border-t`,
      `--px-border-r`,
      `--px-border-b`,
      `--px-border-l`,
      `--px-border-radius`,
      `--px-border-radius-lt`,
      `--px-border-radius-rt`,
      `--px-border-radius-lb`,
      `--px-border-radius-rb`,
      `--px-border-color`,
      `--px-bg-color`,
      `--px-bg-shadow-border`,
      `--px-bg-shadow-color`,
      `--px-bg-shadow-position`,
      `--px-button-group-flag`,
      `--px-button-group-first`,
      `--px-button-group-last`,
      `--px-button-single`
    ]
  }

  paint(ctx: PaintRenderingContext2D, size: { width: number; height: number }, props: StylePropertyMap): void {
    const pbBorder = parseInt(props.get(`--px-border`)?.toString() ?? '0') * 2
    const pbBorderRadius = parseInt(props.get(`--px-border-radius`)?.toString() ?? '0')
    const pbBackgroundShadowBorder = parseInt(props.get(`--px-bg-shadow-border`)?.toString() ?? '0') * 2

    const pbBackgroundShadowPosition = props.get(`--px-bg-shadow-position`)?.toString().trim() || ''
    const pbBorderColor = props.get(`--px-border-color`)?.toString().trim() || ''
    const pbBackgroundColor = props.get(`--px-bg-color`)?.toString().trim() || ''
    const pbBackgroundShadowColor = props.get(`--px-bg-shadow-color`)?.toString().trim() || ''

    // button-group border-radius control
    const lt = parseInt(props.get(`--px-border-radius-lt`)?.toString() ?? '0')
    const rt = parseInt(props.get(`--px-border-radius-rt`)?.toString() ?? '0')
    const lb = parseInt(props.get(`--px-border-radius-lb`)?.toString() ?? '0')
    const rb = parseInt(props.get(`--px-border-radius-rb`)?.toString() ?? '0')

    // button-group border-width control
    const pbBorderT = parseInt(props.get(`--px-border-t`)?.toString() ?? '0')
    const pbBorderR = parseInt(props.get(`--px-border-r`)?.toString() ?? '0')
    const pbBorderB = parseInt(props.get(`--px-border-b`)?.toString() ?? '0')
    const pbBorderL = parseInt(props.get(`--px-border-l`)?.toString() ?? '0')

    const buttonGroupFlag = parseInt(props.get(`--px-button-group-flag`)?.toString() ?? '0')
    const buttonGroupFirst = parseInt(props.get(`--px-button-group-first`)?.toString() ?? '0')
    const buttonGroupLast = parseInt(props.get(`--px-button-group-last`)?.toString() ?? '0')
    const buttonSingle = parseInt(props.get(`--px-button-single`)?.toString() ?? '0')

    ctx.fillStyle = pbBackgroundColor

    const startY = pbBorder / 2
    const contentHeight = size.height - pbBorder
    
    // button 整体背景区域
    let startX
    let contentWidth
    if (buttonGroupFlag || buttonGroupLast) {
      startX = 0
      contentWidth = size.width - pbBorder / 2
    } else {
      startX = pbBorder / 2
      contentWidth = size.width - pbBorder
    }
    ctx.fillRect(startX, startY, contentWidth, contentHeight)
    ctx.fill()

    // button 侧边阴影
    if (pbBackgroundShadowBorder != 0) {
      ctx.beginPath()
      ctx.strokeStyle = pbBackgroundShadowColor
      ctx.lineWidth = pbBackgroundShadowBorder / 2

      switch (pbBackgroundShadowPosition) {
        case 'bottom-right':
          /* Bottom Line  */
          ctx.moveTo(
            0,
            size.height -
            pbBorder / 2 -
            pbBackgroundShadowBorder / 2 +
            pbBackgroundShadowBorder / 4
          )
          ctx.lineTo(
            size.width - pbBorder / 2,
            size.height -
            pbBorder / 2 -
            pbBackgroundShadowBorder / 2 +
            pbBackgroundShadowBorder / 4
          )

          /* Right Line */
          ctx.moveTo(
            size.width -
            pbBorder / 2 -
            pbBackgroundShadowBorder / 2 +
            pbBackgroundShadowBorder / 4,
            pbBorder / 2
          )
          ctx.lineTo(
            size.width -
            pbBorder / 2 -
            pbBackgroundShadowBorder / 2 +
            pbBackgroundShadowBorder / 4,
            size.height - pbBorder / 2
          )

          break
        case 'bottom-left':
          /* Bottom Line  */
          ctx.moveTo(
            pbBorder / 2,
            size.height -
            pbBorder / 2 -
            pbBackgroundShadowBorder / 2 +
            pbBackgroundShadowBorder / 4
          )
          ctx.lineTo(
            size.width - pbBorder / 2,
            size.height -
            pbBorder / 2 -
            pbBackgroundShadowBorder / 2 +
            pbBackgroundShadowBorder / 4
          )

          /* Left Line */
          ctx.moveTo(
            (buttonGroupFirst || buttonSingle ? pbBorder / 2 : 0) +
            pbBackgroundShadowBorder / 2 -
            pbBackgroundShadowBorder / 4,
            pbBorder / 2
          )
          ctx.lineTo(
            (buttonGroupFirst || buttonSingle ? pbBorder / 2 : 0) +
            pbBackgroundShadowBorder / 2 -
            pbBackgroundShadowBorder / 4,
            size.height - pbBorder / 2
          )

          break
        case 'top-right':
          /* top Line  */
          ctx.moveTo(
            0,
            pbBorder / 2 +
            pbBackgroundShadowBorder / 2 -
            pbBackgroundShadowBorder / 4
          )
          ctx.lineTo(
            size.width - pbBorder / 2,
            pbBorder / 2 +
            pbBackgroundShadowBorder / 2 -
            pbBackgroundShadowBorder / 4
          )
          /* Right Line */
          ctx.moveTo(
            size.width -
            pbBorder / 2 -
            pbBackgroundShadowBorder / 2 +
            pbBackgroundShadowBorder / 4,
            pbBorder / 2
          )
          ctx.lineTo(
            size.width -
            pbBorder / 2 -
            pbBackgroundShadowBorder / 2 +
            pbBackgroundShadowBorder / 4,
            size.height - pbBorder / 2
          )
          break
        case 'top-left':
          /* top Line  */
          ctx.moveTo(
            0,
            pbBorder / 2 +
            pbBackgroundShadowBorder / 2 -
            pbBackgroundShadowBorder / 4
          )
          ctx.lineTo(
            size.width - pbBorder / 2,
            pbBorder / 2 +
            pbBackgroundShadowBorder / 2 -
            pbBackgroundShadowBorder / 4
          )
          /* Left Line */
          ctx.moveTo(
            (buttonGroupFirst || buttonSingle ? pbBorder / 2 : 0) +
            pbBackgroundShadowBorder / 2 -
            pbBackgroundShadowBorder / 4,
            pbBorder / 2
          )
          ctx.lineTo(
            (buttonGroupFirst || buttonSingle ? pbBorder / 2 : 0) +
            pbBackgroundShadowBorder / 2 -
            pbBackgroundShadowBorder / 4,
            size.height - pbBorder / 2
          )
          break

        default:
          break
      }
      ctx.stroke()
    }

    // button 圆角侧边阴影
    if (pbBorderRadius > 0) {
      if (pbBackgroundShadowBorder != 0) {
        ctx.beginPath()

        ctx.fillStyle = pbBackgroundShadowColor

        for (let i = 1; i <= pbBorderRadius + 1; i++) {
          switch (pbBackgroundShadowPosition) {
            case 'bottom-right':
              ctx.fillRect(
                size.width -
                pbBorder / 2 -
                (pbBorder * (i - 1)) / 2 -
                pbBackgroundShadowBorder / 2,
                size.height -
                (pbBorder * (rb - i + 2)) / 2 -
                pbBackgroundShadowBorder / 2,
                pbBackgroundShadowBorder / 2,
                pbBackgroundShadowBorder / 2
              )
              break
            case 'bottom-left':
              ctx.fillRect(
                (pbBorder * i) / 2,
                size.height -
                (pbBorder * (lb - i + 2)) / 2 -
                pbBackgroundShadowBorder / 2,
                pbBackgroundShadowBorder / 2,
                pbBackgroundShadowBorder / 2
              )
              break
            case 'top-right':
              ctx.fillRect(
                size.width -
                (pbBorder * (rt - i + 2)) / 2 -
                pbBackgroundShadowBorder / 2,
                (pbBorder * i) / 2,
                pbBackgroundShadowBorder / 2,
                pbBackgroundShadowBorder / 2
              )
              break
            case 'top-left':
              ctx.fillRect(
                (pbBorder * (lt - i + 2)) / 2,
                (pbBorder * i) / 2,
                pbBackgroundShadowBorder / 2,
                pbBackgroundShadowBorder / 2
              )
              break

            default:
              break
          }
          ctx.stroke()
        }
      }

      ctx.fillStyle = pbBorderColor

      // button 圆角边框
      for (let i = 1; i <= pbBorderRadius; i++) {
        // LEFT TOP RADIUS
        if (lt) {
          ctx.fillRect(
            (pbBorder * (pbBorderRadius - i + 1)) / 2,
            (pbBorder * i) / 2,
            pbBorder / 2,
            pbBorder / 2
          )
        }

        // RIGHT TOP RADIUS
        if (rt) {
          ctx.fillRect(
            size.width - (pbBorder * (pbBorderRadius - i + 2)) / 2,
            (pbBorder * i) / 2,
            pbBorder / 2,
            pbBorder / 2
          )
        }

        // LEFT BOTTOM RADIUS
        if (lb) {
          ctx.fillRect(
            (pbBorder * i) / 2,
            size.height - (pbBorder * (pbBorderRadius - i + 2)) / 2,
            pbBorder / 2,
            pbBorder / 2
          )
        }

        // RIGHT BOTTOM RADIUS
        if (rb) {
          ctx.fillRect(
            size.width - pbBorder / 2 - (pbBorder * i) / 2,
            size.height - (pbBorder * (pbBorderRadius - i + 2)) / 2,
            pbBorder / 2,
            pbBorder / 2
          )
        }
      }
      ctx.fill()

      // button 圆角边框 - 清理多余背景区块
      for (let i = 0; i <= pbBorderRadius + 1; i++) {
        // LEFT TOP RADIUS
        if (lt) {
          ctx.clearRect(
            0,
            0,
            (pbBorder * (pbBorderRadius - i + 2)) / 2,
            (pbBorder * i) / 2
          )
        }
        // RIGHT TOP RADIUS
        if (rt) {
          ctx.clearRect(
            size.width - (pbBorder * (pbBorderRadius - i + 1)) / 2,
            (pbBorder * i) / 2,
            size.width,
            pbBorder / 2
          )
        }

        // LEFT BOTTOM RADIUS
        if (lb) {
          ctx.clearRect(
            0,
            size.height - (pbBorder * (pbBorderRadius - i + 2)) / 2,
            (pbBorder * i) / 2,
            size.height - (pbBorder * (pbBorderRadius - i)) / 2
          )
        }

        // RIGHT BOTTOM RADIUS
        if (rb) {
          ctx.clearRect(
            size.width - pbBorder / 2 - (pbBorder * i) / 2,
            size.height - (pbBorder * (pbBorderRadius - i + 1)) / 2,
            size.width,
            size.height
          )
        }
      }
    }

    // button border 边框
    const pbRadius = (pbBorderRadius * pbBorder) / 2
    ctx.beginPath()
    /* UP Left */
    ctx.strokeStyle = pbBorderColor
    ctx.lineWidth = pbBorder
    /* UP LINE */
    if (pbBorderT) {
      if (buttonGroupFlag) {
        ctx.moveTo(pbBorderL, 0)
        ctx.lineTo(size.width - pbBorderR, 0)
      } else if (buttonGroupFirst) {
        ctx.moveTo(pbBorder / 2 + pbRadius, 0)
        ctx.lineTo(size.width - pbBorderR, 0)
      } else if (buttonGroupLast) {
        ctx.moveTo(pbBorderL, 0)
        ctx.lineTo(size.width - pbBorder / 2 - pbRadius, 0)
      } else {
        ctx.moveTo(pbBorder / 2 + pbRadius, 0)
        ctx.lineTo(size.width - pbBorder / 2 - pbRadius, 0)
      }
    }

    /* LEFT LINE */
    if (pbBorderL) {
      ctx.moveTo(0, pbBorder / 2 + pbRadius)
      ctx.lineTo(0, size.height - pbBorder / 2 - pbRadius)
    }

    /* Down LINE */
    if (pbBorderB) {
      ctx.moveTo(pbBorder / 2 + pbRadius, size.height)
      ctx.lineTo(size.width - pbBorder / 2 - pbRadius, size.height)
      if (buttonGroupFlag) {
        ctx.moveTo(pbBorderL, size.height)
        ctx.lineTo(size.width - pbBorderR, size.height)
      } else if (buttonGroupFirst) {
        ctx.moveTo(pbBorder / 2 + pbRadius, size.height)
        ctx.lineTo(size.width - pbBorderR, size.height)
      } else if (buttonGroupLast) {
        ctx.moveTo(pbBorderL, size.height)
        ctx.lineTo(size.width - pbBorder / 2 - pbRadius, size.height)
      } else {
        ctx.moveTo(pbBorder / 2 + pbRadius, size.height)
        ctx.lineTo(size.width - pbBorder / 2 - pbRadius, size.height)
      }
    }

    // /* Right LINE */
    if (pbBorderR) {
      ctx.moveTo(size.width, pbBorder / 2 + pbRadius)
      ctx.lineTo(size.width, size.height - pbBorder / 2 - pbRadius)
    }

    ctx.stroke()
    ctx.closePath()
  }
}

// registerPaint('pixelbox', PixelBox)
export function registerPixelBox() {
  if (typeof registerPaint !== 'undefined') {
    registerPaint('pixelbox', PixelBox)
  }
}

registerPixelBox()