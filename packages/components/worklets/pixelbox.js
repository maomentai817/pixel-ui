
class pixelBox {
  static get inputProperties() {
    return [
      `--px-border`,
      `--px-border-radius`,
      `--px-border-color`,
      `--px-bg-color`,
      `--px-bg-shadow-border`,
      `--px-bg-shadow-color`,
      `--px-bg-shadow-position`,
    ];
  }

  paint(ctx, size, props) {
    const pbBorder = parseInt(props.get(`--px-border`)) * 2;
    const pbBorderRadius = parseInt(props.get(`--px-border-radius`));
    const pbBackgroundShadowBorder =
      parseInt(props.get(`--px-bg-shadow-border`)) * 2;

    const pbBackgroundShadowPosition = props
      .get(`--px-bg-shadow-position`)
      .toString()
      .trim();

    const pbBorderColor = props
      .get(`--px-border-color`)
      .toString()
      .trim();
    const pbBackgroundColor = props
      .get(`--px-bg-color`)
      .toString()
      .trim();
    const pbBackgroundShadowColor = props
      .get(`--px-bg-shadow-color`)
      .toString()
      .trim();

    ctx.fillStyle = pbBackgroundColor;

    ctx.fillRect(
      pbBorder / 2,
      pbBorder / 2,
      size.width - pbBorder,
      size.height - pbBorder
    );
    ctx.fill();

    if (pbBackgroundShadowBorder != 0) {
      ctx.beginPath();
      ctx.strokeStyle = pbBackgroundShadowColor;
      ctx.lineWidth = pbBackgroundShadowBorder / 2;

      switch (pbBackgroundShadowPosition) {
        case "bottom-right":
          /* Bottom Line  */
          ctx.moveTo(
            pbBorder / 2,
            size.height -
            pbBorder / 2 -
            pbBackgroundShadowBorder / 2 +
            pbBackgroundShadowBorder / 4
          );
          ctx.lineTo(
            size.width - pbBorder / 2,
            size.height -
            pbBorder / 2 -
            pbBackgroundShadowBorder / 2 +
            pbBackgroundShadowBorder / 4
          );

          /* Right Line */
          ctx.moveTo(
            size.width -
            pbBorder / 2 -
            pbBackgroundShadowBorder / 2 +
            pbBackgroundShadowBorder / 4,
            pbBorder / 2
          );
          ctx.lineTo(
            size.width -
            pbBorder / 2 -
            pbBackgroundShadowBorder / 2 +
            pbBackgroundShadowBorder / 4,
            size.height - pbBorder / 2
          );

          break;
        case "bottom-left":
          /* Bottom Line  */
          ctx.moveTo(
            pbBorder / 2,
            size.height -
            pbBorder / 2 -
            pbBackgroundShadowBorder / 2 +
            pbBackgroundShadowBorder / 4
          );
          ctx.lineTo(
            size.width - pbBorder / 2,
            size.height -
            pbBorder / 2 -
            pbBackgroundShadowBorder / 2 +
            pbBackgroundShadowBorder / 4
          );

          /* Left Line */
          ctx.moveTo(
            pbBorder / 2 +
            pbBackgroundShadowBorder / 2 -
            pbBackgroundShadowBorder / 4,
            pbBorder / 2
          );
          ctx.lineTo(
            pbBorder / 2 +
            pbBackgroundShadowBorder / 2 -
            pbBackgroundShadowBorder / 4,
            size.height - pbBorder / 2
          );

          break;
        case "top-right":
          /* top Line  */
          ctx.moveTo(
            pbBorder / 2,
            pbBorder / 2 +
            pbBackgroundShadowBorder / 2 -
            pbBackgroundShadowBorder / 4
          );
          ctx.lineTo(
            size.width - pbBorder / 2,
            pbBorder / 2 +
            pbBackgroundShadowBorder / 2 -
            pbBackgroundShadowBorder / 4
          );
          /* Right Line */
          ctx.moveTo(
            size.width -
            pbBorder / 2 -
            pbBackgroundShadowBorder / 2 +
            pbBackgroundShadowBorder / 4,
            pbBorder / 2
          );
          ctx.lineTo(
            size.width -
            pbBorder / 2 -
            pbBackgroundShadowBorder / 2 +
            pbBackgroundShadowBorder / 4,
            size.height - pbBorder / 2
          );
          break;
        case "top-left":
          /* top Line  */
          ctx.moveTo(
            pbBorder / 2,
            pbBorder / 2 +
            pbBackgroundShadowBorder / 2 -
            pbBackgroundShadowBorder / 4
          );
          ctx.lineTo(
            size.width - pbBorder / 2,
            pbBorder / 2 +
            pbBackgroundShadowBorder / 2 -
            pbBackgroundShadowBorder / 4
          );
          /* Left Line */
          ctx.moveTo(
            pbBorder / 2 +
            pbBackgroundShadowBorder / 2 -
            pbBackgroundShadowBorder / 4,
            pbBorder / 2
          );
          ctx.lineTo(
            pbBorder / 2 +
            pbBackgroundShadowBorder / 2 -
            pbBackgroundShadowBorder / 4,
            size.height - pbBorder / 2
          );
          break;

        default:
          break;
      }
      ctx.stroke();
    }
    if (pbBorderRadius > 0) {
      if (pbBackgroundShadowBorder != 0) {
        ctx.beginPath();

        ctx.fillStyle = pbBackgroundShadowColor;

        for (var i = 1; i <= pbBorderRadius + 1; i++) {
          switch (pbBackgroundShadowPosition) {
            case "bottom-right":
              ctx.fillRect(
                size.width -
                pbBorder / 2 -
                (pbBorder * (i - 1)) / 2 -
                pbBackgroundShadowBorder / 2,
                size.height -
                (pbBorder * (pbBorderRadius - i + 2)) / 2 -
                pbBackgroundShadowBorder / 2,
                pbBackgroundShadowBorder / 2,
                pbBackgroundShadowBorder / 2
              );
              break;
            case "bottom-left":
              ctx.fillRect(
                (pbBorder * i) / 2,
                size.height -
                (pbBorder * (pbBorderRadius - i + 2)) / 2 -
                pbBackgroundShadowBorder / 2,
                pbBackgroundShadowBorder / 2,
                pbBackgroundShadowBorder / 2
              );
              break;
            case "top-right":
              ctx.fillRect(
                size.width -
                (pbBorder * (pbBorderRadius - i + 2)) / 2 -
                pbBackgroundShadowBorder / 2,
                (pbBorder * i) / 2,
                pbBackgroundShadowBorder / 2,
                pbBackgroundShadowBorder / 2
              );
              break;
            case "top-left":
              ctx.fillRect(
                (pbBorder * (pbBorderRadius - i + 2)) / 2,
                (pbBorder * i) / 2,
                pbBackgroundShadowBorder / 2,
                pbBackgroundShadowBorder / 2
              );
              break;

            default:
              break;
          }
          ctx.stroke();
        }
      }

      ctx.fillStyle = pbBorderColor;

      for (var i = 1; i <= pbBorderRadius; i++) {
        // LEFT TOP RADIUS
        ctx.fillRect(
          (pbBorder * (pbBorderRadius - i + 1)) / 2,
          (pbBorder * i) / 2,
          pbBorder / 2,
          pbBorder / 2
        );

        // RIGHT TOP RADIUS
        ctx.fillRect(
          size.width - (pbBorder * (pbBorderRadius - i + 2)) / 2,
          (pbBorder * i) / 2,
          pbBorder / 2,
          pbBorder / 2
        );

        // LEFT BOTTOM RADIUS
        ctx.fillRect(
          (pbBorder * i) / 2,
          size.height - (pbBorder * (pbBorderRadius - i + 2)) / 2,
          pbBorder / 2,
          pbBorder / 2
        );

        // RIGHT BOTTOM RADIUS
        ctx.fillRect(
          size.width - pbBorder / 2 - (pbBorder * i) / 2,
          size.height - (pbBorder * (pbBorderRadius - i + 2)) / 2,
          pbBorder / 2,
          pbBorder / 2
        );
      }
      ctx.fill();

      // CLEAR
      for (var i = 0; i <= pbBorderRadius + 1; i++) {
        // LEFT TOP RADIUS
        ctx.clearRect(
          0,
          0,
          (pbBorder * (pbBorderRadius - i + 2)) / 2,
          (pbBorder * i) / 2
        );
        // RIGHT TOP RADIUS
        ctx.clearRect(
          size.width - (pbBorder * (pbBorderRadius - i + 1)) / 2,
          (pbBorder * i) / 2,
          size.width,
          pbBorder / 2
        );

        // LEFT BOTTOM RADIUS
        ctx.clearRect(
          0,
          size.height - (pbBorder * (pbBorderRadius - i + 2)) / 2,
          (pbBorder * i) / 2,
          size.height - (pbBorder * (pbBorderRadius - i)) / 2
        );

        // RIGHT BOTTOM RADIUS
        ctx.clearRect(
          size.width - pbBorder / 2 - (pbBorder * i) / 2,
          size.height - (pbBorder * (pbBorderRadius - i + 1)) / 2,
          size.width,
          size.height
        );
      }
    }

    const pbRadius = (pbBorderRadius * pbBorder) / 2;
    ctx.beginPath();
    /* UP Left */
    ctx.strokeStyle = pbBorderColor;
    ctx.lineWidth = pbBorder;

    /* UP LINE */
    ctx.moveTo(pbBorder / 2 + pbRadius, 0);
    ctx.lineTo(size.width - pbBorder / 2 - pbRadius, 0);

    /* LEFT LINE */
    ctx.moveTo(0, pbBorder / 2 + pbRadius);
    ctx.lineTo(0, size.height - pbBorder / 2 - pbRadius);

    /* Down LINE */
    ctx.moveTo(pbBorder / 2 + pbRadius, size.height);
    ctx.lineTo(size.width - pbBorder / 2 - pbRadius, size.height);

    /* Right LINE */
    ctx.moveTo(size.width, pbBorder / 2 + pbRadius);
    ctx.lineTo(size.width, size.height - pbBorder / 2 - pbRadius);

    ctx.stroke();
    ctx.closePath();
  }
}

registerPaint("pixelbox", pixelBox);