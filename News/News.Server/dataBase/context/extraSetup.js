"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applyExtraSetup(sequlize) {
    const { News, Keys, NewsGroups, Group, Role, Session, User, NewsLike } = sequlize.models;
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
    News.hasMany(NewsLike);
    NewsLike.belongsTo(News);
    User.hasMany(NewsLike);
    NewsLike.belongsTo(User);
}
exports.default = applyExtraSetup;
//# sourceMappingURL=extraSetup.js.map