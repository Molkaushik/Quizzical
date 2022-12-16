
export function processData(data){
    var obj = {}
    obj.questions = data.questions.map(question => {
        return decodeString(question)
    })
    const cAns = data.correct_answer.map(str => {
        return decodeString(str)
    })
    let options = []
    for(let i=0; i<data.options.length; i++){
        const arr = data.options[i].map(str => {
            return decodeString(str)
        })
        options.push(arr)
    }
    obj.options = options
    obj.correct_answer = cAns
    return obj
}

function decodeString(string){
    string = string.replace(/(&quot\;)/g,"\"")
    string = string.replace(/(&ldquo\;)/g,"\"")
    string = string.replace(/(&rdquo\;)/g,"\"")
    string = string.replace(/(&#039\;)/g,"\'")
    string = string.replace(/(&lsquo\;)/g,"\'")
    string = string.replace(/(&rsquo\;)/g,"\'")
    string = string.replace(/(&amp\;)/g,"\&")
    string = string.replace(/(&tilde\;)/g,"\~")
    string = string.replace(/(&lt\;)/g,"\<")
    string = string.replace(/(&gt\;)/g,"\>")
    string = string.replace(/(&euro\;)/g,"\€")
    string = string.replace(/(&cent\;)/g,"\¢")
    string = string.replace(/(&yen\;)/g,"\¥")
    string = string.replace(/(&pound\;)/g,"\£")
    string = string.replace(/(&copy\;)/g,"\©")
    string = string.replace(/(&reg\;)/g,"\®")
    string = string.replace(/(&bull\;)/g,"\•")
    return string
}

export function shuffle(arr){
    let currIndex = arr.length
    let randIndex
    while(currIndex){
        randIndex = Math.floor(Math.random()*currIndex)
        currIndex--
        [arr[currIndex], arr[randIndex]] = [arr[randIndex], arr[currIndex]]
    }
    return arr
}