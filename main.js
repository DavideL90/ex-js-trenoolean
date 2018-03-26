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
