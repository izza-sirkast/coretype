// local assets
import indonesian_1k from "@/assets/languages/indonesian_1k.json"
import indonesian_3k from "@/assets/languages/indonesian_3k.json"
import indonesian_10k from "@/assets/languages/indonesian_10k.json"
import english_1k from "@/assets/languages/english_1k.json"
import english_5k from "@/assets/languages/english_5k.json"
import english_10k from "@/assets/languages/english_10k.json"

export const getWords1000 = (setText, language, difficulty) => {
    switch(language){
      case "Indonesia":
        switch(difficulty){
          case "Easy":
            console.log("tes")
            setText(getRandomWords1000(indonesian_1k))
            break;
          case "Medium":
            setText(getRandomWords1000(indonesian_3k))
            break;
          case "Hard":
            setText(getRandomWords1000(indonesian_10k))
            break;
        }
        break;
      case "English":
        switch(difficulty){
          case "Easy":
            setText(getRandomWords1000(english_1k))
            break;
          case "Medium":
            setText(getRandomWords1000(english_5k))
            break;
          case "Hard":
            setText(getRandomWords1000(english_10k))
            break;
        }
        break;
    }
  }

export const getRandomWords1000 = (langData) => {
    let words = ""
    for(let i = 0; i < 1000; i++){
        let randIdx = Math.ceil(Math.random() * langData.words.length)
        words += langData.words[randIdx] + " "
    }
    return words
}