const url = window.location.href
const quizBox = document.getElementById('quiz-box')
const quizForm = document.getElementById('quiz-form')
const scoreBox = document.getElementById('score-box')
const resultBox = document.getElementById('result-box')
const csrf = document.getElementsByName('csrfmiddlewaretoken')


let data

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
