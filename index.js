//  Load All Posts
const loadAllPosts = async (category) => {
  document.getElementById("post-container").innerHTML = "";

  const response = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts${
      category ? `?category=${category}` : ""
    }`
  );

  const data = await response.json();
  console.log(data);

  displayAllPost(data.posts || data);
};

//  Load Latest Post Data
const getLatestPostData = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );

  const data = await response.json();
  displayLatestPost(data);
};
getLatestPostData();

//  Display All Posts
const displayAllPost = (posts) => {
  const postContainer = document.getElementById("post-container");

  posts.forEach((post) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="p-6 lg:p-12 flex gap-6 lg:flex-row flex-col items-center lg-items-start bg-[#f6f4f4] rounded-3xl hover:bg-purple-50 hover:border-2 hover:border-purple-400">
        <div class="indicator">
          <span class="indicator-item badge ${
            post.isActive ? "bg-green-600" : "bg-red-500"
          }"></span>
          <div class="avatar">
            <div class="w-24 rounded-xl">
              <img src="${post.image}" />
            </div>
          </div>
        </div>

        <div class="space-y-4 w-full">
          <div class="flex gap-4 *:opacity-60">
            <p class="font-bold text-black"># ${post.category}</p>
            <p class="font-bold text-black">Author: ${post.author.name}</p>
          </div>

          <h3 class="text-2xl font-bold">${post.title}</h3>
          <p class="opacity-80">${post.description}</p>

          <hr class="border border-dashed border-gray-300"/>

          <div class="flex justify-between *: [&>*:not(:last-child)]:opacity-80">
            <div class="flex gap-4">
              <div class="space-x-2 flex items-center">
                <i class="fa-regular fa-comment-dots"></i>
                <p>${post.comment_count}</p>
              </div>

              <div class="space-x-2 flex items-center">
                <i class="fa-regular fa-eye"></i>
                <p>${post.view_count}</p>
              </div>

              <div class="space-x-2 flex items-center">
                <i class="fa-regular fa-clock"></i>
                <p>${post.posted_time}</p>
              </div>
            </div>

            <div class="opacity-100">
              <button 
                id="addToList" 
                onclick="markAsRead('${post.title}', '${post.view_count}')" 
                class="addToList btn btn-circle bg-green-500 btn-sm"
              >
                <i class="fa-solid fa-envelope-open text-white"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    postContainer.appendChild(div);
  });
};

//  Mark As Read
const markAsRead = (title, view_count) => {
  const markAsReadContainer = document.getElementById("markAsReadContainer");
  const div = document.createElement("div");

  div.innerHTML = `
    <div class="flex justify-between p-2 lg:p-3 bg-[#FFF] rounded-2xl item-center gap-3">
      <div class="lg:w-4/5 w-11/12">
        <p class="text-lg text-black font-bold">${title}</p>
      </div>
      <div class="lg:w-1/5 w-4/12 flex justify-end items-center">
        <p class="text-lg text-black"><i></i> ${view_count}</p>
      </div>
    </div>
  `;

  markAsReadContainer.appendChild(div);
  handleCount();
};

//  Handle Counter
const handleCount = () => {
  const prevCount = document.getElementById("markAsReadCounter").innerText;
  const convertedCounter = parseInt(prevCount);
  const sum = convertedCounter + 1;

  document.getElementById("markAsReadCounter").innerText = sum;
};

//  Display Latest Posts
const displayLatestPost = (data) => {
  const latestPostContainer = document.getElementById("latest-post-container");
  latestPostContainer.innerHTML = "";

  latestPostContainer.className =
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

  data.forEach((post) => {
    latestPostContainer.innerHTML += `
      <div class="card border-2 h-full flex flex-col">
        <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
          <img src="${
            post.cover_image
          }" alt="Post Cover" class="rounded-xl w-full h-48 object-cover"/>
        </figure>

        <div class="p-5 lg:p-10 space-y-4 lg:space-y-5 flex flex-col flex-grow">
          <p class="opacity-60 text-start">
            <i class="fa-solid fa-calendar-days me-2"></i>
            ${post.author?.posted_date || "No Publish Date"}
          </p>

          <h2 class="card-title text-start font-bold">${post.title}</h2>
          <p class="text-start font-medium opacity-70 flex-grow">${
            post.description
          }</p>

          <div class="card-actions flex gap-5 items-center mt-auto">
            <div class="avatar">
              <div class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                <img src="${post.profile_image}" />
              </div>
            </div>

            <div>
              <h3 class="text-start font-bold">${post.author.name}</h3>
              <p class="text-start opacity-60">
                ${post.author?.designation || "Unknown"}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  });
};

// Initial Load
loadAllPosts();

// Search Handler
const handleSearchByCategory = () => {
  const searchText = document.getElementById("searchPosts").value;
  loadAllPosts(searchText);
};
