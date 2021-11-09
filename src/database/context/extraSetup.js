function applyExtraSetup(sequelize) {
  const { News, Keys, NewsGroups, Group, Role, Session, User } =
    sequelize.models;

  News.hasMany(Keys);
  Keys.belongsTo(News);

  Group.hasMany(NewsGroups);
  NewsGroups.belongsTo(Group);

  News.hasMany(NewsGroups);
  NewsGroups.belongsTo(News);

  User.hasMany(Session);
  Session.belongsTo(User);

  Role.hasMany(User);
  User.belongsTo(Role);
}

module.exports = { applyExtraSetup };
