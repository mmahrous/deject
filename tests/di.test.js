const assert = require('assert')

describe("Test DI class", () => {
    let DI
    let config = {
        factory: {
            getName: name => name,
            getFullName: (name, last) => `${name} ${last}`,
            getPersonData: data => data
        },
        register: {
            name: "Test"
        }
    }
    beforeEach(async () => {
        DI = require('../index')(config)
    })
    describe('Init DI class', () => {
        it('check if get name returns the same name', () => {
            assert.equal(DI.get('getName'), DI.get('name'))
        })
        it('check if get name new name', () => {
            DI.register('name', 'Sam')
            assert.equal(DI.get('getName'), 'Sam')
        })
        it('check if get full name', () => {
            DI.register('last', 'Sam')
            assert.equal(DI.get('getFullName'), 'Test Sam')
        })
        it('check if register an object and equal data register', () => {
            const data = {
                name: 'Jone',
                lives: 'Cairo'
            }
            DI.register('data', data)
            assert.deepEqual(DI.get('data'), data)
        })
        it('check if register an object', () => {
            const data = {
                name: 'Jone',
                lives: 'Cairo'
            }
            DI.register('data', data)
            assert.deepEqual(DI.get('getPersonData'), data)
        })
    })
})