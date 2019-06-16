//cria o canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height= 480;
document.body.appendChild(canvas); //add o canvas no 'bady'

//imagem de fundo
let bgReady = false; //bgReady =backgraud
const bgImage = new Image();
bgImage.onload = function(){  //executa uma função quando a imagem estiver pronta

    bgReady=true;

};bgImage.src = 'imagens/background.png';


//imagem do heroi
let heroReady = false;
const heroImage = new Image();

heroImage.onload = function(){

    heroReady=true;

};heroImage.src = 'imagens/hero.png';

//imagem monstro
let monsterReady= false;
const monsterImage = new Image();
monsterImage.onload = function(){

    monsterReady = true;

};monsterImage.src= 'imagens/monster.png';


//imagem da bomba

let bombReady = false;
const bombImage= new Image();
bombImage.onload = function(){

    bombReady = true;
    
}; bombImage.src= 'imagens/bomb.png';


//objetos do jogo
const hero = {
    speed: 206//movimento em pixels por segundos
};
const monster = {};
var monstersCaught = 0; // contador para monstros pegos

const bomb = {};

//controle do teclado

const keysDown = {};

window.addEventListener('keydown', function(e){ //'e' é a função em si
       console.log(e.keyCode);
       keysDown[e.keyCode] = true;  // adiciona a propiedade das teclas
}, false);


window.addEventListener('keyup', function (e) {
    delete keysDown[e.keyCode];
  }, false);

//reseta o jogo quando o jogador pega o monstro
const reset = function reset(){

    hero.x = canvas.width/ 2;
    hero.y = canvas.height /2 ;

    //Posiciona o monstro randomicamente na tela

    monster.x = 32 + Math.random() * (canvas.width - 64);
    monster.y = 32 + Math.random() * (canvas.height - 64);

    bomb.x= 32 + Math.random() * (canvas.width - 64);
    bomb.y= 32 + Math.random() * (canvas.width - 64);
    

};


//Atualiza os objetos do jogo

const update  = function update(modifier){

    if (38 in keysDown) {
        // Pressionando a seta pra cima
        hero.y -= hero.speed * modifier;
      }
      if (40 in keysDown) {
        // Pressionando a seta pra baixo
        hero.y += hero.speed * modifier;
      }
      if (37 in keysDown) {
        // Pressionando a seta pra esquerda
        hero.x -= hero.speed * modifier;
      }
      if (39 in keysDown) {
        // Pressionando a seta pra direita
        hero.x += hero.speed * modifier;
      }


// Colisão 


if (hero.x <= monster.x + 32 && monster.x <= hero.x + 32 && hero.y <= monster.y + 32 && monster.y <= hero.y + 32) {
    ++monstersCaught;
    reset();
  }

if(hero.x <= bomb.x +32 && bomb.x <= hero.x +32 && hero.y <= bomb.y +32 && bomb.y <= hero.y + 32){
    if( monstersCaught >=1){
        --monstersCaught;
        reset();
    }else{

        monstersCaught=0;
        reset();
    }
}
};   

//Renderização 

const render = function render(){

    if(bgReady){

        ctx.drawImage(bgImage, 0, 0);
    }

    if(heroReady){

        ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (monsterReady){

        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    if(bombReady){

        ctx.drawImage(bombImage, bomb.x, bomb.y);
    }
    //pontuação
    ctx.fillStyle= ' rbg(250, 250, 250)';
    ctx.font= '24px Helvetica';
    ctx.textAlign= 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Monstros Pegos: '+ monstersCaught, 32, 32);
};

//controle do loop do jogo
const main =function main(){

    if (hero.x < 0) hero.x = canvas.width;
    if(hero.x > canvas.width) hero.x = 0;
    if(hero.y < 0) hero.y = canvas.height;
    if(hero.y > canvas.height) hero.y = 0;

    const now = Date.now(); // marcas os segundos no tempo real do click
    const delta = now - then ;

    update(delta / 1000);
    render();

    then = now;

    //executa isso o mais breve possivel
    requestAnimationFrame(main);
 
};

const w = window;
var requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


let then = Date.now();
reset();
main();
