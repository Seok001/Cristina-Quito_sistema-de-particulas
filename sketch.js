let pelotas = [];


function setup() {
  createCanvas(windowWidth, windowHeight);


}
function draw() {
  background('rgba(200,100,30,0.01)');

  for (let i = 0; i < pelotas.length; i++) {
    if (pelotas[i].isAlife) {
      pelotas[i].update();
      pelotas[i].display();
    } else {
      pelotas.splice(i, 1);
    }
  }
}

function mouseClicked() {
  for (let i = 0; i < 100; i++) {
    background('rgba(200,100,30,0.01)');
    let nuevaBola = new Bolita(mouseX, mouseY);
    pelotas.push(nuevaBola);
  }

  print(pelotas.length)

}


//---------------------------
//------- Clases ------------
//---------------------------
//------Random Walker--------

class Bolita {
  constructor(_mouseX, _mouseY) {
    this.red = random(5, 25);
    this.green = random(10, 250);
    this.blue = random(10, 200);

    this.t = 0;
    this.tSpeed = random(0, 1);
    this.noiseShift = random(1000);
    this.lifespan = int(random(30, 100));

    this.isAlife = true;

    this.pos = createVector(_mouseX, _mouseY);
    this.speed = createVector(random(-4, 4), random(-4, 4));
    this.height = random(5, 20);
    this.width = random(5, 20);
    this.diametro = random(10, 70);

    this.bolitaFinal = this.diametro / 2;

    print('hola:viviere' + this.lifespan + 'frames');

  }

  update(_t) {

    this.speed.rotate(map(noise(this.t + this.noiseShift), 0, 1, -0.1, 0.1));
    this.pos.add(this.speed);
    this.t += this.tSpeed;

    translate(0);
  }

  display() {

    stroke('rgba(0,0,0,0.2)');
    strokeWeight(1);
    fill(this.green, this.blue, this.red);
    ellipse(this.pos.x, this.pos.y, this.diametro);

    rectMode(CENTER);
    fill(this.red, this.blue, this.green);
    rect(this.pos.x + 20, this.pos.y - 20, 10, 10);

    fill(this.blue, this.red, this.green);
    rect(this.pos.x - 15, this.pos.y - 15, 10, 10);

    stroke('rgba(0,0,0,0.2)');
    strokeWeight(1);
    fill(this.red, this.blue, this.green);
    ellipse(this.pos.x - 20, this.pos.y + 20, 10);

    stroke('rgba(0,0,0,0.2)');
    strokeWeight(1);
    fill(this.blue, this.red, this.green);
    ellipse(this.pos.x + 15, this.pos.y + 15, 10);


    this.lifespan++;
    if (this.lifespan >= 0) {
      this.viviending();
    }

  }

  viviending() {
    this.diametro += 0.1;
    if (this.diametro >= 0) {
      this.isAlife = true;
      print('vivo, porque mi vida es ' + this.isAlife);
      ellipse(this.pos.x, this.pos.y, this.bolitaFinal);

    }
  }

}