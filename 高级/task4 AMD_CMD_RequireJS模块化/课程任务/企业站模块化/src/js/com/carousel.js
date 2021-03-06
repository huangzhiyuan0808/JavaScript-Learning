/* 定义carousel轮播模块 */

define(['jquery'], function($){

  var Carousel = (function(){
    function _Carousel($ct){
      this.$ct = $ct
      this.init()
      this.bind()
      this.autoPlay()
    }
  
    _Carousel.prototype.init = function(){
      var $imgCt = this.$imgCt = this.$ct.find('.img-ct')
      var $imgs = this.$imgs = this.$ct.find('.img-ct > li') //这里缓存的对象，不会改变
      var $preBtn = this.$preBtn = this.$ct.find('.pre')
      var $nextBtn = this.$nextBtn = this.$ct.find('.next')
      var $bullets = this.$bullets = this.$ct.find('.bullet li')
  
      var imgCount = this.imgCount = $imgs.length //img数量
      var imgWidth = this.imgWidth = $imgs.width() //img宽度
  
      this.pageIndex = 0 //需要个变量来保存当前页数
      this.isAnimate = false  //定义一个锁，防止动画还没完成的重复点击，如果当前动画没完成，return 不理
  
      $imgCt.append($imgs.first().clone())
      $imgCt.prepend($imgs.last().clone())
      $imgCt.width((imgCount + 2) * imgWidth) //真实容器的宽度，算上了clone的两张，有了宽度，后面才可以通过css或者animate实现定位
      $imgCt.css({left: -imgWidth}) //初始到图片1的位置，由于新增了img，所以目前展示的是新增的，而计划中的img在第二位，故需调整一格
    }
  
    _Carousel.prototype.bind = function(){
      var _this = this
      this.$nextBtn.click(function(e){
        _this.playNext(1)//滚动一格，抽象一下,为了清晰明了
      })
      this.$preBtn.click(function(e){
        _this.playPre(1)
      })
      this.$bullets.click(function(){
        var index = $(this).index() //当前被点击的li所处顺序
        if(index > _this.pageIndex){
          _this.playNext(index - _this.pageIndex) //当前pageIndex 是0 ，点击了index是3， 所以3 - 0 = 3，执行三次
        }else if(index < _this.pageIndex){
          _this.playPre(_this.pageIndex - index)
        }
      })
    }
  
    _Carousel.prototype.playNext = function(len){
      var _this = this
      if(this.isAnimate) return;
      this.isAnimate = true //声明动画已经开始，结束前，不接受任何点击，会被直接return
      this.$imgCt.animate({  //原先 left: '-=' + imgWidth
        left: '-=' + len*this.imgWidth  //left 已经在上面变成了 -320px， 这里每次点击，必须累加才行 left = left - imgWidth
      }, function(){  //每次动画结束后，需要立刻更新pageIndex，然后判断这次动画是否属于到了末尾，又被点击的情况
        _this.pageIndex += len  //更新pageIndex
        if(_this.pageIndex === _this.imgCount){
          _this.pageIndex = 0 //如果pageIndex到达了4（图片数量），则立即pageIndex变为0
          _this.$imgCt.css({left: -_this.imgWidth}) //同时回到初始化的时候第一张图片，即回到图片1的位置，这里使用的可是css，不是animate，所以从clone img 转化为亲生的img，肉眼看不出来
        }
        _this.setBullet() //设置指示灯
        _this.isAnimate = false //声明动画已经结束，可以接受下次点击
      })
    }
  
    _Carousel.prototype.playPre = function(len){
      var _this = this
      if(this.isAnimate) return;
      this.isAnimate = true
      this.$imgCt.animate({
        left: '+=' + len*this.imgWidth
      }, function(){
        _this.pageIndex -= len
        if(_this.pageIndex === -1){ //或者判断 pageIndex < 0,  如果本次点击动画属于第一张再往前，则此时立即跳到最后一张原始图片，即 imgCount - 1
          _this.pageIndex = _this.imgCount - 1  //pageIndex 指向原始图片最后一张，但目前展示的图片实际上却是clone的最后一张
          _this.$imgCt.css({left: -_this.imgCount*_this.imgWidth})  //因此继续用css，悄无声息地定位到真正的最后一张图片
        }
        _this.setBullet()
        _this.isAnimate = false
      })
    }
    _Carousel.prototype.setBullet = function(){
      this.$bullets  //先去除所有的class，然后给与pageIndex对应的元素添加 active
          .removeClass('active')
          .eq(this.pageIndex)
          .addClass('active')
    }
    _Carousel.prototype.autoPlay =  function(){
      var _this = this
      setInterval(function(){
        _this.playNext(1)
      }, 3000)
    }

  
    return {  //声明的变量 Carousel，最后赋值的是立即执行函数return回来的东西，立即执行函数中其他的东西，都和Carousel无关
      init: function($ct){
        $ct.each(function(index, node){
          //new Carousel($(this))
          new _Carousel($(node))
        })
      }
    }
  })()
  
  //// Carousel.init($('.carousel')) //一次性启用所有DOM中的轮播 （如果jQuery选择器匹配到了多个结果）

  return Carousel
})




