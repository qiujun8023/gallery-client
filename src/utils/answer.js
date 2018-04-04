import swal from 'sweetalert2'

let getProgressSteps = (questions) => {
  if (questions.length <= 1) {
    return []
  }
  return questions.reduce((res, question, index) => {
    return res.concat([index + 1])
  }, [])
}

export default (questions, checkAnswer) => {
  let options = []
  let progressSteps = getProgressSteps(questions)
  for (let { path, question } of questions) {
    options.push({
      title: question,
      input: 'text',
      showCloseButton: true,
      showLoaderOnConfirm: true,
      inputPlaceholder: '请输入答案...',
      showConfirmButton: true,
      confirmButtonText: '确认',
      confirmButtonColor: '#8CD4F5',
      showCancelButton: false,
      cancelButtonText: '取消',
      progressSteps,
      preConfirm: async (answer) => {
        if (!answer) {
          swal.showValidationError('答案不能为空')
          return false
        } else if (!await checkAnswer(path, answer)) {
          swal.showValidationError('你输入的答案不正确')
          return false
        }
        return true
      }
    })
  }
  return swal.queue(options)
}
