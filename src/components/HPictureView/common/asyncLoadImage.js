/**
 * 异步加载图片
 */

export default function asyncLoadImage(url) {
  return new Promise(function(resolve, reject) {
    var image = new Image();
    image.onload = function() {
      resolve(image);
    };
    image.onerror = function(err) {
      reject(`图片加载错误，图片地址为${url}`);
    };
    image.src = url;
  });
}
