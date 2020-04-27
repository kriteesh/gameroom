let order = 0;

body = document.body;

gameSelect = create(body)('div')('gameSelect')({});

gameLogo = create(gameSelect)('div')('gameLogo')({});

gameLevels = [["सरल (6 x 6)",6],["मध्यम (7 x 7)",7],["कठिन (8 x 8)",8],["कठिन ++ (9 x 9)",9]];

levels = new Array(4).fill(1).map((x,i)=>{
    z = create(gameSelect)('div')('levels')({});
    z.innerText = gameLevels[i][0];
    return z;
});

game = (order) => { 
    container = create(body)('div')('container')({});

    header = create(container)('div')('header')({});
    header.innerText = 'केन्-केन्';

    game = create(container)('div')('game')({});

    pad = create(container)('div')('pad')({});

    clicksound = new Audio('../assets/waterclick.mp3');

    if(screen.width < screen.height)
        {
            game.style.width = '90%';
            game.style.height = game.clientWidth ;
            game.style.marginLeft = '5%';
            game.style.marginTop = '2.5vh';

        }

    else{
            game.style.height = '80vh';
            game.style.width = '80vh';
            game.style.marginLeft = '5vw';
            game.style.marginTop = '15vh';
            pad.style.width = "30%";
            pad.style.setProperty('--size', "8vmin");
            pad.style.marginTop = '25vh';
            pad.style.height = '50vh';
            pad.style.flexDirection = 'column';
            header.style.position ='absolute';
            header.style.width = '100%';
            header.style.height = '10vh';
            header.style.lineHeight = '10vh';
            container.style.flexDirection = "row";
        }	

    w = game.clientWidth;

    selectedCell = null; 

    selected = el =>  el.classList.add('clicked');

    unselected = el => el.classList.remove('clicked');

    cells = new Array(order*order).fill(1).map(x=>{
        y = create(game)('div')('cell')({});
        game.style.gridTemplateColumns = 'repeat(' + order + ',1fr)';
        return y;
    });

    mainGrid = generateGrid(order);
    grinder = looper(gridChanger(mainGrid));
    solution = transpose(mainGrid).join(",").split(",");

    cells.map((x,i)=>{
        x.style.height = x.style.width = x.style.lineHeight = w/order + "px";
        x.onclick = () => { 
            clicksound.play();
            if(selectedCell!=null){
                unselected(cells[selectedCell]);
                selected(x);
                selectedCell = i;
            }
            else{
                selected(x);
                selectedCell = i;
            }
        }
    });

    padButtons = new Array(order).fill(1).map((x,i)=>(i+1).toString());

    padButtons = padButtons.concat(["✕", "पुनः", "चैक", "हल", "⇥"]);

    padButtons = padButtons.map((x,i)=>{
        y = create(pad)('div')('buttons')({});
        y.innerText =x;
        return y;
    })

    padButtons.map((x,i)=>{
        if(i<order+1){
            x.onclick = () =>{
                clicksound.play();
                if(cells[selectedCell].children.length==0){
                    z = create(cells[selectedCell])('div')('cellette')({}); 
                    if(i<order) z.innerText = x.innerText;
                    else if(i==order) z.innerText = '';
                }
                else if(cells[selectedCell].children[0].className=="celltop"){
                    if(cells[selectedCell].children.length==1){
                        z = create(cells[selectedCell])('div')('cellette')({}); 
                        if(i<order) z.innerText = x.innerText;
                        else if(i==order) z.innerText = '';
                        z.style.marginTop = "-50%";
                    }
                    else{
                        cells[selectedCell].removeChild(cells[selectedCell].childNodes[1]);
                        z = create(cells[selectedCell])('div')('cellette')({}); 
                        if(i<order) z.innerText = x.innerText;
                        else if(i==order) z.innerText = '';
                        z.style.marginTop = "-50%";
                    }
                }
                else{
                        cells[selectedCell].removeChild(cells[selectedCell].childNodes[0]);
                        z = create(cells[selectedCell])('div')('cellette')({}); 
                        if(i<order) z.innerText = x.innerText;
                        else if(i==order) z.innerText = '';
                }
            }
        }
        else if(i==order+1){
            x.onclick = () =>{
                
                swal({
                    title: "ठहरिये",
                    text: "क्या आप पुनः प्रयास करना चाहते है?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) document.querySelectorAll('.cellette').forEach(e => e.remove());
                });
            
            }
        }

        else if(i==order+2){
            x.onclick = () =>{
                swal({
                    title: "ठहरिये",
                    text: "क्या आप मूल्याङ्कन करना चाहते है ?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        document.querySelectorAll('.cellette').forEach((e,i) => {
                            if(e.innerText ==solution[i]) { e.style.background = "#9ec956"; e.style.color = "white";}
                            else {e.style.background = "#e75903"; e.style.color = "white";}
                        });
                    }
                });

            }
        }

        else if(i==order+3){
            x.onclick = () =>{

                swal({
                    title: "ठहरिये",
                    text: "क्या आप हल देखना चाहते है ?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        document.querySelectorAll('.cellette').forEach(e => e.remove());
                        cells.map((y,j)=>{
                            if(y.children.length==0){
                                z = create(y)('div')('cellette')({});
                                z.innerText = solution[j] ;
                            }
                            else{
                                z = create(y)('div')('cellette')({});
                                z.innerText = solution[j] ;
                                z.style.marginTop = "-50%";   
                            }
                        })
                    }
                });
            }
        }
        else if(i==order+4){
            x.onclick = () =>{

                swal({
                    title: "ठहरिये",
                    text: "क्या आपको नई सुडोकु चाहिए ?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        location.reload();
                    }
                });
            }
        }
    })
}


levels.map((x,i)=>{
    x.onclick = () => {
        levels.map(x=>gameSelect.remove(x));
        game(gameLevels[i][1]);
    }
})


