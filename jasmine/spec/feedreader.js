/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /*This suite is all about the RSS feeds definitions, the allFeeds
    * variable in our application.
    */
    describe('RSS Feeds', function() {
        // Test that allFeeds variable has been defined and that it is not empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loop through each feed in the allFeeds object and ensures
         * it has a URL defined and that the URL is not empty.
         */
        it('have URL', function() {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe(0);
            });
        });

        /* Loop through each feed in the allFeeds object and ensures
         * it has a name defined and that the name is not empty.
         */
        it('have name', function() {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(0);
            });
        });
    });

    //This suite is about the menu
    describe('The menu', function() {
        let body;
        const hiddenMenu = 'menu-hidden';

        beforeEach(function() {
            body = $('body');
        });
        // Test that the menu element is hidden by default.
        it('is hidden by default', function() {
            expect(body.hasClass(hiddenMenu)).toBe(true);
        });

        /* Test that the menu changes visibility when the menu icon is clicked.
         * This test has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('click', function() {
            let menu = $('.menu-icon-link');

            menu.trigger('click');
            expect(body.hasClass(hiddenMenu)).toBe(false);
              
            menu.trigger('click');
            expect(body.hasClass(hiddenMenu)).toBe(true)
        });
    });
    
    //This suite is about initial entries
    describe('Initial Entries', function() {
        let feedsNoBeforeLoad, feeds;
        
        beforeEach(function(done) {
            feedsNoBeforeLoad = $('.feed .entry').length;
            loadFeed(1, function() {
                done();
            });
        });
        /* Test that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('are loaded with loadFeed', function() {
            expect($('.feed .entry').length).toBeGreaterThan(feedsNoBeforeLoad);
        });
    });

    //This suite is about loading new feeds
    describe('New Feed Selection', function() {
        let firstFeed, secondFeed;
        /*Load first feed and register .feed element state than load second 
        *feed as callback and register .feed element state again
        */
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = $('.feed').html();
                loadFeed(1, function() {
                    secondFeed = $('.feed').html();
                    done();
                });
            });
        });
        /* Test that when a new feed is loaded
         * by the loadFeed function the content actually changes.
         */
        it('content has changed', function(done) {
            expect(firstFeed).not.toBe(secondFeed);
            done();
        });
    });
}());
