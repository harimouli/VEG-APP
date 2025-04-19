
const { Pool, Client } = require('pg');

const {connectionString} = require("../config");
console.log(connectionString);

const pool = new Pool({
  connectionString,
});
 const runPoolQuery = async (query, values = []) => {
    try {
      const res = await pool.query(query, values);
      return res.rows;
    } catch (err) {
      console.error('Error executing query', err);
      throw err;
    }
  };


 const runClientQuery = async (query) => {
    const client = new Client({
      connectionString,
    });
  
    try {
      await client.connect();
      const res = await client.query(query);
      return res.rows;
    } finally {
      await client.end();
    }
  };




    const testConnection = async () => {
    try {
      const res = await pool.query('SELECT NOW()');
      console.log('DB connection successful:', res.rows[0]);
    } catch (err) {
      console.error('Cool Bhaiya Cool You An Error While connecting to DB:', err);
    } finally {
      await pool.end();
    }
  };
  


  const getColumnNames = async () => {
    const query = `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'products';  
    `;
    
    try {
      const result = await runPoolQuery(query);  
      const columnNames = result.map(row => row.column_name);  
      console.log('Product Table Column Names:', columnNames); 
    } catch (err) {
      console.error('Cool Bhaiya Cool You Got An Error: ', err); 
    }
  };
  

  const getProductData = async () => {
    const query = `
        SELECT * FROM products;
    `
    try {
        const products =  await runPoolQuery(query);
        console.log("Products", products);
        return products;
    } 
    catch(err){
        console.error('Cool Bhaiya Cool Error fetching products:', err);
    }
  }
  


  module.exports = {runClientQuery, runPoolQuery, getColumnNames, getProductData};