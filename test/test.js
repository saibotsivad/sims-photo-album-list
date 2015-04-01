var test = require('tape')
var photoAlbums = require('../')

test('find photo albums', function(t) {
	photoAlbums('./test/Neighborhoods', function(err, albumFiles) {
		t.notOk(err, 'no errors')
		t.ok(albumFiles, 'albums exist')
		t.equal(albumFiles.length, 2, 'there should be two folders')
		t.equal(albumFiles[0].album, 'sample-001.xml', 'should have correct name')
		t.equal(albumFiles[1].album, 'sample-002.xml', 'should have correct name')
		t.end()
	})
})
