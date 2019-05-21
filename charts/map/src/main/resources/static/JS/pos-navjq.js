$(document).ready(function () {
    //当滚动条发生滚动
    $(window).scroll(function () {
        var items = $("#right-content").find(".item");
        //把所有item获取到
        var menu = $("#left-menu");
        //获取左侧的导航
        var top = $(document).scrollTop();
        // console.log(top)
        //滚动条距离
        var currentId = ""; //滚动条现在所在位置的item id
        items.each(function () {
            //用each方法来判断，获取的item包括楼层，遍历每层楼，来判断高度。
            var m = $(this);
            //先把this放到一个变量里，每个楼层所在的对象
            var itemTop = m.offset().top - 20;
            // console.log(itemTop)
            //注意：m.offset().top代表每一个item的顶部位置
            if (top > m.offset().top) {
                currentId = "#" + m.attr("id");
            } else {
                return false;
            }
        });

        var currentLink = menu.find(".current");
        if (currentId && currentLink.attr("href") != currentId) {
            currentLink.removeClass("current");
            menu.find('[href="'+ currentId +'"]').addClass("current");
        }
    });
});

// 在页面加载完成后，我们来监听滚动条的滚动事件。1、监听到每个item距离顶部的绝对高度。2、监听到滚动条的滚动距离