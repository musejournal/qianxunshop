window.addEventListener('load',function(){
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter',function(){
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave',function(){
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function(){
            arrow_r.click();
        },2000)
    })
    // 动态生成小圆圈
    var ul = document.querySelector('ul');
    var ol = document.querySelector('ol');
    // console.log(ul.children.length);
    for (var i = 0; i < 4; i++) {
        var li = document.createElement('li');
        li.setAttribute('index',i);
        ol.appendChild(li);
        li.innerHTML ='●';
        li.addEventListener('click',function() {
            for (var i =0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 点击移动图片
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            // console.log(focusWidth);
            // console.log(index);
            animate(ul,-index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    // 克隆第一张图片放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 点击右侧按钮
    var num = 0;
    var circle = 0;//控制小圆圈
    // flag节流阀
    var flag = true;
    arrow_r.addEventListener('click',function(){
        if(flag) {
            flag = false;
        // 如故走到最后一张复制的图片，快速复原left=0    
        if(num == ul.children.length-1) {
            ul.style.left = 0;
            num = 0;
        }    
        num++;
        animate(ul,-num * focusWidth,function() {
            flag = true
        });
        circle++;
        if (circle == ol.children.length) {
            circle = 0;
        }
        circleChange();
        }
    })
    // 左侧按钮
    arrow_l.addEventListener('click',function(){
        // 如故走到最后一张复制的图片，快速复原left=0
        if(flag) {
            flag = false;
            if(num == 0) {
                num = ul.children.length -1;
                ul.style.left = num * focusWidth + 'px';
            }
            num--;
            animate(ul,-num * focusWidth,function() {
                flag = true
            });
            circle--;
            if (circle < 4) {
                circle = 3;
            }
            circleChange();
        }
    })
    function circleChange() {
        for(var i =0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current'
    }
    // 自动播放
    // var timer = setInterval(function(){
    //     arrow_r.click();
    // },2000)
})