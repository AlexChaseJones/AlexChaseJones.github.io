const HEADER = 'Intersection';
const NUMBER_OF_LINES = 1580;
const MAX_LINE_HEIGHT = 1420;
const PAGE_WIDTH = 1080;
const PAGE_HEIGHT = 1920;
const LINE_SPEED = 7;
const COLORS = ['rgba(251,229,0,1)','rgba(93,199,242,1)', 'rgba(77,171,71,1)', 'rgb(103,104,109)']

let lines = [];

function init() {
  window.requestAnimationFrame(draw);
}

function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.clearRect(0, 0, 1080, 1920);

  drawLines(ctx);

  ctx.font="100px HelveticaNeue-medium";
  ctx.fillStyle = COLORS[3];
  ctx.fillText(HEADER,185,470);
  ctx.fillStyle = COLORS[1]
  ctx.fillRect(90, 400, 70, 70);
  ctx.fillStyle = COLORS[0]
  ctx.fillRect(30, 400, 70, 70);
  ctx.fillStyle = COLORS[2]
  ctx.fillRect(87, 400, 18, 70);

  window.requestAnimationFrame(draw);
}

const drawLines = (ctx) => {
	for (var i = 0; i < NUMBER_OF_LINES; i++) {
	  updateLine(i);
	  const { fillStyle, x, width, height } = lines[i];

	  ctx.fillStyle = fillStyle;
	  ctx.fillRect(x, 1920, width, -height);
	  ctx.fillRect(x, 0, width, (height / 4));
	}
}

const updateLine = (index) => {
	if (lines[index] == null || lines[index].height > lines[index].maxHeight) {
		lines[index] = {};
		lines[index].x = index * (PAGE_WIDTH / NUMBER_OF_LINES);
		lines[index].width = PAGE_WIDTH / NUMBER_OF_LINES;
		lines[index].height = (Math.random() / 3) * MAX_LINE_HEIGHT;
		lines[index].maxHeight = (MAX_LINE_HEIGHT * Math.random())
		lines[index].fillStyle = COLORS[Math.floor(Math.random() * 3)]
	}

	lines[index].height += LINE_SPEED;
}

init();
