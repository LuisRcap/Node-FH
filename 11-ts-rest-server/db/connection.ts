import { Sequelize } from 'sequelize';

const db = new Sequelize( 'node', 'root', 'LZ1&G4plus', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
});

export default db;