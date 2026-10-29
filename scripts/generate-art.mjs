// Generates the local SVG exhibit illustrations + a shared placeholder.
// Run with: npm run generate:art
// Output: public/assets/exhibits/*.svg
//
// The art is intentionally abstract and consistent (warm neutral palette,
// a pedestal, and a category emblem) so every card looks cohesive and no
// network images are required. The <img> element's alt text carries the
// accessible description; the SVG itself is decorative.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const exhibits = JSON.parse(fs.readFileSync(path.join(root, 'src/data/exhibits.json'), 'utf8'))
const outDir = path.join(root, 'public/assets/exhibits')
fs.mkdirSync(outDir, { recursive: true })

// Two shades per category so exhibits within a category vary slightly.
const palette = {
  Antiquities: ['#b5853f', '#9c6f33'],
  Paintings: ['#3f5a7d', '#6b3f5a'],
  'Natural History': ['#4f7a4a', '#7a6a3a'],
  'Science & Technology': ['#3a6b7a', '#2f7a6a'],
}

function antiquity(cx, cy, s, color) {
  const pillars = 5
  const w = 26 * s
  const gap = 10 * s
  const total = pillars * w + (pillars - 1) * gap
  const startX = cx - total / 2
  let f = ''
  f += `<rect x="${cx - total / 2 - 10 * s}" y="${cy + 66 * s}" width="${total + 20 * s}" height="${10 * s}" fill="${color}" opacity="0.92"/>`
  f += `<rect x="${cx - total / 2 - 10 * s}" y="${cy - 76 * s}" width="${total + 20 * s}" height="${12 * s}" fill="${color}" opacity="0.92"/>`
  for (let i = 0; i < pillars; i += 1) {
    const x = startX + i * (w + gap)
    f += `<rect x="${x}" y="${cy - 64 * s}" width="${w}" height="${130 * s}" fill="${color}" opacity="0.85"/>`
  }
  return f
}

function painting(cx, cy, s, color) {
  const w = 180 * s
  const h = 120 * s
  const x = cx - w / 2
  const y = cy - h / 2
  let f = ''
  f += `<rect x="${x - 12 * s}" y="${y - 12 * s}" width="${w + 24 * s}" height="${h + 24 * s}" rx="6" fill="#caa46a"/>`
  f += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f3ead6"/>`
  f += `<circle cx="${x + w * 0.3}" cy="${y + h * 0.34}" r="${18 * s}" fill="${color}"/>`
  f += `<rect x="${x}" y="${y + h * 0.58}" width="${w}" height="${h * 0.42}" fill="${color}" opacity="0.5"/>`
  f += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#b8975f" stroke-width="${2 * s}"/>`
  return f
}

function ammonite(cx, cy, s, color) {
  let f = `<g>`
  for (let i = 0; i < 6; i += 1) {
    const r = 74 * s - i * 11 * s
    f += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${3 * s}" opacity="${0.92 - i * 0.1}"/>`
  }
  for (let a = 0; a < 12; a += 1) {
    const ang = (a * Math.PI) / 6
    f += `<line x1="${cx + Math.cos(ang) * 16 * s}" y1="${cy + Math.sin(ang) * 16 * s}" x2="${cx + Math.cos(ang) * 70 * s}" y2="${cy + Math.sin(ang) * 70 * s}" stroke="${color}" stroke-width="${2 * s}" opacity="0.4"/>`
  }
  f += `</g>`
  return f
}

function gear(cx, cy, s, color) {
  const R = 70 * s
  const teeth = 12
  const toothH = 14 * s
  let f = `<g>`
  f += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${color}" opacity="0.88"/>`
  for (let i = 0; i < teeth; i += 1) {
    const deg = (i * 360) / teeth
    f += `<rect x="${cx - 6 * s}" y="${cy - R - toothH}" width="${12 * s}" height="${toothH}" fill="${color}" transform="rotate(${deg} ${cx} ${cy})"/>`
  }
  f += `</g>`
  f += `<circle cx="${cx}" cy="${cy}" r="${18 * s}" fill="#f3ead6"/>`
  f += `<circle cx="${cx}" cy="${cy}" r="${6 * s}" fill="${color}"/>`
  return f
}

function emblemFor(category, cx, cy, s, color) {
  switch (category) {
    case 'Antiquities': return antiquity(cx, cy, s, color)
    case 'Paintings': return painting(cx, cy, s, color)
    case 'Natural History': return ammonite(cx, cy, s, color)
    case 'Science & Technology': return gear(cx, cy, s, color)
    default: return `<circle cx="${cx}" cy="${cy}" r="${70 * s}" fill="${color}"/>`
  }
}

function svgForExhibit(exhibit, index) {
  const shades = palette[exhibit.category] || ['#a6743b', '#8a5a2a']
  const color = shades[index % shades.length]
  const cx = 400
  const cy = 285
  const s = 1
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#efe6d6"/>
      <stop offset="1" stop-color="#e2d4bd"/>
    </linearGradient>
    <radialGradient id="spot" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#fffaf0" stop-opacity="0.65"/>
      <stop offset="1" stop-color="#fffaf0" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <ellipse cx="400" cy="300" rx="290" ry="215" fill="url(#spot)"/>
  ${emblemFor(exhibit.category, cx, cy, s, color)}
  <ellipse cx="400" cy="434" rx="165" ry="22" fill="#dccaa6"/>
  <rect x="248" y="432" width="304" height="22" rx="7" fill="#c9b79a"/>
  <rect x="20" y="20" width="760" height="560" rx="10" fill="none" stroke="#cbb89a" stroke-width="3"/>
</svg>
`
}

function placeholder() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="pbg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#efe6d6"/>
      <stop offset="1" stop-color="#e2d4bd"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#pbg)"/>
  <rect x="20" y="20" width="760" height="560" rx="10" fill="none" stroke="#cbb89a" stroke-width="3"/>
  <circle cx="400" cy="270" r="78" fill="#a6743b"/>
  <text x="400" y="270" font-family="Georgia, serif" font-size="80" fill="#fff8ee" text-anchor="middle" dominant-baseline="central">A</text>
  <text x="400" y="380" font-family="Georgia, serif" font-size="30" fill="#56493a" text-anchor="middle">Aurelia Museum</text>
  <text x="400" y="416" font-family="-apple-system, Segoe UI, Roboto, sans-serif" font-size="16" fill="#897c6c" text-anchor="middle">Exhibit illustration</text>
</svg>
`
}

let count = 0
exhibits.forEach((exhibit, index) => {
  const file = path.join(outDir, `${exhibit.image}.svg`)
  fs.writeFileSync(file, svgForExhibit(exhibit, index).trim() + '\n')
  count += 1
})
fs.writeFileSync(path.join(outDir, 'placeholder.svg'), placeholder().trim() + '\n')

console.log(`Generated ${count} exhibit illustrations + placeholder in ${path.relative(root, outDir)}`)
