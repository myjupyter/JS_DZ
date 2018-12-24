
"use strict";

function main() {
  var canvas = document.getElementById("webgl");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }


  var program = webglUtils.createProgramFromScripts(gl, ["2d-vertex-shader", "2d-fragment-shader"]);
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  var matrixLocation = gl.getUniformLocation(program, "u_matrix");
  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var translation = [320, 320]
    var vert = [
    300.0*(Math.sqrt(3.0)/2.0),  300*1/2, //0
    0.0,  300.0,													//2
    0.0,  300.0,													//4
    300.0*-Math.sqrt(3.0)/2.0, 150.0,			//6
    300.0*-Math.sqrt(3.0)/2.0, 150.0,			//8
    300.0*-Math.sqrt(3.0)/2.0, -150.0,		//10
    300.0*-Math.sqrt(3.0)/2.0, -150.0,		//12
    0.0, -300.0,													//14
    0.0, -300.0,													//16
    300.0*(Math.sqrt(3.0)/2.0),  -150.0,	//18
    300.0*(Math.sqrt(3.0)/2.0),  -150.0,	//20
    300.0*(Math.sqrt(3.0)/2.0),  300*1/2,	//22
    ];

  const MAX = 100;

  var vert1 = document.getElementById("vert1_");
  var vert2 = document.getElementById("vert2_");
  var vert3 = document.getElementById("vert3_");
  var vert4 = document.getElementById("vert4_");
  var vert5 = document.getElementById("vert5_");
  var vert6 = document.getElementById("vert6_");

  var vert1_node = document.createTextNode("");
  var vert2_node = document.createTextNode("");
  var vert3_node = document.createTextNode("");
  var vert4_node = document.createTextNode("");
  var vert5_node = document.createTextNode("");
  var vert6_node = document.createTextNode("");
  vert1_node.nodeValue = MAX;
  vert2_node.nodeValue = MAX;
  vert3_node.nodeValue = MAX;
  vert4_node.nodeValue = MAX;
  vert5_node.nodeValue = MAX;
  vert6_node.nodeValue = MAX;

  vert1.appendChild(vert1_node);
  vert2.appendChild(vert2_node);
  vert3.appendChild(vert3_node);
  vert4.appendChild(vert4_node);
  vert5.appendChild(vert5_node);
  vert6.appendChild(vert6_node);


  for(var i = 1; i < 11; ++i) {
    vert = vert.concat(drawStatScene(vert,i/10));
  }


  setGeometry(gl, vert);  
  drawScene();



  webglLessonsUI.setupSlider("#vert1", {value: MAX, slide: updateVertPosition(3,  true,   1, 1, vert1_node), min: 0, max: MAX });		//ok
  webglLessonsUI.setupSlider("#vert2", {value: MAX, slide: updateVertPosition(6,  false, -1, 1, vert2_node), min: 0, max: MAX });		//ok
  webglLessonsUI.setupSlider("#vert3", {value: MAX, slide: updateVertPosition(10, false, -1,-1, vert3_node), min: 0, max: MAX });	  //ok
  webglLessonsUI.setupSlider("#vert4", {value: MAX, slide: updateVertPosition(15, true,  -1,-1, vert4_node), min: 0, max: MAX });		//ok
  webglLessonsUI.setupSlider("#vert5", {value: MAX, slide: updateVertPosition(18, false,  1,-1, vert5_node), min: 0, max: MAX });		//ok
  webglLessonsUI.setupSlider("#vert6", {value: MAX, slide: updateVertPosition(22, false,  1, 1, vert6_node), min: 0, max: MAX });		//ok


  function updateVertPosition(index, is_true, sign1, sign2, vert_node) {
    return function(event, ui) {
      if(is_true) {
        vert[index] = 3*sign1*ui.value;
        vert[(index+2)%24] = 3*sign1*ui.value;
        vert_node.nodeValue = (ui.value).toFixed(0);
      }
      else {
        vert[index] = 3*sign1*ui.value*Math.sqrt(3.0)/2.0;
        vert[index+1] = 3*sign2*ui.value*(1.0/2.0);
        vert[(index+2)%24] = 3*sign1*ui.value*Math.sqrt(3.0)/2.0;
        vert[(index+3)%24] = 3*sign2*ui.value*(1.0/2.0);
        vert_node.nodeValue = (ui.value).toFixed(0);
      }
      setGeometry(gl, vert);
      drawScene();
    }
  }

  function drawScene() {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    var size = 2;          
    var type = gl.FLOAT;   
    var normalize = false;
    var stride = 0;        
    var offset = 0;       
    gl.vertexAttribPointer(positionAttributeLocation, size,
        type, normalize, stride, offset)
      var matrix = m3.projection(gl.canvas.clientWidth, gl.canvas.clientHeight);
    matrix = m3.translate(matrix, translation[0], translation[1]);
    gl.uniformMatrix3fv(matrixLocation, false, matrix);

    var primitiveType = gl.LINES;
    var offset = 0;
    var count = 12;
    gl.drawArrays(primitiveType, 12, 24);
    gl.drawArrays(primitiveType, 24, 36);
    gl.drawArrays(primitiveType, 36, 48);
    gl.drawArrays(primitiveType, 36, 48);
    gl.drawArrays(primitiveType, 48, 60);
    gl.drawArrays(primitiveType, 60, 72);
    gl.drawArrays(gl.TRIANGLE_FAN, offset, count);
    gl.lineWidth(3);
  }
}

function drawStatScene(vertex, coef) {
  var copy = [];
  for(var i = 0; i < 24; ++i) {
    copy.push(vertex[i]*coef)
  }
  return copy;
}


function setGeometry(gl, verticies) {
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(verticies), gl.STATIC_DRAW);
}


