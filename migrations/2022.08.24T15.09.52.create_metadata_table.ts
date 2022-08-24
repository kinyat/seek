import Sequelize, { QueryInterface } from 'sequelize'
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = async ({context: queryInterface}) => {
  await queryInterface.createTable('Metadata', {
      count: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
};
export const down: MigrationFn<QueryInterface> = async ({context: queryInterface}) => {
  await queryInterface.dropTable('Metadata')
};
