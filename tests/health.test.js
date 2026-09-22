const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const health = require('../pages/api/health.js').default

function mockRes() {
  return {
    statusCode: null,
    headers: {},
    body: null,
    setHeader(k, v) {
      this.headers[k] = v
    },
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.body = payload
      return this
    },
  }
}

describe('GET/HEAD /api/health — main scenario', () => {
  it('GET returns 200 with status ok and service navitech-web', () => {
    const res = mockRes()
    health({ method: 'GET' }, res)
    assert.equal(res.statusCode, 200)
    assert.deepEqual(res.body, { status: 'ok', service: 'navitech-web' })
  })

  it('HEAD returns 200 with the same payload shape', () => {
    const res = mockRes()
    health({ method: 'HEAD' }, res)
    assert.equal(res.statusCode, 200)
    assert.deepEqual(res.body, { status: 'ok', service: 'navitech-web' })
  })
})

describe('/api/health — edge cases', () => {
  it('POST is rejected with 405 and Allow GET, HEAD', () => {
    const res = mockRes()
    health({ method: 'POST' }, res)
    assert.equal(res.statusCode, 405)
    assert.equal(res.headers.Allow, 'GET, HEAD')
    assert.deepEqual(res.body, {
      status: 'error',
      error: 'method_not_allowed',
    })
  })

  it('PUT is rejected with 405', () => {
    const res = mockRes()
    health({ method: 'PUT' }, res)
    assert.equal(res.statusCode, 405)
    assert.equal(res.body.error, 'method_not_allowed')
  })

  it('DELETE is rejected with 405', () => {
    const res = mockRes()
    health({ method: 'DELETE' }, res)
    assert.equal(res.statusCode, 405)
  })

  it('unknown method is rejected with 405', () => {
    const res = mockRes()
    health({ method: 'TRACE' }, res)
    assert.equal(res.statusCode, 405)
    assert.equal(res.headers.Allow, 'GET, HEAD')
  })

  it('missing method is treated as not allowed', () => {
    const res = mockRes()
    health({}, res)
    assert.equal(res.statusCode, 405)
    assert.deepEqual(res.body, {
      status: 'error',
      error: 'method_not_allowed',
    })
  })
})
