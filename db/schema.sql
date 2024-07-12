-- Create the table for departments
CREATE TABLE department ( 
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- Create the table for roles
CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INTEGER REFERENCES department(id) ON DELETE CASCADE
);

-- Create the table for employees
CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER REFERENCES role(id) ON DELETE SET NULL,
  manager_id INTEGER REFERENCES employee(id) ON DELETE SET NULL
);
