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
                    self.board.updateImages();
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
        this.father = element.find('.board__image.image--father');
        this.child = element.find('.board__image.image--child');
        this.images = [];
        this.childIndex = false;
        this.fatherIndex = false;
        this.config = { animationInterval: 8000 };
    }

    Board.prototype.init = function() {
        this.updateImages();
        this.renderImages(this.images, this);
        setInterval(this.renderImages, this.config.animationInterval, this.images, this);
    };

    Board.prototype.parseImages = function(stringImages) {
        return JSON.parse(stringImages) || [];
    };

    Board.prototype.updateImages = function() {
        this.images = this.parseImages(localStorage.getItem('gifboard_images'));
    };

    Board.prototype.renderImages = function(images, self) {
        if(!images.length) {
            return console.log('no images to be displayed!');
        }
        if(self.childIndex !== false) {
            self.childIndex++;
            if(self.childIndex >= images.length) {
                self.childIndex = 0;
            }
        } else {
            self.childIndex = self.randomInt(0, images.length - 1);
        }
        self.fatherIndex = self.childIndex + 1;
        if(self.fatherIndex >= images.length) {
            self.fatherIndex = 0;
        }

        self.child.css('background-image', 'url(' + images[self.childIndex] + ')');
        self.father.css('background-image', 'url(' + images[self.fatherIndex] + ')');
    };

    Board.prototype.randomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    global.Board = Board;
})(jQuery, window, document);

var fetchInit = function(imgFetch) {
    imgFetch.init();
};
var main = function() {
    var board = new Board($('section.board'));
    board.init();
    var imgFetch = new ImageFetcher(board);
    fetchInit(imgFetch);
    setInterval(fetchInit, 30000, imgFetch);
};
$(main);
