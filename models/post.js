const Sequelize = require("sequelize");

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // 시퀄라이즈는 id 자동 생성 (auto_increament)
       
        snsContent: {
          // instagram 사진 및 피드 관련 필드
          // 아마 사진 자체를 db에 저장하는 것이 아니라 AWS를 이용하여 주소를 할당받을 것이므로 문자열 형태로 지정
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true, // createdAt, udaptedAt 자동 생성
        underscored: false,
        modelName: "Post", // 모델명
        tableName: "posts", // 테이블명
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
    db.Post.belongsTo(db.User);
  }
};
