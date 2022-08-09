/* 
TRIANGLE AXIOM: F+F+F
TREE1 AXIOM: F
*/
var axiom = "F+F+F";
// var rules = [
//   //Tree1
//   {is: "F", make: "FF+[+F-F-F]-[-F+F+F]"}
// ];
var rules = [
  //Triangle
  {is: "F", make: "F-F+F"}
];

function setup() {
  createCanvas(500, 500);

  var genButton = createButton("Generate");
  genButton.mousePressed(generateAxiom);
  print(axiom);
  background(0);
}

function generateAxiom(){
  let axiomIteration = "";

  for (let i = 0; i < axiom.length; i++){
    for (let j = 0; j < rules.length; j++){
      if (axiom[i] == rules[j].is){
        axiomIteration += rules[j].make;
        break;
      }else{
        axiomIteration += axiom[i];
      }
    }
  }

  axiom = axiomIteration;
  print(axiom);
  drawAxiomTriangle();
}

function drawAxiomTriangle(){
  background(0);
  let alpha = 255;
  let branchLength = 1;
  let branchSize = 1;
  let angle = radians(120);

  resetMatrix();
  translate(width/5, height/2);

  for (let i = 0; i < axiom.length; i++){
    let char = axiom[i];
    if (char == "F"){
      strokeWeight(branchSize);
      stroke(255, alpha);

      line(0, 0, 0, -branchLength);
      translate(0, -branchLength);

    }else if (char == "+"){
      rotate(angle);
    }else if (char == "-"){
      rotate(-angle);
    }else if (char == "["){
      push();
    }else if (char == "]"){
      pop();
    }
  }
}

function drawAxiomTree(){
  background(0);
  let alpha = 255;
  let branchLength = 25;
  let branchSize = 3;
  let angle = radians(25);

  resetMatrix();
  translate(width/3, height);

  for (let i = 0; i < axiom.length; i++){
    let char = axiom[i];
    if (char == "F"){
      strokeWeight(branchSize);
      stroke(255, alpha);

      line(0, 0, 0, -branchLength);
      translate(0, -branchLength);

      branchLength *= 0.91;
      branchSize *= 0.91;
      alpha *= 0.992;
    }else if (char == "+"){
      rotate(angle);
    }else if (char == "-"){
      rotate(-angle);
    }else if (char == "["){
      push();
      branchLength++;
      alpha++
    }else if (char == "]"){
      pop();
      branchLength++;
      alpha++
      branchSize = 3;
    }
  }
}