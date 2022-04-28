import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../lib/sequelize';

export interface State extends Model<InferAttributes<State>, InferCreationAttributes<State>> {
    id: number,
    state: String
}

let model = sequelize.define('state', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

(async function() {
    try {
        
    }
    catch(err) {
        console.log(err);
    }
})();

export default {
    model: model
}