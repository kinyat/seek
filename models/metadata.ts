import { DataTypes } from 'sequelize'
import { sequelize } from '../sequelize'

const Metadata = sequelize.define('Metadata', {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

Metadata.removeAttribute('id')

const increaseCount = async () => {
  let metadata = await Metadata.findOne()

  if (!metadata) {
    metadata = await Metadata.create({ count: 0 })
  }

  const result = await metadata.increment(['count'], { by: 1 })

  return (result as unknown as typeof Metadata).count
}

export {
  Metadata,
  increaseCount
}
