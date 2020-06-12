const assert = require('assert');
const getResultSport = require('../src/app');


describe('Horse Racing', () => {
    describe('getResult', () => {
        it('should return the result for finished horse racing event', async () => {
            const result = await getResultSport.get(getResultSport.options.sport.HORSE_RACING, 'newbury', new Date('2020-01-15'), {
                runners: [
                    'Bond\'s Lover',
                    'Martha Brae',
                    'Crossgalesfamegame',
                    'Getaway Totherock ',
                    'Aimee De Sivola ',
                    'Thats The Truth',
                    'Urban Artist',
                    'Just Henny',
                    'Fforbidden Love',
                    'Scarlett Of Tara'
                ],
            });
            assert.strictEqual(result.status, getResultSport.options.status.FINISHED);
            // region 1 runner
            assert.strictEqual(result.runners[0].name, 'Bond\'s Lover');
            assert.strictEqual(result.runners[0].position, 1);
            assert.strictEqual(result.runners[0].number, 6);
            // endregion
            // region 2 runner
            assert.strictEqual(result.runners[1].name, 'Martha Brae');
            assert.strictEqual(result.runners[1].position, 2);
            assert.strictEqual(result.runners[1].number, 4);
            // endregion
            // region 3 runner
            assert.strictEqual(result.runners[2].name, 'Crossgalesfamegame');
            assert.strictEqual(result.runners[2].position, 3);
            assert.strictEqual(result.runners[2].number, 2);
            // endregion
            // region 4 runner
            assert.strictEqual(result.runners[3].name, 'Getaway Totherock');
            assert.strictEqual(result.runners[3].position, 4);
            assert.strictEqual(result.runners[3].number, 3);
            // endregion
            // region 5 runner
            assert.strictEqual(result.runners[4].name, 'Aimee De Sivola');
            assert.strictEqual(result.runners[4].position, 5);
            assert.strictEqual(result.runners[4].number, 1);
            // endregion
            // region 6 runner
            assert.strictEqual(result.runners[5].name, 'Thats The Truth');
            assert.strictEqual(result.runners[5].position, 6);
            assert.strictEqual(result.runners[5].number, 10);
            // endregion
            // region 7 runner
            assert.strictEqual(result.runners[6].name, 'Urban Artist');
            assert.strictEqual(result.runners[6].position, 7);
            assert.strictEqual(result.runners[6].number,  11);
            // endregion
            // region 8 runner
            assert.strictEqual(result.runners[7].name, 'Just Henny');
            assert.strictEqual(result.runners[7].position, 8);
            assert.strictEqual(result.runners[7].number, 8);
            // endregion
            // region 9 runner
            assert.strictEqual(result.runners[8].name, 'Fforbidden Love');
            assert.strictEqual(result.runners[8].position, null);
            assert.strictEqual(result.runners[8].number, 7);
            // endregion
            // region 10 runner
            assert.strictEqual(result.runners[9].name, 'Scarlett Of Tara');
            assert.strictEqual(result.runners[9].position, null);
            assert.strictEqual(result.runners[9].number, 9);
            // endregion
        });
    });
});
