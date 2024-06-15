export const calculateGrossWPM = (timeMode, cursorPos, salahKetikKelebihan) => {
    const timeMin = timeMode / 60
    const grossWpm = Math.round(((cursorPos + salahKetikKelebihan["count"]) / 4.5) / timeMin)
    return grossWpm
}

// Menghitung wpm dari lama waktu mengetik
export const calculateWPM = (timeMode, cursorPos, salahKetik, salahKetikKelebihan) => {
    // gross wpm = (all typed letters / 4.7) / time 
    // net wpm = gross wpm  -  (uncorrected errors / time)
    const timeMin = timeMode / 60
    const grossWpm = ((cursorPos + salahKetikKelebihan["count"]) / 4.5) / timeMin
    const totalSalahKetik = salahKetik.length + salahKetikKelebihan["count"]
    let netWpm = Math.round(Math.max(0, Math.ceil(grossWpm - (totalSalahKetik / timeMin))))
    return netWpm
  }


export const calculateAccuracy = (cursorPos, salahKetikSemua, salahKetikKelebihan) => {
    // cursorPos - salahKetik - salahKetikKelebihan
    console.log(cursorPos, salahKetikSemua, salahKetikKelebihan["count"])
    const accuracy = Math.round(((cursorPos - salahKetikSemua - salahKetikKelebihan["count"]) / cursorPos) * 100)
    return accuracy
}

export const updateStats = (timeMode, timerSec, cursorPos, salahKetik, salahKetikKelebihan, statsOverTime, setStatsOverTime) => {
    let factor;
    switch(timeMode){
      case "15":
        factor = 1;
        break;
      case "30":
        factor = 1
        break;
      case "60":
        factor = 2
        break;
      case "120":
        factor = 4
        break;
    }

    let countUp = parseInt(timeMode) - timerSec
    if((countUp % factor) == 0){
      const wpm = calculateWPM(countUp, cursorPos ,salahKetik, salahKetikKelebihan)
      const grossWpm = calculateGrossWPM(countUp, cursorPos, salahKetikKelebihan)
      if(statsOverTime.at(-1)[0] != countUp && wpm != NaN && countUp != 0){
        setStatsOverTime(sts => [...sts, [countUp, wpm, grossWpm]])
      }
      console.log(statsOverTime)
    }
  }


// Membuat text sesuai dengan progres tes mengetik
export const generateProgressText = (text, cursorPos, salahKetik, cursor, salahKetikKelebihan, containerWidth) => {
    const progressText = [] 
    let line = []
    let lineLen = 0
    let letterBefore = "a"
    let words = []
    let word = []
    let wordLen = 0
    let textArr = text.split("")
    for(let i = 0; i < cursorPos + 400; i++){
            let letter = textArr[i]
            let formattedSection = []
            let currentLineCounter = 0

            if(i in salahKetikKelebihan){
                formattedSection.push(<span key={i-0.1} className="text-red-500">{salahKetikKelebihan[i]}</span>)
                currentLineCounter += salahKetikKelebihan[i].length
            }

            if(i == cursorPos){
                formattedSection.push(<span key={i-0.2}>{cursor}</span>)
            }

            
            if(salahKetik.includes(i)){
                formattedSection.push(<span key={i-0.3} className="text-red-500">{letter}</span>)
            }else{
                formattedSection.push(<span key={i-0.3} className={`${i < cursorPos && "text-light-blue"}`}>{letter}</span>)
            }
            currentLineCounter += 1
            
            word.push(formattedSection)
            wordLen += currentLineCounter

            if(textArr[i] == " "){
                if(lineLen + wordLen > 52){
                    if(cursorPos < i - wordLen + 1){
                        progressText.push(<div key={i} className="block whitespace-nowrap mb-1 z-20">{words}</div>)
                    }
                        
                    words = []
                    lineLen = 0
                }
                lineLen += wordLen
                words.push(word)
                word = []
                wordLen = 0
            }

        }
    return progressText
}