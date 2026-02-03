const setCookie = (n, v) => {
  document.cookie =
    `${n}=${encodeURIComponent(JSON.stringify(v))};` +
    `path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT`;
};

const getCookie = (n) => {
  let m = document.cookie.match(new RegExp('(^| )' + n + '=([^;]+)'));
  return m ? JSON.parse(decodeURIComponent(m[2])) : [];
};

window.onload = () => {
  getCookie("todo").forEach(t => add(t, false));
};

function add(text, New) {
  let div = document.createElement("div");
  div.innerText = text;

  div.onclick = function () {
    if (confirm("Remove?")) {
      this.remove();
      save();
    }
  };
  let list = document.getElementById("ft_list");
  New ? list.prepend(div) : list.appendChild(div);
}

function newTask() {
  let t = prompt("New Task:");
  if (t && t.trim()) {
    add(t.trim(), true);
    save();
  }
}

function save() {
  let tasks = Array.from(
    document.getElementById("ft_list").children
  ).map(d => d.innerText);

  setCookie("todo", tasks);
}
