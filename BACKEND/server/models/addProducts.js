const { runPoolQuery } = require('./db');

const insertProductsData = async () => {
  const query = `
    INSERT INTO products (name, price, description, image_url, is_active, created_at, updated_at)
    VALUES
    ('Tomatoes', 3.49, 'Organic tomatoes for cooking and salads.', 'https://res.cloudinary.com/dekrcobk2/image/upload/v1744897078/tomatos.jpg', true, NOW(), NOW()),
    ('Carrots', 1.99, 'Crunchy carrots, perfect for salads and snacks.', 'https://res.cloudinary.com/dekrcobk2/image/upload/v1744897079/carrot.jpg', true, NOW(), NOW())
  `;
  
  try {
    await runPoolQuery(query);  
    console.log('Tomatoes and Carrots inserted successfully!');
  } catch (err) {
    console.error('Error inserting sample data:', err);  
  }
};

module.exports = {insertProductsData}
