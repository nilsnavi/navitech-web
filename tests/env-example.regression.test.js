const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.join(__dirname, '..')

describe('DATABASE_URL / .env.example — regression (Prisma P1012 gap)', () => {
  it('.env.example exists and is non-empty', () => {
    const p = path.join(root, '.env.example')
    assert.ok(fs.existsSync(p), '.env.example must exist')
    const text = fs.readFileSync(p, 'utf8')
    assert.ok(text.trim().length > 0, '.env.example must not be empty')
  })

  it('.env.example declares DATABASE_URL with postgresql scheme', () => {
    const text = fs.readFileSync(path.join(root, '.env.example'), 'utf8')
    assert.match(
      text,
      /^DATABASE_URL=/m,
      'DATABASE_URL assignment required'
    )
    assert.match(
      text,
      /DATABASE_URL=.*postgresql:\/\//,
      'example URL must use postgresql://'
    )
  })

  it('.env.example is not ignored by .gitignore (.env.* exception)', () => {
    const gi = fs.readFileSync(path.join(root, '.gitignore'), 'utf8')
    assert.match(gi, /^\.env\.\*$/m, '.env.* rule expected')
    assert.match(
      gi,
      /^!\.env\.example$/m,
      '!.env.example exception required so the template is tracked'
    )
  })

  it('prisma schema still requires DATABASE_URL via env()', () => {
    const schema = fs.readFileSync(
      path.join(root, 'prisma', 'schema.prisma'),
      'utf8'
    )
    assert.match(
      schema,
      /url\s*=\s*env\("DATABASE_URL"\)/,
      'schema must keep env("DATABASE_URL") — root of P1012 without env'
    )
  })

  it('.env.example does not ship a real secret (placeholder only)', () => {
    const text = fs.readFileSync(path.join(root, '.env.example'), 'utf8')
    // placeholder credentials only
    assert.match(text, /user:password@localhost|USER:PASSWORD@HOST/)
    assert.doesNotMatch(text, /navitech-crm|ASDzxc|sk-|ghp_/)
  })
})
