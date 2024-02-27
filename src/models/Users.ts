import { DataTypes, Model } from 'sequelize';
import sequelize from '../index';
import  Favorite  from './Favorites';

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  public readonly favorites?: Favorite[]; 
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false, 
  }
);

export default User;
