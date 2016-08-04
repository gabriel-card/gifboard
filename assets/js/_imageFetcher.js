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
