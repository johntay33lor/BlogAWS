const apiBaseUrl = 'https://2l40uuvq68.execute-api.us-east-1.amazonaws.com/default';

// Function to display all posts on the frontend
function displayPosts(posts) {
  const postsList = document.getElementById('posts-list');
  postsList.innerHTML = '';
  posts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <p><em>Author: ${post.author}</em></p>
      <button onclick="editPost(${post.id})">Edit</button>
      <button onclick="deletePost(${post.id})">Delete</button>
    `;
    postsList.appendChild(postDiv);
  });
}

// Function to fetch all posts from the backend API
async function getAllPosts() {
  try {
    const response = await fetch(`${apiBaseUrl}/posts`);
    const data = await response.json();
    displayPosts(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

// Function to create a new post
async function createPost(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const author = document.getElementById('author').value;

  const newPost = {
    title,
    content,
    author,
  };

  try {
    const response = await fetch(`${apiBaseUrl}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });
    if (response.ok) {
      document.getElementById('create-post-form').reset();
      getAllPosts();
    } else {
      const data = await response.json();
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error creating post:', error);
  }
}

// Function to delete a post
async function deletePost(postId) {
  try {
    const response = await fetch(`${apiBaseUrl}/posts/${postId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      getAllPosts();
    } else {
      const data = await response.json();
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error deleting post:', error);
  }
}

// Function to edit a post (you can implement this based on your needs)
function editPost(postId) {
  // Implement edit functionality based on your requirement
}

document.getElementById('create-post-form').addEventListener('submit', createPost);

// Fetch all posts on page load
getAllPosts();
