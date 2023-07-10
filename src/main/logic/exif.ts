// ParseExifInfo 解析Exif信息
import { ExifImage } from 'exif'
import { EXIFRootObject } from '../../types'
import fs from 'fs'
import { cacheDir, cacheHttpURL } from '../index'
import * as path from 'path'

export async function ParseExifInfo(filePath: string): Promise<EXIFRootObject | null> {
  const fileNameSplit = filePath.split(path.sep)
  const fileName = fileNameSplit[fileNameSplit.length - 1]
  return new Promise((resolve, reject) => {
    try {
      new ExifImage({ image: filePath }, async function (error, exifData) {
        if (error) {
          resolve(null)
        } else {
          fs.copyFile(filePath, cacheDir + path.sep + fileName, (err) => {
            if (err) {
              resolve(null)
            }
          })
          exifData.originSrc = (await cacheHttpURL()) + '/' + fileName
          exifData.fileName = fileName
          resolve(exifData)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}

// CanvasDrawExif 绘制Exif
export function CanvasDrawExif(filePath: string) {
  console.log(filePath)
  // ParseExifInfo(filePath)
  //   .then((r) => {
  //     console.log(r.exif)
  //   })
  //   .catch((e) => {
  //     console.log(e)
  //   })
}
