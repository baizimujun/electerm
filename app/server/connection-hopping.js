/**
 * Connection hopping
 */

const fp = require('find-free-port')
const { Client } = require('@electerm/ssh2')

function findPort () {
  return new Promise((resolve, reject) => {
    fp(16220, '127.0.0.1', function (err, freePort) {
      if (err) {
        reject(err)
      } else {
        resolve(freePort)
      }
    })
  })
}

function connect (hostConfig, nextHostConfig, prevStream) {
  return findPort()
    .then(port => {
      return new Promise((resolve, reject) => {
        let conn1 = new Client()
        conn1.on('ready', () => {
          conn1.forwardOut(
            '127.0.0.1',
            port,
            nextHostConfig.host || nextHostConfig.Host,
            nextHostConfig.port || nextHostConfig.Port,
            (err, stream) => {
              if (err) {
                conn1.end()
                return reject(err)
              }
              return stream
            }
          )
        }).connect({
          ...hostConfig,
          sock: prevStream
        })
      })
    })
}

module.exports = async function (hosts, targetHost) {
  let prevStream
  for (let i = 0, len = hosts.length; i < len; i++) {
    let current = hosts[i]
    let nextHost = hosts[i] || targetHost
    prevStream = await connect(current, nextHost, prevStream)
  }
  return prevStream
}
