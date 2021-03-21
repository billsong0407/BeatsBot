const { create_song } = require('../utility/song');

describe("test song object constuction", () => {
    const videoDetails ={
        title: "test",
        video_url: "https://www.test.com",
        lengthSeconds: 100,
        artist: null,
        viewCount: 10,
        averageRating: 9,
        author: {
            name: "bot123",
        },
    }
    test("Functional test #1", () => {
        const song_info = {};
        song_info.videoDetails = videoDetails;
        song = create_song(song_info, "Test123");
        expect(song.title).toBe("test");
        expect(song.url).toBe("https://www.test.com");
        expect(song.duration).toBe(100);
    });

    test("Functional test #2", () => {
        const song_info = {};
        song_info.videoDetails = videoDetails;
        song = create_song(song_info, "Test123");
        expect(song.artist).toBe("bot123");
        expect(song.requested_by).toBe("Test123");
        expect(song.view_count).toBe(10);
    });
});
