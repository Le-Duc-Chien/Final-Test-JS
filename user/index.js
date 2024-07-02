document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var loginMessage = document.getElementById('loginMessage');

  if (!email || !password) {
    loginMessage.textContent = "Hãy nhập đầy đủ thông tin";
    return;
  }

  var user = users.find(function(user) {
    return user.email === email && user.password === password;
  });

  if (user) {
    loginMessage.style.color = 'green';
    loginMessage.textContent = 'Xin chào ' + user.first_name + ' ' + user.last_name;
  } else {
    loginMessage.style.color = 'red';
    loginMessage.textContent = "Thông tin tài khoản không chính xác";
  }
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var firstName = document.getElementById('first_name').value;
  var lastName = document.getElementById('last_name').value;
  var email = document.getElementById('registerEmail').value;
  var password = document.getElementById('registerPassword').value;
  var registerMessage = document.getElementById('registerMessage');

  if (!firstName || !lastName || !email || !password) {
    registerMessage.textContent = "Hãy nhập đầy đủ thông tin";
    return;
  }

  var existingUser = users.find(function(user) {
    return user.email === email;
  });

  if (existingUser) {
    registerMessage.style.color = 'red';
    registerMessage.textContent = "Email này đã có tài khoản";
  } else {
    var newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    };
    users.push(newUser);
    registerMessage.style.color = 'green';
    registerMessage.textContent = "Đăng ký thành công";
  }
});

document.getElementById('searchButton').addEventListener('click', function() {
  var keyword = document.getElementById('searchKeyword').value.toLowerCase();
  var userList = document.getElementById('userList');
  userList.innerHTML = '';

  var filteredUsers = keyword ? users.filter(function(user) {
    return user.first_name.toLowerCase().includes(keyword) ||
      user.last_name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword);
  }) : users;

  filteredUsers.forEach(function(user) {
    var listItem = document.createElement('li');
    listItem.textContent = 'ID: ' + user.id + ', Name: ' + user.first_name + ' ' + user.last_name + ', Email: ' + user.email;
    userList.appendChild(listItem);
  });
});

function renderPosts() {
  var postList = document.getElementById('postList');
  postList.innerHTML = '';

  posts.forEach(function(post) {
    var user = users.find(function(user) {
      return user.id === post.user_id;
    });
    var listItem = document.createElement('li');
    listItem.innerHTML = '<strong>ID:</strong> ' + post.id + '<br>' +
      '<strong>Title:</strong> ' + post.title + '<br>' +
      '<strong>Created At:</strong> ' + post.created_at + '<br>' +
      '<strong>Author:</strong> ' + (user ? user.first_name + ' ' + user.last_name : 'Unknown');
    postList.appendChild(listItem);
  });
}

// Call renderPosts to display the posts initially
renderPosts();

document.getElementById('viewPostButton').addEventListener('click', function() {
  var postId = parseInt(document.getElementById('postId').value, 10);
  var postDetails = document.getElementById('postDetails');
  postDetails.innerHTML = '';

  var post = posts.find(function(post) {
    return post.id === postId;
  });

  if (post) {
    var user = users.find(function(user) {
      return user.id === post.user_id;
    });
    postDetails.innerHTML = '<strong>ID:</strong> ' + post.id + '<br>' +
      '<strong>Title:</strong> ' + post.title + '<br>' +
      '<strong>Content:</strong> ' + post.content + '<br>' +
      '<strong>Image:</strong> <a href="' + post.image + '" target="_blank">' + post.image + '</a><br>' +
      '<strong>Author:</strong> ' + (user ? user.first_name + ' ' + user.last_name : 'Unknown') + '<br>' +
      '<strong>Created At:</strong> ' + post.created_at + '<br>' +
      '<strong>Updated At:</strong> ' + post.updated_at;
  } else {
    postDetails.textContent = 'Post không tồn tại';
  }
});

document.getElementById('searchPostsByUser').addEventListener('click', function() {
  var userEmail = document.getElementById('userEmail').value.toLowerCase();
  var userPostList = document.getElementById('userPostList');
  userPostList.innerHTML = '';

  var user = users.find(function(user) {
    return user.email === userEmail;
  });

  if (!user) {
    userPostList.innerHTML = 'Không tìm thấy user với email này';
    return;
  }

  var userPosts = posts.filter(function(post) {
    return post.user_id === user.id;
  });

  if (userPosts.length === 0) {
    userPostList.innerHTML = 'User này chưa có bài post nào';
  } else {
    userPosts.forEach(function(post) {
      var listItem = document.createElement('li');
      listItem.innerHTML = '<strong>ID:</strong> ' + post.id + '<br>' +
        '<strong>Title:</strong> ' + post.title + '<br>' +
        '<strong>Created At:</strong> ' + post.created_at + '<br>' +
        '<strong>Author:</strong> ' + user.first_name + ' ' + user.last_name;
      userPostList.appendChild(listItem);
    });
  }
});
