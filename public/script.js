var data = {};
var max = 7.0;
var url = "/info";

window.onload = ()=>{
    refresh();
};

var refresh = async ()=>{
    
    await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
        }).then(res=>res.json()).then(res=>{
            data = res; 
            console.log(data);
        });
        
        typeof(data);

    update();
}

var update = ()=>{
    document.getElementById("mylist").innerHTML = '';
    for (let x in data){

        console.log(x);
        
        let node = document.createElement("li");
        // let textNode = document.createTextNode();
        // node.appendChild(textNode);
        // document.getElementById("mylist").appendChild(node);

        let btn = document.createElement("button");
        btn.innerHTML = x;
        btn.onclick = ()=>{
            data[x]["difficulty"] = (Number(data[x]["difficulty"])+1) % max;
            update();
            // console.log(data[x]["difficulty"]);
        };
        node.appendChild(btn);

        let node2 = document.createElement("span");

        textNode = document.createTextNode(data[x]["description"]+data[x]["URL"]);
        node2.appendChild(textNode);
        node.appendChild(node2);

        document.getElementById("mylist").appendChild(node);

        node2 = document.createElement("meter");
        console.log(Number(data[x]["difficulty"])/max);
        node2.setAttribute("value", Number(data[x]["difficulty"])/max);
        // node.appendChild(node2);
        document.getElementById("mylist").appendChild(node2);
    }
}