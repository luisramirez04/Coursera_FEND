# Optimization-Project

## Overview

This is a website with some performance optimizations made to achieve a Google Pagespeed Analytics Score of 90+ for mobile and desktop. A consistent 60FPS for the pizza.html and >5ms pizza image resize on the pizza.html slider is also achieve.

## How to use

To play the game:

* Download the zip file from Github.
* Open zip file.
* Open index.html in any browser.

To check Pagspeed score: 
Please follow the instructions on https://github.com/udacity/frontend-nanodegree-mobile-portfolio. Specifically, part 1 on "getting started". 

## Performance Improvements

### index.html 
* Added a print media query to reduce critical resources to optimize CRP. 
* Inline CSS to reduce critical resources and render blocking CSS. 
* Made analytics.js async to reduce amount of parser blocking scripts. 
* Minified and made perfmatters.js async to reduce amount of parser blocking scripts. (Minifying hardly improved performance)

### main.js
* On changePizzaSizes(), changed method of obtaining pizza containers to getElementsByClassName and took this task out of the function's for loop.
* Since all pizzas are the same size, I moved the way to determine the new size of pizzas out of for loop.
* On updatePositions(), moved scrollTop location to outside for loop to get rid of forced synchronized layout.
* Moved a "getElementById() method call out of a for loop. 
* Changed the number of pizzas from 200 to dynamically calculated amount of pizzas based on the screen height. 

### pizza.html 
* Inline style.css to optimize CRP. 
