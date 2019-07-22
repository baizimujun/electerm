
const { appPath } = require('../utils/app-props')
const { resolve } = require('path')
const Datastore = require('nedb')
const db = {}
db.bookmarks = new Datastore({
  filename: resolve(appPath, 'electerm', 'electerm.bookmarks.nedb'),
  autoload: true
})
db.history = new Datastore({
  filename: resolve(appPath, 'electerm', 'electerm.history.nedb'),
  autoload: true
})
db.jumpHosts = new Datastore({
  filename: resolve(appPath, 'electerm', 'electerm.jumphosts.nedb'),
  autoload: true
})
db.bookmarkGroups = new Datastore({
  filename: resolve(appPath, 'electerm', 'electerm.bookmarkgroups.nedb'),
  autoload: true
})
db.themes = new Datastore({
  filename: resolve(appPath, 'electerm', 'electerm.themes.nedb'),
  autoload: true
})
db.lastStates = new Datastore({
  filename: resolve(appPath, 'electerm', 'electerm.laststates.nedb'),
  autoload: true
})
db.userConfigs = new Datastore({
  filename: resolve(appPath, 'electerm', 'electerm.userconfigs.nedb'),
  autoload: true
})
db.data = new Datastore({
  filename: resolve(appPath, 'electerm', 'electerm.data.nedb'),
  autoload: true
})

module.exports = (dbName, op, ...args) => {
  return new Promise((resolve, reject) => {
    db[dbName][op](...args, (err, result) => {
      if (err) {
        return reject(err)
      }
      resolve(result)
    })
  })
}
