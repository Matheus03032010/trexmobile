var trex, trex_running, edges;
var estado = "JOGAR"
var groundImage;
var solo2;
var nuvem, nuvenimg
var cacto, c1, c2, c3, c4, c5, c6
var groupcactus
var groupnuven
var gameover,gameoverimg
var pular,morte,checkpoint
var pontuation=0
var trexcollide
var reset,resetimg
var W
function preload() {//carrega todas as imagens que vou usar no jogo
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png")
  nuvenimg = loadImage("cloud.png")
  c1 = loadImage("obstacle1.png")
  c2 = loadImage("obstacle2.png")
  c3 = loadImage("obstacle3.png")
  c4 = loadImage("obstacle4.png")
  c5 = loadImage("obstacle5.png")
  c6 = loadImage("obstacle6.png")
  pular = loadSound("jump.mp3")
  morte = loadSound("die.mp3")
  checkpoint = loadSound("checkPoint.mp3")
  trexcollide = loadAnimation("trex_collided.png")
  gameoverimg = loadImage("gameOver.png")
  resetimg = loadImage("restart.png")
}

function setup() {
  var mobile =/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (mobile){
   createCanvas(displayWidth,displayHeight) 
   W=displayWidth
  }
 else{
   createCanvas(windowWidth,windowHeight)
   W=windowWidth
 }
  frameRate(80)
  //criando o trex
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("morrendo",trexcollide)
  edges = createEdgeSprites();
  solo = createSprite(300, 190, 600, 20)
  solo.addImage("solo", groundImage)

  solo2 = createSprite(300, 200, 600, 10)
  solo2.visible = false
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  groupcactus = new Group()
  groupnuven = new Group()
  gameover = createSprite(W/2,100,30,30)
  gameover.visible=false
  gameover.addImage("gameover",gameoverimg)
  reset =createSprite(W/2,150,10,10)
  reset.visible=false
  reset.addImage("reset",resetimg)
  reset.scale = 0.5
}
function draw() {
  //definir a cor do plano de fundo 
  background("white");
  if (estado === "JOGAR") {
    pontuation=pontuation+1
    if(pontuation%100===0&&pontuation>0){
    checkpoint.play()
    }
    //pular quando tecla de espaço for pressionada
    if (touches.length>0||keyDown("space") && trex.y >= 160) {
      trex.velocityY = -12;
      pular.play()
      touches=[]
    }
    trex.velocityY = trex.velocityY + 0.5;
    solo.setVelocity(-(4+(pontuation/100)), 0)
    if (solo.x < 0) {
      solo.x = solo.width / 2
    }
    nuven()
    cactus()
    if (trex.isTouching(groupcactus)) {
      estado = "ENCERRAR"
      morte.play()
    }
  }
  else if (estado === "ENCERRAR") {
    solo.setVelocity(0, 0)
    trex.velocityY = 0
    groupcactus.setVelocityXEach(0)
    groupnuven.setVelocityXEach(0)
    groupcactus.setLifetimeEach(-1)
    groupnuven.setLifetimeEach(-1)
    gameover.visible=true
    trex.changeAnimation("morrendo",trexcollide)
    reset.visible=true
    if(touches.length>0||mousePressedOver(reset)){
    restart()
    touches=[]
    }
  }

  //impedir que o trex caia
  trex.collide(solo2)
  drawSprites();
 text("pontuação: "+pontuation,5,10)
}
function restart(){
estado="JOGAR"
groupcactus.destroyEach()
groupnuven.destroyEach()
reset.visible=false
gameover.visible=false
trex.changeAnimation("running",trex_running)
pontuation=0
}
function nuven() {
  if (frameCount % 60 === 0) {
    nuvem = createSprite(W, 120, 20, 20)
    nuvem.addImage(nuvenimg)
    nuvem.setVelocity(-3, 0)
    nuvem.y = Math.round(random(10, 120))
    nuvem.lifetime = 220
    groupnuven.add(nuvem)
  }
}

function cactus() {
  if (frameCount % 60 === 0) {
    cacto = createSprite(W, 174, 20, 20)
    cacto.setVelocity(-(4+(pontuation/100)), 0)
    var valor = Math.round(random(1, 6))
    cacto.lifetime = 220
    cacto.scale = 0.5
    groupcactus.add(cacto)
    switch (valor) {
      case 1: cacto.addImage(c1)
        break
      case 2: cacto.addImage(c2)
        break
      case 3: cacto.addImage(c3)
        break
      case 4: cacto.addImage(c4)
        break
      case 5: cacto.addImage(c5)
        break
      case 6: cacto.addImage(c6)
        break


    }
  }

}

































































































































































