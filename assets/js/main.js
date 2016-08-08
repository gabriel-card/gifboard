(function($, global, document, undefined) {
    var jsonConfig = {
        url: '/gifs.json',
        remainingCallTime: 30000
    };

    function ImageFetcher(board) {
        this.jsonConfig = jsonConfig;
        this.board = board;
    }

    ImageFetcher.prototype.init = function() {
        this.getJson(this.jsonConfig);
    };

    ImageFetcher.prototype.getJson = function(config) {
        var self = this;
        $.ajax({
            url: config.url,
            dataType: 'json',
            success: function(data) {
                var newImages = self.saveJson(data);
                if(newImages) {
                    self.board.init();
                } else {
                    console.log('No image updates.');
                }
            },
            error: function(error) {
                console.log(error);
            },
            timeout: config.remainingCallTime
        });
    };

    ImageFetcher.prototype.saveJson = function(data) {
        var cache = localStorage.getItem('gifboard_images');
        var dataString = JSON.stringify(data);
        var res = false;

        if(cache != dataString) {
            localStorage.setItem('gifboard_images', dataString);
            res = true;
        }
        return res;
    };

    global.ImageFetcher = ImageFetcher;
})(jQuery, window, document);

(function($, global, document, undefined) {

    function Board(element) {
        this.container = element;
        this.father = element.find('div.image--father');
        this.child = this.father.find('div.image--child');
        this.childIndex = false;
        this.fatherIndex = false;
    }

    Board.prototype.init = function() {
        images = this.parseImages(localStorage.getItem('gifboard_images'));
        this.renderImages(images);
    };

    Board.prototype.parseImages = function(stringImages) {
        return JSON.parse(stringImages);
    };

    Board.prototype.renderImages = function(images) {
        this.childIndex = this.randomInt(0, images.length - 1);
        this.fatherIndex = this.childIndex + 1;
        if(this.fatherIndex >= images.length) {
            this.fatherIndex = 0;
        }

        this.child.css('background-image', 'url(' + images[this.childIndex] + ')');
        this.father.css('background-image', 'url(' + images[this.fatherIndex] + ')');
    };

    Board.prototype.randomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    global.Board = Board;
})(jQuery, window, document);

var main = function() {
    var board = new Board($('section.board'));
    var imgFetch = new ImageFetcher(board);
    imgFetch.init();
};
$(main);
