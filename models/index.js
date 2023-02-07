const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
 
//? 모델 모듈
const User = require('./user');
const Post = require('./post');
 
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);
 
//? db객체에 모델 정보들 넣음
db.sequelize = sequelize;
db.User = User;
db.Post = Post;
 
//? 모델 - 테이블 연결
User.init(sequelize);
Post.init(sequelize);
 
//? 모델 관계 설정
User.associate(db);
Post.associate(db);
 
module.exports = db;