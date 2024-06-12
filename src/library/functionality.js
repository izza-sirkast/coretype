// Menghitung wpm dari lama waktu mengetik
export const calculateWPM = (timerSec, textArr, salahKetik, salahKetikKelebihan) => {
    // gross wpm = (all typed letters / 4.7) / time 
    // net wpm = gross wpm  -  (uncorrected errors / time)
    const timeMin = timerSec / 60
    const grossWpm = (textArr.length / 4.7) / timeMin
    const totalSalahKetik = salahKetik.length + salahKetikKelebihan["count"]
    let netWpm = Math.max(0, Math.ceil(grossWpm - (totalSalahKetik / timeMin)));
    return netWpm
  }


// Membuat text sesuai dengan progres tes mengetik
export const generateProgressText = (text, cursorPos, salahKetik, cursor, salahKetikKelebihan) => {
        const progressText = text.split("").map((letter, i) => {
                let formattedSection = []

                if(i in salahKetikKelebihan){
                    formattedSection.push(<span key={i-0.1} className="text-red-500">{salahKetikKelebihan[i]}</span>)
                }

                if(i == cursorPos){
                        formattedSection.push(<span key={i-0.2}>{cursor}</span>)
                }

                
                if(salahKetik.includes(i)){
                    formattedSection.push(<span key={i-0.3} className="text-red-500">{letter}</span>)
                }else{
                    formattedSection.push(<span key={i-0.3} className={`${i < cursorPos && "text-green-700"}`}>{letter}</span>)
                }
                

                return formattedSection
            })
        return progressText
    }