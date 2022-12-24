export function formatTimerElapsed(seconds:number) {
    let minutes = Math.floor(seconds / 60);

    seconds = seconds -= (minutes * 60);

    let secondsString = `${seconds < 10 ? '0'+seconds : seconds}`
    let minutesString = `${minutes < 10 ? '0'+minutes : minutes}`

    return `${minutesString}:${secondsString}`
}