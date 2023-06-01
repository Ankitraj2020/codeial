const Post = require('../../../models/post');
const comment = require('../../../models/comment');

module.exports.index = async function(req,res){

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });
    return res.json(200,{
        message: "List of Posts",
        posts:posts
    });
}

module.exports.destroy =  async function(req,res){

    try{
        let post = await Post.findById(req.params.id);
        if(post.user==req.user.id){
            post.remove();
            await comment.deleteMany({post:req.params.id});

           /*if(req.xhr){
           

                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:'post deleted'
                });
            }*/
            //req.flash('success','post and assosiated comments deleted');
            return res.json(200,{
                message:"post and associated comments deleted successfuly"
            });
        }else{
           // req.flash('error','you cannot delete this post ');
            //return res.redirect('back');
            return res.json(401,{
                message:"you cannot delete this post!"
            });
        }
        
    }catch(err){
        console.log('****',err);
        //req.flash('error',err);
        //console.log('Error',err);
        return res.json(500,{
            message:"internal server error"
        });

    }
   
}