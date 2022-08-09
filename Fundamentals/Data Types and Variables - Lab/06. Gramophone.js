function solve(band, album, song) {
    let rotates = Math.ceil((album.length * band.length * song.length) / 2 / 2.5);
    console.log(`The plate was rotated ${rotates} times.`);
}
