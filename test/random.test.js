const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
}) 
describe('product info', () => {
    const products = [
        {
            name: 'String',
            price: 3,
            category: 'String'
        },
        {
            name: 'String',
            price: 3,
            category: 'String'
        }
    ]

    test('price is three', () => {
        const result = listHelper.positivePrice(products)
        expect(result).toBe(3)
    })
})