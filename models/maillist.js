'use strict';
module.exports = (sequelize, DataTypes) => {
  const Maillist = sequelize.define('maillist', {
    teacher: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    student: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    active: {
      type: DataTypes.INTEGER(2),
      defaultValue: 1
    }
  }, {});

  Maillist.associate = function(models) {
    // associations can be defined here
  };
  return Maillist;
}