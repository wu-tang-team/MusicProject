'use strict';
module.exports = (sequelize, DataTypes) => {
  const songs = sequelize.define('songs', {
    UserId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ArtistName: DataTypes.STRING,
    SongName: DataTypes.STRING,
    URL: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    Owner: DataTypes.INTEGER
  }, {});
  songs.associate = function(models) {
    // associations can be defined here
  };
  return songs;
};