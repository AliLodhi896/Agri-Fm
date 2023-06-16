import TrackPlayer from 'react-native-track-player';


module.exports = async function () {

    try {

        await TrackPlayer.updateOptions({
            stopWithApp: true,
            jumpInterval: 5,
            alwaysPauseOnInterruption: true,
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop,
            ],
            compactCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
            ],
            notificationCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.JumpForward,
                Capability.JumpBackward,
            ],
            color: 99410543
        });

        TrackPlayer.addEventListener('remote-play', () => {
            TrackPlayer.play()
        })

        TrackPlayer.addEventListener('remote-pause', () => {
            TrackPlayer.pause()
        });

        TrackPlayer.addEventListener('remote-next', () => {
            TrackPlayer.skipToNext()
        });

        TrackPlayer.addEventListener('remote-previous', () => {
            TrackPlayer.skipToPrevious()
        });

        TrackPlayer.addEventListener('remote-stop', () => {
            TrackPlayer.destroy()
        });
    } catch (error) { console.log(error); }

};