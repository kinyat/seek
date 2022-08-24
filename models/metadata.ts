import { DataTypes } from 'sequelize'
import { sequelize } from '../sequelize'

const Metadata = sequelize.define('Metadata', {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

Metadata.removeAttribute('id')

export {
  Metadata
}
