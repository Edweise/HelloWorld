/*请用rest参数编写一个sum()函数，接收任意个参数并返回它们的和*/
function sum(...rest) {
   var n = 0;
   for(var i in rest){
     n = n + rest[i];
  }
  return n;
}

//map()方法作为高阶函数，事实上它把运算规则抽象了，因此，我们不但可以计算简单的f(x)=x^2,还可以计算任意复杂的函数
function pow(x){
   return x*x;
}
var arr=[1,2,3,4,5];
arr.map(pow);//[1,4,9,16,25]

//把Number类型的array转换成字符串
var arr=[1,2,3,4,5];
arr.map(String);//['1','2','3','4','5']

//用map把字符串转换成整数
'use strict'
var arr=['1','2','3'];
var r;
function returnInt(x){
   return parseInt(x,10);
};
r = arr.map(returnInt);

//reduce()方法
//对array累加求和
var arr=[1,3,5,7,9];
arr.reduce(function(x,y){
   return x+y;
});

//filter()方法，用于把Array的某些元素过滤掉，然后返回剩下的元素
//和map()不同的是，filter()把传入的函数依次作用于每个元素，然后根据返回值是true还是false决定保留还是丢弃该元素
var arr=[1,2,4,5,6];
var r= arr.filter(function(x){
   return x % 2 !== 0;
});
r;//[1,5]

//把一个array中的空字符串删掉
var arr = ['A', '', 'B', null, undefined, 'C', '  '];
var r = arr.filter(function (s) {
    return s && s.trim(); // 注意：IE9以下的版本没有trim()方法
});
arr; // ['A', 'B', 'C']

