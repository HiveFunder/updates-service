const Sequelize = require('sequelize');
const db = require('../db');

const Photo = db.define('photo', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  display_index: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  alt_text: {
    type: Sequelize.STRING,
  },
  is_verified_photo: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  listing_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  image_url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Photo.readAll = listingId => Photo.findAll({
  where: {
    listing_id: listingId,
  },
});

Photo.insert = body => Photo.create({
    display_index: body.display_index,
    alt_text: body.alt_text,
    is_verified_photo: body.is_verified_photo,
    listing_id: body.listing_id,
    image_url: body.image_url
  });

Photo.updated = (body, imageId) => Photo.update({
  display_index: body.display_index,
  alt_text: body.alt_text,
  is_verified_photo: body.is_verified_photo,
  image_url: body.image_url
  },
  { where: { id: imageId } });

Photo.removed = (imageId) => Photo.destroy({
  where: {
    id: imageId
  }
});

module.exports = Photo;
