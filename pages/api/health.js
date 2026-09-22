export default function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD')
    return res.status(405).json({ status: 'error', error: 'method_not_allowed' })
  }

  res.status(200).json({
    status: 'ok',
    service: 'navitech-web',
  })
}
