import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoID) =>
  new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoID
    console.log("Downloading video: " + videoID)

    ytdl(videoURL, { filter: "audioonly", quality: "lowestaudio" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000
        if (seconds > 60) {
          throw new Error("Video too long")
        }
      })
      .on("end", () => {
        console.log("Download finished")
        resolve()
      })
      .on("error", (error) => {
        console.log("Error: " + error)
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
