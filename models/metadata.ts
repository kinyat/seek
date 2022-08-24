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

export {
  Metadata,
  initialise
}
