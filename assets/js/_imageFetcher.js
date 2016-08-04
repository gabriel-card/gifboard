(function($, global, document, undefined) {
    var jsonConfig = {
        url: '/gifs.json',
        remainingCallTime: 30000
    };

    function ImageFetcher() {
        this.jsonConfig = jsonConfig;
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
                localStorage.setItem('gifboard_images', JSON.stringify(data));
            },
            error: function(error) {
                console.log(error);
            },
            timeout: config.remainingCallTime
        });
    };

    global.ImageFetcher = ImageFetcher;
})(jQuery, window, document);
