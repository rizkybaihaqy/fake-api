import express from "express";

const fpotify = express.Router();

fpotify.get("/artists", (req, res) => {
  const artists = res.locals.DB.artists;
  res.json(artists);
});
fpotify.get("/artists/:id", (req, res) => {
  const id = req.params.id;
  const artist = res.locals.DB.artists.find((artist) => artist.id === id);
  res.json(artist);
});
fpotify.get("/artists/:id/tracks", (req, res) => {
  const id = req.params.id;
  const tracks = res.locals.DB.tracks.filter((track) => track.artists.includes(id));
  res.json(tracks);
});
fpotify.get("/artists/:id/albums", (req, res) => {
  const id = req.params.id;
  const albums = res.locals.DB.albums.filter((album) => album.artists.includes(id));
  res.json(albums);
});
fpotify.get("/artists/:artistId/albums/:albumId", (req, res) => {
  const artistId = req.params.artistId;
  const albumId = req.params.albumId;
  const album = res.locals.DB.albums.find(
    (album) => album.artists.includes(artistId) && album.id === albumId
  );
  const artists = album.artists.map((id) => {
    const artist = res.locals.DB.artists.find((artist) => artist.id === id);
    return artist;
  });
  res.json({ ...album, artists: artists });
});
fpotify.get("/artists/:id/albums/:albumId/tracks", (req, res) => {
  const id = req.params.id;
  const albumId = req.params.albumId;
  const tracks = res.locals.DB.tracks.filter(
    (track) => track.album === albumId && track.artists.includes(id)
  );
  res.json(tracks);
});
fpotify.get("/artists/:artistId/albums/:albumId/tracks/:trackId", (req, res) => {
  const artistId = req.params.artistId;
  const albumId = req.params.albumId;
  const trackId = req.params.trackId;
  const track = res.locals.DB.tracks.find(
    (track) =>
      track.album === albumId &&
      track.artists.includes(artistId) &&
      track.id === trackId
  );
  const artists = track.artists.map((id) => {
    const artist = res.locals.DB.artists.find((artist) => artist.id === id);
    return artist;
  });
  const album = res.locals.DB.albums.find((album) => album.id === track.album);
  res.json({ ...track, artists: artists, album: album });
});

export { fpotify };
