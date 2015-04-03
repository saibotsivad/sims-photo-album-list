var listdirs = require('listdirs')
var Promise = require('promise')
var path = require('path')
var fs = require('fs')

var neighborhoodRegex = /N\d{3}$/
var photoAlbumPathName = 'Storytelling'

module.exports = function photoAlbums(neighborhoodRootPath, cb) {
	neighborhoodRootPath = path.normalize(neighborhoodRootPath)

	getNeighborhoodFolders(neighborhoodRootPath, function(err, neighborhoodFolderList) {
		if (err) {
			err.listNeighborhoods = true
			cb(err)
		} else {
			Promise.all(neighborhoodFolderList.map(neighborhoodObject(neighborhoodRootPath)).map(photoAlbumPromise))
				.then(function(photoAlbums) {
					cb(null, photoAlbums.reduce(function(a, b) {
						return a.concat(b)
					}))
				})
		}
	})
}

function getNeighborhoodFolders(folderPath, cb) {
	folderPath = path.normalize(folderPath)
	listdirs(folderPath, function(err, list) {
		if (err) {
			err.listDirs = true
			cb(err)
		} else {
			var filteredFolders = list.map(function(folder) {
				var neighborhoodFolder = folder.match(neighborhoodRegex)
				return neighborhoodFolder && neighborhoodFolder[0]
			}).filter(function(folder) {
				return folder
			})
			cb(null, filteredFolders)
		}
	})
}

function neighborhoodObject(neighborhoodRootPath) {
	return function(neighborhoodFolder) {
		return {
			root: neighborhoodRootPath,
			neighborhood: neighborhoodFolder
		}
	}
}

function photoAlbumPromise(obj) {
	return new Promise(function(resolve, reject) {
		fs.readdir(path.join(obj.root, obj.neighborhood, photoAlbumPathName), function(err, files) {
			if (err) {
				err.readdir = true
				reject(err)
			} else {
				resolve(files.filter(function(file) {
					return file.toLowerCase().indexOf('.xml') === file.length - 4
				}).map(function(filename) {
					return {
						root: obj.root,
						neighborhood: obj.neighborhood,
						album: filename
					}
				}))
			}
		})
	})
}
