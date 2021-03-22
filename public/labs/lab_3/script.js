 /* label the images, just for convenience, to visually track them */
     function listOfPictures(){
     const pictureArray = document.querySelectorAll('.mochi');
     const arrayPicture = document.querySelector('ul');
     const allPicture = document.querySelectorAll('li');
    /* configuration */
    let width = 130; // image width
    let count = 3; // visible images count
    let position = 0; // ribbon scroll position

      carousel.querySelector('.left').onclick = function toTheLeft() {
      position += width * count;
      position = Math.min(position, 0)
      arrayPicture.style.marginLeft = position + 'px';
    };

      carousel.querySelector('.right').onclick = function toTheRight() {
      // shift right
      position -= width * count;
      // can only shift the ribbbon for (total ribbon length - visible count) images
      position = Math.max(position, -width * (allPictures.length - count));
      arrayPicture.style.marginLeft = position + 'px';
    };
}

window.onload = listOfPictures;