import {DB} from '#data-access/fpotify.js'
import express from 'express'

const fpotify = express.Router()

fpotify.get('/artists', (req, res) => {
  const artists = DB(res.locals.seed).artists(1, 10)
  res.json(artists)
})
fpotify.get('/artists/:id', (req, res) => {
  const artist = DB(res.locals.seed).artist(req.params.id)
  res.json(artist)
})
fpotify.get('/artists/:id/albums', (req, res) => {
  const artist = DB(res.locals.seed).artist(req.params.id)
  const albums = DB(res.locals.seed).albums(1, 5, artist)
  res.json(albums)
})
fpotify.get('/artists/:artistId/albums/:albumId', (req, res) => {
  const artist = DB(res.locals.seed).artist(req.params.artistId)
  const albums = DB(res.locals.seed).album(req.params.albumId, artist)
  res.json(albums)
})
fpotify.get(
  '/artists/:artistId/albums/:albumId/tracks',
  (req, res) => {
    const artist = DB(res.locals.seed).artist(req.params.artistId)
    const album = DB(res.locals.seed).album(
      req.params.albumId,
      artist
    )
    const tracks = DB(res.locals.seed).tracks(1, 12, album, artist)
    res.json(tracks)
  }
)

export {fpotify}
