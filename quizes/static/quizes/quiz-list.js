const modalBtns = [...document.getElementsByClassName('modal-button')]
const modalBody = document.getElementById('modal-body-confirm')
const startBtn = document.getElementById('start-button')

const url = window.location.href

modalBtns.forEach(modalBtn => modalBtn.addEventListener('click', () => {
    const pk = modalBtn.getAttribute('data-pk')
    const name = modalBtn.getAttribute('data-quiz')
    const numQuestions = modalBtn.getAttribute('data-questions')
    const difficulty = modalBtn.getAttribute('data-difficulty')
    const time = modalBtn.getAttribute('data-time')
    const scoreToPass = modalBtn.getAttribute('data-pass')


    modalBody.innerHTML = `
    <div class="h5 md-3"> Are you sure you want to begin " <b>${name}</b>" ?</div>
    
        
        
   <table class="table ">
  
  <tbody>
    <tr>
      <th scope="row">difficulty: <b style="text-align: right!important;">${difficulty}</b></th>
    </tr>
    
    <tr>
      <th scope="row">number of questions: <b>${numQuestions}</b></th>
    </tr>
    
    <tr>
      <th scope="row">score to pass: <b>${scoreToPass}</b></th>
    </tr>
    
    <tr>
      <th scope="row">time: <b>${time} min</b></th>
    </tr>
    
  </tbody>
</table>
        
        

    `

    startBtn.addEventListener('click', () => {
        window.location.href = url + pk
    })


}))