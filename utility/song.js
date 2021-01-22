module.exports = {
    create_song(song_info){
        const song = {}
        song.title = song_info.videoDetails.title,
        song.url = song_info.videoDetails.video_url,
        song.duration = song_info.videoDetails.lengthSeconds
        return song;
    },
};