var gl;
var points = [];
var colors = [];

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

 
    var vertices = [
        vec3(-0.5, -0.5, 0.0),
        vec3(-0.5, 0.5, 0.0),
        vec3(0.5, 0.5, 0.0),
        vec3(0.5, -0.5, 0.0)
    ];

    
    var verticeColor = [
        vec3(1.0, 0.0, 0.0), // Red
        vec3(0.0, 1.0, 0.0), // Green
        vec3(0.0, 0.0, 1.0), // Blue
        vec3(1.0, 1.0, 1.0)  // White
    ];

 
    triangleColor(vertices[0], verticeColor[0]);
    triangleColor(vertices[1], verticeColor[1]);
    triangleColor(vertices[2], verticeColor[2]);
    triangleColor(vertices[0], verticeColor[0]);
    triangleColor(vertices[2], verticeColor[2]);
    triangleColor(vertices[3], verticeColor[3]);

    // Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

 
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

   
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    render();
};

function triangleColor(a, color) {
    points.push(a);
    colors.push(color);
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length);
}
