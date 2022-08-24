import 'dotenv/config'
import { Sequelize } from 'sequelize'
import { Umzug, SequelizeStorage } from 'umzug'

console.log(process.env)

const sequelize = new Sequelize(
  process.env.DB_NAME ?? '',
  process.env.DB_USERNAME ?? '',
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  })

const umzug = new Umzug({
  migrations: { glob: 'migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console
})

exports.umzug = umzug

if (require.main === module) {
  void umzug.runAsCLI()
}
