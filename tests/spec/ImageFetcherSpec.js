describe('ImageFetcher', function() {
    jasmine.getJSONFixtures().fixturesPath = 'tests/spec/fixtures';
    beforeEach(function() {
        this.board = new Board($('section.board'));
        this.imageFetcher = new ImageFetcher(this.board);
        this.gifsJson = getJSONFixture('gifs.json');
    });

    it('should not be falsy', function(){
        expect(this.imageFetcher).toBeTruthy();
    });

    describe('init', function() {
        it('should call getJson', function() {
            spyOn(this.imageFetcher, 'getJson');
            this.imageFetcher.init();

            expect(this.imageFetcher.getJson).toHaveBeenCalled();
        });
    });

    describe('getJson', function() {
        describe('onSuccess', function(){

            beforeEach(function(){
                spyOn($, 'ajax').and.callFake(function(e) {
                    e.success({});
                });
            });

            it('should call saveJson', function() {
                spyOn(localStorage, 'setItem');
                spyOn(this.imageFetcher, 'saveJson');
                this.imageFetcher.getJson(this.imageFetcher.jsonConfig);

                expect(this.imageFetcher.saveJson).toHaveBeenCalled();
            });

            it('should call board.updateImages if saveJson returns true', function() {
                spyOn(this.imageFetcher.board, 'updateImages');
                spyOn(this.imageFetcher, 'saveJson').and.callFake(function() {
                    return true;
                });

                this.imageFetcher.getJson(this.imageFetcher.jsonConfig);
                expect(this.imageFetcher.board.updateImages).toHaveBeenCalled();
            });

            it('should call console.log if saveJson returns false', function() {
                spyOn(this.imageFetcher, 'saveJson').and.callFake(function() {
                    return false;
                });
                spyOn(console, 'log');
                this.imageFetcher.getJson(this.imageFetcher.jsonConfig);

                expect(console.log).toHaveBeenCalled();
            });
        });

        describe('onError', function() {
            beforeEach(function(){
                spyOn($, 'ajax').and.callFake(function(e) {
                    e.error({});
                });
            });

            it('should log error if ajax errored', function() {
                spyOn(console, 'log');

                this.imageFetcher.getJson(this.imageFetcher.jsonConfig);

                expect(console.log).toHaveBeenCalled();
            });
        });
    });
    describe('saveJson', function() {
        it('should call setItem if cached imgs are different then new ones', function() {
            spyOn(localStorage, 'getItem').and.callFake(function() {
                return '["aeho"]';
            });
            spyOn(localStorage, 'setItem');

            res = this.imageFetcher.saveJson(this.gifsJson);

            expect(localStorage.setItem).toHaveBeenCalled();
            expect(res).toBe(true);
        });

        it('should return false if cached imgs are equal then new ones', function() {
            var self = this;
            spyOn(localStorage, 'getItem').and.callFake(function() {
                return JSON.stringify(self.gifsJson);
            });
            res = this.imageFetcher.saveJson(this.gifsJson);

            expect(res).toBe(false);
        });
    });
});
