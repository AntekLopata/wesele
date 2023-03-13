var realCharakters = [[1, 'Pan młody', 'Lucian Rydel', 'Starszy brat Haneczki(Anny Rydlówny), wyzywany przez Hetmana'], [2, 'Pani młoda', 'Jadwiga Mikołajczykówna', 'Gospodyni(Anna Mikołajczykówna), Marysia(Maria Mikołajczykówna) - to jej siostry; Jasiek(Jan Mikołajczyk) - jej brat, Ojciec(jacek) - jej ojciec'], [3, 'Gospodarz', 'Włodzimierz Tetmajer', 'Malarz krakowski osiadły w Bronowicach; Kazimierz Przerwa-Tetmajer - jego przyrodni brat; Ojciec Isi(Jadwiga Tetmajerówna)'], [4, 'Gospodyni', 'Anna Mikołajczykówna', 'Starsza siotra Jadwigi(Panny młodej), siostra Marysi i Jaśka'], [5, 'Poeta', 'Kazimierz Przerwa-Tetmajer', 'Przyrodni brat gospodarza'], [6, 'Radczyni', 'Antonina Domańska', 'żona radcy miejskiego, ciotka Pana młodego, poetka'], [7, 'Haneczka', 'Anna Rydlówna', 'siostra Pana młodego'], [8, 'Marysia', 'Maria Mikołajczykówna', 'siostra Panny młodej'], [9, 'Jasiek', 'Jan Mikołajczyk', 'brat Panny młodej'], [10, 'Czepiec', 'Błażej Czepiec', 'pisarz gminny z Bronowic'], [11, 'Klimina', 'Anna Klima', 'wdowa po wójcie Bronowickim'], [12, 'Dziennikarz', 'Rudolf Starzewski', 'redaktor konserwatywnego pisma "Czas"'], [13, 'Żyd', 'Hersz Singer', 'Karczmarz z Bronowic'], [14, 'Rachela', 'Józefa Singer', 'córka karczmarza, zwana Pepe'], [15, 'Nos', 'Tadeusz Nosowski', 'malarz'], [16, 'Isia', 'Jadwiga Tetmajerówna', 'córka gospodarza'], [17, 'Ojciec', 'Jacek Mikołajczyk', 'ojciec Panny młodej']]
var fictionCharacters = [[1, 'Chochoł', 'słomiana mata na krzewy, przywołana przez Panią i Pana młodego w ostatniej scenie aktu I'], [2, 'Widmo', 'Ludwik de Lareaux, widmo zmarłego narzeczonego Marysi'], [3, 'Stańczyk', 'błazen ostatnich trzech Jagiellonów, pokazuje się Dziennikarzowi(członkowi organizacji "Stańczyków"'], [4, 'Rycerz', 'Zawisza Czarny, archetyp idealnego rycerza, ukazuje się poecie'], [5, 'Hetman', 'Franciszek Ksawery Branicki, krytykuje Pana młodego za zeswatanie się z chłopką, był zdrajcą(przywódca Targowicy)'], [6, 'Upiór', 'Widmo Jakuba Szeli, przywódcy Rabacji galicyjskej(1846), ukazuje się dziadowi(brał obecność w powstaniu)'], [7, 'Wernyhora', 'Legendarny lirnik, wieszcz ukraiński, objawia się gospodarzowi, każe mu wzniecić powstanie, daje mu złoty róg(który  następnie dostaje od gospodarza Jasiek)']]
var usedNumsReal = [];
var usedNumsFake = [];
var real;

var nameOnTop = document.querySelector('#charName');
const inputTxt = document.querySelector('#inputing');
const nextbtn = document.getElementById('nextbtn');
const checkbtn = document.getElementById('checkbtn');
var description = document.querySelector('#description');

var enteredWord;
var newCharakter;
var chooseName;

inputTxt.addEventListener('input',(input)=>{
    enteredWord = input.target.value;
});
inputTxt.addEventListener('keyup',(e)=>{
    if (e.key === 'Enter') check();
    if (e.keyCode === 187) generateNewCharakter();
});

checkbtn.addEventListener('click',check);
nextbtn.addEventListener('click',generateNewCharakter);

function check(){
    if (real){
        if (chooseName == 1){
            if (isCorrect(enteredWord, realCharakters[newCharakter[0]-1][2])){
                description.innerHTML = realCharakters[newCharakter[0]-1][3];
            }
            else {
                description.innerHTML = 'Wrong Answer!';
            }
        }
        else{
            if (isCorrect(enteredWord, realCharakters[newCharakter[0]-1][1])){
                description.innerHTML = realCharakters[newCharakter[0]-1][3];
            }
            else {
                description.innerHTML = 'Wrong Answer!';
            }
        }
    }
    else{
        if (isCorrect(enteredWord,newCharakter[1])){
            nameOnTop.innerHTML = 'Good Answer!';
        }
        else{
            nameOnTop.innerHTML = 'Wrong Answer!';
        }
    }
    
}


function generateNewCharakter(){
    if(usedNumsReal.length<realCharakters.length){
        newCharakter = realCharakters[Math.floor(Math.random()*realCharakters.length)];
        if (usedNumsReal.includes(newCharakter[0]-1)){
            generateNewCharakter();
        }
        usedNumsReal.push(newCharakter[0]-1);
        usedNumsReal = delsame(usedNumsReal);
        console.log(usedNumsReal);
        chooseName = Math.floor(Math.random()*2+1);
        nameOnTop.innerHTML = newCharakter[chooseName];
        inputTxt.value = '';
        description.innerHTML = '';
        real = true;
    }
    else if (usedNumsFake.length<fictionCharacters.length){
        newCharakter = fictionCharacters[Math.floor(Math.random()*fictionCharacters.length)];
        if (usedNumsFake.includes(newCharakter[0]-1)){
            generateNewCharakter();
        }
        usedNumsFake.push(newCharakter[0]-1);
        usedNumsFake = delsame(usedNumsFake);
        console.log(usedNumsFake);
        description.innerHTML = newCharakter[2];
        inputTxt.value = '';
        nameOnTop.innerHTML = '';
        real = false;
    }
    else{
        nameOnTop.innerHTML = 'End of quiz!';
        description.innerHTML = 'To play again click "Next"';
        inputTxt.value = '';
        usedNumsReal = [], usedNumsFake = [];
    }
}

function isCorrect(word1,word2){
    let newWord = word1;
    let orginalWord = word2;
    let count = 0;
    for(let i = 0; i<=(newWord.length>orginalWord.length ? newWord.length : orginalWord.length); i++){
        if (newWord[i]==orginalWord[i]) count++;
    }
    console.log(count);
    if(newWord.length-2<=count) return true;
}

function delsame(list){
    let list2 = [];
    let a;
    for(let i=0; i<list.length;i++){
        list2.includes(list[i]) ? a=1 : list2.push(list[i]);
    }
    return list2
}