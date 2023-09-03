export const notFound = (req, res) => {
  const fullUrl = req.baseUrl + req.url
  res.status(404).json({
    error: {
      code: 404,
      message: `There is no such things as ${fullUrl
        .split('/')
        .slice(-1)} in ${fullUrl.split('/').slice(-2)[0]}`
    }
  })
}
