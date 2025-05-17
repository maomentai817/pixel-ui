const getInt = (
  props: StylePropertyMap,
  name: string,
  fallback = 0
): number => {
  return parseInt(props.get(name)?.toString() ?? `${fallback}`)
}

const getStr = (
  props: StylePropertyMap,
  name: string,
  fallback = ''
): string => {
  return props.get(name)?.toString().trim() ?? fallback
}

const PIXEL_BOX_PROPS = [
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
export class PixelBox {
  static get inputProperties(): string[] {
    return PIXEL_BOX_PROPS
  }

  paint(
    ctx: PaintRenderingContext2D,
    size: { width: number; height: number },
    props: StylePropertyMap
  ): void {
    const pbBorder = getInt(props, '--px-border') * 2

    let pbBorderRadius = getInt(props, '--px-border-radius')

    const pbBackgroundShadowBorder = getInt(props, '--px-bg-shadow-border') * 2

    const pbBackgroundShadowPosition = getStr(props, '--px-bg-shadow-position')

    const pbBorderColor = getStr(props, '--px-border-color')

    const pbBackgroundColor = getStr(props, '--px-bg-color')

    const pbBackgroundShadowColor = getStr(props, '--px-bg-shadow-color')

    // button-group border-radius control
    const lt = getInt(props, '--px-border-radius-lt')
    const rt = getInt(props, '--px-border-radius-rt')
    const lb = getInt(props, '--px-border-radius-lb')
    const rb = getInt(props, '--px-border-radius-rb')

    // button-group border-width control
    const pbBorderT = getInt(props, '--px-border-t')
    const pbBorderR = getInt(props, '--px-border-r')
    const pbBorderB = getInt(props, '--px-border-b')
    const pbBorderL = getInt(props, '--px-border-l')

    const buttonGroupFlag = getInt(props, '--px-button-group-flag')
    const buttonGroupFirst = getInt(props, '--px-button-group-first')
    const buttonGroupLast = getInt(props, '--px-button-group-last')
    const buttonSingle = getInt(props, '--px-button-single')

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

      if (pbBorderRadius > 2 && Math.floor(size.height) <= 40) {
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
                pbBorder -
                pbBackgroundShadowBorder / 2 +
                pbBackgroundShadowBorder / 4,
              pbBorder / 2
            )
            ctx.lineTo(
              size.width -
                pbBorder -
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
              (buttonGroupFirst || buttonSingle ? pbBorder : 0) +
                pbBackgroundShadowBorder / 2 -
                pbBackgroundShadowBorder / 4,
              pbBorder / 2
            )
            ctx.lineTo(
              (buttonGroupFirst || buttonSingle ? pbBorder : 0) +
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
                pbBorder -
                pbBackgroundShadowBorder / 2 +
                pbBackgroundShadowBorder / 4,
              pbBorder / 2
            )
            ctx.lineTo(
              size.width -
                pbBorder -
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
              (buttonGroupFirst || buttonSingle ? pbBorder : 0) +
                pbBackgroundShadowBorder / 2 -
                pbBackgroundShadowBorder / 4,
              pbBorder / 2
            )
            ctx.lineTo(
              (buttonGroupFirst || buttonSingle ? pbBorder : 0) +
                pbBackgroundShadowBorder / 2 -
                pbBackgroundShadowBorder / 4,
              size.height - pbBorder / 2
            )
            break
          default:
            break
        }
      } else {
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
      }
      ctx.stroke()
    }

    // button 圆角侧边阴影
    if (pbBorderRadius > 0) {
      if (pbBackgroundShadowBorder != 0) {
        ctx.beginPath()

        ctx.fillStyle = pbBackgroundShadowColor

        if (pbBorderRadius > 2) {
          pbBorderRadius = 4
          for (let i = 1; i <= 4; i++) {
            const offset = Math.floor((i + 1) / 2)
            const offsetYR = offset === 1 ? 2 : i
            const offsetXR = i === pbBorderRadius ? 3 : i
            switch (pbBackgroundShadowPosition) {
              case 'bottom-right':
                ctx.fillRect(
                  size.width -
                    pbBorder / 2 -
                    (pbBorder * (offsetYR - 1)) / 2 -
                    pbBackgroundShadowBorder / 2,
                  size.height -
                    (pbBorder * (rb - offsetXR)) / 2 -
                    pbBackgroundShadowBorder / 2,
                  pbBackgroundShadowBorder / 2,
                  pbBackgroundShadowBorder / 2
                )
                break
              case 'bottom-left':
                ctx.fillRect(
                  (pbBorder * offsetYR) / 2,
                  size.height -
                    (pbBorder * (lb - offsetXR)) / 2 -
                    pbBackgroundShadowBorder / 2,
                  pbBackgroundShadowBorder / 2,
                  pbBackgroundShadowBorder / 2
                )
                break
              case 'top-right':
                ctx.fillRect(
                  size.width -
                    (pbBorder * (rt - offsetXR)) / 2 -
                    pbBackgroundShadowBorder / 2,
                  (pbBorder * offsetYR) / 2,
                  pbBackgroundShadowBorder / 2,
                  pbBackgroundShadowBorder / 2
                )
                break
              case 'top-left':
                ctx.fillRect(
                  (pbBorder * (lt - offsetXR)) / 2,
                  (pbBorder * offsetYR) / 2,
                  pbBackgroundShadowBorder / 2,
                  pbBackgroundShadowBorder / 2
                )
                break
              default:
                break
            }
            ctx.stroke()
          }
        } else {
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
      }

      ctx.fillStyle = pbBorderColor

      // 圆角边框
      if (pbBorderRadius > 2) {
        pbBorderRadius = 4
        for (let i = 0; i < 5; i++) {
          const ltXFactor = i < pbBorderRadius ? pbBorderRadius - i : 1
          const rtXFactor = i < pbBorderRadius ? pbBorderRadius - i + 1 : 2
          const lbXFactor = i > 0 ? i : 1
          const rbXFactor = i < 2 ? 1 : i
          const yFactor = i < 2 ? 1 : i

          const ltX = (pbBorder * ltXFactor) / 2
          const rtX = size.width - (pbBorder * rtXFactor) / 2
          const lbX = (pbBorder * lbXFactor) / 2
          const rbX = size.width - pbBorder / 2 - (pbBorder * rbXFactor) / 2
          const y = (pbBorder * yFactor) / 2
          const bottomY = size.height - (pbBorder * rtXFactor) / 2

          if (lt) ctx.fillRect(ltX, y, pbBorder / 2, pbBorder / 2)
          if (rt) ctx.fillRect(rtX, y, pbBorder / 2, pbBorder / 2)
          if (lb) ctx.fillRect(lbX, bottomY, pbBorder / 2, pbBorder / 2)
          if (rb) ctx.fillRect(rbX, bottomY, pbBorder / 2, pbBorder / 2)
        }
        ctx.fill()
        // button 圆角边框 - 清理多余背景区块
        for (let i = 1; i <= 5; i++) {
          // LEFT TOP RADIUS
          if (lt) {
            ctx.clearRect(
              0,
              0,
              (pbBorder * (pbBorderRadius - i + 1)) / 2,
              (pbBorder * i) / 2
            )
          }
          // RIGHT TOP RADIUS
          if (rt) {
            ctx.clearRect(
              size.width - (pbBorder * (pbBorderRadius - i)) / 2,
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
              (pbBorder * (i - 1)) / 2,
              size.height - (pbBorder * (pbBorderRadius - i)) / 2
            )
          }
          // RIGHT BOTTOM RADIUS
          if (rb) {
            ctx.clearRect(
              size.width - pbBorder / 2 - (pbBorder * (i - 1)) / 2,
              size.height - (pbBorder * (pbBorderRadius - i + 1)) / 2,
              size.width,
              size.height
            )
          }
        }
      } else {
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
