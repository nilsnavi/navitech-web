const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

describe('pages/index.js — health discoverability', () => {
  it('home page mentions /api/health', () => {
    const src = fs.readFileSync(
      path.join(__dirname, '..', 'pages', 'index.js'),
      'utf8'
    )
    assert.match(src, /health:\s*\/api\/health/)
  })
})
