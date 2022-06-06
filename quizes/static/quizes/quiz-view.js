const url = window.location.href
const quizBox = document.getElementById('quiz-box')
const quizForm = document.getElementById('quiz-form')
const scoreBox = document.getElementById('score-box')
const resultBox = document.getElementById('result-box')
const timeBox = document.getElementById('time-box')
const csrf = document.getElementsByName('csrfmiddlewaretoken')


let data


const activateTime = (time) => {
    if (time.toString().length < 2) {
        timeBox.innerHTML = `<b>0${time}:00</b>`
    } else {
        timeBox.innerHTML = `<b>${time}:00</b>`
    }

    let minutes = time - 1
    let seconds = 60
    let displaySeconds
    let displayMinutes

    const timer = setInterval(() => {
        console.log("running....")
        seconds--
        if (seconds < 0) {
            seconds = 59
            minutes--
        }

        if (minutes.toString().length < 2) {
            displayMinutes = '0' + minutes
        } else {
            displayMinutes = minutes
        }

        if (seconds.toString().length < 2) {
            displaySeconds = '0' + seconds
        } else {
            displaySeconds = seconds
        }

        if (minutes === 0 && seconds === 0) {
            timeBox.innerHTML = "<b>00:00</b>"
            setTimeout(() => {
                clearInterval(timer)
                alert('Time Over')
                sendData()
            }, 500)
        }

        timeBox.innerHTML = `<b>${displayMinutes}:${displaySeconds}</b>`


    }, 1000)

}

$.ajax({
    type: 'GET',
    url: `${url}data`,
    success: function (response) {
        const data = response.data
        data.forEach(el => {
            for (const [question, answers] of Object.entries(el)) {
                quizBox.innerHTML += `
                <hr>
                    <div class="card-header">
                        <b>${question}</b>
                        
                    </div>
                <br>
                `

                answers.forEach(answer => {
                    quizBox.innerHTML += `
                    <div>
                        <input type="radio" class="ans" id="${question} - ${answer}" name="${question}" value="${answer}">
                        <label for="${question}">${answer}</label>
                    </div>
                `
                })
            }
        });
        activateTime(response.time)
    },
    error: function (error) {
        console.log(error)
    }
})


const sendData = () => {
    const element = [...document.getElementsByClassName('ans')]
    const data = {}
    data['csrfmiddlewaretoken'] = csrf[0].value
    element.forEach(el => {
        if (el.checked) {
            data[el.name] = el.value
        } else {
            if (!data[el.name]) {
                data[el.name] = null
            }
        }
    })

    $.ajax({
        type: 'POST',
        url: `${url}save/`,
        data: data,
        success: function (response) {
            const results = response.results
            console.log(results)
            quizForm.classList.add('not-visible')
            const clss = ['container', 'p-3', 'text-light', 'h6']


            scoreBox.innerHTML = `${response.passed ? 'Congratulations. Your result is' : 'Unfortunately you failed this exam. Your result is '}  ${response.score.toFixed(2)} <br>`
            scoreBox.classList.add('bg-info')
            scoreBox.classList.add(...clss)

            results.forEach(res => {
                const resDiv = document.createElement("div")
                for (const [question, resp] of Object.entries(res)) {
                    resDiv.innerHTML += question
                    const cls = ['container', 'p-3', 'text-light', 'h6']
                    resDiv.classList.add(...cls)

                    if (resp === 'Not Answered') {
                        resDiv.innerHTML += '- Not Answered'
                        resDiv.classList.add('bg-secondary')
                    } else {
                        const answer = resp['answered']
                        const correct = resp['correct_answer']

                        if (answer === correct) {
                            resDiv.classList.add('bg-success')
                            resDiv.innerHTML += ` answered: ${answer}`
                        } else {
                            resDiv.classList.add('bg-secondary')
                            resDiv.innerHTML += ` | correct answered: ${correct}`
                            resDiv.innerHTML += ` | answered : ${answer}`
                        }
                    }
                }
                // const body = document.getElementsByTagName('BODY')[0]

                resultBox.append(resDiv)

            })
        },
        error: function (error) {
            console.log(error)
        }
    })
}


quizForm.addEventListener('submit', e => {
    e.preventDefault()
    sendData()
})
