exports.mainPage = function(users, tasks, maxUserID, maxTaskID) {
    var pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <link rel="stylesheet" href="w3.css"/>
        <script src="https://kit.fontawesome.com/71db1a8142.js" crossorigin="anonymous"></script>
        <title>toDoList</title>
    </head>
    <body style="background-color:powderblue;">
        <header class="w3-container w3-center w3-deep-purple">
            <h1><b> To Do List </b></h1>
        </header>
        <main class="w3-center">
            <div class="w3-cell-row">    
                <div class="w3-container w3-cell w3-deep-purple w3-border" style="width:40%">
                    <h3 class="w3-margin-top"><b>New Task</b></h3>
                    <form action="/tasks/registo" class="w3-container  w3-center w3-margin" method="POST">
                        <input type="hidden" name="id" value=${maxTaskID}> 
                        <label><p class="w3-center w3-round" ><div class="w3-xxlarge"> <i class="fas fa-edit"></i> </div></p></label>
                        <input class="w3-input w3-border w3-margin-bottom w3-center w3-round" type="text" name="desc">
                        <label><p class="w3-round"><div class="w3-xxlarge"> <i class="fas fa-user-alt"></i> </div></p></label>
                        <select class="w3-select w3-border w3-round" name="autor">
                        <option class="w3-center" value="" disabled selected>Choose person</option>
                        
`
for(let i = 0; i<users.length;i++){
    pagHTML += `
    <option class="w3-center">${users[i].nome}</option>
    `
}

pagHTML += 	
`
                        </select>
                        <label><p class=" w3-round"><div class="w3-xxlarge"> <i class="fas fa-calendar-alt"></i> </div></p></label>
                        <input class="w3-input w3-border w3-round w3-center" type="date" name="deadline">
                        <button class="w3-btn w3-round w3-aqua w3-margin-top" type="submit">Add Task</button>
                    </form>
                </div>
                <div class="w3-container w3-cell" style="width:10%"> </div>
                <div class="w3-container w3-cell w3-deep-purple w3-border" style="width:40%">
                    <h3 class="w3-margin-top"><b>Add User</b></h3>
                    <form action="/users/registo" class="w3-container  w3-center w3-margin" method="POST">
                        <input type="hidden" name="id" value=${maxUserID}>
                        <label><p class=" w3-center w3-round" ><div class="w3-xxlarge"> <i class="fas fa-id-card"></i> </div></p></label>
                        <input class="w3-input w3-border w3-margin-bottom w3-center w3-round" type="text" name="nome">
                         
                        <label><p class=" w3-round"><div class="w3-xxlarge"> <i class="fas fa-suitcase"></i> </div></p></label>
                        <input class="w3-input w3-border w3-margin-bottom w3-center w3-round" type="text" name="ocupacao">
                          
    
                        <label><p class=" w3-round"><div class="w3-xxlarge"> <i class="fas fa-envelope"></i> </div></p></label>
                        <input class="w3-input w3-border w3-round w3-center" type="email" name="email">
                        
                        <button class="w3-btn w3-round w3-aqua w3-margin-top" type="submit">Add User</a>
                         
                    </form>
                </div>                
            </div>

            <div class="w3-cell-row">
                <div class="w3-container w3-cell w3-deep-purple w3-border" style="width:50%">
                        <h3><b>Tasks to be done</b></h3>
`

for(let i = 0; i < tasks.length; i++) {
    if(!("feito" in tasks[i])){
        pagHTML +=`
        <!-- Each Task Info -->
        <div class="w3-container w3-grey w3-center w3-round w3-margin-top">
            <p class="w3-right-align">
                <a href="/tasks/edit/${tasks[i].id}"><b>Edit</b></a>|<a href="/tasks/delete/${tasks[i].id}"><b>Delete</b></a>|<a href="/tasks/done/${tasks[i].id}"><b>Done</b></a>
            </p>  
            <p><b>Description:</b> ${tasks[i].desc}</p>  
            <p><b>Autor:</b> ${tasks[i].autor}</p> 
            <p><b>Deadline:</b> ${tasks[i].deadline}</p>  
        </div>`
    }
}

pagHTML += `
            </div>
<div class="w3-container w3-cell w3-deep-purple w3-border" style="width:50%">
                <h3><b>Completed Tasks</b></h3>
          `

for(let i = 0; i < tasks.length; i++) {
    if("feito" in tasks[i]){
        pagHTML +=`
        <div class="w3-container w3-grey w3-center w3-round w3-margin-top">
                    <p class="w3-right-align">
                        <a href="/tasks/delete/${tasks[i].id}"><b>Delete</b></a>
                    </p>  
                    <p><b>Description:</b> ${tasks[i].desc}</p>  
                    <p><b>Autor:</b> ${tasks[i].autor}</p> 
                    <p><b>Date:</b> ${tasks[i].data}</p> 
                        
        </div>
        `
    }
}

pagHTML +=
`                     
                    </div>
                </div>
            </div>
        </main>
        <footer class="w3-container w3-deep-purple">
            <h5 class="w3-center">TPC4 de EW por <b>Dinis Estrada</b></h5>
        </footer>
    </body>
</html>
    `
    return pagHTML
}

exports.editPage = function(task, users) {
    var pagHTML = `
    <!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>To do list</title>
        <link rel="stylesheet" href="./public/w3.css"/>
        <script src="https://kit.fontawesome.com/71db1a8142.js" crossorigin="anonymous"></script>
    </head>
    <body class="w3-2018-almost-mauve">
        <header class="w3-container w3-center w3-deep-purple">
            <h1><b>Edit Task</b></h1>
        </header>
        <main class="w3-center">
                <div class="w3-container w3-center w3-deep-purple w3-border" >
                    <h3 class="w3-margin-top"><b>Edit Task</b></h3>
                <form class="w3-container  w3-center w3-margin" method="POST">
                    <label><p class="w3-center w3-round" ><div class="w3-xxlarge"> <i class="fas fa-edit"></i> </div></p></label>
                    <input class="w3-input w3-border w3-margin-bottom w3-center w3-round" type="text" name="desc" value="${task.desc}">
                     
                    <label><p class="w3-round"><div class="w3-xxlarge"> <i class="fas fa-user-alt"></i> </div></p></label>
                    <select class="w3-select w3-border w3-round" name="autor" value=${task.autor}>
                        <option class="w3-center" value="" disabled selected>Choose person</option>
                        `
            for(let i = 0; i<users.length;i++){
                    pagHTML += `
                            <option class="w3-center">${users[i].nome}</option>
                            `
            }

                pagHTML +=        `
                      </select>
                      
                    <label><div class="w3-xxlarge"> <i class="fas fa-calendar-alt"></i> </div></label>
                    <input class="w3-input w3-border w3-round w3-center" type="date" name="deadline" value=${task.deadline}>
                    
                    <button class="w3-btn w3-round w3-aqua w3-margin-top" type="submit">Edit Task</button>
                     
                    </form>
                </div>
                
           
            
         
            
        </main>
        <footer class="w3-container w3-deep-purple">
            <h5 class="w3-center">TPC4 de EW por <b>Dinis Estrada</b></h5>
        </footer>
    </body>
</html>
    `

    return pagHTML
}