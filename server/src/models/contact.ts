import {
  Table,
  Column,
  Model,
  HasMany,
  AutoIncrement,
  PrimaryKey,
  AllowNull
} from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: 'contacts'
  })
export class Contact extends Model<Contact> {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Column
  mobile: string;

  @Column
  createdAt : Date

  @Column
  updatedAt : Date
}
