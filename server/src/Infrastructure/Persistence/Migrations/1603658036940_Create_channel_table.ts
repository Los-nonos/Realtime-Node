import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateChannelTable1603658036940 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('channels');
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
        name: 'channels',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'private',
            type: 'boolean'
          }
        ]
      })
    )
  }

}