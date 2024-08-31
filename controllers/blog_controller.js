// const router = require('express').Router();
const { Blog } = require('../models');


module.exports = {
    async createBlog (req, res){
        const formData = req.body
        console.log(formData)
        try {
            await Blog.create({
                ...formData,
                userId: req.session.user_id
            })
            res.redirect('/dashboard')
        } catch (error) {
            console.log('add error', error);
            const errors = error.errors.map((errObj) => {
              return {
                message: errObj.message
              }
            })
            res.redirect('/add')
        }
    },
    async updateBlog(req, res){
        await Blog.update(
            req.body,
            {
                where:{
                    id: req.params.blog_id
                },
                returning: true,
                plain: true
            }
        )
        res.redirect('/dashboard')
    },
    async deleteBlog(req, res){
        await Blog.destroy({
            where: {
                id: req.params.blog_id
            }
        })
        res.redirect('/dashboard')
    }
}