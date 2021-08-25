function execute(url) {
    const Burl = url.replace('?force_mobile=1','');
    const reader = 'https://fanqienovel.com/reader/';
    const idBook = Burl.split('/').pop();
    const json = Http.get('https://fanqienovel.com/api/reader/directory/detail').params({bookId: idBook}).string();
    if (json) {
        var allChap = JSON.parse(json).data.chapterListWithVolume[0];
        const list = [];
        for (var i = 0; i < allChap.length ; i++){
            var chap = allChap[i];
            list.push({
                name: chap['title'],
                url: reader+chap['itemId'],
                host: "https://fanqienovel.com"
            })
        }
        return Response.success(list);
    }
    return Response.success(Burl)
}