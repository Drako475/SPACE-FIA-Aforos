// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD9PrBn6hoeRNQEf51hpWAhdmawabVt4nE",
        authDomain: "space-fia.firebaseapp.com",
        databaseURL: "https://space-fia-default-rtdb.firebaseio.com/",
        projectId: "space-fia",
        storageBucket: "space-fia.appspot.com",
        messagingSenderId: "486913639502",
        appId: "1:486913639502:web:6bfad87b3db81413782f1f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
coleccionPisos = db.ref().child('Pisos');
bodyPisos = $('#bodyPisos').val();
//console.log(bodyPisos);  
$('form').submit(function(e){
  e.preventDefault();
  let id = $('#id').val();
  let descripcion = $('#descripcion').val();
  let aforoTotal = $('#aforoTotal').val();
  let aforoActual = $('#aforoActual').val();
  let idFirebase = id;
  if(idFirebase == ''){
   idFirebase = coleccionPisos.push().key;
  };
  data = { descripcion: descripcion, aforoTotal: aforoTotal, aforoActual: aforoActual};
  actualizacionData = {};
  actualizacionData[`/${idFirebase}`] = data;
  coleccionPisos.update(actualizacionData);
  id = '';
  $('form').trigger('reset');
  $('#modalAltaEdicion').modal('hide');
});
function mostrarPisos({descripcion, aforoTotal, aforoActual}){
  return `
  <td>${descripcion}</td>
  <td>${aforoTotal}</td>
  <td>${aforoActual}</td>
  `
};
coleccionPisos.on('child_added', data =>{
  let tr = document.createElement('tr')
  tr.id = data.key
  tr.innerHTML = mostrarPisos(data.val())
  document.getElementById('bodyPisos').appendChild(tr)
});

coleccionPisos.on('child_changed', data =>{
  let nodoEditado = document.getElementById(data.key)
  nodoEditado.innerHTML = mostrarPisos(data.val())
});
