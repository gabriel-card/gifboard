describe('Main', function() {
    jasmine.getFixtures().fixturesPath = 'tests/spec/fixtures';

    beforeEach(function() {
        loadFixtures('board.html');
    });
    it('should create a Board instance', function(){
        spyOn(window, 'Board');
        main();
        expect(window.Board).toHaveBeenCalled();
    });

    it('should create an ImageFetcher instance with Board as argument', function() {
        spyOn(window, 'ImageFetcher').and.callFake(function(board) {
            this.board = board;
            this.init = function() {
                return true;
            };
        });
        spyOn(window, 'Board').and.callFake(function () {
            return $('section.board');
        });
        main();
        expect(window.ImageFetcher).toHaveBeenCalledWith($('section.board'));
    });
});
