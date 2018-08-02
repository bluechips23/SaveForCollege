var width = 0;
var totalSavings = 0;
var maximumWidth = 100;
var maximumTextWidth = 85;
var minimumTextWidth = 1;
var minSavings = 0;
var maxSavings = 10000;
var savingsClickedCounter = 0;

function move(number) {
  var myTarget = event.target;
  blurify(myTarget);
  myTarget.className += " dontClickMe";
  
  var elem = document.getElementById("myBar");
  var maxWidth = width + number;
  setSavingsText(number, maxWidth-1);

  console.log("> 2. myTarget: " + myTarget + ", Width: " + width + ", num: " + number + ", maxWidth: " + maxWidth);
  
  while ( width < maxWidth && width <= maximumWidth ) {
    width++;
    elem.style.width = (width + 1) + '%'; 
  }
  
  if ( number < 0 ) {
    while ( width > maxWidth && width >= 0 ) {
      width--;
      elem.style.width = width + '%';
    }
  }
  
  if ( width >= 100 ) {
    elem.style.borderRadius = "20px";
  } else {
    elem.style.borderRadius = "20px 0px 0px 20px"
  }
  
  console.log("> 3. New width: " + width);
  console.groupEnd();
  
  displayRefreshButton();
}

function setSavingsText (savings, width) {
  var saveOrSpendNumber = savings * 100;
  var progress = document.getElementById("progressText");
  totalSavings = totalSavings + saveOrSpendNumber;
  
  if ( totalSavings > maxSavings ) {
    totalSavings = maxSavings;
  }
  
  if ( totalSavings < minSavings ) {
    totalSavings = minSavings;
  }
  
  if ( totalSavings == 10000 ) {
    totalSavings = "10,000";
  }
  
  progress.innerHTML = "$" + totalSavings;
  
  if ( width > maximumTextWidth ) {
    width = maximumTextWidth;
  }
  
  if ( width < minimumTextWidth ) {
    width = minimumTextWidth;
  }
  
  progress.style.marginLeft = width + "%";
  console.group();
  console.log("> 1. Savings: " + savings + ", totalSavings: " + totalSavings + ", text width: " + width);
}

function blurify(target) {
  var topParentClass = target.parentNode.parentNode.parentElement;
  console.log("Parent Node class: " + topParentClass.className);
  
  if ( topParentClass.className == "card-container" ) {
    topParentClass.className += " blurify";
  } else if ( topParentClass.className = "card" ) {
    savingsClickedCounter++;
    if ( savingsClickedCounter == 2 ) {
      topParentClass.parentElement.className += " blurify";
    }
  }
}

function displayRefreshButton() {
  var refresh = document.getElementById("refresh");
  refresh.style.visibility = "visible";
}

function refreshPage() {
  location.reload();
}