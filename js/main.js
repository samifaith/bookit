const ul = document.querySelector("ul")

document.querySelector("#addToList").addEventListener("click", addToList => {
  event.preventDefault()
  let li = document.createElement("li")
  let listItem = document.querySelector("#listItem").value;
  ul.appendChild(li);
  li.appendChild(document.createTextNode(listItem));
  document.querySelector("#listItem").value = ""
})
