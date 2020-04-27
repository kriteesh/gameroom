colorArr = ["#FFCDD2","#FF8A80","#F8BBD0","#FF80AB","#E1BEE7","#EA80FC","#D1C4E9","#B388FF","#C5CAE9","#8C9EFF","#BBDEFB","#82B1FF","#B3E5FC","#80D8FF","#B2EBF2","#84FFFF","#B2DFDB","#A7FFEB","#C8E6C9","#B9F6CA","#DCEDC8","#CCFF90","#F0F4C3","#F4FF81","#FFF9C4","#FFFF8D","#FFECB3","#FFE57F","#FFE0B2","#FFD180","#FFCCBC","#FF9E80","#D7CCC8","#6D4C41","#BDBDBD","#78909C"];

generateLine =(n)=> { 
    line = [];
    stack = new Array(n).fill(1).map((x,i)=> i+1) 
    for(i=0;i<n;i++){
        temp = stack[Math.floor(Math.random()*(n-0.001-i))];
        line.push(temp);
        stack.splice(stack.indexOf(temp),1);
    }
    return line; 
}

strCompare = a => b => {
    if(a.filter((x,i)=>x==b[i]).length == 0) return true;
    else return false;
}

shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  return array;
  }

generateGrid = (n) => {
    grid = []; 
    for(let i=0;i<n;i++){
           temp = generateLine(n);
           if(i==0) grid.push(temp);
           else if(grid.filter(x=>strCompare(x)(temp)).length==i) grid.push(temp);
           else i--;         
    }
   return grid;
}

neighbor = pt => bc => [[pt[0]+1,pt[1]],[pt[0]-1,pt[1]],[pt[0],pt[1]+1],[pt[0],pt[1]-1]].filter(x=>((x[0]>=0)&&(x[0]<bc[0])&&(x[1]>=0)&&(x[1]<bc[1])));

gridChanger = gr => gr.map((x,i)=>x.map((y,j)=>[y,0,[i,j],null,'']));


looper = gr =>{ 
    gr.map((x,i)=>{
        x.map((y,j)=>{
            // cells[i + gr.length*j].innerText = y[0];
            if(y[1]!=1){
                group = neighbor([i,j])([gr.length,gr.length]);
                group = shuffle(group);
                group = group.splice(0,1 + Math.floor(Math.random()*2.5));
                console.log(group);
                group = group.filter(x=>gr[x[0]][x[1]][1]==0);
                console.log(group);

                if(group.length==0){
                    y[1] = 1;
                }
                else if(group.length==1){
                    color = colorArr[0];
                    colorArr.splice(0,1);
                    gr[group[0][0]][group[0][1]][1] = 1;
                    gr[group[0][0]][group[0][1]][2] = [i,j];
                    cells[group[0][0] + gr.length*group[0][1]].style.background =  color;
                    y[1] = 1;
                    cells[i + gr.length*j].style.background =  color;
                    toss = Math.floor(Math.random()*3.99);
                    if(toss==0){
                        y[3] = y[0] + gr[group[0][0]][group[0][1]][0];
                        y[4] = '+';
                        z = create(cells[i + gr.length*j])('div')('celltop')({}); 
                        z.innerText = y[3] + y[4];
                    }
                    else if(toss==1){
                        y[3] = Math.abs(y[0] - gr[group[0][0]][group[0][1]][0]);
                        y[4] = '-';
                        z = create(cells[i + gr.length*j])('div')('celltop')({}); 
                        z.innerText = y[3] + y[4];
                    }
                    else if(toss==2){
                        y[3] = y[0]*gr[group[0][0]][group[0][1]][0];
                        y[4] = '✕';
                        z = create(cells[i + gr.length*j])('div')('celltop')({}); 
                        z.innerText = y[3] + y[4];
                    }
                    else{
                        if(y[0]%gr[group[0][0]][group[0][1]][0] == 0)
                        {   y[3] = y[0]/gr[group[0][0]][group[0][1]][0];
                            y[4] = '/';
                            z = create(cells[i + gr.length*j])('div')('celltop')({}); 
                            z.innerText = y[3] + y[4];
                        }
                        else if(gr[group[0][0]][group[0][1]][0]%y[0] == 0)
                        {   y[3] = gr[group[0][0]][group[0][1]][0]/y[0];
                            y[4] = '/';
                            z = create(cells[i + gr.length*j])('div')('celltop')({}); 
                            z.innerText = y[3] + y[4];
                        }
                        else{
                            y[3] = y[0] + gr[group[0][0]][group[0][1]][0];
                            y[4] = '+';
                            z = create(cells[i + gr.length*j])('div')('celltop')({}); 
                            z.innerText = y[3] + y[4];
                        }
                    }   
                }
                else{
                    color = colorArr[0];
                    colorArr.splice(0,1);
                    gr[group[0][0]][group[0][1]][1] = 1;
                    gr[group[0][0]][group[0][1]][2] = [i,j];
                    gr[group[1][0]][group[1][1]][1] = 1;
                    gr[group[1][0]][group[1][1]][2] = [i,j];
                    cells[group[0][0] + gr.length*group[0][1]].style.background =  color;
                    cells[group[1][0] + gr.length*group[1][1]].style.background =  color;
                    y[1] = 1;
                    cells[i + gr.length*j].style.background =  color;
                    toss = Math.floor(Math.random()*1.99);
                    if(toss==0){
                        y[3] = y[0] + gr[group[0][0]][group[0][1]][0] + gr[group[1][0]][group[1][1]][0];
                        y[4] = '+';
                        z = create(cells[i + gr.length*j])('div')('celltop')({}); 
                        z.innerText = y[3] + y[4];
                    }
                    else{
                        y[3] = y[0]*gr[group[0][0]][group[0][1]][0]*gr[group[1][0]][group[1][1]][0];
                        y[4] = '✕';
                         z = create(cells[i + gr.length*j])('div')('celltop')({}); 
                        z.innerText = y[3] + y[4];
                    }
                }
            }
        })
    })
    return gr;
}


