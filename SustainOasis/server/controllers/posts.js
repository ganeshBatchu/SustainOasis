import Post from "../models/Post.js";
import User from "../models/User.js";
import Filter from "../models/Filter.js";
import { filter } from "../data/index.js";


/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath, isGive} = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
      isGive: isGive, // Goes to mongoose
      satisfied: false,
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {

    console.log("FINALLY");


    const post = await Post.find();
    const filters = await Filter.findById('64973ecc43b62fe268a960dc');
  
    var isSatisfied = Boolean(filters['satisfied']);
    var isNotSatisfied = Boolean(filters["notSatisfied"]);
    var isGive = Boolean(filters["give"]);
    var isReceive = Boolean(filters["receive"]);

  
    var filteredPosts = [];
    console.log(post.length);
    for (let i = 0; i < post.length; i++) {

      console.log("Is Satisifed of Post " + post[i].isatisfied);

      var postGive =  ( isGive && (post[i]["isGive"]));
      var postReceive =  ( isReceive && !(post[i]["isGive"] ));
      var postSatisfied =  ( isSatisfied && (post[i]["satisfied"]));
      var postNotSatisfied =  ( isNotSatisfied && !(post[i]["satisfied"]));
      
      // console.log("give printed: " + ( isGive && Boolean((post[i])["isGive"]) ));
      // console.log("receive printed: " + ( isReceive && !Boolean((post[i])["isGive"] ) ) );
      // console.log("satisfied printed: " + ( isSatisfied && Boolean((post[i])["isSatisfied"] ) ));
      // console.log("notSatisfied printed: " + ( isNotSatisfied && !Boolean((post[i])["isSatisfied"] ) ));
      
      console.log("Printed or not:" + postGive + " " +  postReceive + " " + postSatisfied + " " + postNotSatisfied);
      console.log("Printed or not:" + postGive || postReceive || (postSatisfied || postNotSatisfied));

      if(postGive || postReceive || postSatisfied || postNotSatisfied) {
        filteredPosts.push(post[i]);
      }

      // if ( ( isGive && Boolean((post[i])["isGive"]) ) || 
      // ( isReceive && !Boolean((post[i])["isGive"] ) ) || 
      // ( isSatisfied && Boolean((post[i])["isSatisfied"] ) ) || 
      // ( isNotSatisfied && !Boolean((post[i])["isSatisfied"] ) )
      //   ){
      //   filteredPosts.push(post[i]);
      // }
    }  
    res.status(200).json(filteredPosts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });

    const filters = await Filter.findById('64973ecc43b62fe268a960dc');
    var filter = filters[0];

    var isSatisfied = Boolean(filters['satisfied']);
    var isNotSatisfied = Boolean(filters["notSatisfied"]);
    var isGive = Boolean(filters["give"]);
    var isReceive = Boolean(filters["receive"]);

    var filteredPosts = [];
    for (let i = 0; i < post.length; i++) {
      if ( ( isGive && Boolean((post[i])["isGive"]) ) || 
      ( isReceive && !Boolean((post[i])["isGive"] ) ) || 
      ( isSatisfied && Boolean((post[i])["isSatisfied"] ) ) || 
      ( isNotSatisfied && !Boolean((post[i])["isSatisfied"] ) )
        ){
        filteredPosts.push(post[i]);
      }
    }

    res.status(200).json(filteredPosts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getIsGivePosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ isGive });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(JSON.stringify(id));    
    console.log(req.body);
    const post = await Post.findById(id);
    console.log("Hi");
    if (post.comments == null) {
      console.log("Hello");
    } else {
      console.log(post.comments);
    }
    post.comments.push(req.body["comments"]);

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { comments: post.comments },
      { new: true },
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const postReceived = async (req, res) => {
  try {
    const id = '64973ecc43b62fe268a960dc';
    
    console.log(req.params);
    const filter = await Filter.findById('64973ecc43b62fe268a960dc');
    var isReceive = filter.receive;

    if (isReceive) {
      filter.receive = false;
    } else {
      filter.receive = true;
    }

    const updatedFilter = await Filter.findByIdAndUpdate(
      id,
      { receive: filter.receive },
      { new: true }
    );

    res.status(200).json(filter);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const postGive = async (req, res) => {
  try {
    const id = '64973ecc43b62fe268a960dc';
    
    console.log(req.params);
    const filter = await Filter.findById('64973ecc43b62fe268a960dc');
    var isGive = filter.give;

    if (isGive) {
      filter.give = false;
    } else {
      filter.give = true;
    }

    const updatedFilter = await Filter.findByIdAndUpdate(
      id,
      { give: filter.give },
      { new: true }
    );
    res.status(200).json(filter);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const filterSatisfied = async (req, res) => {
  try {
    const id = '64973ecc43b62fe268a960dc';
    
    console.log(req.params);
    const filter = await Filter.findById('64973ecc43b62fe268a960dc');
    var isSatisfied = filter.satisfied;

    if (isSatisfied) {
      filter.satisfied = false;
    } else {
      filter.satisfied = true;
    }

    const updatedFilter = await Filter.findByIdAndUpdate(
      id,
      { satisfied: filter.satisfied },
      { new: true }
    );
    res.status(200).json(filter);
  } catch (err) {

    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const filterNotSatisfied = async (req, res) => {
  try {
    const id = '64973ecc43b62fe268a960dc';
    
    console.log(req.params);
    const filter = await Filter.findById('64973ecc43b62fe268a960dc');
    var notSatisfied = filter.notSatisfied;

    if (notSatisfied) {
      filter.notSatisfied = false;
    } else {
      filter.notSatisfied = true;
    }

    const updatedFilter = await Filter.findByIdAndUpdate(
      id,
      { notSatisfied: filter.notSatisfied },
      { new: true }
    );
    res.status(200).json(filter);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


/* UPDATE */
export const postSatisfied = async (req, res) => {
  try {
    console.log("Reached");
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isSatisfied = post.satisfied;

    if (isSatisfied) {
      console.log("Unsatisfied");
      post.satisfied = false;
    } else {
      console.log("Satisfied");
      post.satisfied = true;
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { satisfied: post.satisfied },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};