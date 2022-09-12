coffee_x = 0;
coffee_y = 0;
lens_left_x = 0;
lens_left_y = 0;
lens_right_x = 0;
lens_right_y = 0;


function preload() {
    lens_left = loadImage("https://i.postimg.cc/wxnRwrzr/starbucks.png");
    lens_right = loadImage("https://i.postimg.cc/wxnRwrzr/starbucks.png");
    coffee = loadImage("coffee.png");
}

function draw() {
    image(video, 0, 0, 640, 430);

    tint(tint_color);

    image(lens_left, lens_left_x, lens_left_y, 110, 110);
    image(lens_right, lens_right_x, lens_right_y, 110, 110);
    image(coffee, coffee_x, coffee_y, 110, 110);
}

function setup() {
    canvas = createCanvas(550, 400);
    canvas.center();
    canvas.position(350, 190);

    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);

    tint_color = "";
}

function modelLoaded() {
    console.log("Model is Loaded");
}

function takeSnapshot() {
    save("image.png");
}

function gotPoses(result) {
    if (result.length > 0) {
        console.log(result);

        console.log("X coordinate of Right Lens : " + result[0].pose.leftEye.x);
        console.log("Y coordinate of Left Lens : " + result[0].pose.leftEye.y);

        console.log("X coordinate of Right Lens : " + result[0].pose.rightEye.x);
        console.log("Y coordinate of Right Lens : " + result[0].pose.rightEye.y);

        console.log("X coordinate of Coffee : " + result[0].pose.nose.x);
        console.log("Y coordinate of Coffee : " + result[0].pose.nose.y);

        coffee_x = result[0].pose.nose.x + 50;
        coffee_y = result[0].pose.nose.y + 70;

        lens_left_x = result[0].pose.leftEye.x + 100;
        lens_left_y = result[0].pose.leftEye.y - 50;

        lens_right_x = result[0].pose.rightEye.x + 50;
        lens_right_y = result[0].pose.rightEye.y - 50;
    }
}

function applyTint() {
    tint_color = document.getElementById("input_tint").value;
}

function back() {
    window.location = "index.html";
}