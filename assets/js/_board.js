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
        this.renderImages(this);
        setInterval(this.renderImages, this.config.animationInterval, this);
    };

    Board.prototype.parseImages = function(stringImages) {
        return JSON.parse(stringImages) || [];
    };

    Board.prototype.updateImages = function() {
        this.images = this.parseImages(localStorage.getItem('gifboard_images'));
    };

    Board.prototype.renderImages = function(self) {
        self.updateImages();
        images = self.images;
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
