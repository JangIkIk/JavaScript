// 엄격모드
"use strict";

// 요청 url
const url = "http://localhost:3001/list";
const $ul = document.querySelector(".list-container");
const $form = document.querySelector(".input-container");
const $userInput = document.querySelector("#userInput");

/*------------------------------------*/

//fetch DELETE
const deleteList = (e)=>{
    if(e.target.className !== "delete-button") return;
    const $list = e.target.closest(".list");
    const $id = $list.dataset.id;
    fetch(`${url}/${$id}`,{
        method: "DELETE"
    }).catch( error => console.log("DELETE 에러:",error))
}

//fetch PATCH
const patchText = (e)=>{
    if(e.target.className !== "edit-submmit") return;
    const $list = e.target.closest(".list");
    const $id = $list.dataset.id;
    const $input = $list.querySelector('input[type="text"]');
    const title = $input.value;


    fetch(`${url}/${$id}`,{
        method: "PATCH",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({title})
    }).catch( error => console.log("PATCH(내용변경) 에러:",error))

}

// 데이터의 입력및 문구 버튼 변경
const patchChangeText = (e)=>{
    const $list = e.target.closest(".list");
    const $label = $list.querySelector("label");
    const $input = $list.querySelector("input[type='text']");
    const $listButton = $list.querySelector(".list-button");
    const $setButton = $list.querySelector(".set-button");
    const value = $input.value;

    if(e.target.className === "edit-button"){
        $label.style.display = "none";
        $input.style.display = "block";
        $listButton.style.display = "none";
        $setButton.style.display = "block";
        $input.value = "";
        $input.focus();
        $input.value = value;
    }

    if(e.target.className === "edit-clean"){
        $label.style.display = "block";
        $input.style.display = "none";
        $listButton.style.display = "block";
        $setButton.style.display = "none";
        $input.value = $label.innerText;
    }
}

// fetch PATCH
const patchCheck = (e)=>{
    if(e.target.className !== "list-checkBox") return;
    const $checkList = e.target.closest(".list");
    const $id = $checkList.dataset.id;
    const completed = e.target.checked;
    
    fetch(`${url}/${$id}`, {
        method: "PATCH",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({completed})
    })
    .catch ( error => console.log("PATCH(체크) 에러:",error))
}

// fetch POST
const postList = (e)=>{
    e.preventDefault();
    const newList = {
        title: $userInput.value,
        completed: false
    }
    fetch(url,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newList)
    }).catch ( error => console.log("POST 에러:",error))
}


// fetch GET
const getList = () => {
  fetch(url)
    .then((res) => res.json())
    .then((res) => listHtmlWrap(res))
    .catch((error) => console.log("GET 에러:",error));
};

// 리스트 부모 
const listHtmlWrap = (data) => {
    $ul.innerHTML = "";
    data.forEach( (list) => {
        $ul.appendChild(listHtml(list));
    })
    
}

// 각리스트
const listHtml = (data) => {
  const { id, title, completed } = data;
  const $li = document.createElement("li");
  const isChecked = completed ? "checked" : ""
  $li.classList.add("list");
  $li.dataset.id = id;
  $li.innerHTML = `
    <input type="checkbox" class="list-checkBox" ${isChecked}>
        <label class="list-title-label">${title}</label>
        <input type="text" class="list-title-input" value=${title}></input>
        <div class="list-button">
            <button type="button" class="edit-button">수정</button>
            <button type="button" class="delete-button">삭제</button>
        </div>
        <div class="set-button">
            <button type="button" class="edit-submmit">저장</button>
            <button type="button" class="edit-clean">취소</button>
        </div>
    `;
    return $li;
};

/*------------------------------------*/

const init = ()=>{
    window.addEventListener("DOMContentLoaded", () => {
        console.log("초기실행");
        getList();
    });

    $form.addEventListener("submit",postList);
    $ul.addEventListener("click", patchCheck);
    $ul.addEventListener("click", patchChangeText);
    $ul.addEventListener("click", patchText);
    $ul.addEventListener("click", deleteList)
}

init()