const objectFormatter = (details) => {
  const {
    id,
    title,
    price,
    condition,
    thumbnail,
    pictures,
    attributes,
    variations,
    date_created,
    last_updated,
  } = details;

  const requiredAttributes = [
    "BRAND",
    "AGE_GROUP",
    "COLOR",
    "SIZE",
    "FOOTWEAR_TYPE",
    "EXTERIOR_MATERIALS",
  ];
  const results = [];

  attributes.forEach((attr) => {
    const attributesArray = [attr.id, attr.value_name];
    for (const req of requiredAttributes) {
      if (attributesArray[0] === req) {
        return results.push([req, attributesArray[1]]);
      }
    }
  });

  const attributesObject = Object.fromEntries(results);

  const colors = new Set();
  const sizes = new Set();

  if (!attributesObject.COLOR) {
    variations.forEach((everyVariation) => {
      const combination = everyVariation.attribute_combinations;
      const colorVariant = combination[0];
      let sizeVariant = combination[1];
      sizeVariant.id === "SIZE"
        ? (sizeVariant = combination[1])
        : (sizeVariant = combination[2]);

      colors.add(colorVariant.value_name);
      sizes.add(sizeVariant.value_name.slice(0, 2));
    });
  }
  const size =
    attributesObject.SIZE === undefined
      ? Array.from(sizes)
      : [attributesObject.SIZE.slice(0, 2)];

  const color =
    attributesObject.COLOR === undefined
      ? Array.from(colors)
      : [attributesObject.COLOR];

  const objFormatted = {
    id,
    title,
    price,
    condition,
    thumbnail,
    pictures: pictures.map((picture) => picture.url),
    age_group: attributesObject.AGE_GROUP || "",
    brand: attributesObject.BRAND || "",
    colors: color,
    externalMaterial: attributesObject.EXTERIOR_MATERIALS || "",
    shoeStyle: attributesObject.FOOTWEAR_TYPE || "",
    sizes: size,
    date_created,
    last_updated,
  };

  return objFormatted;
};

module.exports = { objectFormatter };
