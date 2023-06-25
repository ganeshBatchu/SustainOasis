import Post from "../models/Post.js";
import User from "../models/User.js";
import Filter from "../models/Filter.js";


/* READ */
export const getFilteredPosts = async (req, res) => {
    try {
      const filters = await Filter.findById('64973ecc43b62fe268a960dc');
      var filter = filters[0];
      
      // const filters = await Filter.find();
      // var filter = filters[0];

      console.log("Here");


      var isSatisfied = Boolean(filters['satisfied']);
      var isNotSatisfied = Boolean(filters["notSatisfied"]);
      var isGive = Boolean(filters["give"]);
      var isReceive = Boolean(filters["receive"]);

      var post = await Post.find();

      
  

      var filteredPosts = [];
      for (let i = 0; i < post.length; i++) {
        console.log(( isGive && Boolean((post[i])["isGive"]) ) || 
        ( isReceive && !Boolean((post[i])["isGive"] ) ) || 
        ( isSatisfied && Boolean((post[i])["isSatisfied"] ) ) || 
        ( isNotSatisfied && !Boolean((post[i])["isSatisfied"] ) ));


        if ( ( isGive && Boolean((post[i])["isGive"]) ) || 
        ( isReceive && !Boolean((post[i])["isGive"] ) ) || 
        ( isSatisfied && Boolean((post[i])["isSatisfied"] ) ) || 
        ( isNotSatisfied && !Boolean((post[i])["isSatisfied"] ) )
          ){

          filteredPosts.push(post[i]);
        }
      }
      console.log(isGive);
      console.log("\n\n" + filteredPosts.length + "\n\n");
  
      res.status(200).json(filteredPosts);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

/* READ */
export const getFilterInfo = async (req, res) => {
  try {
    const filter = await Filter.findById('64973ecc43b62fe268a960dc');
    console.log("Uma");
    res.status(200).json(filter);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}