import Jimp from "jimp";

const imgPath = __dirname + "/../assets/img.png";
const logoPath = __dirname + "/../assets/logo.png";
const resultPath = __dirname + "/../assets/result.png";

function addWatermark(image: Jimp) {
  return Jimp.read(logoPath).then((logo) => {
    logo.color([{ apply: "mix", params: ["#000", 50] }]);
    const midX = image.getWidth() / 2 - logo.getWidth() / 2;
    const midY = image.getHeight() / 2 - logo.getHeight() / 2;
    return image.composite(logo, midX, midY, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 0.5,
      opacityDest: 1,
    });
  });
}

Jimp.read(imgPath).then(addWatermark).then((image) =>
  image.write(resultPath)
)

