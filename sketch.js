//Create variables here
var dog,dogImg,happydogImg,foodS,foodStock,database
var happydogImg;
var foodObj;
var fedTime,lastFed,feed,addFood;

function preload(){
  dogImg=loadImage("Dog.png");
  happydogImg=loadImage("happydog.png");
}

function setup() {
  createCanvas(1000, 400);

  database= firebase.database();

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  console.log(foodStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


  
}


function draw() { 
  
  background(46,139,87);

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: " + lastFed%12 +" PM", 350, 30);
  }
  else if(lastFed == 0){
    text("Last Feed: 12 AM",350,30);
  }
  else{
    text("Last Feed: " + lastFed + " AM", 350,30);
  }

  drawSprites();

}

function readStock(data){
  foodS= data.val();
  foodObj.updateFoodStock(foodS);
  console.log(foodStock)
}

function feedDog(){
  dog.addImage(happydogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime : hour()
   })
}

function addFoods(){
  foodS=foodS+1;
  database.ref('/').update({
    Food:foodS
  })
}

