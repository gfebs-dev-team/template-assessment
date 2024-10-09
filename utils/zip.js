import child_process from 'child_process'
import dayjs from 'dayjs'
import * as fs from 'fs'

const zipName = dayjs().format('YYYY_MM_DD_HHmm')
if (!fs.existsSync('exports')) {
  fs.mkdirSync('exports', { recursive: true })
}

child_process.execSync(`cd dist; zip -r ../exports/${zipName}.zip *`)
