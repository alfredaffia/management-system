import { MigrationInterface, QueryRunner } from "typeorm";

export class Surname1745598494781 implements MigrationInterface {
    name = 'Surname1745598494781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`surname\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`surname\``);
    }

}
