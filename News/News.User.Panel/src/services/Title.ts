export default function changeTitle(title:string){
    let tag = document.getElementsByTagName("title")[0];
    tag.innerHTML = title
}