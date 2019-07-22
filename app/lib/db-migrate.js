/**
 * migrate old file based db to nedb
 */

const { resolve } = require('path')
const db = require('./nedb')
const { appPath } = require('../utils/app-props')
const userConfigPath = resolve(appPath, 'electerm-user-config.json')
const savePath = resolve(appPath, 'electerm-localstorage.json')

module.exports = async () => {

}