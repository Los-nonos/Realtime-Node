import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateMessagesTable1603659009012 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('messages');
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'messages',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isGenerated: true,
          generationStrategy: "increment",
          isPrimary: true
        },
        {
          name: 'user_id',
          type: 'integer',

        },
        {
          name: 'channel_id',
          type: 'integer',
        },
        {
          name: 'content',
          type: 'varchar',
        }
      ]
    }))
  }

}