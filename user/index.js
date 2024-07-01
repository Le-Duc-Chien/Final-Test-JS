
  
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('loginMessage');
  
    if (!email || !password) {
      loginMessage.textContent = "Hãy nhập đầy đủ thông tin";
      return;
    }
  
    const user = users.find(user => user.email === email && user.password === password);
  
    if (user) {
      loginMessage.style.color = 'green';
      loginMessage.textContent = `Xin chào ${user.first_name} ${user.last_name}`;
    } else {
      loginMessage.style.color = 'red';
      loginMessage.textContent = "Thông tin tài khoản không chính xác";
    }
  });
  
  document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const registerMessage = document.getElementById('registerMessage');
  
    if (!firstName || !lastName || !email || !password) {
      registerMessage.textContent = "Hãy nhập đầy đủ thông tin";
      return;
    }
  
    const existingUser = users.find(user => user.email === email);
  
    if (existingUser) {
      registerMessage.style.color = 'red';
      registerMessage.textContent = "Email này đã có tài khoản";
    } else {
      const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      };
      users.push(newUser);
      registerMessage.style.color = 'green';
      registerMessage.textContent = "Đăng ký thành công";
    }
  });
  
  document.getElementById('searchButton').addEventListener('click', function() {
    const keyword = document.getElementById('searchKeyword').value.toLowerCase();
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
  
    const filteredUsers = keyword ? users.filter(user => 
      user.first_name.toLowerCase().includes(keyword) || 
      user.last_name.toLowerCase().includes(keyword) || 
      user.email.toLowerCase().includes(keyword)
    ) : users;
  
    filteredUsers.forEach(user => {
      const listItem = document.createElement('li');
      listItem.textContent = `ID: ${user.id}, Name: ${user.first_name} ${user.last_name}, Email: ${user.email}`;
      userList.appendChild(listItem);
    });
  });
  
  function renderPosts() {
    const postList = document.getElementById('postList');
    postList.innerHTML = '';
  
    posts.forEach(post => {
      const user = users.find(user => user.id === post.user_id);
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>ID:</strong> ${post.id}<br>
        <strong>Title:</strong> ${post.title}<br>
        <strong>Created At:</strong> ${post.created_at}<br>
        <strong>Author:</strong> ${user ? `${user.first_name} ${user.last_name}` : 'Unknown'}
      `;
      postList.appendChild(listItem);
    });
  }
  
  // Call renderPosts to display the posts initially
  renderPosts();
  
  document.getElementById('viewPostButton').addEventListener('click', function() {
    const postId = parseInt(document.getElementById('postId').value);
    const postDetails = document.getElementById('postDetails');
    postDetails.innerHTML = '';
  
    const post = posts.find(post => post.id === postId);
  
    if (post) {
      const user = users.find(user => user.id === post.user_id);
      postDetails.innerHTML = `
        <strong>ID:</strong> ${post.id}<br>
        <strong>Title:</strong> ${post.title}<br>
        <strong>Content:</strong> ${post.content}<br>
        <strong>Image:</strong> <a href="${post.image}" target="_blank">${post.image}</a><br>
        <strong>Author:</strong> ${user ? `${user.first_name} ${user.last_name}` : 'Unknown'}<br>
        <strong>Created At:</strong> ${post.created_at}<br>
        <strong>Updated At:</strong> ${post.updated_at}
      `;
    } else {
      postDetails.textContent = 'Post không tồn tại';
    }
  });
  
  document.getElementById('searchPostsByUser').addEventListener('click', function() {
    const userEmail = document.getElementById('userEmail').value.toLowerCase();
    const userPostList = document.getElementById('userPostList');
    userPostList.innerHTML = '';
  
    const user = users.find(user => user.email === userEmail);
  
    if (!user) {
      userPostList.innerHTML = 'Không tìm thấy user với email này';
      return;
    }
  
    const userPosts = posts.filter(post => post.user_id === user.id);
  
    if (userPosts.length === 0) {
      userPostList.innerHTML = 'User này chưa có bài post nào';
    } else {
      userPosts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <strong>ID:</strong> ${post.id}<br>
          <strong>Title:</strong> ${post.title}<br>
          <strong>Created At:</strong> ${post.created_at}<br>
          <strong>Author:</strong> ${user.first_name} ${user.last_name}
        `;
        userPostList.appendChild(listItem);
      });
    }
  });
  