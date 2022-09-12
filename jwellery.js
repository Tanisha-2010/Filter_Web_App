ear_left_x = 0;
ear_left_y = 0;
ear_right_x = 0;
ear_right_y = 0;
necklace_x = 0;
necklace_y = 0;
nose_ring_x = 0;
nose_ring_y = 0;

function preload() {
    ear_left = loadImage("earing.png");
    ear_right = loadImage("earing.png");
    necklace = loadImage("necklace.png");
    nose_ring = loadImage("nose_ring.png");
}

function draw() {
    image(video, 0, 0, 640, 430);

    tint(tint_color);

    image(ear_left, ear_left_x, ear_left_y, 70, 100);
    image(ear_right, ear_right_x, ear_right_y, 70, 100);
    image(necklace, necklace_x, necklace_y, 350, 250);
    image(nose_ring, nose_ring_x, nose_ring_y, 200, 170);
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

        console.log("X coordinate of Right Earring : " + result[0].pose.leftEar.x);
        console.log("Y coordinate of Left Earring : " + result[0].pose.leftEar.y);

        console.log("X coordinate of Right Earring : " + result[0].pose.rightEar.x);
        console.log("Y coordinate of Right Earring : " + result[0].pose.rightEar.y);

        console.log("X coordinate of Necklace : " + result[0].pose.rightShoulder.x);
        console.log("Y coordinate of Necklace : " + result[0].pose.rightShoulder.y);

        console.log("X coordinate of Nose Ring : " + result[0].pose.nose.x);
        console.log("Y coordinate of Nose Ring : " + result[0].pose.nose.y);

        nose_ring_x = result[0].pose.nose.x + 100;
        nose_ring_y = result[0].pose.nose.y - 20;

        necklace_x = result[0].pose.rightShoulder.x + 85;
        necklace_y = result[0].pose.rightShoulder.y - 40;

        ear_left_x = result[0].pose.leftEar.x + 120;
        ear_left_y = result[0].pose.leftEar.y + 50;

        ear_right_x = result[0].pose.rightEar.x + 20;
        ear_right_y = result[0].pose.rightEar.y + 50;
    }
}

function applyTint() {
    tint_color = document.getElementById("input_tint").value;
}

function back() {
    window.location = "index.html";
}