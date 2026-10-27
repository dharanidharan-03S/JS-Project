if(localStorage.getItem("signIn")==="false"){
    window.location.href="https://dharanidharans-9mzl75r7-8443.zcodecorp.in/HTML_CSS_DHARANIDHARAN/JS%20project/login.html";
}
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

let email=localStorage.getItem("emailId");
let usersDetailsArray=JSON.parse(localStorage.getItem("usersDetails")||"[]");

let index;
for(let i=0;i<usersDetailsArray.length;i++){
    if(email == usersDetailsArray[i].email){
       index=i;
    }
}
let userNameElement=document.querySelector(".username");
userNameElement.textContent=`Hello ${usersDetailsArray[index].name}`
let newButtonElement=document.querySelector(".newbutton");
let startDisplayElement=document.querySelector(".startdisplay");
let editorElement=document.querySelector(".editor")
let notesContainerElement=document.querySelector(".notescontainer")
let notesListElement=document.querySelector(".noteslist");
let noteItemContainerElement;
let dateElement=document.querySelector(".date");
let wordCountElement=document.querySelector(".wordcount");
let countElement=document.querySelector(".count")

let titleInputElement=document.querySelector(".titleinput");
let notesElement=document.querySelector(".notes")
let saveIndicatorElement=document.querySelector(".saveindicator");

let searchNotesElement=document.querySelector(".searchnotes");
let sideBarElement=document.querySelector(".sidebar")
let bodyElement=document.querySelector("body");
let noteCountElement=document.querySelector(".notecount");
let deleteButtonElement;


let iconBackGround1Element=document.querySelector(".iconbackground1");
let iconBackGround2Element=document.querySelector(".iconbackground2");
let iconBackGround3Element=document.querySelector(".iconbackground3");
let iconBackGround4Element=document.querySelector(".iconbackground4");

function ObjectCreator(){
    this.title="Untitled";
    this.preview="Empty note";
    let date=new Date();
    let yesterday=new Date(today);
    yesterday.setDate(yesterday.getDate()-1);
    this.curDate=date;
    let month=months[date.getMonth()];
    this.date=`${month} ${date.getDate()}, ${date.getFullYear()}`
    this.time=`${date.getHours()}:${date.getMinutes()}`
    this.editedDate=`${months[new Date().getMonth()]}${new Date().getDate()}, ${new Date().getFullYear()}`,
    this.uppercase=false,
    this.lowercase=false,
    this.italic=false,
    this.bold=false
}
newButtonElement.addEventListener("click",()=>{
    try{
        tempObject=new ObjectCreator();
        usersDetailsArray[index].notes.push(tempObject);
        localStorage.setItem("usersDetails",JSON.stringify(usersDetailsArray));
        countElement.textContent=`${usersDetailsArray[index].notes.length} notes`
        let date=new Date();
        let month=months[date.getMonth()];
        dateElement.textContent=`Created ${usersDetailsArray[index].notes[usersDetailsArray[index].notes.length-1].date}        Lasted edited ${usersDetailsArray[index].notes[usersDetailsArray[index].notes.length-1].time} ${usersDetailsArray[index].notes[usersDetailsArray[index].notes.length-1].date}`;
        iconBackGround1Element.classList.remove("backgroundcolor");
        iconBackGround2Element.classList.remove("backgroundcolor");
        iconBackGround3Element.classList.remove("backgroundcolor");
        iconBackGround4Element.classList.remove("backgroundcolor");
        notesHistory();
    }
    catch(error){
        console.log("Error:",error)
    }
})
notesListElement.addEventListener("click",(event)=>{
    try{
        let clickedNote=event.target.closest(".backgroundnone")
        if (!clickedNote) return;

        let childrenArray=Array.from(notesListElement.children);
        let noteId=childrenArray.indexOf(event.target.closest(".backgroundnone"))
        if (noteId==-1|| !usersDetailsArray[index].notes[noteId]) return;
        let note=document.querySelector(".noteitem")
    
        for (let element of notesListElement.children){
            let titleItemElement=element.querySelector(".title1");
            if (element.contains(event.target)){
                let currentNote=usersDetailsArray[index].notes[noteId];
                notesElement.classList.remove("uppercase","lowercase");
                iconBackGround1Element.classList.remove("backgroundcolor");
                iconBackGround2Element.classList.remove("backgroundcolor");

                if(currentNote.uppercase){
                    notesElement.classList.add("uppercase");
                    iconBackGround1Element.classList.add("backgroundcolor");
                }
                else if(currentNote.lowercase){
                    notesElement.classList.add("lowercase");
                    iconBackGround2Element.classList.add("backgroundcolor");
                }

                if(usersDetailsArray[index].notes[noteId] && usersDetailsArray[index].notes[noteId].italic==false){
                    notesElement.classList.remove("italicstyle");
                    iconBackGround3Element.classList.remove("backgroundcolor");
                }
                else{
                    notesElement.classList.add("italicstyle");
                    iconBackGround3Element.classList.add("backgroundcolor");
                }
                if(usersDetailsArray[index].notes[noteId] && usersDetailsArray[index].notes[noteId].bold==false){
                    notesElement.classList.remove("boldstyle");
                    iconBackGround4Element.classList.remove("backgroundcolor");
                }
                else{
                    notesElement.classList.add("boldstyle");
                    iconBackGround4Element.classList.add("backgroundcolor");
                }
                startDisplayElement.classList.add("hiddenclass");
                editorElement.classList.remove("hiddenclass");
                let indexOfNote=Array.from(notesListElement.children).indexOf(clickedNote);
                dateElement.textContent=`Created ${usersDetailsArray[index].notes[indexOfNote].date}      Lasted edited ${usersDetailsArray[index].notes[indexOfNote].time} ${usersDetailsArray[index].notes[indexOfNote].date}`;
                if(usersDetailsArray[index].notes[indexOfNote].title != "Untitled"){
                    titleInputElement.value=usersDetailsArray[index].notes[indexOfNote].title;
                }
                else{
                    titleInputElement.value="";
                }
                if(usersDetailsArray[index].notes[indexOfNote].preview != "Empty note"){
                    notesElement.value=usersDetailsArray[index].notes[indexOfNote].preview;
                }
                else{
                    notesElement.value="";
                }
                element.classList.add("noteitem")
                element.classList.remove("backgroundnone");
                wordCountElement.textContent=`${notesElement.value.trim().split(" ").filter(ele=>ele!=="").length} words ${notesElement.value.length} characters`
            }
            else{
                element.classList.remove("noteitem");
                element.classList.add("backgroundnone");
            }
        }
    }
    catch(error){
        console.log("Error:",error)
    }
})
function notesHistory(){
    try{
        if(usersDetailsArray[index].notes.length!=0){
            notesListElement.innerHTML="";
            for(let note of usersDetailsArray[index].notes){
                startDisplayElement.classList.add("hiddenclass");
                editorElement.classList.remove("hiddenclass");
                notesContainerElement.remove()
                noteItemContainerElement=document.createElement("div");
                titleItemElement=document.createElement("div");
                titleItemElement.textContent=note.title;
                let previewItemElement=document.createElement("div");
                previewItemElement.classList.add("preview");
                previewItemElement.textContent=note.preview;
                let dateOfCreationElement=document.createElement("div");
                dateOfCreationElement.classList.add("dateofcreation");
                dateOfCreationElement.textContent=note.date;
                deleteButtonElement=document.createElement("button");
                deleteButtonElement.classList.add("deletebutton");
                deleteButtonElement.textContent="X";
                noteItemContainerElement.classList.add("noteitem");
                titleItemElement.classList.add("title1");
                for(let i=0;i<notesListElement.children.length;i++){
                    notesListElement.children[i].classList.remove("noteitem");
                    notesListElement.children[i].classList.add("backgroundnone");
                    titleItemElement.classList.add("title1");
                }
                titleInputElement.value="";
                notesElement.value="";
                noteItemContainerElement.append( titleItemElement,previewItemElement,dateOfCreationElement,deleteButtonElement);
                notesListElement.append(noteItemContainerElement)
            }
        }
    }
    catch(error){
        console.log("Error:",error)
    }
}
notesHistory()

titleInputElement.addEventListener("input",(event)=>{
    try{
        titleInputElement.value=titleInputElement.value.toUpperCase()
        saveIndicatorElement.classList.add("typing");
        saveIndicatorElement.textContent="Saving..."
        let timeId=setTimeout(()=>{
            saveIndicatorElement.classList.remove("typing");
            saveIndicatorElement.textContent="Saved"
        },1000)
        let childrenArray=Array.from(notesListElement.children);
        let slectedNote=document.querySelector(".noteitem")
        let noteId=childrenArray.indexOf(slectedNote);
        let titleElement=slectedNote.querySelector(".title1")
        usersDetailsArray[index].notes[noteId].time=`${new Date().getHours()}:${new Date().getMinutes()}`
        usersDetailsArray[index].notes[noteId].editedDate=`${months[new Date().getMonth()]}${new Date().getDate()}, ${new Date().getFullYear()}`;
        dateElement.textContent=`Created ${usersDetailsArray[index].notes[noteId].date}       Lasted edited ${usersDetailsArray[index].notes[noteId].time} ${months[new Date().getMonth()]} ${usersDetailsArray[index].notes[noteId].editedDate}`;    
        if(titleInputElement.value===""){
            titleElement.textContent="Untitled";
            usersDetailsArray[index].notes[noteId].title="Untitled";
        }
        else{
            titleElement.textContent=titleInputElement.value.toUpperCase();
            usersDetailsArray[index].notes[noteId].title=titleInputElement.value.toUpperCase();
        }
        localStorage.setItem("usersDetails",JSON.stringify(usersDetailsArray));
    }
    catch(error){
        console.log("Error:",error)
    }
    
});
notesElement.addEventListener("input",(event)=>{
    try{
        saveIndicatorElement.classList.add("typing");
        saveIndicatorElement.textContent="Saving..."
        let timeId=setTimeout(()=>{
            saveIndicatorElement.classList.remove("typing");
            saveIndicatorElement.textContent="Saved"
        },1000)
        let childrenArray=Array.from(notesListElement.children);
        let slectedNote=document.querySelector(".noteitem")
        let noteId=childrenArray.indexOf(slectedNote);
        let previewItemElement=slectedNote.querySelector(".preview");
        usersDetailsArray[index].notes[noteId].time=`${new Date().getHours()}:${new Date().getMinutes()}`
        usersDetailsArray[index].notes[noteId].editedDate=`${months[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().getFullYear()}`;
        dateElement.textContent=`Created ${usersDetailsArray[index].notes[noteId].date}       Lasted edited ${usersDetailsArray[index].notes[noteId].time} ${months[new Date().getMonth()]} ${usersDetailsArray[index].notes[noteId].editedDate}`;
        wordCountElement.textContent=`${notesElement.value.trim().split(" ").filter(ele=>ele!=="").length} words ${notesElement.value.length} characters`
        if (notesElement.value===""){
            previewItemElement.textContent="Empty note";
            usersDetailsArray[index].notes[noteId].preview="Empty note";
        }
        else{
            previewItemElement.textContent=notesElement.value;
            usersDetailsArray[index].notes[noteId].preview=notesElement.value;
        }
        localStorage.setItem("usersDetails",JSON.stringify(usersDetailsArray));
    }
    catch(error){
        console.log("Error:",error)
    }
    
});

function start(){
    try{
        let titleElement=notesListElement.firstElementChild.querySelector(".title1")
        let previewElement=titleElement.nextElementSibling;
        if(usersDetailsArray[index].notes[0].title != "Untitled"){
            titleInputElement.value=usersDetailsArray[index].notes[0].title;
            titleElement.textContent=titleInputElement.value;
        }
        else{
            titleInputElement.value="";
            titleElement.textContent="Untitled";
        }
        if(usersDetailsArray[index].notes[0].preview != "Empty note"){
            notesElement.value=usersDetailsArray[index].notes[0].preview;
            previewElement.textContent=notesElement.value;
        }
        else{
            notesElement.value="";
            previewElement.textContent="Empty note";
        }

        let currentNote=usersDetailsArray[index].notes[0];
        notesElement.classList.remove("uppercase","lowercase");
        iconBackGround1Element.classList.remove("backgroundcolor");
        iconBackGround2Element.classList.remove("backgroundcolor");

        if(currentNote.uppercase){
            notesElement.classList.add("uppercase");
            iconBackGround1Element.classList.add("backgroundcolor");
        }
        else if(currentNote.lowercase){
            notesElement.classList.add("lowercase");
            iconBackGround2Element.classList.add("backgroundcolor");
        }
        if(usersDetailsArray[index].notes[0].italic==false){
            notesElement.classList.remove("italicstyle");
            iconBackGround3Element.classList.remove("backgroundcolor");
        }
        else{
            notesElement.classList.add("italicstyle");
            iconBackGround3Element.classList.add("backgroundcolor");
        }
        if(usersDetailsArray[index].notes[0].bold==false){
            notesElement.classList.remove("boldstyle");
            iconBackGround4Element.classList.remove("backgroundcolor");
        }
        else{
            notesElement.classList.add("boldstyle");
            iconBackGround4Element.classList.add("backgroundcolor");
        }
        countElement.textContent=`${usersDetailsArray[index].notes.length} notes`
        dateElement.textContent=`Created ${usersDetailsArray[index].notes[0].date}        Lasted edited ${usersDetailsArray[index].notes[0].time} ${usersDetailsArray[index].notes[0].editedDate}`;
        wordCountElement.textContent=`${notesElement.value.trim().split(" ").filter(ele=>ele!=="").length} words ${notesElement.value.length} characters`
        notesListElement.firstChild.classList.add("noteitem");
        notesListElement.lastChild.classList.remove("noteitem");
        notesListElement.lastChild.classList.add("backgroundnone"); 
    }
    catch(error){
        console.log("Error:",error)
    }
}
if(usersDetailsArray[index].notes.length!=0){
    start()
}

iconBackGround1Element.addEventListener("click",()=>{
    try{
        if (usersDetailsArray[index].notes.length!=0){
            iconBackGround2Element.classList.remove("backgroundcolor");
            notesElement.classList.remove("lowercase");
            iconBackGround1Element.classList.toggle("backgroundcolor");
            let childrenArray=Array.from(notesListElement.children);
            indexOfSelectedNote=childrenArray.findIndex(ele=>ele.classList.contains("noteitem"))
            notesElement.classList.toggle("uppercase");
            usersDetailsArray[index].notes[indexOfSelectedNote].lowercase=false;
            usersDetailsArray[index].notes[indexOfSelectedNote].preview=notesElement.value;
            usersDetailsArray[index].notes[indexOfSelectedNote].uppercase=notesElement.classList.contains("uppercase");;
            localStorage.setItem("usersDetails",JSON.stringify(usersDetailsArray))
        }
    }
    catch(error){
        console.log("Error:",error)
    }

})
iconBackGround2Element.addEventListener("click",()=>{
    try{
        if (usersDetailsArray[index].notes.length!=0){
            iconBackGround1Element.classList.remove("backgroundcolor");
            notesElement.classList.remove("uppercase");
            iconBackGround2Element.classList.toggle("backgroundcolor");
            let childrenArray=Array.from(notesListElement.children);
            indexOfSelectedNote=childrenArray.findIndex(ele=>ele.classList.contains("noteitem"))
            notesElement.classList.toggle("lowercase");
            usersDetailsArray[index].notes[indexOfSelectedNote].uppercase=false;
            usersDetailsArray[index].notes[indexOfSelectedNote].preview=notesElement.value;
            usersDetailsArray[index].notes[indexOfSelectedNote].lowercase=notesElement.classList.contains("lowercase");;
            localStorage.setItem("usersDetails",JSON.stringify(usersDetailsArray))
        }

    }
    catch(error){
        console.log("Error:",error)
    }
})

iconBackGround3Element.addEventListener("click",()=>{
    try{
        if (usersDetailsArray[index].notes.length!=0){
            iconBackGround3Element.classList.toggle("backgroundcolor");
            let childrenArray=Array.from(notesListElement.children);
            indexOfSelectedNote=childrenArray.findIndex(ele=>ele.classList.contains("noteitem"))
            notesElement.classList.toggle("italicstyle");
            usersDetailsArray[index].notes[indexOfSelectedNote].preview=notesElement.value;
            usersDetailsArray[index].notes[indexOfSelectedNote].italic=notesElement.classList.contains("italicstyle");;
            localStorage.setItem("usersDetails",JSON.stringify(usersDetailsArray))
        }
    }
    catch(error){
        console.log("Error:",error)
    }
})

iconBackGround4Element.addEventListener("click",()=>{
    try{
        if (usersDetailsArray[index].notes.length!=0){
            iconBackGround4Element.classList.toggle("backgroundcolor");
            let childrenArray=Array.from(notesListElement.children);
            indexOfSelectedNote=childrenArray.findIndex(ele=>ele.classList.contains("noteitem"))
            notesElement.classList.toggle("boldstyle");
            usersDetailsArray[index].notes[indexOfSelectedNote].preview=notesElement.value;
            usersDetailsArray[index].notes[indexOfSelectedNote].bold=notesElement.classList.contains("boldstyle");
            localStorage.setItem("usersDetails",JSON.stringify(usersDetailsArray))
        }
    }
    catch(error){
        console.log("Error:",error)
    }
})

function searchnotes(){
    try{
        let searchNote=searchNotesElement.value.trim().toUpperCase();
        let count=0;
        for(let noteElement of notesListElement.children){
            let titleElement=noteElement.querySelector(".title1");
            let matches=titleElement.textContent.toUpperCase().includes(searchNote);
            if(matches){
                noteElement.classList.remove("noneclass")
                count++
            }
            else{
                noteElement.classList.add("noneclass")
            }
        }
        countElement.textContent=`${count} notes`
    }
    catch(error){
        console.log("Error:",error)
    }
}

searchNotesElement.addEventListener("input",searchnotes)

const themeElement=document.querySelector(".theme");
themeElement.addEventListener("click",()=>{
    try{
        bodyElement.classList.toggle("light-theme")
        if(bodyElement.classList.contains("light-theme")){
            themeElement.innerHTML=`<i class="fa-solid fa-moon sun"></i>`
        }
        else{
            themeElement.innerHTML=`<i class="fa-solid fa-sun sun"></i>`
        }
    }
    catch(error){
        console.log("Error:",error)
    }
});
document.addEventListener("click",deleteNote)
function deleteNote(){
    try{
        let childrenArray=Array.from(notesListElement.children);
        let deleteId=childrenArray.indexOf(event.target.closest(".noteitem"))
        if (event.target.classList.contains("deletebutton")){
            event.target.closest(".noteitem").remove()
            usersDetailsArray[index].notes.splice(deleteId,1);
            localStorage.setItem("usersDetails",JSON.stringify(usersDetailsArray))
            startDisplayElement.classList.remove("hiddenclass");
            editorElement.classList.add("hiddenclass");
            countElement.textContent=`${usersDetailsArray[index].notes.length} notes`
            if (notesListElement.children.length==0){
                notesListElement.append(notesContainerElement);
                titleInputElement.value="";
                notesElement.value="";
            }
        }
    }
    catch(error){
        console.log("Error:",error)
    }
}

let yesterdayButtonElement=document.querySelector(".yesterdaybutton");
let allButtonElement=document.querySelector(".allbutton");
let olderButtonElement=document.querySelector(".olderbutton");

let today=new Date();
let yesterday=new Date(today);
yesterday.setDate(today.getDate()-1)
yesterday=yesterday.toLocaleDateString()
yesterdayButtonElement.addEventListener("click",()=>{
    try{
        notesHistory()
        yesterdayButtonElement.classList.add("buttonbackground");
        allButtonElement.classList.remove("buttonbackground");
        olderButtonElement.classList.remove("buttonbackground");
        let childernElements=Array.from(notesListElement.children);
        let count=0;
        for(let i=0;i<childernElements.length;i++){
            let noteDate=new Date(usersDetailsArray[index].notes[i].curDate).toLocaleDateString();
            if(noteDate!==yesterday){
                childernElements[i].classList.add("noneclass")
            }
            else{
                childernElements[i].classList.remove("noneclass")
                count++
            }
        }
        startDisplayElement.classList.remove("hiddenclass");
        editorElement.classList.add("hiddenclass");
        countElement.textContent=`${count} notes`
    }
    catch(error){
        console.log("Error:",error);
    }
})

allButtonElement.addEventListener("click",()=>{
    notesHistory()
    yesterdayButtonElement.classList.remove("buttonbackground");
    allButtonElement.classList.add("buttonbackground");
    olderButtonElement.classList.remove("buttonbackground");
    countElement.textContent=`${usersDetailsArray[index].notes.length} notes`
    startDisplayElement.classList.remove("hiddenclass");
    editorElement.classList.add("hiddenclass");
    for(let i=0;i<notesListElement.children.length;i++){
        notesListElement.children[i].classList.remove("noteitem");
        notesListElement.children[i].classList.add("backgroundnone");
        titleItemElement.classList.add("title1");
}
})

olderButtonElement.addEventListener("click",()=>{
    try{
        notesHistory()
        yesterdayButtonElement.classList.remove("buttonbackground");
        allButtonElement.classList.remove("buttonbackground");
        olderButtonElement.classList.add("buttonbackground");
        let childernElements=Array.from(notesListElement.children);
        let count=0;
        for(let i=0;i<childernElements.length;i++){
            let noteDate=new Date(usersDetailsArray[index].notes[i].curDate).toLocaleDateString();
            if(noteDate == yesterday || noteDate==new Date().toLocaleDateString()){
                childernElements[i].classList.add("noneclass")
            }
            else{
                childernElements[i].classList.remove("noneclass")
                count++
            }
        }
        for(let i=0;i<notesListElement.children.length;i++){
            notesListElement.children[i].classList.remove("noteitem");
            notesListElement.children[i].classList.add("backgroundnone");
            titleItemElement.classList.add("title1");
        }
        startDisplayElement.classList.remove("hiddenclass");
        editorElement.classList.add("hiddenclass");
        countElement.textContent=`${count} notes`
    }
    catch(error){
        console.log("Error:",error)
    }
})

let logoutElement=document.querySelector(".logout");
logoutElement.addEventListener("click",()=>{
    localStorage.setItem("signIn",false);
    window.location.href="https://dharanidharans-9mzl75r7-8443.zcodecorp.in/HTML_CSS_DHARANIDHARAN/JS%20project/login.html";
})









