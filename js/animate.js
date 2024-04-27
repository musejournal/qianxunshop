
    function animate(obj,target,callback) {
        // console.log(callback);
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            // 把步长值改为整数 不要出现小数问题
            var step = (target - obj.offsetLeft) / 10;
            if(step > 0) {
                step = Math.ceil(step);
            }else {
                step = Math.floor(step);
            }
            if(obj.offsetLeft == target) {
                clearInterval(obj.timer);
                // 回调函数
                if (callback) {
                    callback();// 调用函数
                }
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        },15)
    }
