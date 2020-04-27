let create = parent => tag => element => parameters => { 
    x = document.createElement(tag);
    x.className = element;
    for( i in parameters){
        x.setAttribute(i, parameters[i]);
    }
    parent.appendChild(x);
    return x;
}

transpose = arr => arr.map((m,i)=>m.map((n,j)=>arr[j][i]));

vanish = el => el.display = "none";

reappear = el => el.display = "initial";

randomColor = () =>{
        return 'rgb(' + (Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255)) + ')';
}


