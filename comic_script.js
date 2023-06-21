const getComicBtn = document.getElementById("get-comic-btn");
const part1 = document.getElementById("part1");

function fetchId(email) {
  const params = new URLSearchParams();
  if (email) {
    params.append("email", email);
  }
  return fetch(
    "https://fwd.innopolis.university/api/hw2?" + params.toString()
  ).then((r) => r.json());
}

function fetchComicInfo(id) {
  console.log(id);
  const params = new URLSearchParams();
  if (id) {
    params.append("id", id);
  }
  return fetch(
    "https://fwd.innopolis.university/api/comic?" + params.toString()
  ).then((r) => r.json());
}

function printComicInfo(comicObj) {
  const comic = comicObj;
  const existingP = document.querySelector("p");
  const existingImg = document.querySelector("img");

  // Remove existing comic elements if they exist
  if (existingP) {
    existingP.remove();
  }
  if (existingImg) {
    existingImg.remove();
  }

  const p = document.createElement("p");
  p.textContent = `${comic.safe_title} - ${new Date(
    comic.year,
    comic.month,
    comic.day
  ).toLocaleDateString()}`;
  document.body.appendChild(p);

  const img = document.createElement("img");
  img.src = comic.img;
  img.alt = comic.alt;
  document.body.appendChild(img);
}

getComicBtn.addEventListener("click", async function (e) {
  const id = await fetchId("l.mardanova@innopolis.university");
  const comic = await fetchComicInfo(id);
  printComicInfo(comic);
});
