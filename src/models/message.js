const getMessageModel = (sequelize, { DataTypes }) => {
    const Message = sequelize.define('message', {
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    });
  
    Message.associate = (models) => {
      Message.belongsTo(models.User);
    };
  
    return Message;
  };
  
  export default getMessageModel;