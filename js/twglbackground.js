import * as twgl from "../vendor/twgl-full.module.js";

const vs = `attribute vec4 position;

void main() {
  gl_Position = position;
}`;

const fs = `precision mediump float;

uniform vec2 resolution;
uniform float time;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  float color = 0.0;
  vec3 col = 0.5 + 0.5*cos(time+uv.xyx+vec3(0.,2.,4.));
  gl_FragColor = vec4(col, .01 );
}
`;

const gl = document.querySelector("#twglbg").getContext("webgl", { preserveDrawingBuffer: true, premultipliedAlpha: true });

const programInfo = twgl.createProgramInfo(gl, [vs, fs]);

const arrays = {
	position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]
};
const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

function render(time) {
	twgl.resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	const uniforms = {
		time: time * 0.001,
		resolution: [gl.canvas.width, gl.canvas.height]
	};

	gl.useProgram(programInfo.program);
	twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
	twgl.setUniforms(programInfo, uniforms);
	twgl.drawBufferInfo(gl, bufferInfo);

	requestAnimationFrame(render);
}
requestAnimationFrame(render);
