lip_x = 0;
lip_y = 0;
lens_left_x = 0;
lens_left_y = 0;
lens_right_x = 0;
lens_right_y = 0;

function preload() {
    lipstick_img = loadImage("https://i.postimg.cc/PxFvYgkv/l1.png");
}

function draw() {
    image(video, 0, 0, 640, 430);

    tint(tint_color);

    image(lipstick_img, lip_x, lip_y, 110, 50);

    fill(211, 233, 208);
    stroke(101, 177, 54);
    circle(lens_left_x, lens_left_y, 90);

    fill(211, 233, 208);
    stroke(101, 177, 54);
    circle(lens_right_x, lens_right_y, 90);

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

        console.log("X cordinate of Lip :" + result[0].pose.nose.x);
        console.log("Y coordinate of Lip : " + result[0].pose.nose.y);

        console.log("X coordinate of Left Lens : " + result[0].pose.leftEye.x);
        console.log("Y coordinate of Left Lens : " + result[0].pose.leftEye.y);

        console.log("X coordinate of Right Lens : " + result[0].pose.rightEye.x);
        console.log("Y coordinate of Right Lens : " + result[0].pose.rightEye.y);

        lens_left_x = result[0].pose.leftEye.x + 135;
        lens_left_y = result[0].pose.leftEye.y + 10;

        lens_right_x = result[0].pose.rightEye.x + 80;
        lens_right_y = result[0].pose.rightEye.y + 10;

        lip_x = result[0].pose.nose.x + 53;
        lip_y = result[0].pose.nose.y + 57;
    }
}


function applyTint() {
    tint_color = document.getElementById("input_tint").value;
}


function back() {
    window.location = "index.html";
}