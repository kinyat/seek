import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize'
import { sequelize } from '../sequelize'

class Metadata extends Model<InferAttributes<Metadata>, InferCreationAttributes<Metadata>> {
  declare count: number
}

const initialise = async (): Promise<void> => {
  Metadata.init({
    count: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { sequelize })

  Metadata.removeAttribute('id')
}

const increaseCount = async (): Promise<number> => {
  let metadata = await Metadata.findOne()

  if (metadata == null) {
    metadata = await Metadata.create({ count: 0 })
  }

  const result = await metadata.increment(['count'], { by: 1 })

  return result.count
}

export {
  Metadata,
  increaseCount,
  initialise
}
