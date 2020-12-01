let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
/* Context renderiza e desenha que vai acontecer dentro do canvas. 2D define a forma*/
let box = 32;
let snake = [];
snake[0] = {
    X: 8 * box,
    y: 8 * box
}
/* Define o tamanho */
let food = {
    x:Math.floor(Math.random() * 15 + 1) * box,
    y:Math.floor(Math.random()* 15 + 1) * box
    /* Math floor retira a parte flutuando do random, manda posiçoes aleatorias */
}

function criarBG() {
    context.fillstyle = "lightgreen";
    /* define a cor */
    context.fillRect(0, 0, 16 * box, 16 * box);
    /* fillrect desenha a margem, o retangulo, uma borda. X-Y*/
}

let direction = "right";

function criarcobrinha(){
    /* For, vai trabalhar toda a extensao da cobrinha e vai setar o caminho */
    for(i=0; i < snake.length; i++){
        context.fillstyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }

}

function drawfood(){
    context.fillstyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);
/* EventList ele pega o keydown, clique dos teclados e chama a função de atualizar */
function update(event){
  if(event.keyCode == 37 && direction != "right") direction = "left";
  if(event.keyCode == 38 && direction != "down") direction = "up";
  if(event.keyCode == 39 && direction != "left") direction = "right";
  if(event.keyCode == 40 && direction != "up") direction = "down";

}

function iniciarJogo(){
    
    /* Funciona como um plano cartesiano, quando ultrapassar o limite ela receve valor 0 (y) e recomeça */
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].x = 0;
    if(snake[0].y < 0  && direction == "up") snake[0].y = 16 * box;
    
    /* Definição de quando o jogo encerra, cobrinha se choca com ela */
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo)
            alert("Game Over :(" )
        }
    }


    criarBG();
    criarcobrinha();
    drawfood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if(direction == "right") snakeX += box;
    if(direction == "left" ) snakeY -= box;
    if(direction == "up" ) snakeY -= box;
    if(direction == "down") snakeX += box;

    if(snakeX != food.x || snakeY != food.y){
    snake.pop();
    }
    else{food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random()* 15 + 1) * box;
    }


    let newHead ={
        x: snakeX,
        y: snakeY
    }
    
    snake.unshift(newHead)
    /* Adiciona elementos sempre no começo da array (cabeça da cobrinha) */

}

let jogo = setInterval(iniciarJogo, 100);

/* Cobrinha vai ser um array de coordenadas, adiciona um e retira um, isso faz a snake andar*/