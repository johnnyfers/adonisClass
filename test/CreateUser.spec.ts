import test from 'japa'
import User from '../app/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Welcome', (group) => {

    group.beforeEach(async () => {
        await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
        await Database.rollbackGlobalTransaction()
    })

    test('create an user', async (assert) => {
        const user = new User()

        user.username = 'adonis.com'
        user.email = 'virk@nisjss.com'
        user.password = 'secret'

        const saved = await user.save()

        assert.equal(user.username, saved.username)
    })

    test('ensure user password gets hashed during save', async (assert) => {
        const user = new User()

        user.username = 'adonis.com'
        user.email = 'virk@adonisjss.com'
        user.password = 'secret'

        await user.save()

        assert.notEqual(user.password, 'secret')
    })
})
