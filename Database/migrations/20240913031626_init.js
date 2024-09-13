/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('locations', (table) => {
      table.bigIncrements('id').unsigned().notNullable().primary().defaultTo(knex.raw('AUTO_INCREMENT'));
      table.string('address', 255).nullable();
      table.string('city', 255).nullable();
      table.string('state', 255).nullable();
      table.integer('postal_code', 11).nullable();
      table.string('country', 255).nullable();
      table.string('province', 255).nullable();
      table.string('barangay', 255).nullable();
      table.string('house', 255).nullable();
      table.bigInteger('info_id').unsigned().notNullable().unique();
      table.timestamps(true, true);
    })
    .createTable('motorcycles', (table) => {
      table.bigIncrements('id').unsigned().notNullable().primary().defaultTo(knex.raw('AUTO_INCREMENT'));
      table.string('name', 255).nullable();
      table.string('brand', 255).nullable();
      table.string('model', 255).nullable();
      table.string('make', 255).nullable();
      table.string('year', 255).nullable();
      table.bigInteger('user_id').unsigned().notNullable().unique();
      table.timestamps(true, true);
    })
    .createTable('githubs', (table) => {
      table.bigIncrements('id').unsigned().notNullable().primary().defaultTo(knex.raw('AUTO_INCREMENT'));
      table.string('github_unique_id', 255).notNullable().unique();
      table.string('name', 255).notNullable();
      table.string('twitter_name', 255).nullable();
      table.string('avatar', 255).nullable();
      table.string('page_url', 255).nullable();
      table.timestamp('github_joined_date').nullable();
      table.bigInteger('user_id').unsigned().notNullable().unique();
      table.timestamps(true, true);
    })
    .createTable('facebooks', (table) => {
      table.bigIncrements('id').unsigned().notNullable().primary().defaultTo(knex.raw('AUTO_INCREMENT'));
      table.string('facebook_unique_id', 255).notNullable().unique();
      table.string('name', 255).notNullable();
      table.string('avatar_url', 255).nullable();
      table.string('profile_url', 255).nullable();
      table.bigInteger('user_id').unsigned().notNullable().unique();
      table.timestamps(true, true);
    })
    .createTable('googles', (table) => {
      table.bigIncrements('id').unsigned().notNullable().primary().defaultTo(knex.raw('AUTO_INCREMENT'));
      table.string('google_unique_id', 255).notNullable().unique();
      table.string('name', 255).notNullable();
      table.string('given_name', 255).nullable();
      table.string('family_name', 255).nullable();
      table.string('avatar_url', 255).nullable();
      table.bigInteger('user_id').unsigned().notNullable().unique();
      table.timestamps(true, true);
    })
    .createTable('infos', (table) => {
      table.bigIncrements('id').unsigned().notNullable().primary().defaultTo(knex.raw('AUTO_INCREMENT'));
      table.date('birthdate').nullable();
      table.string('gender', 255).nullable();
      table.bigInteger('contact').notNullable();
      table.bigInteger('user_id').unsigned().notNullable().unique();
      table.timestamps(true, true);
    })
    .createTable('users', (table) => {
      table.bigIncrements('id').unsigned().notNullable().primary().defaultTo(knex.raw('AUTO_INCREMENT'));
      table.string('first_name', 255).notNullable();
      table.string('middle_name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.string('nickname', 255).nullable();
      table.string('authorization', 255).notNullable().defaultTo('customer');
      table.string('email', 255).notNullable().unique();
      table.timestamp('email_verified_at').nullable();
      table.string('password', 255).notNullable();
      table.string('ip', 255).nullable();
      table.string('user_agent', 255).nullable();
      table.timestamps(true, true);
    });

  return knex.schema
    .table('locations', (table) => {
      table.foreign('info_id').references('infos.id').onDelete('CASCADE');
    })
    .table('infos', (table) => {
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
    })
    .table('motorcycles', (table) => {
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
    })
    .table('githubs', (table) => {
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
    })
    .table('facebooks', (table) => {
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
    })
    .table('googles', (table) => {
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('locations')
    .dropTableIfExists('motorcycles')
    .dropTableIfExists('githubs')
    .dropTableIfExists('facebooks')
    .dropTableIfExists('googles')
    .dropTableIfExists('infos')
    .dropTableIfExists('users');
};
