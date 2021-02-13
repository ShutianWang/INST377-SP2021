 /* label the images, just for convenience, to visually track them */
 function arrayMethodDemo() {
    const array1 = [1, 2, "3", 4, 5];
    
      const listContainer = document.createElement('ul');
      const target = document.querySelector('#box1');
    target.append(listContainer);
    
      const array2 = array1.map(element => {
      const listItem = document.createElement('li');
      listItem.innerText = element;
      listContainer.append(listItem);
      return typeof element;
    })
    
    
    console.log(array2);
  }
  
  function onLoadOfPage() {
      document.addEventListener('click', (event) => {
        arrayMethodDemo()
    })
  }
  
  window.onload = onLoadOfPage;