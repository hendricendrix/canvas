'use strict';

// render two images to the DOM
var votesRemaining = 25;

var canvasEl = document.getElementById('my-canvas');
var productContainerEl = document.getElementById('product-container');

var resultsEl = document.getElementById('results');

var productOneEl = document.getElementById('product-one');

var productTwoEl = document.getElementById('product-two');

var allProducts = [];

function Product(name, src){
  this.name = name;
  this.filepath = `img/${src}`;
  this.votes = 0;
  this.views = 0;

  allProducts.push(this);
}

new Product('bag', 'bag.jpg');
new Product('banana', 'banana.jpg');
new Product('bathroom', 'bathroom.jpg');
new Product('boots', 'boots.jpg');
new Product('breakfast', 'breakfast.jpg');
new Product('bubblegum', 'bubblegum.jpg');
new Product('chair', 'chair.jpg');
new Product('cthulhu', 'cthulhu.jpg');
new Product('dog-duck', 'dog-duck.jpg');
new Product('dragon', 'dragon.jpg');
new Product('pen', 'pen.jpg');
new Product('pet-sweep', 'pet-sweep.jpg');
new Product('save-the-bus', 'save-the-bus.png');
new Product('scissors', 'scissors.jpg');
new Product('shark', 'shark.jpg');
new Product('sweep', 'sweep.png');
new Product('tauntaun', 'tauntaun.jpg');
new Product('unicorn', 'unicorn.jpg');
new Product('usb', 'usb.gif');
new Product('water-can', 'water-can.jpg');
new Product('wine-glass', 'wine-glass.jpg');


var recentRandomNumbers = [];

function render(){

  var randomIndex = random(0, allProducts.length-1);

  while(recentRandomNumbers.includes(randomIndex)){
    randomIndex = random(0, allProducts.length-1);
  }

  if(recentRandomNumbers.length > 3){
    recentRandomNumbers.shift();
  }

  recentRandomNumbers.push(randomIndex);

  allProducts[randomIndex].views++;

  productOneEl.src = allProducts[randomIndex].filepath;
  productOneEl.alt = allProducts[randomIndex].name;
  productOneEl.title = allProducts[randomIndex].name;

  var randomIndex = random(0, allProducts.length-1);

  while(recentRandomNumbers.includes(randomIndex)){
    randomIndex = random(0, allProducts.length-1);
  }

  if(recentRandomNumbers.length > 3){
    recentRandomNumbers.shift();
  }

  allProducts[randomIndex].views++;

  productTwoEl.src = allProducts[randomIndex].filepath;
  productTwoEl.alt = allProducts[randomIndex].name;
  productTwoEl.title = allProducts[randomIndex].name;
}

function random(min, max){
  return Math.floor(Math.random() * (max - min +1) + min);
}


function handleClick(e){
  var productName = e.target.title;
  
  if(e.target.id === 'product-container'){
    alert('click a product!');
  }
  
  if(votesRemaining === 0){
    productContainerEl.removeEventListener('click', handleClick);
    // render the results to the DOM
    renderChart();
  }
  
  for(var i = 0; i < allProducts.length; i++){
    if(productName === allProducts[i].name){
      allProducts[i].votes++;
      votesRemaining--;
    }
  }
  render();
}

productContainerEl.addEventListener('click', handleClick);

render();

////////////////////////////////////

function renderChart(){
  var namesArray = [];
  var votesArray = [];

  for(var i = 0; i < allProducts.length; i++){
    namesArray.push(allProducts[i].name);
    votesArray.push(allProducts[i].votes);
  }


  var ctx = canvasEl.getContext('2d');
  
    new Chart(ctx, {
      type: 'bar',
      data: {
          labels: namesArray, // names of each object
          datasets: [{
              label: '# of Votes',
              data: votesArray, // number of votes for each object
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });

}