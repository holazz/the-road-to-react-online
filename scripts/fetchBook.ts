import { resolve } from 'node:path'
import fs, { move, remove } from 'fs-extra'
import degit from 'degit'

export const fetchBook = async () => {
  const emitter = degit('the-road-to-learn-react/the-road-to-react', {
    force: true,
  })
  await emitter.clone('./.tmp')

  await move(
    resolve(process.cwd(), './.tmp/manuscript'),
    resolve(process.cwd(), './manuscript'),
    { overwrite: true }
  )

  await remove(resolve(process.cwd(), './.tmp'))

  const bookInfo = await fs.readFile(
    resolve(process.cwd(), './manuscript/Book.txt'),
    'utf-8'
  )

  return bookInfo
    .split('\n')
    .filter((item) => item.endsWith('.md'))
    .map((item) => resolve(process.cwd(), `./manuscript/${item}`))
}
