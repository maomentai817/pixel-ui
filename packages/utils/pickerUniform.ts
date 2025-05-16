interface RGB {
  r: number
  g: number
  b: number
}

interface ImageDataLike {
  data: Uint8ClampedArray
  width: number
  height: number
}

interface SwatchResult {
  mc: RGB
  palette: RGB[]
  info: {
    colors: number
    time: number
  }
}

class Node {
  children: RGB[] = []
  count = 0
}

function _convertPixelsToRGB(pixels: ImageDataLike): RGB[] {
  const { width, height, data } = pixels
  const rgbVals: RGB[] = []

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4
      rgbVals.push({
        r: data[index],
        g: data[index + 1],
        b: data[index + 2]
      })
    }
  }

  return rgbVals
}

export class PickerUniform {
  private redLevel: number
  private greenLevel: number
  private blueLevel: number
  private bucket: Record<string, Node> = {}

  constructor(redLevel = 8, greenLevel = 8, blueLevel = 4) {
    this.redLevel = redLevel
    this.greenLevel = greenLevel
    this.blueLevel = blueLevel
  }

  getSwatch(imgData: ImageDataLike, maxColor = 10): SwatchResult {
    const start = performance.now()
    const rgbArray = _convertPixelsToRGB(imgData)
    this.categorize(rgbArray)
    const swatch = this.quantizeWithoutMinHeap(maxColor)
    const end = performance.now()

    return {
      mc: swatch[0],
      palette: swatch.slice(1),
      info: {
        colors: swatch.length,
        time: end - start
      }
    }
  }

  getSwatchOptimized(imgData: ImageDataLike, maxColor = 10): SwatchResult {
    const start = performance.now()
    const rgbArray = _convertPixelsToRGB(imgData)
    this.categorize(rgbArray)
    const swatch = this.quantizeWithMinHeap(maxColor)
    const end = performance.now()

    return {
      mc: swatch[0],
      palette: swatch.slice(1),
      info: {
        colors: swatch.length,
        time: end - start
      }
    }
  }

  private categorize(rgbArray: RGB[]): void {
    const rd = 256 / this.redLevel
    const gd = 256 / this.greenLevel
    const bd = 256 / this.blueLevel

    for (const { r, g, b } of rgbArray) {
      const rp = Math.floor(r / rd)
      const gp = Math.floor(g / gd)
      const bp = Math.floor(b / bd)
      const index = `${rp}${gp}${bp}`

      if (!this.bucket[index]) {
        this.bucket[index] = new Node()
      }

      this.bucket[index].children.push({ r, g, b })
      this.bucket[index].count++
    }
  }

  private quantizeWithoutMinHeap(maxColor: number): RGB[] {
    const bucketArray = Object.entries(this.bucket).map(([index, node]) => ({
      index,
      ...node
    }))

    bucketArray.sort((a, b) => b.count - a.count)
    const topBuckets = bucketArray.slice(0, maxColor)

    return topBuckets.map((node) => this.averageColor(node.children))
  }

  private quantizeWithMinHeap(maxColor: number): RGB[] {
    const bucketArray: { count: number; children: RGB[] }[] = []

    for (const nodeKey in this.bucket) {
      const node = this.bucket[nodeKey]
      if (bucketArray.length < maxColor) {
        bucketArray.push({ ...node })
        buildMinHeap(bucketArray)
      } else if (node.count > bucketArray[0].count) {
        bucketArray[0] = { ...node }
        heapify(bucketArray, 0, bucketArray.length)
      }
    }

    bucketArray.sort((a, b) => b.count - a.count)
    return bucketArray.map((node) => this.averageColor(node.children))
  }

  private averageColor(colors: RGB[]): RGB {
    const total = colors.reduce(
      (sum, c) => ({
        r: sum.r + c.r,
        g: sum.g + c.g,
        b: sum.b + c.b
      }),
      { r: 0, g: 0, b: 0 }
    )

    const count = colors.length
    return {
      r: Math.round(total.r / count),
      g: Math.round(total.g / count),
      b: Math.round(total.b / count)
    }
  }
}

// ============================
// Heap Utilities (Min Heap)
// ============================

function buildMinHeap(arr: { count: number }[]): void {
  for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
    heapify(arr, i, arr.length)
  }
}

function heapify(
  arr: { count: number }[],
  index: number,
  heapSize: number
): void {
  const left = index * 2 + 1
  const right = index * 2 + 2
  let min = index

  if (left < heapSize && arr[left].count < arr[min].count) {
    min = left
  }

  if (right < heapSize && arr[right].count < arr[min].count) {
    min = right
  }

  if (min !== index) {
    ;[arr[index], arr[min]] = [arr[min], arr[index]]
    heapify(arr, min, heapSize)
  }
}
