text = document.getElementById("inst")
score = document.getElementById("score")
nodeCounter = 8
const cardArray = [
    {
      name: 'apple',
      img: 'images/apple.jpg'
    },
    {
      name: 'apple',
      img: 'images/apple.jpg'
    },
    {
      name: 'burger',
      img: 'images/burger.jpg'
    },
    {
      name: 'burger',
      img: 'images/burger.jpg'
    },
    {
      name: 'banana',
      img: 'images/banana.jpg'
    },
    {
      name: 'banana',
      img: 'images/banana.jpg'
    },
    {
      name: 'cherry',
      img: 'images/cherry.png'
    },
    {
      name: 'cherry',
      img: 'images/cherry.png'
    },
    {
      name: 'french fries',
      img: 'images/frenchFries.jpg'
    },
    {
      name: 'french fries',
      img: 'images/frenchFries.jpg'
    },
    {
      name: 'ice cream',
      img: 'images/iceCream.png'
    },
    {
      name: 'ice cream',
      img: 'images/iceCream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.jpg'
    },
    {
      name: 'pizza',
      img: 'images/pizza.jpg'
    },
    {
      name: 'avacado',
      img: 'images/avacado.jpg'
    },
    {
      name: 'avacado',
      img: 'images/avacado.jpg'
    },
]

const grid = document.querySelector(".grid");
var cardsChosen = []
var cardsChosenId = []
scoreCount = 0;
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function initialize()
{
  shuffle(cardArray)
  for (let i = 0; i<cardArray.length; i++)
  {
    var card = document.createElement('img')
    card.setAttribute('src', 'images/rainbow.png')
    card.setAttribute('data-id', i)
    card.addEventListener('click', flipCard)
    grid.appendChild(card);
    //nodeCounter++
  }
}
function flipCard()
  {
    currentText = ""
    display();
    var cardID = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardID].name)
    cardsChosenId.push(cardID)
    this.setAttribute('src', cardArray[cardID].img)
    if(cardsChosen.length == 2)
    { 
      if(cardsChosenId[0] != cardsChosenId[1])
      {
        setTimeout(checkForMatch, 500)
      }
      else
      {
        var cards = document.querySelectorAll('img')
        cards[cardsChosenId[0]].setAttribute('src', 'images/rainbow.png')
        cardsChosen = []
        cardsChosenId = []
        scoreCount++
        display()
      }
    }
  }

function checkForMatch()
{
  scoreCount++
  display()
  var cards = document.querySelectorAll('img')
  const optionOneId = cardsChosenId[0]
  const optionTwoId = cardsChosenId[1]
  if(cardsChosen[0] == cardsChosen[1])
  {
    cards[optionOneId].setAttribute('src', 'images/white.png')
    cards[optionTwoId].setAttribute('src', 'images/white.png')
    alert("You found a match!")
    cardsChosen = []
    cardsChosenId = []
    cards[optionOneId].removeEventListener("click", flipCard, false)
    cards[optionTwoId].removeEventListener("click", flipCard, false)
    nodeCounter -= 1
    checkWon()
  }
  else
  {
    cards[optionOneId].setAttribute('src', 'images/rainbow.png')
    cards[optionTwoId].setAttribute('src', 'images/rainbow.png')
    cardsChosen = []
    cardsChosenId = []
  }
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
        nodeCounter--
    }
}
function checkWon()
{
  if (nodeCounter == 0)
  {
    alert("You won! with " + scoreCount + " points")
  }
}
function reset()
{
  removeAllChildNodes(grid)
  initialize();
  currentText = "Select cards that are the same. Each time you make a selection your score increases. The lower your score is the better! The lowest possible score is 16, see if you can get it."
  scoreCount = 0
  display();
}
function display()
{
  text.innerHTML = currentText;
  score.innerHTML = scoreCount;
}