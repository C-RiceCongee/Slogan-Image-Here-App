import * as net from 'net'

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer()

    server.once('error', () => {
      // 端口被占用
      resolve(false)
    })

    server.once('listening', () => {
      // 端口可用
      server.close()
      resolve(true)
    })

    server.listen(port)
  })
}

async function findAvailablePort(startPort: number, endPort: number): Promise<number | null> {
  for (let port = startPort; port <= endPort; port++) {
    const isAvailable = await isPortAvailable(port)
    if (isAvailable) {
      return port
    }
  }
  return null
}

// 查询 3000-4000 之间的空闲端口

export function GenPort() {
  let IDLPort: number | any = null
  console.log({ IDLPort })
  return async function () {
    if (IDLPort) return IDLPort
    IDLPort = await findAvailablePort(3000, 10000)
    return IDLPort
  }
}
export const BiGenProt = GenPort()
