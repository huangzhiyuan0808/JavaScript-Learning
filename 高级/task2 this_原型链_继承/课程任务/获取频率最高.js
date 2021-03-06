String.prototype.getMostOften = function(){
  //声明空对象，和只有一个值的数组（数组是对象，便于后面存储其他属性）
  var obj = {}, temp = [0]
  //遍历调用其的this字符串，如果obj有当前属性，则 +1，没有则创建当前属性，并赋初值为 1
  for(var i = 0; i < this.length; i++){
    if(obj[this[i]]){
      obj[this[i]]++
    }else{
      obj[this[i]] = 1
    }
  }
  //得到对象后，格式如： {a: 2, b:3, c:1}
  //接着遍历对象，当前属性值如果大于temp数组存的值，则去覆盖temp数组，同时给temp数组（对象）添加key属性，用于存储字符名
  for(var key in obj){
    if(obj[key] > temp[0]){
      temp[0] = obj[key]
      temp.key = key
    }
  }
  //如此便能迭代出次数最高的字符
  return '出现最多次的是：' + temp.key + '，次数是：' + temp[0]
}

var str = 'ahbbccdeddddfg';
var ch = str.getMostOften();
console.log(ch); //d , 因为d 出现了5次 