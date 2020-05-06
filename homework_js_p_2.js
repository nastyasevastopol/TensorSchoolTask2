/**
 * Фунция перемешивания случайным образом элементов массива
 * @param {array} array
 * 
 * @returns {array} Массив-результат с перемешанными элементами 
 */
function mixArray(array) {
  let currentIndex = array.length, temporaryValue, randomIndex ;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

let arr1 = [];
let start = 1;
while (start <= 100) {
  arr1.push(start++);
}
mixArray(arr1);
//alert(arr1);
let arr2 = arr1.slice();
arr2.reverse();
//alert (arr2);
let arr3 = arr1.map(function(item, index) {
  return item - arr2[index];
});
//alert (arr3);
//alert (arr3.length);
let average = arr3.reduce((sum, current) => sum + current, 0) / arr3.length;
//alert (average);