const BASE_URL = 'https://jsonplaceholder.typicode.com';

let usersDivEl;
let postsDivEl;
let commentDivEl;
let albumDivEl;
let pictureDivEl;
let loadButtonEl;

function onPostsReceived() {
    postsDivEl.style.display = 'block';
    albumDivEl.style.display = 'none';
    pictureDivEl.style.display = 'none';

    const text = this.responseText;
    const posts = JSON.parse(text);

    const divEl = document.getElementById('posts-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createPostTable(posts));
}

function onLoadPosts() {
    const el = this;
    const userId = el.getAttribute('data-user-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPostsReceived);
    xhr.open('GET', BASE_URL + '/posts?userId=' + userId);
    xhr.send();
}

function onCommentReceived() {

    const text = this.responseText;
    const comments = JSON.parse(text);

    const divEl = document.getElementById('comment-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createCommentList(comments));
}

function onLoadComments() {
    const el = this;
    const postId = el.getAttribute('data-post-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onCommentReceived);
    xhr.open('GET', BASE_URL + '/comments?postId=' + postId);
    xhr.send();
}

function createCommentList(comments) {
    commentDivEl.style.display = 'block';

    const ulEl = document.createElement('ul');

    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];

        // creating paragraph
        const strongEl = document.createElement('strong');
        strongEl.textContent = comment.name;

        const pEl = document.createElement('p');
        pEl.appendChild(strongEl);
        pEl.appendChild(document.createTextNode(`: ${comment.body}`));

        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);
    }

    return ulEl;
}

function onLoadAlbums() {
    const el = this;
    const userId = el.getAttribute('data-user-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onAlbumsReceived);
    xhr.open('GET', BASE_URL + '/users/' + userId + '/albums');
    xhr.send();
}

function onAlbumsReceived() {
    postsDivEl.style.display = 'none';
    commentDivEl.style.display = 'none';
    albumDivEl.style.display = 'block';
    const text = this.responseText;
    const albums = JSON.parse(text);

    const divEl = document.getElementById('album-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createAlbumTable(albums));
}

function createAlbumTable(albums) {

    const tbodyEl = document.createElement('tbody');

    for (let i = 0; i < albums.length; i++) {
        const album = albums[i];

        // creating id cell
        const idTdEl = document.createElement('td');
        idTdEl.textContent = album.id;

        // creating name cell
        const dataAlbumIdAttr = document.createAttribute('data-album-id');
        dataAlbumIdAttr.value = album.id;

        const buttonEl = document.createElement('button');
        buttonEl.textContent = album.title;
        buttonEl.setAttributeNode(dataAlbumIdAttr);
        buttonEl.addEventListener('click', onLoadPictures);

        const nameTdEl = document.createElement('td');
        nameTdEl.appendChild(buttonEl);

        // creating row
        const trEl = document.createElement('tr');
        trEl.appendChild(idTdEl);
        trEl.appendChild(nameTdEl);

        tbodyEl.appendChild(trEl);
    }

    return tbodyEl;
}

function onLoadPictures() {
    const el = this;
    const albumId = el.getAttribute('data-album-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPicturesReceived);
    xhr.open('GET', BASE_URL + '/photos?albumId=' + albumId);
    xhr.send();
}

function onPicturesReceived() {
    pictureDivEl.style.display = 'block';

    const text = this.responseText;
    const pictures = JSON.parse(text);

    const divEl = document.getElementById('picture-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createPictureTable(pictures));
}

function createPictureTable(pictures) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < pictures.length; i++) {
        const picture = pictures[i];

        // creating paragraph
        const strongEl = document.createElement('strong');
        strongEl.textContent = picture.title;

        const pEl = document.createElement('IMG');
        pEl.src = picture.url;
        pEl.width = "100";
        pEl.height = "100";
        pEl.appendChild(strongEl);


        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);
        liEl.appendChild(strongEl);
        ulEl.appendChild(strongEl);
    }

    return ulEl;
}

function createUsersTableHeader() {
    const idTdEl = document.createElement('td');
    idTdEl.textContent = 'Id';

    const nameTdEl = document.createElement('td');
    nameTdEl.textContent = 'Name';

    const trEl = document.createElement('tr');
    trEl.appendChild(idTdEl);
    trEl.appendChild(nameTdEl);

    const theadEl = document.createElement('thead');
    theadEl.appendChild(trEl);
    return theadEl;
}

function createUsersTableBody(users) {
    const tbodyEl = document.createElement('tbody');

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        // creating id cell
        const idTdEl = document.createElement('td');
        idTdEl.textContent = user.id;

        // creating name cell
        const dataUserIdAttr = document.createAttribute('data-user-id');
        dataUserIdAttr.value = user.id;

        const buttonEl = document.createElement('button');
        buttonEl.textContent = user.name;
        buttonEl.setAttributeNode(dataUserIdAttr);
        buttonEl.addEventListener('click', onLoadPosts);

        const nameTdEl = document.createElement('td');
        nameTdEl.appendChild(buttonEl);

        // creating name cell

        const buttonEle = document.createElement('button');
        buttonEle.textContent = "albums";
        const dataUserIdAttri = document.createAttribute('data-user-id');
        dataUserIdAttri.value = user.id;
        buttonEle.setAttributeNode(dataUserIdAttri);
        buttonEle.addEventListener('click', onLoadAlbums);

        const nameTdEle = document.createElement('td');
        nameTdEle.appendChild(buttonEle);

        // creating row
        const trEl = document.createElement('tr');
        trEl.appendChild(idTdEl);
        trEl.appendChild(nameTdEl);
        trEl.appendChild(nameTdEle);

        tbodyEl.appendChild(trEl);
    }

    return tbodyEl;
}

function createPostTable(posts) {
    commentDivEl.style.display = 'none';

    const tbodyEl = document.createElement('tbody');

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        // creating id cell
        const idTdEl = document.createElement('td');
        idTdEl.textContent = post.id;

        // creating name cell
        const dataPostIdAttr = document.createAttribute('data-post-id');
        dataPostIdAttr.value = post.id;

        const buttonEl = document.createElement('button');
        buttonEl.textContent = post.title;
        buttonEl.setAttributeNode(dataPostIdAttr);
        buttonEl.addEventListener('click', onLoadComments);

        const nameTdEl = document.createElement('td');
        nameTdEl.appendChild(buttonEl);

        // creating row
        const trEl = document.createElement('tr');
        trEl.appendChild(idTdEl);
        trEl.appendChild(nameTdEl);

        tbodyEl.appendChild(trEl);
    }

    return tbodyEl;
}

function createUsersTable(users) {
    const tableEl = document.createElement('table');
    tableEl.appendChild(createUsersTableHeader());
    tableEl.appendChild(createUsersTableBody(users));
    return tableEl;
}

function onUsersReceived() {
    loadButtonEl.remove();

    const text = this.responseText;
    const users = JSON.parse(text);

    const divEl = document.getElementById('users-content');
    divEl.appendChild(createUsersTable(users));
}

function onLoadUsers() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onUsersReceived);
    xhr.open('GET', BASE_URL + '/users');
    xhr.send();
}

document.addEventListener('DOMContentLoaded', () => {
    usersDivEl = document.getElementById('users');
    postsDivEl = document.getElementById('posts');
    commentDivEl = document.getElementById('comments');
    albumDivEl = document.getElementById('albums');
    pictureDivEl = document.getElementById('pictures');
    loadButtonEl = document.getElementById('load-users');
    loadButtonEl.addEventListener('click', onLoadUsers);
});
