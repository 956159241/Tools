// 初始化界面信息
function init() {
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
    // 例子： 
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
    // (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18 
    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1
            .length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[
                k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    const today = new Date();
    const lunarDate = calendar.solar2lunar(today.getFullYear(), today.getMonth() + 1, today.getDate());
    const solarNode = document.getElementsByClassName('solar-calendar')[0];
    const termsNode = document.getElementsByClassName('terms')[0];
    const lunarNode = document.getElementsByClassName('lunar-calendar')[0];
    solarNode.innerHTML = `${today.Format('yyyy/MM/dd hh:mm:ss')}`;
    lunarNode.innerHTML = `${lunarDate.IMonthCn} ${lunarDate.IDayCn} ${lunarDate.ncWeek}`;
    termsNode.innerHTML = lunarDate.Term;
}

function addEventListener() {
    const isHorizontal = document.getElementsByClassName('vertical')[0].style.display === 'none';
    const showSettingBtn = document.getElementsByClassName('show-setting')[0];
    const hideSettingBtn = document.getElementsByClassName('hide-setting')[0];
    const setting = document.getElementsByClassName('setting')[0];

    showSettingBtn.addEventListener('click', function () {
        setting.style.display = 'block';
    });

    hideSettingBtn.addEventListener('click', function () {
        setting.style.display = 'none';
    });

    // 设置背景图片透明度
    const progress = document.getElementsByClassName('progress-opacity')[0];
    progress.onchange = function (x) {
        const picText = document.getElementsByClassName(`pic-text`)[0];
        picText.style.opacity = x.target.value / 100;
    }

    // 设置背景图片
    const settingFile = document.getElementsByClassName('setting-file')[0];
    settingFile.addEventListener('change', function (x) {
        const picText = document.getElementsByClassName('pic-text')[0];
        if (x.target.value) {
            picText.style.backgroundImage = `url('${x.target.value.replaceAll('\\', '\\\\')}')`;
        }
    });


    // 设置作者
    const authorContent = document.getElementsByClassName('author-content')[0];
    authorContent.addEventListener('change', function (x) {
        const author = document.getElementsByClassName(`${isHorizontal ? 'horizontal-author' : 'author'}`)[0];
        if (x.target.value) {
            author.innerHTML = x.target.value;
        }
    });

    // 设置标题
    const titleContent = document.getElementsByClassName('title-content')[0];
    titleContent.addEventListener('change', function (x) {
        const title = document.getElementsByClassName(`${isHorizontal ? 'horizontal-title' : 'title'}`)[0];
        if (x.target.value) {
            title.innerHTML = x.target.value;
        }
    });

    // 设置原文
    const originContent = document.getElementsByClassName('origin-content')[0];
    originContent.addEventListener('change', function (x) {
        const origin = document.getElementsByClassName(`${isHorizontal ? 'horizontal-origin' : 'origin'}`)[0];
        if (!isHorizontal) {
            if (x.target.value) {
                origin.innerHTML = x.target.value;
            }
        } else {
            const splitParagraph = x.target.value.split('.');
            const parent = origin.parentNode;
            for (const para of splitParagraph) {
               //  parent.insertBefore();
            }   
        }

    });

    // 设置译文
    const translateContent = document.getElementsByClassName('translate-content')[0];
    translateContent.addEventListener('change', function (x) {
        const translate = document.getElementsByClassName(`${isHorizontal ? 'horizontal-translate' : 'translate'}`)[0];
        if (x.target.value) {
            translate.innerHTML = x.target.value;
        }
    });
}