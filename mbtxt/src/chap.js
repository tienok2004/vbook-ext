load('libs.js');
function execute(url) {
    var doc = Http.get(url).html('gbk');
    doc.select(".readcontent div").remove();
    var htm = doc.select(".readcontent").html();
    var next_page = doc.select('a#linkNext').attr('href')
    if(next_page.search('http') != -1){
        var doc2 = Http.get(next_page).html('gbk');
        doc2.select(".readcontent div").remove();
        htm += doc2.select(".readcontent").html();
    }
    htm = htm.replace('本章未完，点击下一页继续阅读','');
    htm = htm.replace('630shu ，最快更新植灵女王升级记最新章节！','');
    return Response.success(clean(htm));
}
