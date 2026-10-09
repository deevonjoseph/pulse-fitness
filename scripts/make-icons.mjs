// Dependency-free PWA icon generator for PULSE.
// Rasterizes a heartbeat mark onto a rounded-square tile and writes real
// PNGs (zlib + CRC32 written by hand) so no image toolchain is required.
import { deflateSync } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'icons')
mkdirSync(outDir, { recursive: true })

const BG = [10, 10, 12]
const VOLT = [215, 255, 62]

const crcTable = (() => {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c >>> 0
  }
  return table
})()

function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const typeBuf = Buffer.from(type, 'ascii')
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])))
  return Buffer.concat([len, typeBuf, data, crc])
}

function encodePNG(width, height, rgba) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8
  ihdr[9] = 6
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0
  const raw = Buffer.alloc((width * 4 + 1) * height)
  for (let y = 0; y < height; y++) {
    const row = y * (width * 4 + 1)
    raw[row] = 0
    for (let x = 0; x < width * 4; x++) raw[row + 1 + x] = rgba[y * width * 4 + x]
  }
  const idat = deflateSync(raw, { level: 9 })
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v))
}

function roundedRectSDF(x, y, cx, cy, hw, hh, r) {
  const qx = Math.abs(x - cx) - (hw - r)
  const qy = Math.abs(y - cy) - (hh - r)
  return (
    Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r
  )
}

function distToSeg(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1
  const dy = y2 - y1
  const len2 = dx * dx + dy * dy
  let t = len2 === 0 ? 0 : ((px - x1) * dx + (py - y1) * dy) / len2
  t = Math.max(0, Math.min(1, t))
  const ex = x1 + t * dx - px
  const ey = y1 + t * dy - py
  return Math.hypot(ex, ey)
}

function distToPath(px, py, pts) {
  let d = Infinity
  for (let i = 0; i < pts.length - 1; i++) {
    d = Math.min(
      d,
      distToSeg(px, py, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]),
    )
  }
  return d
}

function heartPoints(size, markScale) {
  return [
    [0.08, 0.5],
    [0.22, 0.5],
    [0.28, 0.5],
    [0.35, 0.2],
    [0.42, 0.8],
    [0.47, 0.5],
    [0.6, 0.5],
    [0.655, 0.36],
    [0.71, 0.62],
    [0.77, 0.5],
    [0.92, 0.5],
  ].map(([x, y]) => [
    size * (0.5 + (x - 0.5) * markScale),
    size * (0.5 + (y - 0.5) * markScale),
  ])
}

function render(size, { maskable = false, radiusFrac = 0.23, markScale = 1, padFrac = 0.06 } = {}) {
  const rgba = Buffer.alloc(size * size * 4)
  const c = size / 2
  const pad = size * padFrac
  const hw = (size - pad * 2) / 2
  const r = maskable ? 0 : size * radiusFrac
  const stroke = size * 0.045
  const pts = heartPoints(size, markScale)

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4
      let bgCover
      if (maskable) {
        bgCover = 1
      } else {
        bgCover = clamp01(0.5 - roundedRectSDF(x + 0.5, y + 0.5, c, c, hw, hw, r))
      }
      if (bgCover <= 0) continue
      const dMark = distToPath(x + 0.5, y + 0.5, pts)
      const lineCover = clamp01(0.5 - (dMark - stroke / 2))
      const rr = BG[0] + (VOLT[0] - BG[0]) * lineCover
      const gg = BG[1] + (VOLT[1] - BG[1]) * lineCover
      const bb = BG[2] + (VOLT[2] - BG[2]) * lineCover
      rgba[i] = Math.round(rr)
      rgba[i + 1] = Math.round(gg)
      rgba[i + 2] = Math.round(bb)
      rgba[i + 3] = Math.round(Math.max(bgCover, lineCover) * 255)
    }
  }
  return encodePNG(size, size, rgba)
}

const files = [
  ['icon-192.png', render(192, {})],
  ['icon-512.png', render(512, {})],
  [
    'maskable-512.png',
    render(512, { maskable: true, markScale: 0.7, padFrac: 0.14 }),
  ],
  ['apple-touch-icon.png', render(180, { radiusFrac: 0.2 })],
]

for (const [name, buf] of files) {
  writeFileSync(join(outDir, name), buf)
  console.log(`wrote ${name} (${buf.length} bytes)`)
}