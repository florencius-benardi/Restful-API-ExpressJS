Command


* A. Sequlize :

## Create Model & Migration with Column - Data Type firstName:string,lastName:string,email:string
npx sequelize-cli model:generate --name user --attributes firstName:string,lastName:string,email:string

## Create Migration
npx sequelize-cli migration:create --name modify_users_add_new_fields

## Running All Migration  
npx sequelize-cli db:migrate

## Rollback All Migration
npx sequelize-cli db:migrate:undo

## Running Seed
npx sequelize db:seed:all

## Rollback All Seed
npx sequelize db:seed:undo

* B. Tailwind CSS :

Documentation 

https://tailwindcss.com/docs/theme

## Create Initiation Configuration Tailwind
npx tailwindcss init

https://tailwind-elements.com/quick-start/