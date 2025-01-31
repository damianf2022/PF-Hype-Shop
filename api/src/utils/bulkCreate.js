const { Product } = require("../db");

const { getApiProducts } = require("../services/getProducts");

const bulkCreate = async () => {
  const dbProducts = await Product.findAll();
  if (!dbProducts.length) {
    const dataToBulk = await getApiProducts();
    dataToBulk.forEach((el) => {
      const {
        title,
        price,
        condition,
        thumbnail,
        pictures,
        age_group,
        colors,
        sizes,
        brand,
        externalMaterial,
        gender,
        category,
        available_quantity,
      } = el;
      Product.findOrCreate({
        where: { title },
        defaults: {
          title,
          price,
          condition,
          thumbnail,
          pictures,
          age_group,
          colors,
          sizes,
          brand,
          externalMaterial,
          gender,
          category,
          available_quantity,
        },
      });
    });
    console.log("Products succesfully created on db");
  } else {
    console.log("Products already in DB!");
    return dbProducts;
  }
};

module.exports = { bulkCreate };
