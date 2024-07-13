Title: 
Employee-Tracker-bySQL


Description:
In this challenge, I have created a terminal app that connect to a staff database for employee tracking. With this app, you can create a new department, you can add a role, you can add an employee, you can update an employee and be able to see the list of employees you have in your database. 
How to Run:
Please clone the repository on your local machine. From there, open "VS Code". Right click on "server.js" and open an integrated terminal. Type in "psql -U postgres" and enter your password. If you have a different connection to the postgres, please use this to connect to postgres. Then execute the file db.sql by typing the following in the terminal  "\i db/db.sql to create the database and connect to it, then execute file schema.sql by typing the following in the terminal "\i db/schema.sql to create the department, role and employee tables, then execute seeds.sql file if desired to create some base data by typing the following in the terminal "\i db/seeds.sql" to be able to insert data into the tables. Once finished, please type in the following command in the console to disconnect from postgres "\q". 

In the same terminal, please type in either "npm start" or "node server.js" to start the application. From here, please select from the various prompts to view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role or exit. 

Github Repository : https://github.com/minikozort/Employee-Tracker-bySQL
Mock-up Video Link : 

![alt text](./Pictures/Note-Taker-Notes-Index-Page.PNG)
![alt text](./Pictures/Note-Taker-Notes-Page.PNG)