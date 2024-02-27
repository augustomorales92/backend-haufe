import { DataTypes, Model } from 'sequelize';
import sequelize from '../index';
import User from './Users';

class Favorite extends Model {
  public id!: number;
  public favorite_id!: number;
  public user_id!: number;
  public user!: User;
}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    favorite_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Favorite',
    tableName: 'favorites',
  }
);

Favorite.belongsTo(User, { foreignKey: 'user_id' });

export default Favorite;
