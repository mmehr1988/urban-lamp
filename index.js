'use strict';

// Import and require mysql2
const mysql = require('mysql2');

// inquirer package
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'company_db',
});
