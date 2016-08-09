describe('Main', function() {
    jasmine.getFixtures().fixturesPath = 'tests/spec/fixtures';

    beforeEach(function() {
        loadFixtures('board.html');
    });
    it('should create a Board instance', function() {
        spyOn(window, 'Board').and.callFake(function(element) {
            this.element = element;
            this.init = function() {
                return true;
            };
        });
        main();
        expect(window.Board).toHaveBeenCalledWith($('section.board'));
    });

    it('should create an ImageFetcher instance with Board as argument', function() {
        spyOn(window, 'ImageFetcher').and.callFake(function(board) {
            this.board = board;
            this.init = function() {
                return true;
            };
        });
        spyOn(window, 'Board').and.callFake(function() {
            return $('section.board');
        });
        main();
        expect(window.ImageFetcher).toHaveBeenCalledWith($('section.board'));
    });

    describe('fetchInit', function() {
        it('should init imgFetcher', function() {
            spyOn(window.ImageFetcher.prototype, 'init').and.callFake(function() {
                return true;
            });
            imgFetch = new ImageFetcher($('section.board'));
            fetchInit(imgFetch);
            expect(imgFetch.init).toHaveBeenCalled();
        });
    });
});
