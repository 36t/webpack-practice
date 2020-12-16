import $ from 'jquery'
import velocity from 'velocity-animate'

console.log('app')

const result = add(1, 2)

$('body').append(result)
velocity($('h1'), 'fadeIn', { duration: 2000, loop: true })