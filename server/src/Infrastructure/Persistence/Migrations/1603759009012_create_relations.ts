import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export default class CreateRelations1603759009012 implements MigrationInterface {
  public async down(_queryRunner: QueryRunner): Promise<any> {

  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createForeignKey('user_channels', new TableForeignKey({
      referencedColumnNames: ['id'],
      columnNames: ['user_id'],
      referencedTableName: 'users'
    }))

    await queryRunner.createForeignKey('user_channels', new TableForeignKey({
      referencedColumnNames: ['id'],
      columnNames: ['channel_id'],
      referencedTableName: 'channels'
    }));

    await queryRunner.createForeignKey('messages', new TableForeignKey({
      referencedColumnNames: ['id'],
      columnNames: ['channel_id'],
      referencedTableName: 'channels'
    }));

    await queryRunner.createForeignKey('messages', new TableForeignKey({
      referencedColumnNames: ['id'],
      columnNames: ['user_id'],
      referencedTableName: 'users'
    }));
  }

}