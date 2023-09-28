function loadTable() {

//     let usersList = [];

//   fetch("http://localhost:8000/api/users")
//   .then(response => response.json()) 
//   .then(usersData =>console.log(usersData)) 
//   .catch(function (err) {
//   console.log(err);
// });
 
const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8000/api/users");
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    //   console.log(this.responseText);
      var trHTML = ''; 
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        trHTML += '<tr>'; 
        trHTML += '<td>'+object['id']+'</td>';
        trHTML += '<td>'+object['user_name']+'</td>';
        trHTML += '<td>'+object['user_lastname']+'</td>';
        trHTML += '<td>'+object['user_age']+'</td>';
        trHTML += '<td>'+object['user_id_card']+'</td>';
        trHTML += '<td>'+object['user_address']+'</td>';
        trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox('+object['id']+')">Edit</button>';
        trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete('+object['id']+')">Del</button></td>';
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}

loadTable();



function showUserCreateBox() {
  Swal.fire({
    title: 'Crear usuario',
    html:
      '<input id="id" type="hidden">' +
      '<input id="user_name" class="swal2-input" placeholder="Nombre">' +
      '<input id="user_lastname" class="swal2-input" placeholder="Apellido">' +
      '<input id="user_age" class="swal2-input" placeholder="edad">' +
      '<input id="user_id_card" class="swal2-input" placeholder="Cedula">' +
      '<input id="user_address" class="swal2-input" placeholder="Direccion">',
    focusConfirm: false,
    preConfirm: () => {
      userCreate();
    }
  })
}

function userCreate() {
  const user_name = document.getElementById("user_name").value;
  const user_lastname = document.getElementById("user_lastname").value;
  const user_age = document.getElementById("user_age").value;
  const user_id_card = document.getElementById("user_id_card").value;
  const user_address = document.getElementById("user_address").value;
    
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:8000/api/users");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(
    { 
      "user_name": user_name, 
      "user_lastname": user_lastname, 
      "user_age": user_age, 
      "user_id_card": user_id_card, 
      "user_address": user_address,
    }
         ));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(
        {
        title: "Crear usuario",
        html: "<h3> Usuario Creado correctamente</h3>"
      }
      );
      loadTable();
    }
  };
}

function showUserEditBox(id){
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:8000/api/users/${id}`);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const user = JSON.parse(this.responseText);

      Swal.fire({
        title: 'Editar usuario',
        html:
          '<input id="id" type="hidden" value='+user['id']+'>' +
          '<input id="user_name" class="swal2-input" placeholder="First" value="'+user['user_name']+'">' +
          '<input id="user_lastname" class="swal2-input" placeholder="Last" value="'+user['user_lastname']+'">' +
          '<input id="user_age" class="swal2-input" placeholder="user_age" value="'+user['user_age']+'">' +
          '<input id="user_id_card" class="swal2-input" placeholder="user_id_card" value="'+user['user_id_card']+'">' +
          '<input id="user_address" class="swal2-input" placeholder="user_address" value="'+user['user_address']+'">',
        focusConfirm: false,
        preConfirm: () => {
          userEdit();
        }
      })
    }
  };
}

function userEdit() {
  const id = document.getElementById("id").value;
  const user_name = document.getElementById("user_name").value;
  const user_lastname = document.getElementById("user_lastname").value;
  const user_age = document.getElementById("user_age").value;
  const user_id_card = document.getElementById("user_id_card").value;
  const user_address = document.getElementById("user_address").value;
    
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", `http://localhost:8000/api/users/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    "id": id, "user_name": user_name, "user_lastname": user_lastname, "user_age": user_age, "user_id_card": user_id_card,"user_address":user_address,
  }));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      console.log(objects);
      Swal.fire({
        title: "Editar usuario",
        html: "<h3> Usuario editado correctamente</h3>"
      });
      loadTable();
    }
  };
}

function userDelete(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", `http://localhost:8000/api/users/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    "id": id
  }));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(
        {
        title: "Eliminar usuario",
        html: "<h3> Usuario eliminado correctamente</h3>"
      }
      );
      loadTable();
    } 
  };
}