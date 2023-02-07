const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // 시퀄라이즈는 id 자동 생성 (auto_increament)
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: true,
        },
        userID: {
          type: Sequelize.STRING(40),
          unique: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(10000), // 해시암호화를 할때 문자가 길어지니, 여유있게 용량을 잡아준다.
          allowNull: true,
        },
        snsID: {
          //? sns으로 로그인할경우 sns아이디 저장 필드
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true, // createdAt, udaptedAt 자동 생성
        underscored: false,
        modelName: "User", // 모델명
        tableName: "users", // 테이블명
        paranoid: true, // deletedAt 자동 생성
        charset: "utf8", // 한글 입력 설정
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    /*
     * 따로 외래키를 지정하지않으면, 모델명+기본키 컬럼이 생성되서 자동으로 연결된다.
     * 즉, User와 id가 합쳐져서 Userid라는 필드가 생겨서 자동연결해준다.
     * db.User.hasMany(db.Post, { foreignKey: 'Userid', targetKey: 'id' })
     */
    db.User.hasMany(db.Post);
  }
};
