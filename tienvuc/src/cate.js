function execute(url, page) {
    if(!page) page = '1';
    var json = Http.get('https://tienvuc.com/api/categories/'+url+'/books').params({
        slug : url,
        page: page,
        limit:10
    }).string();
    var data = JSON.parse(json)
    if (json){
        const allPage = Math.floor(data.totalDocs/10) + 1;
        if (parseInt(page) < allPage){
            var next = parseInt(page) + 1;
        }
        var list = [];
        var allBook = data.docs;
        for (var i in allBook){
            var book = allBook[i];
            if(book.vip === true) var vip = "【Truyện VIP】 ";
            else var vip = '';
            list.push({
                name: book.name,
                link: book.slug,
                cover: book.cover.domain+'/'+book.cover.url,
                description: vip+book.author.name,
                host: 'https://tienvuc.com',
            })
        }
        return Response.success(list, next.toString())
    }
}