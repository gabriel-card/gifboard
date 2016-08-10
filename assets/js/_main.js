var fetchInit = function(imgFetch) {
    imgFetch.init();
};
var main = function() {
    var board = new Board($('section.board'));
    board.init();
    var imgFetch = new ImageFetcher(board);
    setInterval(fetchInit, 30000, imgFetch);
};
$(main);
