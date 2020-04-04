const selector = element => {
  return document.querySelector(element)
}

// Getting UI elements
const weatherForm = selector('form')
const searchInput = selector('input')
const messageOne = selector('.msg-1')
const messageTwo = selector('.msg-2')

const fetchWeather = location => {
  messageOne.textContent = 'Loading....'
  messageTwo.textContent = ''
  fetch(`/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (!data.error) {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      } else {
        messageOne.textContent = data.error
      }
    })
  })
}

weatherForm.addEventListener('submit', e => {
  e.preventDefault()

  const location = searchInput.value
  fetchWeather(location)
})
