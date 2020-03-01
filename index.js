const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
  console.log("Let's get this party started");
} else {
  alert("No hay soporte en este dispositivo");
}

navigator.mediaDevices
  .getUserMedia({
    video: {
      facingMode: { exact: "environment" }
    }
  })
  .then(stream => {
    video.srcObject = stream;
  });

let dimensiones = null;
video.addEventListener("loadeddata", () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  setInterval(() => {
    filterBlue();
  }, 40);
});

const filterBlue = () => {
  ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  const imageData = ctx.getImageData(0, 0, video.videoWidth, video.videoHeight);
  console.log(imageData);

  for (let i = 0; i < imageData.data.length; i += 4) {
    const red = imageData.data[i];
    const green = imageData.data[i + 1];
    const blue = imageData.data[i + 2];

    if (!(blue > 40 && blue > green && blue > red)) {
      const prod = Math.floor(0.2989 * red + 0.587 * green + 0.114 * blue);
      imageData.data[i] = prod;
      imageData.data[i + 1] = prod;
      imageData.data[i + 2] = prod;
    }
  }
  ctx.putImageData(imageData, 0, 0);
};
