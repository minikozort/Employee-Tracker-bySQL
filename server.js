const express = require('express');
// Import and require Pool (node-postgres)
const { Pool } = require('pg');

const pool = new Pool(
    {
    
      user: 'postgres',
      password: 'password',
      host: 'localhost',
      database: 'staff_db'
    },
    console.log(`Connected to the staff_db database.`)
  )
  
  pool.connect();