
const { appPath } = require('../utils/app-props')
const { resolve } = require('path')
const Datastore = require('nedb')
const db = {}
const reso = (name) => {
  return resolve(appPath, 'electerm', `electerm.${name}.nedb`)
}
const tables = [
  'bookmarks',
  'history',
  'jumpHosts',
  'bookmarkGroups',
  'themes',
  'lastStates',
  'userConfigs',
  'data',
  'sessions'
]

tables.forEach(table => {
  db[table] = new Datastore({
    filename: reso(table),
    autoload: true
  })
})

const dbAction = (dbName, op, ...args) => {
  return new Promise((resolve, reject) => {
    db[dbName][op](...args, (err, result) => {
      if (err) {
        return reject(err)
      }
      resolve(result)
    })
  })
}

module.exports ={
  dbAction,
  tables
}