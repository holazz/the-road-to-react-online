import { basename, join, relative } from 'node:path'
import fs from 'fs-extra'
import { fetchBook } from './fetchBook'

interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
}

export async function generateSidebar() {
  const sidebar: SidebarItem[] = []
  const bookList = await fetchBook()
  let pIndex = -1

  for (let i = 0; i < bookList.length; i++) {
    let content = await fs.readFile(bookList[i], 'utf-8')
    const splitContent = getSplitContent(content)
    const title = getTitle(content)!

    if (splitContent && content.startsWith(splitContent)) {
      const newFileName = title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(`'s`, '')

      await fs.writeFile(
        getNewFilePath(bookList[i], newFileName),
        splitContent,
        'utf-8'
      )

      content = levelUpHeading(content.replace(splitContent, ''))
      await fs.writeFile(bookList[i], content, 'utf-8')

      sidebar.push({
        text: title,
        link: generateLink(getNewFilePath(bookList[i], newFileName)),
        items: [
          {
            text: getTitle(content)!,
            link: generateLink(bookList[i]),
          },
        ],
      })
      pIndex++
    } else if (title) {
      sidebar.push({
        text: title,
        link: generateLink(bookList[i]),
      })
      pIndex++
    } else {
      content = levelUpHeading(content)

      await fs.writeFile(bookList[i], content, 'utf-8')

      sidebar[pIndex].items!.push({
        text: getTitle(content)!,
        link: generateLink(bookList[i]),
      })
    }
  }

  return sidebar
}

function generateLink(path: string) {
  return join('/', relative(process.cwd(), path))
}

function getNewFilePath(refPath: string, name: string) {
  return refPath.replace(basename(refPath), `${name}.md`)
}

function getTitle(content: string) {
  return content.match(/^#(?!#)(.+)/)?.[1].trim()
}

function getSplitContent(content: string) {
  return content.match(/^#(?!#)([\s\S]*?\n)(?=##(?!#))/gm)?.[0]
}

function levelUpHeading(content: string) {
  return content.replace(/^##+/gm, (s) => s.slice(1))
}
