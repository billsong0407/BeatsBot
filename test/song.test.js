const { create_song } = require('../utility/song');

test("test song object construction", () => {
    const videoDetails ={
        title: "test",
        video_url: "https://www.test.com",
        lengthSeconds: 100,
        artist: null,
    }
    const song_info = {};
    song_info.videoDetails = videoDetails;
    song = create_song(song_info, "Test123");
    expect(song.title).toBe("test");
    expect(song.url).toBe("https://www.test.com");
    expect(song.duration).toBe(100);
});