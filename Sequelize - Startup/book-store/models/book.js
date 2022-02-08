'use strict';
const Sequelize  = require('sequelize');

module.exports = (sequelize) => {

    class Book extends Sequelize.Model{};

    Book.init({
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },

        title:{
            type: Sequelize.STRING,
            allowNull: false,

            validate:{
                notNull:{
                    msg:"Please provide a book title"
                },
                notEmpty:{
                    msg:"Please provide a value for the title"
                }
            }
        },
        author:{
            type: Sequelize.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg:"Please provide an author name"
                },
                notEmpty:{
                    msg:"Please provide an author name"
                }
            }
        },
        releaseDate:{
            type:Sequelize.DATE
        },
        isbnNo:{
            type:Sequelize.STRING
        }
    },{
        sequelize,

        timestamps: false,

        createdAt: false,

        updatedAt: false,

        tableName: "book_store"
    });

    return Book;
}