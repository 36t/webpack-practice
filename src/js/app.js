import $ from 'jquery'
import velocity from 'velocity-animate'

console.log('load app.js')

// $('body').append(result)
velocity($('h1'), 'fadeIn', { duration: 2000, loop: true })
