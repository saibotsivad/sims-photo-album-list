# sims-photo-album-list

List the Sims 2 photo albums for a neighborhood folder.

## install

Install the normal npm way:

	npm install sims-photo-album-list

## use

Point it at the Sims 2 neighborhood folder to get a list of photo album XML file objects:

	var photoAlbums = require('sims-photo-album-list')
	photoAlbums('/Users/me/Games/Sims2/Neighborhoods', function(err, albumFiles) {
		console.log(albumFiles[0].root) // '/Users/me/Games/Sims2/Neighborhoods'
		console.log(albumFiles[0].neighborhood) // 'N002'
		console.log(albumFiles[0].album) // 'webentry_00000001.xml'
	})

## bugs and requests

If you find a bug or have a request, please file an [issue](https://github.com/tobiaslabs/sims-photo-album-watcher/issues).

## license

Everything in this repository is released under the [VOL](http://veryopenlicense.com)

<3
