let buttonColours = ["red", "blue", "green", "yellow"]; //массив цвета для рандома
let gamePattern = []; //массив для самой игры
let userClickedPattern = []; //массив для игрока
let levelCount = 0; //счетчик уровней
let started = false;

$(".btn").click(function() {  // ловит клик игрока по кнопке
    let userChosenColour = $(this).attr("id"); // определяет какого цвета кнопку нажал игрок
    userClickedPattern.push(userChosenColour);  // пушим в конец массива для игрока цвет который был нажат
    playSound(userChosenColour); //проигрываем звук
    animatePress(userChosenColour); //проигрываем анимацию
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    } 
        else {playSound("wrong");
        $("body").addClass("game-over");
        setTimeout (function() {              
            $("body").removeClass("game-over")    
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart ");
        startOver();

            
    };
}

function startOver(){
    levelCount = 0;
    gamePattern = [];
    started = false;
}


function nextSequence() {
    userClickedPattern = [];
    levelCount++; //счет уровня +1
    $("h1").text("Level " + (levelCount));
    let randomNumber = Math.floor(Math.random() * buttonColours.length); //рандом
    let randomChosenColour = buttonColours[randomNumber];   //с помощью рандома выбирается цвет из массива цвета
    gamePattern.push(randomChosenColour); //пушим цвет в конец массива игры 


    $("#" + randomChosenColour).fadeOut(100).fadeIn(100); // анимация мерцания кнопки 
};

function playSound(name){  // функция проигрывание звуков 
    let audioObj = new Audio("sounds/" + name + ".mp3"); //вместо name подставляется нужное значение
    audioObj.play(); //проигрывание объекта со звуком
}

$(document).keypress(function() { //функция старта игры по нажатию кнопки
    if (started == false){
        $("h1").text("Level " + (levelCount)); //подстановка уровня вместо стартового заголовка игры
        nextSequence(); //запуск функции "следующий"
        started = true;
    }
   
})

function animatePress(currentColour) {   //функция для анимации кнопок
    let current = $("." + currentColour); //самая
    current.addClass("pressed");          // легкая
    setTimeout (function() {              // и бесполезная
        current.removeClass("pressed")    // хуета
    }, 100)
}




