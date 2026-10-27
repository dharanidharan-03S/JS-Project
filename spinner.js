let wheelContainerElement=document.querySelector(".wheelcontainer");
let optionListElement=document.querySelector(".optionlist")
let spinButtonElement=document.querySelector(".spinbutton")
let yesOrNoArray=["Yes","No","Maybe"];
let daysOfWeakArray=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let lunchIdeasArray=["Pizza", "Sushi", "Burgers", "Pasta", "Salad", "Tacos", "Thai", "Chineese"];
let oneToSixArray = [1, 2, 3, 4, 5, 6];
let initialArray = ["Option 1", "Option 2", "Option 3", "Option 4"];
let selectedArray;
let playButtonElement=document.querySelector(".playbutton");
let resultLabelElement=document.querySelector(".resultlabel");
let resultTextElement=document.querySelector(".resulttext");
let countOfOptionElement=document.querySelector(".countofoption");
let pageElement=document.querySelector(".page");
let plusButtonElement=document.querySelector(".plusbutton");



let optionsElement=document.querySelector(".options");
let yesOrNoElement=document.querySelector(".yesorno")
let daysOfWeakButton=document.querySelector(".daysofweak");
let lunchIdeasButton=document.querySelector(".lunchideas");
let oneToSixElement=document.querySelector(".onetosix")

if (localStorage.getItem("initialArray")==null){
    localStorage.setItem("initialArray",JSON.stringify(initialArray))
}
if (localStorage.getItem("yesOrNoArray")==null){
    localStorage.setItem("yesOrNoArray",JSON.stringify(yesOrNoArray))
}

if (localStorage.getItem("daysOfWeakArray")==null){
    localStorage.setItem("daysOfWeakArray",JSON.stringify(daysOfWeakArray))
}

if (localStorage.getItem("lunchIdeasArray")==null){
    localStorage.setItem("lunchIdeasArray",JSON.stringify(lunchIdeasArray))
}

if (localStorage.getItem("oneToSixArray")==null){
    localStorage.setItem("oneToSixArray",JSON.stringify(oneToSixArray))
}

initialArray=JSON.parse(localStorage.getItem("initialArray"));
yesOrNoArray=JSON.parse(localStorage.getItem("yesOrNoArray"));
daysOfWeakArray=JSON.parse(localStorage.getItem("daysOfWeakArray"));
lunchIdeasArray=JSON.parse(localStorage.getItem("lunchIdeasArray"));
oneToSixArray=JSON.parse(localStorage.getItem("oneToSixArray"));


function sparkelEffect(){
    try{
        let sparkleContainerElement=document.querySelector(".sparklecontainer");
        let celebrations = [
        "🎉", "🎊", "🎈", "✨", "🎇",
        "🎆", "🥳", "🌟", "💖", "🏆"
    ];
        for(let i=0;i<50;i++){
            let sparkleElement=document.createElement("span");
            sparkleElement.classList.add("sparkle");
            sparkleElement.textContent=celebrations[Math.floor(Math.random()*celebrations.length)];
            sparkleElement.style.left=Math.random()*100+"vw";
            sparkleElement.style.animationDuration=Math.random()*2+2+"s";
            sparkleElement.style.animationDelay=Math.random()*2+"s";
            sparkleContainerElement.append(sparkleElement);

            setTimeout(()=>{
                sparkleElement.remove()
            },7000)
        }
    }
    catch(error){
        console.log("Error:",error)
    }
}

function wheelCreator(optionArray){
    try{
        selectedArray = optionArray;
        elementCount();
        wheelContainerElement.innerHTML="";
        let arrayLength=optionArray.length;
        let numberOfParts=360/arrayLength;
        let colorsArray=[];
        let colors = [];
        for(let i=0;i<optionArray.length;i++){
            let startAngle = i*numberOfParts;
            let endAngle = (i+1)*numberOfParts;
            
            let color=`hsl(${i*numberOfParts},50%,50%)`;
            colorsArray.push(`${color} ${startAngle}deg ${endAngle}deg`)
            colors.push(color);
        }
        wheelContainerElement.style.background=`conic-gradient(${colorsArray.join(", ")})`
        for (let i=0;i<arrayLength;i++){
            let divElement=document.createElement("div");
            let spanElement=document.createElement("span");
            spanElement.textContent=optionArray[i];
            spanElement.style.transform=`rotate(${90}deg)`;
            spanElement.classList.add("portion") 
            divElement.append(spanElement);
            let rotationAngle=i*numberOfParts+numberOfParts/2;
            divElement.style.transform=`rotate(${rotationAngle}deg)`
            wheelContainerElement.append(divElement)
        }
        optionCreator(optionArray,colors)

    }
    catch(error){
        console.log("Error:",error)
    }
}
wheelCreator(initialArray);

let rotation=0;


let popUpElement=document.querySelector(".popup");
let winnerNameElement=document.querySelector(".winnername");
let removeButtonElement=document.querySelector(".removebutton");
let closeButtonElement=document.querySelector(".closebutton");

wheelContainerElement.addEventListener("click",spinWheel);
spinButtonElement.addEventListener("click",spinWheel);
playButtonElement.addEventListener("click",spinWheel);

let isSpinning=false;
function spinWheel(){
    try{
        if(isSpinning){
            return;
        }
        isSpinning = true;
        optionsElement.disabled=true;
        yesOrNoElement.disabled=true;
        daysOfWeakButton.disabled=true;
        lunchIdeasButton.disabled=true;
        oneToSixElement.disabled=true;
        resultLabelElement.innerHTML="";
        resultTextElement.innerHTML="";
        let randomAngle=Math.floor(Math.random()*360);
        rotation+=(360*5)+randomAngle;
        spinButtonElement.disabled = true;
        wheelContainerElement.style.transform=`rotate(${rotation}deg)`
        wheelContainerElement.addEventListener("transitionend",handler);
        function handler(){
            wheelContainerElement.removeEventListener("transitionend", handler);
            //let finalAngle = ((rotation%360)+360)%360;
            let finalAngle = rotation%360;
            let sectionAngle = 360/selectedArray.length;
            // let pointerAngle = 79;
            let pointerAngle = 90;
            let wheelAngle = (pointerAngle-finalAngle+360)%360;
            let index=Math.floor(wheelAngle/sectionAngle);

            let angleInsideSection=wheelAngle%sectionAngle;
            let boundaryDistance=Math.min(angleInsideSection,sectionAngle-angleInsideSection);
            if(boundaryDistance<5){
                rotation+=7;
                wheelContainerElement.style.transform=`rotate(${rotation}deg)`;
                wheelContainerElement.addEventListener("transitionend",()=>{
                    wheelContainerElement.removeEventListener("transitionend", handler);
                    showWinner()
                },{once:true});
            }
            else{
                showWinner()
            }
        }
    }
    catch(error){
        console.log("Error:",error)
    }
}

function showWinner(){
    try{
        let finalAngle = rotation%360;
        let sectionAngle = 360/selectedArray.length;
        // let pointerAngle = 79;
        let pointerAngle = 90;
        let wheelAngle = (pointerAngle-finalAngle+360)%360;
        let index=Math.floor(wheelAngle/sectionAngle);
        resultLabelElement.innerHTML = "🎉WINNER";
                
        resultTextElement.innerHTML = selectedArray[index];
        
        plusButtonElement.disabled = true;
        popUpElement.classList.add("visibleclass");
        winnerNameElement.textContent=selectedArray[index];
        pageElement.classList.add("blureffect");
        sparkelEffect()
    }
    catch(error){
        console.log("Error:",error)
    }
}

closeButtonElement.addEventListener("click",()=>{
    try{
        popUpElement.classList.remove("visibleclass");
        pageElement.classList.remove("blureffect");
        spinButtonElement.disabled = false;
        optionsElement.disabled=false;
        yesOrNoElement.disabled=false;
        daysOfWeakButton.disabled=false;
        lunchIdeasButton.disabled=false;
        oneToSixElement.disabled=false;
        isSpinning = false;
        plusButtonElement.disabled = false;
    }
    catch(error){
        console.log("Error:",error)
    }
})
function valueUpdate(){
    try{
        if (selectedArray==yesOrNoArray){
            localStorage.setItem("yesOrNoArray",JSON.stringify(selectedArray));
        }
        else if(selectedArray==initialArray){
            localStorage.setItem("initialArray",JSON.stringify(selectedArray));
        } 
        else if(selectedArray==daysOfWeakArray){
            localStorage.setItem("daysOfWeakArray",JSON.stringify(selectedArray));
        } 
        else if(selectedArray==lunchIdeasArray){
            localStorage.setItem("lunchIdeasArray",JSON.stringify(selectedArray));
        } 
        else if(selectedArray==oneToSixArray){
            localStorage.setItem("oneToSixArray",JSON.stringify(selectedArray));
        } 
    }
    catch(error){
        console.log("Error:",error)
    }
}

function addHighLightOption(){
    try{
        let options = optionListElement.querySelectorAll(".optiontext");
        let resultValue = resultTextElement.textContent;
        for(let i=0;i<options.length;i++){
            let option = options[i].closest(".option");
            if(options[i].textContent.trim() == resultValue){
                // option.classList.add("winner");
                selectedArray.splice(i,1);
                option.remove();
                valueUpdate()
                valueUpdate()
                elementCount();
                wheelCreator(selectedArray);
            }
        }
    }
    catch(error){
        console.log("Error:",error)
    }
}

function elementCount(){
    try{
        countOfOptionElement.innerHTML = selectedArray.length+ " options";
    }
    catch(error){
        console.log("Error:",error)
    }
}


optionsElement.addEventListener("click",()=>{
    wheelCreator(initialArray);
})
yesOrNoElement.addEventListener("click",()=>{
    wheelCreator(yesOrNoArray);
})

daysOfWeakButton.addEventListener("click",()=>{
    wheelCreator(daysOfWeakArray)
})

lunchIdeasButton.addEventListener("click",()=>{
    wheelCreator(lunchIdeasArray)
})

oneToSixElement.addEventListener("click",()=>{
    wheelCreator(oneToSixArray)
})

plusButtonElement.addEventListener("click",()=>{
    addElement();
})

function optionCreator(inputArray,colors){
    try{
        optionListElement.innerHTML="";
        for(let i=0;i<inputArray.length;i++){
            optionElement=document.createElement("div");
            optionElement.classList.add("option");
            dotElement=document.createElement("div");
            dotElement.classList.add("dot");
            dotElement.style.backgroundColor=colors[i];
            let optionTextElement=document.createElement("span");
            optionTextElement.classList.add("optiontext")
            optionTextElement.textContent=inputArray[i];

            let editButtonElement=document.createElement("button");
            editButtonElement.classList.add("editbutton")
            editButtonElement.textContent="Edit"
            let deleteButtonElement=document.createElement("button");
            deleteButtonElement.classList.add("deletebutton");
            deleteButtonElement.textContent="X";
            optionElement.append(dotElement,optionTextElement,editButtonElement,deleteButtonElement);
            optionListElement.append(optionElement)
        }
    }
    catch(error){
        console.log("Error:",error)
    }
}
optionListElement.addEventListener("click",(event)=>{
    try{
        if(!event.target.classList.contains("editbutton")){
            return;
        }
        let optionElement=event.target.closest(".option");
        if(!optionElement){
            return;
        }
        let optionTextElement=optionElement.querySelector(".optiontext");
        if(!optionTextElement){
            return;
        }
        let oldValue=optionTextElement.textContent;
        let inputElement=document.createElement("input");
        inputElement.type="text";
        inputElement.value=oldValue;
        inputElement.maxLength=8;
        inputElement.classList.add("rowinput");
        let saveButtonElement=document.createElement("button");
        saveButtonElement.textContent="Save"
        saveButtonElement.classList.add("editbutton");
        saveButtonElement.style.opacity="1";
        optionTextElement.replaceWith(inputElement);
        event.target.replaceWith(saveButtonElement);
        inputElement.focus();
        saveButtonElement.addEventListener("click",()=>{
            let newValue=inputElement.value.trim();
            if(newValue===""){
                alert("Options cannot be empty")
                inputElement.focus();
                return;
            }
            let indexOfSelectedOption=Array.from(optionListElement.children).indexOf(optionElement);
            selectedArray[indexOfSelectedOption]=newValue;
            valueUpdate();
            wheelCreator(selectedArray);
        })
    }
    catch(error){
        console.log("Error:",error)
    }
})


function addElement(){
    try{
        let inputElement = document.querySelector(".rowinput");
        let value = inputElement.value.trim();
        if (value === ""){
            alert("Please enter a value");
            return;
        }
        if(selectedArray.length>=15){
            alert("Maximum limit reached! You can add only 15 options");
            return;
        }
        if(selectedArray.includes(value)){
            alert("This option already exists!");
            return;
        }
        if (selectedArray==yesOrNoArray){
            selectedArray.push(value);
            localStorage.setItem("yesOrNoArray",JSON.stringify(selectedArray));
        }
        else if(selectedArray==initialArray){
            selectedArray.push(value);
            localStorage.setItem("initialArray",JSON.stringify(selectedArray));
        } 
        else if(selectedArray==daysOfWeakArray){
            selectedArray.push(value);
            localStorage.setItem("daysOfWeakArray",JSON.stringify(selectedArray));
        } 
        else if(selectedArray==lunchIdeasArray){
            selectedArray.push(value);
            localStorage.setItem("lunchIdeasArray",JSON.stringify(selectedArray));
        } 
        else if(selectedArray==oneToSixArray){
            selectedArray.push(value);
            localStorage.setItem("oneToSixArray",JSON.stringify(selectedArray));
        } 
        elementCount();
        wheelCreator(selectedArray);
        inputElement.value = "";
    }
    catch(error){
        console.log("Error:",error)
    }
}

document.addEventListener("click",(event)=>{
    try{
        let deleteButtonElement=Array.from(document.getElementsByClassName("deletebutton"));
        if(deleteButtonElement.includes(event.target)){
            if(selectedArray.length>2){
                selectedArray.splice(deleteButtonElement.indexOf(event.target),1);
                valueUpdate()
                event.target.closest(".option").remove();
                elementCount();
                wheelCreator(selectedArray);
            }
            else{
                alert("Atleast two options must be present")
            }
        }
    }
    catch(error){
        console.log("Error:",error)
    }
})

removeButtonElement.addEventListener("click",()=>{
    try{
        optionsElement.disabled=false;
        yesOrNoElement.disabled=false;
        daysOfWeakButton.disabled=false;
        lunchIdeasButton.disabled=false;
        oneToSixElement.disabled=false;
        if(selectedArray.length>2){
            addHighLightOption()
            popUpElement.classList.remove("visibleclass");
            pageElement.classList.remove("blureffect");
            spinButtonElement.disabled = false;
            isSpinning = false;
            plusButtonElement.disabled = false;
        }
        else{
            alert("Atleast two options must be present")
            if(confirm("Do you want to reset?")){
                if (selectedArray==yesOrNoArray){
                yesOrNoArray=["Yes","No","Maybe"];
                localStorage.setItem("yesOrNoArray",JSON.stringify(yesOrNoArray));
                wheelCreator(yesOrNoArray);
            }
            else if(selectedArray==initialArray){
                initialArray=["Option 1", "Option 2", "Option 3", "Option 4"];
                localStorage.setItem("initialArray",JSON.stringify(initialArray));
                wheelCreator(initialArray);
            } 
            else if(selectedArray==daysOfWeakArray){
                daysOfWeakArray=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                localStorage.setItem("daysOfWeakArray",JSON.stringify(daysOfWeakArray));
                wheelCreator(daysOfWeakArray);
            } 
            else if(selectedArray==lunchIdeasArray){
                lunchIdeasArray=["Pizza", "Sushi", "Burgers", "Pasta", "Salad", "Tacos", "Thai", "Chineese"];
                localStorage.setItem("lunchIdeasArray",JSON.stringify(lunchIdeasArray));
                wheelCreator(lunchIdeasArray);
            } 
            else if(selectedArray==oneToSixArray){
                oneToSixArray=[1, 2, 3, 4, 5, 6];
                localStorage.setItem("oneToSixArray",JSON.stringify(oneToSixArray));
                wheelCreator(oneToSixArray);
            } 
            elementCount();
            }
        }
    }
    catch(error){
        console.log("Error:",error)
    }

})