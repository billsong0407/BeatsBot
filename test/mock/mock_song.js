module.exports = {
    create_song(title, video_url, duration){
        const song = {}
        song.title = title,
        song.url = video_url,
        song.duration = duration
        return song;
    },
};