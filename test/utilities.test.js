const { findArticleFlag } = require('../utilities')
const { assert } = require('chai')

describe('findArticleFlag()', () => {
    it('Handles arg[1] as flag', () => {
        let args = ['arg0', '-4']
        let numberOfArticles = findArticleFlag(args)
        assert.equal(numberOfArticles, 4)
    })

    it('Handles arg[2] as flag', () => {
        let args = ['arg0', 'arg1', '-9']
        let numberOfArticles = findArticleFlag(args)
        assert.equal(numberOfArticles, 9)
    })

    it('Handles various values that are not numbers and defaults to 10', () => {
        let args = ['arg0', '-[]']
        let numberOfArticles = findArticleFlag(args)
        assert.equal(numberOfArticles, 10)

        args[1] = '-false'
        numberOfArticles = findArticleFlag(args)
        assert.equal(numberOfArticles, 10)

        args[1] = '-badValue'
        numberOfArticles = findArticleFlag(args)
        assert.equal(numberOfArticles, 10)

        args[1] = '-true'
        numberOfArticles = findArticleFlag(args)
        assert.equal(numberOfArticles, 10)

        args[1] = '-[]'
        numberOfArticles = findArticleFlag(args)
        assert.equal(numberOfArticles, 10)

        args[1] = '-{}'
        numberOfArticles = findArticleFlag(args)
        assert.equal(numberOfArticles, 10)
        
        args[1] = '-'
        numberOfArticles = findArticleFlag(args)
        assert.equal(numberOfArticles, 10)
    })

    it('Handles no article flag', () => {
        let args = ['arg0']
        let numberOfArticles = findArticleFlag(args)
        assert.equal(numberOfArticles, 10)
    })

    it('Handles numbers greater than 10', () => {
        let args = ['arg0', '-100']
        let numberOfArticles = findArticleFlag(args)
        assert.equal(numberOfArticles, 10)
    })
})