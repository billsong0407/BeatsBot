module.exports = {
    create_song(song_info, author){
        const song = {}
        song.requested_by = author,
        song.title = song_info.videoDetails.title,
        song.artist = song_info.videoDetails.author.name,
        song.view_count = song_info.videoDetails.viewCount,
        song.avg_rating = song_info.videoDetails.averageRating,
        song.url = song_info.videoDetails.video_url,
        song.duration = song_info.videoDetails.lengthSeconds
        // console.log(song_info);
        return song;
    },
};