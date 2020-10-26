import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateUserChannelTable1603658707206 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('user_channels');
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'user_channels',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          generationStrategy: 'increment',
          isGenerated: true
        },
        {
          name: 'user_id',
          type: 'integer'
        },
        {
          name: 'channel_id',
          type: 'integer'
        }
      ]
    }))
  }

}