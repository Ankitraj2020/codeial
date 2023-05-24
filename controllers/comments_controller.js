const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create =  async function(req,res){

    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
            post.comments.push(comment);
                post.save();

                /*if (req.xhr){
                    // Similar for comments to fetch the user's id!
                    comment = await comment.populate('user', 'name').execPopulate();
        
                    return res.status(200).json({
                        data: {
                            comment: comment
                        },
                        message: "Post created!"
                    });
                }*/
                req.flash('success','comment created successfully');
                res.redirect('/');

        }

    }catch(err){
        req.flash('error',err);
        console.log('Error',err);
        return;

    }
   
    /*Comment.create({
        content:req.body.content,
        user:req.user._id,
        post:req.post._id

    },function(err,comment){
        if(err){
            console.log('error in creating a post');
            return;
        }
        return res.redirect('back');
    });*/
}
module.exports.destroy =  async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user==req.user.id){
            let postId = comment.post;
    
            comment.remove();
            let post =  Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});

           /* if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }*/
            req.flash('success','comment deleted successfully');
            return res.redirect('back');
            
            
    
            /*comment.deleteMany({post:req.params.id},function(err){
                return res.redirect('back');
            });*/
        }else{
            req.flash('error','something error occur while deleting comment');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error',err);
        console.log('Error',err);
        return;

    }
   
}