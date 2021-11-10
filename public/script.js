var data = {};
var max = 7.0;

window.onload = ()=>{
    refresh();
};



var refresh = async ()=>{
    
    await fetch("/info", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
        }).then(res=>res.json()).then(res=>{
            data = res; 
            // console.log(data);
        });
        
    update();
}

var pushData = ()=>{
    // console.log(1);
    fetch("/info", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

        }).then(res=>{
            if(res.status < 400){
                refresh();
            }
        });
};

var update = ()=>{
    document.getElementById("mylist").innerHTML = '';
    for (let x in data){

        // console.log(x);
        
        let node = document.createElement("li");
        node.setAttribute("id",x);

        let btn = document.createElement("button");
        btn.innerHTML = x;
        // btn.onclick = ()=>{
        //     data[x]["difficulty"] = (Number(data[x]["difficulty"])+1) % max;
        //     pushData();
        // };
        btn.addEventListener("click",()=>{
            data[x]["difficulty"] = (Number(data[x]["difficulty"])+1) % max;
            pushData();
        });

        node.appendChild(btn);

        let node2 = document.createElement("span");
        textNode = document.createTextNode(data[x]["description"]);
        node2.setAttribute("contenteditable",true);
        // node2.setAttribute("onfocusout","pushData()");
        node2.addEventListener("focusout", ()=>{
            data[x]["description"] = document.getElementById(x).childNodes[1].innerHTML;       
            // console.log(data[x]["description"]);
            pushData();
        });

        node2.appendChild(textNode);
        node.appendChild(node2);

        node2 = document.createElement("a");
        node2.setAttribute("href",data[x]["url"]);
        node2.innerHTML = data[x]["url"];
        node.appendChild(node2);


        document.getElementById("mylist").appendChild(node);

        node2 = document.createElement("meter");
        node2.setAttribute("value", Number(data[x]["difficulty"])/max);
        // node.appendChild(node2);
        document.getElementById("mylist").appendChild(node2);
    }


}