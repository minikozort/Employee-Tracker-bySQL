const { Pool } = require('pg');
const inquirer = require('inquirer');

// Create a new pool instance
const pool = new Pool({
  user: 'postgres',  
  host: 'localhost',
  database: 'staff_db',
  password: 'password', 

});

// Function to start the application
function startApp() {

  console.log("****************************************************************")
  console.log("*                                                              *")
  console.log("*                     EMPLOYEE MANAGER                         *")
  console.log("*                                                              *")
  console.log("****************************************************************")

  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    })
    .then(answer => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          pool.end(); // Properly close the pool before exiting
          console.log('Goodbye!');
          process.exit(0);
      }
    });
}

// Function to view all departments
function viewDepartments() {
  pool.query('SELECT * FROM department', (err, res) => {
    if (err) {
      console.error('Error executing query:', err);
    } else {
      console.table(res.rows); // Assuming you want to display results in a table format
      startApp();
    }
  });
}

// Function to view all roles
function viewRoles() {
  const query = `
    SELECT r.id AS "Role ID", r.title AS "Job Title", d.name AS "Department", r.salary AS "Salary"
    FROM role r
    INNER JOIN department d ON r.department_id = d.id
  `;
  pool.query(query, (err, res) => {
    if (err) {
      console.error('Error executing query:', err);
    } else {
      console.table(res.rows);
    }
    startApp();
  });
}

// Function to view all employees
// Function to view all employees
function viewEmployees() {
  const query = `
    SELECT 
      e.id AS "Employee ID", 
      e.first_name AS "First Name", 
      e.last_name AS "Last Name", 
      r.title AS "Job Title", 
      d.name AS "Department", 
      r.salary AS "Salary", 
      CONCAT(m.first_name, ' ', m.last_name) AS "Manager"
    FROM employee e
    INNER JOIN role r ON e.role_id = r.id
    INNER JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id
  `;
  pool.query(query, (err, res) => {
    if (err) {
      console.error('Error executing query:', err);
    } else {
      console.table(res.rows);
    }
    startApp();
  });
}



// Function to add a department
function addDepartment() {
  inquirer
    .prompt({
      name: 'name',
      type: 'input',
      message: 'Enter the name of the department:'
    })
    .then(answer => {
      pool.query('INSERT INTO department (name) VALUES ($1)', [answer.name], (err, res) => {
        if (err) {
          console.error('Error executing query:', err);
        } else {
          console.log('Department added successfully!');
        }
        startApp();
      });
    });
}


// Function to add a role
function addRole() {
  // Fetch departments to provide choices for department_id
  pool.query('SELECT id, name FROM department', (err, departmentsRes) => {
    if (err) {
      console.error('Error fetching departments:', err);
      startApp();
      return;
    }

    const departments = departmentsRes.rows;

    inquirer
      .prompt([
        {
          name: 'title',
          type: 'input',
          message: 'Enter the title of the role:'
        },
        {
          name: 'salary',
          type: 'input',
          message: 'Enter the salary for this role:'
        },
        {
          name: 'department_id',
          type: 'list',
          message: 'Select the department for this role:',
          choices: departments.map(department => ({
            name: department.name,
            value: department.id
          }))
        }
      ])
      .then(answer => {
        pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', 
                   [answer.title, answer.salary, answer.department_id], (err, res) => {
          if (err) {
            console.error('Error executing query:', err);
          } else {
            console.log('Role added successfully!');
          }
          startApp();
        });
      });
  });
}



// Function to add an employee
// Function to add an employee
function addEmployee() {
  // Fetch roles to provide choices for role_id
  pool.query('SELECT id, title FROM role', (err, rolesRes) => {
    if (err) {
      console.error('Error fetching roles:', err);
      startApp();
      return;
    }

    const roles = rolesRes.rows;

    // Fetch employees to provide choices for manager_id
    pool.query('SELECT id, CONCAT(first_name, \' \', last_name) AS name FROM employee', (err, employeesRes) => {
      if (err) {
        console.error('Error fetching employees:', err);
        startApp();
        return;
      }

      const employees = employeesRes.rows;

      inquirer
        .prompt([
          {
            name: 'first_name',
            type: 'input',
            message: 'Enter the first name of the employee:'
          },
          {
            name: 'last_name',
            type: 'input',
            message: 'Enter the last name of the employee:'
          },
          {
            name: 'role_id',
            type: 'list',
            message: 'Select the role for this employee:',
            choices: roles.map(role => ({
              name: role.title,
              value: role.id
            }))
          },
          {
            name: 'manager_id',
            type: 'list',
            message: 'Select the manager for this employee (optional):',
            choices: [...employees.map(employee => ({
              name: employee.name,
              value: employee.id
            })), { name: 'None', value: null }],
            default: null
          }
        ])
        .then(answer => {
          pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', 
                     [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, res) => {
            if (err) {
              console.error('Error executing query:', err);
            } else {
              console.log('Employee added successfully!');
            }
            startApp();
          });
        });
    });
  });
}



// Function to update an employee role

function updateEmployeeRole() {
  // Fetch employees to provide choices for employee_id
  pool.query('SELECT id, CONCAT(first_name, \' \', last_name) AS name FROM employee', (err, employeesRes) => {
    if (err) {
      console.error('Error fetching employees:', err);
      startApp();
      return;
    }

    const employees = employeesRes.rows;

    // Fetch roles to provide choices for role_id
    pool.query('SELECT id, title FROM role', (err, rolesRes) => {
      if (err) {
        console.error('Error fetching roles:', err);
        startApp();
        return;
      }

      const roles = rolesRes.rows;

      inquirer
        .prompt([
          {
            name: 'employee_id',
            type: 'list',
            message: 'Select the employee whose role you want to update:',
            choices: employees.map(employee => ({
              name: employee.name,
              value: employee.id
            }))
          },
          {
            name: 'role_id',
            type: 'list',
            message: 'Select the new role for the employee:',
            choices: roles.map(role => ({
              name: role.title,
              value: role.id
            }))
          },
          {
            name: 'assign_manager',
            type: 'confirm',
            message: 'Do you want to assign a new manager for this employee?',
            default: false
          },
          {
            name: 'manager_id',
            type: 'list',
            message: 'Select the new manager for the employee:',
            choices: employees.map(employee => ({
              name: employee.name,
              value: employee.id
            })),
            when: (answers) => answers.assign_manager // Only show if user wants to assign a manager
          }
        ])
        .then(answer => {
          const { employee_id, role_id, manager_id } = answer;

          // Update the employee's role_id
          pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id], (err, res) => {
            if (err) {
              console.error('Error updating employee role:', err);
            } else {
              console.log('Employee role updated successfully!');

              // If user wants to assign a manager, update the manager_id
              if (answer.assign_manager) {
                pool.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [manager_id, employee_id], (err, res) => {
                  if (err) {
                    console.error('Error assigning manager to employee:', err);
                  } else {
                    console.log('Manager assigned successfully!');
                  }
                  startApp();
                });
              } else {
                startApp();
              }
            }
          });
        });
    });
  });
}



// Start the application after establishing the connection
pool.connect(err => {
  if (err) {
    console.error('Error connecting to PostgreSQL database:', err);
  } else {
    console.log('Connected to PostgreSQL database successfully');
    startApp();
  }
});
