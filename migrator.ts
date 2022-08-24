import 'dotenv/config'
import { Umzug, SequelizeStorage } from 'umzug'
import { sequelize } from './sequelize'

const umzug = new Umzug({
  migrations: { glob: 'migrations/*.ts' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console
})

if (require.main === module) {
  void umzug.runAsCLI()
}

export {
  umzug
}
