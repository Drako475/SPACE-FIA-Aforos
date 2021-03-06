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
    let codigo = $('#codigo').val();
    let descripcion = $('#descripcion').val();
    let aforoTotal = $('#aforoTotal').val();
    let aforoActual =$('#aforoActual').val();
    let idFirebase = id;
    if(idFirebase == ''){
     idFirebase = coleccionPisos.push().key;
    };
    data = {codigo:codigo, descripcion: descripcion, aforoTotal: aforoTotal, aforoActual: aforoActual};
    actualizacionData = {};
    actualizacionData[`/${idFirebase}`] = data;
    coleccionPisos.update(actualizacionData);
    id = '';
    $('form').trigger('reset');
    $('#modalAltaEdicion').modal('hide');
  });
  const iconoEditar = '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
  const iconoBorrar = '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';
  function mostrarPisos({codigo, descripcion, aforoTotal, aforoActual}){
    return `
    <td>${codigo}</td>
    <td>${descripcion}</td>
    <td>${aforoTotal}</td>
    <td>${aforoActual}</td>
    <td><button class="btnEditar btn btn-secondary" data-toggle="tooltip" title="Editar">${iconoEditar}</button><button class="btnBorrar btn btn-danger" data-toggle="tooltip" title="Borrar">${iconoBorrar}</button></td>
    `
  };
  //CHILD_ADDED
  coleccionPisos.on('child_added', data =>{
    let tr = document.createElement('tr')
    tr.id = data.key
    tr.innerHTML = mostrarPisos(data.val())
    document.getElementById('bodyPisos').appendChild(tr)
  });
  //CHILD_CHANGED
  coleccionPisos.on('child_changed', data =>{
    let nodoEditado = document.getElementById(data.key)
    nodoEditado.innerHTML = mostrarPisos(data.val())
  });
  //CHILD_REMOVED
  coleccionPisos.on('child_removed', data =>{
    let nodoEditado = document.getElementById(data.key)
    document.getElementById('bodyPisos').removeChild(nodoEditado)
  });
  //Programaci??n de los botones
  $('#btnNuevo').click(function(){
    $('#id').val('');
    $('#codigo').val('');
    $('#descripcion').val('');
    $('#aforoTotal').val('');
    $('#aforoActual').val('');
    $('form').trigger('reset');
    $('#modalAltaEdicion').modal('show');
  });
  $('#tablaPisos').on('click', '.btnEditar', function(){
    let id = $(this).closest('tr').attr('id');
    let codigo = $(this).closest('tr').find('td:eq(0)').text();
    let descripcion = $(this).closest('tr').find('td:eq(1)').text();
    let aforoTotal = $(this).closest('tr').find('td:eq(2)').text();
    let aforoActual = $(this).closest('tr').find('td:eq(3)').text();
    $('#id').val(id);
    $('#codigo').val(codigo);
    $('#descripcion').val(descripcion);                
    $('#aforoTotal').val(aforoTotal);
    $('#aforoActual').val(aforoActual);                    
    $('#modalAltaEdicion').modal('show');
  });
  $('#tablaPisos').on('click', '.btnBorrar', function(){
      Swal.fire({
        title: '??Est?? seguro de eliminar este piso?',
        text: "??Est?? operaci??n no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Borrar'
        }).then((result) => {
        if (result.value) {
            let id = $(this).closest('tr').attr('id'); //capturamos el atributo ID de la fila  
            db.ref(`Pisos/${id}`).remove() //eliminamos el piso de firebase      
            Swal.fire('??Eliminado!', 'El piso ha sido eliminado.','success')
        }
        })        
  });