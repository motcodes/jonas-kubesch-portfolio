import type { NextApiRequest, NextApiResponse } from 'next'
import { getGlobalData } from 'lib'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { global, socialLinks } = await getGlobalData()
    res.status(200).json({
      ...global,
      socialLinks,
    })
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
