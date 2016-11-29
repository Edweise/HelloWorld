/*请用rest参数编写一个sum()函数，接收任意个参数并返回它们的和*/
function sum(...rest) {
   var n = 0;
   for(var i in rest){
     n = n + rest[i];
  }
  return n;
}
