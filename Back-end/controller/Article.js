import db from '../models/index.js';
import sequelize from 'sequelize';


const { ArticleModel } = db;


export const addArticle = async (req, res) => {
    try {
      const { title, category, body, author } = req.body;
  
      if (!title || !category || !body || !author ) {
        throw new Error('Please provide all the required information for adding a goal');
      }
  
      const newArticle = await ArticleModel.create({title, category, body, author  });
  
      res.status(200).json({ msg: 'Article added successfully', data: newArticle });
    } catch (error) {
      console.error('Failed to add Article:', error.message);
      res.status(500).json({ msg: 'Failed', error: error.message });
    }
  };


  export const getArticles = async (req , res) => {
    try {
      const Article = await ArticleModel.findAll({
        order: [['createdAt', 'DESC']],
      });
      return res.status(200).json({
        msg: 'Fetched all Articles successfully',
        data: Article
      });
    } catch (error) {
      console.log('Failed');
      return res.status(500).json({
        msg: 'Failed',
        error: error
      });
    }
  }


  export const getArticle = async (req, res) => {
    try {
      const articleId = req.body.id; 
  
      if (!articleId || isNaN(articleId)) {
        return res.status(400).json({
          msg: 'Invalid article ID',
        });
      }
  
      const article = await ArticleModel.findByPk(articleId);
  
      if (!article) {
        return res.status(404).json({
          msg: 'article not found',
        });
      }
  
      return res.status(200).json({
        msg: 'Article retrieved successfully',
        data: article,
      });
    } catch (error) {
      console.error('Failed to get article:', error.message);
      return res.status(500).json({
        msg: 'Failed',
        error: error.message,
      });
    }
  };



  export const editArticle = async (req, res) => {
    try {
      const { id,title, category, body, author } = req.body;
  
      if (!id || !title || !category || !body || !author) {
        return res.status(400).json({
          msg: 'Please provide all the required information ',
        });
      }
  
      const [updatedCount] = await ArticleModel.update(
        {
          title,
          category,
          body,
          author,
        },
        {
          where: { id },
        }
      );
  
      if (updatedCount === 0) {
        return res.status(404).json({
          msg: 'Article not found or no changes were made',
        });
      }
  
      const updatedArticle = await ArticleModel.findByPk(id);
  
      return res.status(200).json({
        msg: 'Article updated successfully',
        data: updatedArticle,
      });
    } catch (error) {
      console.error('Failed to edit article:', error);
      return res.status(500).json({
        msg: 'Failed',
        error: error.message,
      });
    }
  };


  export const deleteArticle = async (req, res) => {
    try {
      const id = req.body.id;

      const article = await ArticleModel.findByPk(id);

      if (!article) {
        return res.status(404).json({
          msg: 'Article not found',
        });
      }

      await article.destroy();

      return res.status(200).json({
        msg: 'article deleted successfully',
      });
    } catch (error) {
      console.error('Failed to delete article:', error);
      return res.status(500).json({
        msg: 'Failed',
        error: error.message,
      });
    }
};