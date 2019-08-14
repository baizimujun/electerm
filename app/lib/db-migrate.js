/**
 * migrate old file based db to nedb
 */

const { resolve } = require('path')
const { dbAction } = require('./nedb')
const { appPath } = require('../utils/app-props')
const userConfigPath = resolve(appPath, 'electerm-user-config.json')
const savePath = resolve(appPath, 'electerm-localstorage.json')
const { existsSync, unlinkSync } = require('fs')
const log = require('../utils/log')
const { generate } = require('shortid')
const _ = require('lodash')

async function loadArr(arr, name) {
  await dbAction(name, 'insert', arr)
}

module.exports = async () => {
  let exist = existsSync(savePath)
  if (exist) {
    log.log('Start migrating')
    let json = require(savePath)
    let keys = Object.keys(json)
    for (let k of keys) {
      let v = json[k]
      if (_.isArray(v) && v.length && v[0].id) {
        await loadArr(v, k)
      } else {
        await dbAction('data', 'insert', {
          _id: k,
          data: v
        })
      }
    }
    unlinkSync(savePath)
  }
  let exist1 = existsSync(userConfigPath)
  if (exist1) {
    if (!exist) {
      log.log('Start migrating')
    }
    let uf = require(userConfigPath)
    await dbAction('data', 'insert', {
      _id: 'userConfig',
      data: uf
    })
  }
  if (exist || exist1) {
    log.log('End migrating')
  }
}
