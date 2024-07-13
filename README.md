Title: 
Employee-Tracker-bypostgreSQL


Description:
In this challenge, I have created a terminal app that connects to a staff database for employee tracking. With this app, you can view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role.
How to Run:
1 - Run the application of your choice such as "VS Code" then, please copy the repository link below and clone the repository on your local machine by typing the following in the terminal "git clone "copied repository link".
2 - Click on the folder you have just created (It should be named "EMPLOYEE-TRACKER-BYPOSTGRESQL).
3 - Right click on "server.js" and open an integrated terminal. 
4 - Please type "npm install" in the terminal and press enter to install the necessary packages. 
5 - Type in "psql -U postgres" and press enter and enter your password. If you have a different connection to the postgres, please use those credentials to connect to postgres. 
6 - Then execute the file db.sql by typing the following in the terminal  "\i db/db.sql" and press enter to create the database and connect to it. 
7 - Then execute file schema.sql by typing the following in the terminal "\i db/schema.sql" and press enter to create the department, role and employee tables.
8 - Then execute seeds.sql file if desired to create some base data by typing the following in the terminal "\i db/seeds.sql" and press enter. 
9 - Once finished, you can disconnect from postgres by typing the following command in the terminal "\q" and press enter. 
10 - In the same terminal, please type in either "npm start" or "node server.js" and press enter to start the application.
11 - Please select from the various prompts to view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role or exit. 

Github Repository : https://github.com/minikozort/Employee-Tracker-bySQL
Mock-up Video Link : 

![alt text](./Pictures/Note-Taker-Notes-Index-Page.PNG)
![alt text](./Pictures/Note-Taker-Notes-Page.PNG)