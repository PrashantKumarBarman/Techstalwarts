import { DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';

export interface Party {
    id: number,
    name: string,
    email: string,
    mobile: string,
    type: string,
    consultant_type: string,
    signatory_name: string,
    party_address: string,
    branch: string
}

let model = sequelize.define('party', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    consultant_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    signatory_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    party_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    branch: {
        type: DataTypes.STRING,
        allowNull: false
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