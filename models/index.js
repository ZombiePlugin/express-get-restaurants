const Restaurant = require("./Restaurant");
const Item = require("./Item");
const Menu = require("./Menu");

Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant);

Item.belongsToMany(Menu, { through: "Menu-Items" });
Menu.belongsToMany(Item, { through: "Menu-Items" });

module.exports = { Restaurant, Item, Menu };
