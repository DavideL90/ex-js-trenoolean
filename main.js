var treniContainer = []; //array contenente gli oggetti treni
//ciclo for per generare 10 treni in maniera automatica
for (var i = 0; i < 20; i++) {
  if(i < 10){
    treniContainer.push(creaTrenoDaRoma());
  }
  else{
    treniContainer.push(creaTrenoDaMilano());
  }
}
console.log(treniContainer);
var primaPartenza = cercaPrimoTreno("Roma", treniContainer);
var trenoVeloce = cercaTrenoVeloce("Roma", treniContainer);
var trenoLibero = cercaTrenoVuoto("Roma" , treniContainer);
document.write("Il treno che parte prima da Roma a Firenze è il numero: "
               + primaPartenza.id_Treno + " che parte alle ore: "
               + primaPartenza.orario + "<br>");
document.write("Il treno che impiega il minor tempo possibile da Roma a Firenze è il numero: "
               + trenoVeloce.numTreno + " che impiega "
               + trenoVeloce.minDurata + " minuti" + "<br>");
document.write("Il treno con più posti liberi da Roma a Firenze è il numero: "
              + trenoLibero.numTreno + " che ha "
              + trenoLibero.postiVuoti + " posti liberi" + "<br>");
//Faccio immettere i dati dall'utente
var partenzaInput = prompt("Scegli la stazione di partenza tra Roma e Milano:");
do{
  var isCorrect = false;
  if((partenzaInput == "Roma") || (partenzaInput == "Milano")){
    isCorrect = true;
  }
  else{
    alert("Hai inserito una stazione errata o inesistente! Reinserisci il valore");
    partenzaInput = prompt("Scegli la stazione di partenza tra Roma e Milano:");
  }
} while(!isCorrect);

var metodoRicerca = parseInt(prompt("Seleziona il metodo in base al quale vuoi ricercare i treni: "
                           + "Scrivi 1 per trovare il treno che parte prima. 2 per quello che viaggia più veloce. 3 per quello con il numero maggiore di posti liberi"));
do{
  var isCorrect = false;
  if((isNaN(metodoRicerca)) || (metodoRicerca < 1) || (metodoRicerca > 3)){
    alert("Hai inserito un valore Errato! Reinseriscilo");
    metodoRicerca = parseInt(prompt("Scrivi 1 per trovare il treno che parte prima. 2 per quello che viaggia più veloce. 3 per quello con il numero maggiore di posti liberi"));
  }
  else{
    isCorrect = true;
  }
}while(!isCorrect);

//Gestico i vari casi
switch(metodoRicerca){
  case 1:
  var responso = cercaPrimoTreno(partenzaInput, treniContainer);
  document.write("Il treno che parte prima da: " + partenzaInput +" è il numero: "
                 + responso.id_Treno + " che parte alle ore: "
                 + responso.orario + "<br>");
  var postiPrenotati = parseInt(prompt("Per quante persone vuoi prenotare?"));
  if(postiPrenotati > responso.postiRimasti){
    alert("Ci dispiace ma non ci sono abbastanza posti liberi!");
  }
  else{
    for (var i = 0; i < treniContainer.length; i++) {
      if((treniContainer[i].id_Number == responso.id_Treno) &&
         (treniContainer[i].orarioPartenza == responso.orario)){
           debugger;
        var postiDiminuiti = treniContainer[i].postiLiberi - postiPrenotati;
        treniContainer[i].postiLiberi = postiDiminuiti;
        var codicePrenotazione = generaCodice();
        document.write("Il codice della sua prenotazione è: " + codicePrenotazione);
      }
    }
  }
  break;
  case 2:
  var responso = cercaTrenoVeloce(partenzaInput, treniContainer);
  document.write("Il treno che impiega il minor tempo possibile da " + partenzaInput + " è il numero: "
                 + responso.numTreno + " che impiega "
                 + responso.minDurata + " minuti" + "<br>");
  var postiPrenotati = parseInt(prompt("Per quante persone vuoi prenotare?"));
  if(postiPrenotati > responso.postiRimasti){
    alert("Ci dispiace ma non ci sono abbastanza posti liberi!");
  }
  else{
    for (var i = 0; i < treniContainer.length; i++) {
      if((treniContainer[i].id_Number == responso.numTreno) &&
         (treniContainer[i].durata == responso.minDurata)){
        var postiDiminuiti = treniContainer[i].postiLiberi - postiPrenotati;
        treniContainer[i].postiLiberi = postiDiminuiti;
        var codicePrenotazione = generaCodice();
        document.write("Il codice della sua prenotazione è: " + codicePrenotazione);
      }
    }
  }
  break;
  case 3:
  var responso = cercaTrenoVuoto(partenzaInput, treniContainer);
  console.log(responso);
  document.write("Il treno con più posti liberi da " + partenzaInput + " è il numero: "
                + responso.numTreno + " che ha "
                + responso.postiVuoti + " posti liberi" + "<br>");
  var postiPrenotati = parseInt(prompt("Per quante persone vuoi prenotare?"));
  if(postiPrenotati > responso.postiRimasti){
    alert("Ci dispiace ma non ci sono abbastanza posti liberi!");
  }
  else{
    for (var i = 0; i < treniContainer.length; i++) {
      if((treniContainer[i].id_Number == responso.numTreno) &&
         (treniContainer[i].postiLiberi == responso.numPosti)){
        console.log(treniContainer[i].postiLiberi);
        var postiDiminuiti = treniContainer[i].postiLiberi - postiPrenotati;
        console.log(postiDiminuiti);
        treniContainer[i].postiLiberi = postiDiminuiti;
        console.log(treniContainer[i]);
        var codicePrenotazione = generaCodice();
        document.write("Il codice della sua prenotazione è: " + codicePrenotazione);
      }
    }
  }
  break;
  default :
  break;
}
//Funzione per creare gli oggetti treni
function creaTrenoDaRoma(){
  //genero numero identificativo
  var treno = {};
  var idNumber = ""; //Creo una stringa per contenere i valori da 0000 a 9999
  for (var i = 0; i < 4; i++) {
    var randomNumber = Math.floor(Math.random() * 10);
    idNumber += randomNumber;
  }
  treno.id_Number = idNumber;
  treno.staz_Partenza = "Roma";
  treno.staz_Arrivo = "Firenze";
  //genero un numero in minuti che parte dalle 2 ore e mezza fino alle 3 ore e mezza
  var randomMinutes = Math.floor(Math.random()* (360 - 150 + 1)) + 150;
  treno.durata = randomMinutes;
  var oraPartenza = "";
  //genero ora e minuti random
  var randomOra = Math.floor(Math.random()* (20 - 6 + 1)) + 6;
  if(randomOra < 10){
    oraPartenza += "0" + randomOra;
  }
  else{
    oraPartenza += randomOra;
  }
  var randomMinuti = Math.floor(Math.random()* 60);
  if(randomMinuti < 10){
    oraPartenza += ":" + "0" + randomMinuti;
  }
  else{
    oraPartenza += ":" + randomMinuti;
  }
  treno.orarioPartenza = oraPartenza;
  //genero posti liberi
  var postiLiberi = Math.floor(Math.random() * 301);
  treno.postiLiberi = postiLiberi;
  return treno;
}
function creaTrenoDaMilano(){
  //genero numero identificativo
  var treno = {};
  var idNumber = ""; //Creo una stringa per contenere i valori da 0000 a 9999
  for (var i = 0; i < 4; i++) {
    var randomNumber = Math.floor(Math.random() * 10);
    idNumber += randomNumber;
  }
  treno.id_Number = idNumber;
  treno.staz_Partenza = "Milano";
  treno.staz_Arrivo = "Roma";
  //genero un numero in minuti che parte dalle 2 ore e mezza fino alle 3 ore e mezza
  var randomMinutes = Math.floor(Math.random()* (360 - 170 + 1)) + 170;
  treno.durata = randomMinutes;
  var oraPartenza = "";
  //genero ora e minuti random
  var randomOra = Math.floor(Math.random()* (20 - 6 + 1)) + 6;
  oraPartenza += randomOra;
  var randomMinuti = Math.floor(Math.random()* 60);
  if(randomMinuti < 10){
    oraPartenza += ":" + "0" + randomMinuti;
  }
  else{
    oraPartenza += ":" + randomMinuti;
  }
  treno.orarioPartenza = oraPartenza;
  //genero posti liberi
  var postiLiberi = Math.floor(Math.random() * 301);
  treno.postiLiberi = postiLiberi;
  return treno;
}
//funzione per cercare il primo treno in partenza in base alla stazione scelta dall'utente;
function cercaPrimoTreno(stz_Partenza, arrTreni){
  var count = -1;
  var numTreno;
  var minOra;
  var minMinuti;
  var postiRimasti;
  do{
    count++
    var oraConversion = arrTreni[count].orarioPartenza.split(":");
    //converto le ore e i minuti in numeri interi
    minOra = parseInt(oraConversion[0]);
    minMinuti = parseInt(oraConversion[1]);
    numTreno = arrTreni[count].id_Number;
    postiRimasti = arrTreni[count].postiLiberi;
  }while((stz_Partenza != arrTreni[count].staz_Partenza) && (count != arrTreni.length))
  //Separo le ore dai minuti
  var orario = "";
  for (var i = 0; i < (arrTreni.length); i++) {
    if((arrTreni[i].staz_Partenza == stz_Partenza) && (arrTreni[i].postiLiberi != 0)){
      var oraConversion = arrTreni[i].orarioPartenza.split(":");
      var oraConvertita = parseInt(oraConversion[0]);
      var minutiConvertiti = parseInt(oraConversion[1]);
      if(oraConvertita < minOra){
        minOra = oraConvertita;
        minMinuti = minutiConvertiti;
        numTreno = arrTreni[i].id_Number;
        postiRimasti = arrTreni[i].postiLiberi;
      }
      else if(oraConvertita == minOra) {
        if(minutiConvertiti < minMinuti){
          minMinuti = minutiConvertiti;
          numTreno = arrTreni[i].id_Number;
          postiRimasti = arrTreni[i].postiLiberi;
        }
      }
    }
  }
  var primoTreno = {};
  primoTreno.id_Treno = numTreno;
  if(minOra < 10){
    orario = "0" + minOra;
  }else{
    orario = minOra;
  }
  if(minMinuti < 10){
    orario += ":" + "0" + minMinuti;
  }
  else{
    orario += ":" + minMinuti;
  }
  primoTreno.orario = orario;
  primoTreno.numPosti = postiRimasti;
  return primoTreno;
}
//funzione per cercare il treno che ci mette meno
function cercaTrenoVeloce(stz_Partenza, arrTreni){
  var count = -1;
  var minDurata;
  var numTreno;
  var postiRimasti;
  do{
    count++
    minDurata = arrTreni[count].durata;
    numTreno = arrTreni[count].id_Number;
  }while((stz_Partenza != arrTreni[count].staz_Partenza) && (count != arrTreni.length))

  for (var i = 1; i < (arrTreni.length); i++) {
    if((arrTreni[i].staz_Partenza == stz_Partenza) && (arrTreni[i].postiLiberi != 0)){
      if(arrTreni[i].durata < minDurata){
        minDurata = arrTreni[i].durata;
        numTreno = arrTreni[i].id_Number;
        postiRimasti = arrTreni[i].postiLiberi;
      }
    }
  }
  var fastTrain = {};
  fastTrain.numTreno = numTreno;
  fastTrain.minDurata = minDurata;
  fastTrain.numPosti = postiRimasti;
  return fastTrain;
}
//funzione per stampare il treno con più posti liberi
function cercaTrenoVuoto(stz_Partenza, arrTreni){
  var count = -1;
  var postiRimasti;
  var numTreno;
  do{
    count++
    postiRimasti = arrTreni[count].postiLiberi;
    numTreno = arrTreni[count].id_Number;
  }while((stz_Partenza != arrTreni[count].staz_Partenza) && (count != arrTreni.length))

  for (var i = 1; i < (arrTreni.length); i++) {
    if(arrTreni[i].staz_Partenza == stz_Partenza){
      if(arrTreni[i].postiLiberi > postiRimasti){
        postiRimasti = arrTreni[i].postiLiberi;
        numTreno = arrTreni[i].id_Number;
      }
    }
  }
  var trenoVuoto = {};
  trenoVuoto.numTreno = numTreno;
  trenoVuoto.numPosti = postiRimasti;
  return trenoVuoto;
}
//funzione per generare il codice alfanumerico
function generaCodice(){
  var codice = "";
  for (var i = 0; i < 2; i++) {
    var letterNumber = Math.floor(Math.random()*(90 - 64 + 1)) + 64;
    var letter = String.fromCharCode(letterNumber);
    codice += letter;
  }
  for(var i = 0; i < 4; i++){
    var randomNumber = Math.floor(Math.random()* 10);
    codice += randomNumber;
  }
  return codice;
}
