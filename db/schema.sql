-- Create the table for departments
CREATE TABLE department ( 
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);

-- Create the table for roles
CREATE TABLE role (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL (10, 2) NOT NULL,
    department_id INTEGER
);

-- Create the table for employees
CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    
    FOREIGN KEY (role_id) 
    REFERENCES role(id) 
    ON DELETE SET NULL
);