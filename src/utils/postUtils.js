export const getPosts = () => JSON.parse(localStorage.getItem('posts')) || [];

export const savePosts = (posts) => localStorage.setItem('posts', JSON.stringify(posts));

export const addPost = (post) => {
  const posts = getPosts();
  const newPost = {
    ...post,
    id: post.id || Date.now().toString(), // Use provided id, fallback to timestamp if none
    likes: 0,
    retweets: 0,
    shares: 0,
    commentsList: [] // array of comment strings or objects
  };
  savePosts([newPost, ...posts]);
};

export const updatePost = (updatedPost) => {
  const posts = getPosts().map(post => post.id === updatedPost.id ? updatedPost : post);
  savePosts(posts);
};

export const deletePost = (id) => {
  const posts = getPosts().filter(post => post.id !== id);
  savePosts(posts);
};

export const getPostById = (id) => getPosts().find(post => post.id === id);

// Optional helpers for interactivity:
export const likePost = (id) => {
  const posts = getPosts().map(post => 
    post.id === id ? { ...post, likes: post.likes + 1 } : post
  );
  savePosts(posts);
};

export const retweetPost = (id) => {
  const posts = getPosts().map(post => 
    post.id === id ? { ...post, retweets: post.retweets + 1 } : post
  );
  savePosts(posts);
};

export const addCommentToPost = (id, comment) => {
  const posts = getPosts().map(post => 
    post.id === id ? { ...post, commentsList: [...post.commentsList, comment] } : post
  );
  savePosts(posts);
};