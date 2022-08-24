import { Metadata } from '../models/metadata'

const increaseCount = async (): Promise<number> => {
  let metadata = await Metadata.findOne()

  if (metadata == null) {
    metadata = await Metadata.create({ count: 0 })
  }

  const result = await metadata.increment(['count'], { by: 1 })

  return result.count
}

export {
  increaseCount
}
