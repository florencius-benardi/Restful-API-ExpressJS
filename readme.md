## Description

This is a boilerplate for building an API backend application, designed to facilitate the development process for building a web-based application. It is built using the Javascript language, a popular and widely-used programming language for web development. The framework used for building the application is Express.JS, a lightweight and flexible Node.js web application framework that provides a set of features for building web and mobile applications.

For database connection, this boilerplate uses Sequelize, an Object-Relational Mapping (ORM) library for Node.js that provides a way to interact with a database using Javascript objects. With Sequelize, developers can easily create, read, update, and delete data in a database using Javascript code.

Authentication for this boilerplate is handled with tokens, a secure and efficient way to authenticate users and ensure that only authorized users can access protected resources. The token-based authentication system is designed to work with multiple devices, so users can access the application from different devices using the same account.

Overall, this boilerplate provides a solid foundation for building a web-based application API backend, with many of the basic features already implemented and ready to use. Developers can customize the application to fit their specific needs, adding additional features or modifying the design and functionality as needed.


## Frequently used commands

* A. Sequlize :

* Create Model & Migration with Column - Data Type firstName:string,lastName:string,email:string
npx sequelize-cli model:generate --name user --attributes firstName:string,lastName:string,email:string

* Create Migration
npx sequelize-cli migration:create --name modify_users_add_new_fields

* Running All Migration  
npx sequelize-cli db:migrate

* Rollback All Migration
npx sequelize-cli db:migrate:undo:all

* Create new Seeder
npx sequelize-cli seed:generate --name xxxx-seeder

* Running Seed
npx sequelize db:seed:all

* Rollback All Seed
npx sequelize db:seed:undo

* B. Tailwind CSS :

Documentation 

https://tailwindcss.com/docs/theme

* Create Initiation Configuration Tailwind
npx tailwindcss init

https://tailwind-elements.com/quick-start/