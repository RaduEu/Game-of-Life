size = 1024;

n = 128;

dict = {};

function setup() {
  createCanvas(size, size);
  background(220);
  fill(128, 32, 256);
  draw_squares();
}

function draw() {}

function draw_squares() {
  background(220);

  for (i = 0; i < n; i++) {
    line((i * size) / n, 0, (i * size) / n, size);
    line(0, (i * size) / n, size, (i * size) / n);
  }

  for (var c in dict) {
    d = decode_cell(c);
    x = d[0];
    y = d[1];

    //print(x,y)

    square((x * size) / n, (y * size) / n, size / n);
  }
}

function mouseClicked(x, y) {
  //print(mouseX,mouseY)
  cellX = int((mouseX * n) / size);
  cellY = int((mouseY * n) / size);

  val = encode_cell(cellX, cellY);

  if (val in dict) delete dict[val];
  else dict[encode_cell(cellX, cellY)] = 1;

  draw_squares();
}

function keyPressed() {
  if (key == "n") {
    next_gen();
    draw_squares();
  }
}

function encode_cell(x, y) {
  return x * n + y;
}

function decode_cell(num) {
  return [int(num / n), num % n];
}

function next_gen() {
  no_neighbours = {};

  for (var cell in dict) {
    d = decode_cell(cell);
    x = d[0];
    y = d[1];

    //print(x,y)

    num = 0;

    for (i = -1; i < 2; i++)
      for (j = -1; j < 2; j++) {
        if (x + i >= 0 && x + i < n && y + j >= 0 && y + j < n) {
          num = encode_cell(x + i, y + j);
          if (num in no_neighbours) no_neighbours[num]++;
          else no_neighbours[num] = 1;
        }
      }
  }

  for (var c in no_neighbours) {
    d = decode_cell(c);
    x = d[0];
    y = d[1];
    nn = no_neighbours[c];

    if (c in dict) {
      if (nn <= 2 || nn > 4) {
        delete dict[c];
      }
    } else {
      if (nn == 3) {
        dict[c] = 1;
      }
    }
  }
}
